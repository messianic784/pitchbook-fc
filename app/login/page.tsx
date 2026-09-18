"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  TrendingUp,
  HeartPulse,
  Binoculars,
  ArrowRight,
  Lock,
  Mail,
  Sparkles,
  Play,
} from "lucide-react";

interface DemoAccount {
  role: string;
  email: string;
}

const DEMO_ACCOUNTS: DemoAccount[] = [
  { role: "Club Owner", email: "owner@riversidefc.com" },
  { role: "Director", email: "director@riversidefc.com" },
  { role: "Coach", email: "coach@riversidefc.com" },
  { role: "Medical", email: "medical@riversidefc.com" },
  { role: "Scout", email: "scout@riversidefc.com" },
  { role: "Finance", email: "finance@riversidefc.com" },
  { role: "Player", email: "player@riversidefc.com" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("owner@riversidefc.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Club Owner");

  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startAutoplay = (video: HTMLVideoElement | null) => {
      if (!video) return;
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Autoplay was prevented; video will start on first user interaction
          const handleFirstClick = () => {
            video.muted = true;
            video.play();
            window.removeEventListener("click", handleFirstClick);
            window.removeEventListener("touchstart", handleFirstClick);
          };
          window.addEventListener("click", handleFirstClick, { once: true });
          window.addEventListener("touchstart", handleFirstClick, { once: true });
        });
      }
    };

    startAutoplay(desktopVideoRef.current);
    startAutoplay(mobileVideoRef.current);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  };

  const handleSelectDemo = (acc: DemoAccount) => {
    setEmail(acc.email);
    setPassword("password123");
    setSelectedRole(acc.role);
  };

  return (
    <div className="grid min-h-dvh lg:grid-cols-2 bg-[#060c13]">
      {/* LEFT COLUMN (Desktop): Stadium Drone Video Background */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden p-10 text-white">
        {/* Stadium Video Player */}
        <div className="absolute inset-0 z-0">
          <video
            ref={desktopVideoRef}
            src="/pitchbook-stadium.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/pitchbook-stadium-poster.jpg"
            className="w-full h-full object-cover"
          />
          {/* Gradients for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060c13] via-[#060c13]/60 to-[#060c13]/80 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060c13]/80 via-transparent to-[#060c13]/40 pointer-events-none" />
        </div>

        {/* Top Header & Logo */}
        <div className="relative z-10">
          <Link href="/welcome" className="inline-flex items-center gap-2.5 font-semibold">
            <div className="flex size-9 items-center justify-center rounded-lg bg-[#0fa05c] text-white shadow-lg shadow-[#0fa05c]/30">
              <ShieldCheck className="size-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Pitchbook</span>
            <span className="rounded-full bg-[#0fa05c]/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#0fa05c] border border-[#0fa05c]/30">
              FC OS
            </span>
          </Link>
        </div>

        {/* Center Copy & Feature Highlights */}
        <div className="relative z-10 max-w-lg space-y-7 my-auto py-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-3 py-1 text-xs text-white/80">
            <Sparkles className="size-3.5 text-[#0fa05c]" />
            <span>Modern Football Club Management</span>
          </div>

          <h2 className="text-4xl font-bold leading-tight tracking-tight text-white">
            Run your football club. <span className="text-[#0fa05c]">Smarter.</span>
          </h2>

          <p className="text-base text-white/70 leading-relaxed">
            Players, staff, scouting, medical, finance and match-day — one unified platform built for how modern clubs operate.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-3 transition-colors hover:bg-white/10">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#0fa05c]/20 text-[#0fa05c] border border-[#0fa05c]/30">
                <TrendingUp className="size-4.5" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Live performance dashboards</p>
                <p className="text-xs text-white/60">Automated match ratings, workload, and squad analytics</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-3 transition-colors hover:bg-white/10">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#0fa05c]/20 text-[#0fa05c] border border-[#0fa05c]/30">
                <HeartPulse className="size-4.5" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Medical tracking & availability</p>
                <p className="text-xs text-white/60">Injury timelines, rehab protocols and return-to-play dates</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-3 transition-colors hover:bg-white/10">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#0fa05c]/20 text-[#0fa05c] border border-[#0fa05c]/30">
                <Binoculars className="size-4.5" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Recruitment & scouting pipeline</p>
                <p className="text-xs text-white/60">Kanban prospect tracking from discovery to first-team signing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="relative z-10 text-xs text-white/40">
          © 2026 Pitchbook. Built for football clubs, academies and federations worldwide.
        </p>
      </div>

      {/* RIGHT COLUMN: Mobile Video Banner + Login Form */}
      <div className="flex flex-col justify-center min-h-full">
        {/* Mobile Stadium Video Banner */}
        <div className="relative lg:hidden h-56 w-full overflow-hidden border-b border-white/10 bg-black">
          <video
            ref={mobileVideoRef}
            src="/pitchbook-stadium.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/pitchbook-stadium-poster.jpg"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060c13] via-[#060c13]/40 to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-4 flex items-center gap-2 z-10">
            <div className="flex size-7 items-center justify-center rounded-md bg-[#0fa05c] text-white shadow">
              <ShieldCheck className="size-4" />
            </div>
            <span className="font-bold text-white text-base drop-shadow">Pitchbook FC</span>
            <span className="text-[10px] text-[#0fa05c] font-semibold uppercase px-1.5 py-0.5 rounded bg-[#0fa05c]/20 border border-[#0fa05c]/40">
              Live
            </span>
          </div>
        </div>

        {/* Form Container */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-sm space-y-6">
            <div className="space-y-2 text-center lg:text-left">
              <h1 className="text-2xl font-bold tracking-tight text-white">Welcome back</h1>
              <p className="text-sm text-slate-400">
                Sign in to your club&apos;s workspace or choose a demo role
              </p>
            </div>

            {/* Demo Quick-Select Grid */}
            <div className="rounded-xl border border-white/10 bg-[#0d141e]/90 p-3.5 backdrop-blur-sm shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-slate-300">
                  Demo Accounts
                </p>
                <span className="text-[10px] text-slate-400 font-mono">pass: password123</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => handleSelectDemo(acc)}
                    className={`rounded-lg border px-2.5 py-1.5 text-left text-xs transition-all ${
                      selectedRole === acc.role
                        ? "border-[#0fa05c] bg-[#0fa05c]/20 text-white font-semibold shadow-sm"
                        : "border-white/5 bg-[#141d2b] text-slate-300 hover:border-white/20 hover:bg-[#192435]"
                    }`}
                  >
                    <span className="block text-[11px] font-medium leading-tight">{acc.role}</span>
                    <span className="block text-[10px] text-slate-400 truncate">{acc.email.split("@")[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Mail className="size-3.5 text-slate-400" />
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@club.com"
                  required
                  className="w-full rounded-lg border border-white/10 bg-[#0d141e] px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-[#0fa05c] focus:outline-none focus:ring-1 focus:ring-[#0fa05c]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Lock className="size-3.5 text-slate-400" />
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-lg border border-white/10 bg-[#0d141e] px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-[#0fa05c] focus:outline-none focus:ring-1 focus:ring-[#0fa05c]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#0fa05c] hover:bg-[#0fa05c]/90 text-white font-semibold py-2.5 px-4 text-sm shadow-lg shadow-[#0fa05c]/25 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span>Signing in...</span>
                ) : (
                  <>
                    <span>Enter Club Workspace</span>
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-slate-400">
              New club?{" "}
              <Link href="/welcome" className="font-semibold text-[#0fa05c] hover:underline">
                Explore Platform Overview
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
