"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  ArrowRight,
  Lock,
  Mail,
  Users,
  Trophy,
  Activity,
  CheckCircle2,
  Zap,
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
          const handleFirstClick = () => {
            if (video) {
              video.muted = true;
              video.play().catch(() => {});
            }
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

  const handleContinueDemo = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 250);
  };

  return (
    <div className="grid min-h-dvh lg:grid-cols-2 bg-[#060c13]">
      {/* LEFT COLUMN (Desktop): Crystal Clear Cinematic Stadium Drone Video */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden p-8 text-white select-none">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20 pointer-events-none" />
        </div>

        {/* Top Floating Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <Link href="/welcome" className="inline-flex items-center gap-2.5 rounded-full bg-black/40 border border-white/20 px-4 py-2 backdrop-blur-sm transition hover:bg-black/60 shadow-lg">
            <div className="flex size-7 items-center justify-center rounded-full bg-[#0fa05c] text-white shadow">
              <ShieldCheck className="size-4" />
            </div>
            <span className="text-sm font-bold tracking-tight text-white">Pitchbook FC</span>
            <span className="size-1.5 rounded-full bg-[#0fa05c] animate-pulse" />
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full bg-black/40 border border-white/15 px-3 py-1.5 text-[11px] font-mono text-emerald-400 backdrop-blur-sm">
            <span>RIVERSIDE STADIUM · LIVE SCENE</span>
          </div>
        </div>

        {/* Center Area */}
        <div className="relative z-10 my-auto pointer-events-none" />

        {/* Bottom Floating Telemetry Strip */}
        <div className="relative z-10 space-y-3">
          <div className="max-w-md">
            <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
              Run your football club. <span className="text-[#0fa05c]">Smarter.</span>
            </h2>
            <p className="text-xs text-white/80 mt-1 drop-shadow leading-relaxed">
              Real-time squad readiness, injury tracking, scouting pipeline, and financial telemetry.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2.5 pt-1">
            <div className="rounded-xl border border-white/20 bg-black/50 p-2.5 backdrop-blur-sm shadow-lg">
              <span className="block text-[9px] uppercase font-mono tracking-wider text-emerald-400 flex items-center gap-1">
                <Users className="size-3" /> Squad Fit
              </span>
              <span className="block text-base font-bold text-white mt-0.5">85.7%</span>
              <span className="block text-[10px] text-white/60">24/28 available</span>
            </div>

            <div className="rounded-xl border border-white/20 bg-black/50 p-2.5 backdrop-blur-sm shadow-lg">
              <span className="block text-[9px] uppercase font-mono tracking-wider text-amber-300 flex items-center gap-1">
                <Trophy className="size-3" /> League Pos
              </span>
              <span className="block text-base font-bold text-white mt-0.5">#2</span>
              <span className="block text-[10px] text-white/60">14 wins · +24 GD</span>
            </div>

            <div className="rounded-xl border border-white/20 bg-black/50 p-2.5 backdrop-blur-sm shadow-lg">
              <span className="block text-[9px] uppercase font-mono tracking-wider text-cyan-300 flex items-center gap-1">
                <Activity className="size-3" /> Next Match
              </span>
              <span className="block text-base font-bold text-white mt-0.5">Sat 15:00</span>
              <span className="block text-[10px] text-white/60">vs Lakeside (H)</span>
            </div>
          </div>
        </div>
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#060c13] via-[#060c13]/30 to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-4 flex items-center gap-2 z-10">
            <div className="flex size-7 items-center justify-center rounded-md bg-[#0fa05c] text-white shadow">
              <ShieldCheck className="size-4" />
            </div>
            <span className="font-bold text-white text-base drop-shadow">Pitchbook FC</span>
            <span className="text-[10px] text-[#0fa05c] font-semibold uppercase px-2 py-0.5 rounded bg-black/60 border border-[#0fa05c]/40">
              Live
            </span>
          </div>
        </div>

        {/* Form Container */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-sm space-y-5">
            <div className="space-y-1.5 text-center lg:text-left">
              <h1 className="text-2xl font-bold tracking-tight text-white">Sign In to Club Workspace</h1>
              <p className="text-xs text-slate-400">
                Explore the complete enterprise platform instantly in demo mode
              </p>
            </div>

            {/* ONE-CLICK INSTANT DEMO BUTTON */}
            <button
              type="button"
              onClick={handleContinueDemo}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-[#0fa05c] to-emerald-600 hover:brightness-110 text-white font-extrabold py-3.5 px-4 text-sm shadow-xl shadow-[#0fa05c]/30 border border-emerald-400/40 transition-all cursor-pointer group disabled:opacity-50"
            >
              <Zap className="size-4.5 text-emerald-200 fill-emerald-200 group-hover:scale-110 transition-transform" />
              <span>Continue in Demo Mode</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center py-1">
              <div className="w-full border-t border-white/10" />
              <span className="bg-[#060c13] px-2 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                or sign in with role credentials
              </span>
            </div>

            {/* Demo Quick-Select Grid */}
            <div className="rounded-xl border border-white/10 bg-[#0d141e]/90 p-3.5 backdrop-blur-sm shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-slate-300">
                  Select Demo Role
                </p>
                <span className="text-[10px] text-slate-400 font-mono">1-click select</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => handleSelectDemo(acc)}
                    className={`rounded-lg border px-2.5 py-1.5 text-left text-xs transition-all cursor-pointer ${
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
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1">
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

              <div className="space-y-1">
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
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#0fa05c] hover:bg-[#0fa05c]/90 text-white font-semibold py-2.5 px-4 text-sm shadow-lg shadow-[#0fa05c]/25 transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>Opening Workspace...</span>
                ) : (
                  <>
                    <span>Enter Club Workspace</span>
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-slate-400">
              Need assistance?{" "}
              <Link href="/welcome" className="font-semibold text-[#0fa05c] hover:underline">
                Explore Documentation
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
