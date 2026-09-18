"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Users,
  Trophy,
  HeartPulse,
  TrendingUp,
  Binoculars,
  CalendarDays,
  Wallet,
  GraduationCap,
  Settings,
  Menu,
  X,
  Plus,
  AlertTriangle,
  Clock,
  LogOut,
  ChevronRight,
  Activity,
  CheckCircle2,
} from "lucide-react";

interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  age: number;
  status: "AVAILABLE" | "REHAB" | "SUSPENDED";
  rating: number;
  goals: number;
  contractUntil: string;
}

const PLAYERS: Player[] = [
  { id: "1", name: "Mateo Vargas", number: 9, position: "Striker", age: 24, status: "AVAILABLE", rating: 8.4, goals: 9, contractUntil: "2028" },
  { id: "2", name: "Lucas Silva", number: 10, position: "Attacking Mid", age: 26, status: "AVAILABLE", rating: 8.1, goals: 5, contractUntil: "2027" },
  { id: "3", name: "David Brennan", number: 4, position: "Center Back", age: 28, status: "AVAILABLE", rating: 7.8, goals: 1, contractUntil: "2027" },
  { id: "4", name: "Kofi Mensah", number: 7, position: "Right Winger", age: 22, status: "AVAILABLE", rating: 7.9, goals: 4, contractUntil: "2029" },
  { id: "5", name: "Julian Rossi", number: 1, position: "Goalkeeper", age: 30, status: "AVAILABLE", rating: 7.6, goals: 0, contractUntil: "2026" },
  { id: "6", name: "Liam O'Connor", number: 8, position: "Central Mid", age: 25, status: "REHAB", rating: 7.5, goals: 2, contractUntil: "2028" },
  { id: "7", name: "Henrik Lindqvist", number: 3, position: "Left Back", age: 23, status: "REHAB", rating: 7.4, goals: 0, contractUntil: "2027" },
  { id: "8", name: "Carlos Ramos", number: 5, position: "Defensive Mid", age: 27, status: "AVAILABLE", rating: 7.7, goals: 1, contractUntil: "2027" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const availableCount = PLAYERS.filter((p) => p.status === "AVAILABLE").length;
  const rehabCount = PLAYERS.filter((p) => p.status === "REHAB").length;

  return (
    <div className="min-h-screen bg-[#060c13] text-[#eaeff5] flex flex-col">
      {/* Header Bar */}
      <header className="h-16 border-b border-white/10 bg-[#0a111a]/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 text-slate-400"
          >
            {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <Link href="/welcome" className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#0fa05c] text-white shadow">
              <ShieldCheck className="size-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight text-white">Pitchbook</span>
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-[#0fa05c]/20 text-[#0fa05c] border border-[#0fa05c]/30">
                  Riverside FC
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Info & User Profile */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-[#121b27] border border-white/5 px-3 py-1.5 rounded-lg text-xs">
            <span className="size-2 rounded-full bg-[#0fa05c] animate-pulse" />
            <span className="text-slate-300">Next: <strong className="text-white">vs Lakeside United</strong></span>
            <span className="text-slate-500">| Sat 15:00</span>
          </div>

          <Link
            href="/login"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg border border-white/5 hover:bg-white/5 transition"
          >
            <LogOut className="size-3.5" />
            <span className="hidden sm:inline">Sign out</span>
          </Link>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:static inset-y-16 md:inset-auto left-0 z-20 w-64 border-r border-white/10 bg-[#090f18] transition-transform duration-200 ease-in-out flex flex-col justify-between shrink-0`}
        >
          <div className="p-3 space-y-1">
            <div className="px-3 py-2 text-[10px] uppercase font-bold tracking-wider text-slate-500">
              Club Operations
            </div>

            {[
              { id: "overview", label: "Executive Overview", icon: Activity },
              { id: "squad", label: "Squad & Lineup", icon: Users, badge: `${availableCount} fit` },
              { id: "medical", label: "Medical & Rehab", icon: HeartPulse, badge: `${rehabCount} in rehab`, badgeColor: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
              { id: "scouting", label: "Scouting Pipeline", icon: Binoculars, badge: "5 trials" },
              { id: "matches", label: "Matches & Performance", icon: Trophy },
              { id: "training", label: "Training Workload", icon: TrendingUp },
              { id: "academy", label: "Youth Academy", icon: GraduationCap },
              { id: "finance", label: "Finance & Contracts", icon: Wallet },
              { id: "calendar", label: "Club Schedule", icon: CalendarDays },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                    isActive
                      ? "bg-[#0fa05c] text-white font-semibold shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="size-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full border ${
                        isActive
                          ? "bg-black/20 text-white border-transparent"
                          : item.badgeColor || "bg-white/5 text-slate-400 border-white/10"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-4 border-t border-white/10 text-xs text-slate-500">
            <p className="font-semibold text-slate-300">Pitchbook Cloud</p>
            <p className="text-[11px]">Riverside FC • 2026/27</p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto min-w-0 space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="rounded-xl border border-white/10 bg-[#0d141e] p-4">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider">Squad Available</span>
                <Users className="size-4 text-[#0fa05c]" />
              </div>
              <p className="text-2xl font-bold text-white">{availableCount}/{PLAYERS.length}</p>
              <p className="text-[11px] text-[#0fa05c] mt-1 flex items-center gap-1">
                <CheckCircle2 className="size-3" />
                <span>85.7% Match Fit</span>
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0d141e] p-4">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider">League Form</span>
                <Trophy className="size-4 text-amber-400" />
              </div>
              <p className="text-2xl font-bold text-white">14 Wins</p>
              <p className="text-[11px] text-slate-400 mt-1">62% Win Rate · 2nd Place</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0d141e] p-4">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider">Medical Center</span>
                <HeartPulse className="size-4 text-rose-400" />
              </div>
              <p className="text-2xl font-bold text-white">{rehabCount} in Rehab</p>
              <p className="text-[11px] text-amber-400 mt-1 flex items-center gap-1">
                <AlertTriangle className="size-3" />
                <span>1 Due for fitness test</span>
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0d141e] p-4">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider">Recruitment Board</span>
                <Binoculars className="size-4 text-[#0fa05c]" />
              </div>
              <p className="text-2xl font-bold text-white">34 Prospects</p>
              <p className="text-[11px] text-slate-400 mt-1">5 in active 1st-team trial</p>
            </div>
          </div>

          {/* Next Fixture & Performance Bar */}
          <div className="rounded-xl border border-white/10 bg-gradient-to-r from-[#0d1726] to-[#0f1d1f] p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="rounded-full bg-[#0fa05c]/20 text-[#0fa05c] border border-[#0fa05c]/30 px-2.5 py-0.5 text-xs font-semibold uppercase">
                  Upcoming Match
                </span>
                <h2 className="text-xl font-bold text-white mt-2">
                  Riverside FC vs Lakeside United
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Premier Division Matchday 22 • Riverside Stadium (Home) • Saturday 15:00
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("squad")}
                  className="rounded-lg bg-[#0fa05c] hover:bg-[#0fa05c]/90 text-white text-xs font-semibold px-4 py-2 shadow"
                >
                  Set Starting XI
                </button>
              </div>
            </div>
          </div>

          {/* Active Squad Roster Table */}
          <div className="rounded-xl border border-white/10 bg-[#0d141e] overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  First Team Squad Roster
                </h3>
                <p className="text-xs text-slate-400">Live availability, rating and contract status</p>
              </div>
              <span className="text-xs text-slate-400 font-mono">28 Players Active</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#121b27] text-slate-400 border-b border-white/5 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Player</th>
                    <th className="p-3">Position</th>
                    <th className="p-3">Age</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Goals</th>
                    <th className="p-3">Rating</th>
                    <th className="p-3">Contract</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {PLAYERS.map((p) => (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3 font-mono font-bold text-slate-400">{p.number}</td>
                      <td className="p-3 font-semibold text-white">{p.name}</td>
                      <td className="p-3 text-slate-300">{p.position}</td>
                      <td className="p-3 text-slate-400">{p.age}</td>
                      <td className="p-3">
                        {p.status === "AVAILABLE" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#0fa05c]/15 text-[#0fa05c] border border-[#0fa05c]/30 px-2 py-0.5 text-[10px] font-semibold">
                            Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2 py-0.5 text-[10px] font-semibold">
                            In Rehab
                          </span>
                        )}
                      </td>
                      <td className="p-3 font-mono font-bold text-white">{p.goals}</td>
                      <td className="p-3 font-mono text-[#0fa05c] font-semibold">{p.rating}</td>
                      <td className="p-3 text-slate-400 font-mono">{p.contractUntil}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
