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
  Menu,
  X,
  Plus,
  AlertTriangle,
  Clock,
  LogOut,
  Activity,
  CheckCircle2,
  Search,
  Filter,
  ArrowUpRight,
  UserCheck,
  FileText,
  DollarSign,
  ChevronRight,
  Sparkles,
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
  wage: string;
}

const SQUAD_PLAYERS: Player[] = [
  { id: "1", name: "Mateo Vargas", number: 9, position: "Striker", age: 24, status: "AVAILABLE", rating: 8.4, goals: 9, contractUntil: "2028", wage: "£14,500/w" },
  { id: "2", name: "Lucas Silva", number: 10, position: "Attacking Mid", age: 26, status: "AVAILABLE", rating: 8.1, goals: 5, contractUntil: "2027", wage: "£16,000/w" },
  { id: "3", name: "David Brennan", number: 4, position: "Center Back", age: 28, status: "AVAILABLE", rating: 7.8, goals: 1, contractUntil: "2027", wage: "£11,000/w" },
  { id: "4", name: "Kofi Mensah", number: 7, position: "Right Winger", age: 22, status: "AVAILABLE", rating: 7.9, goals: 4, contractUntil: "2029", wage: "£9,500/w" },
  { id: "5", name: "Julian Rossi", number: 1, position: "Goalkeeper", age: 30, status: "AVAILABLE", rating: 7.6, goals: 0, contractUntil: "2026", wage: "£12,000/w" },
  { id: "6", name: "Liam O'Connor", number: 8, position: "Central Mid", age: 25, status: "REHAB", rating: 7.5, goals: 2, contractUntil: "2028", wage: "£10,000/w" },
  { id: "7", name: "Henrik Lindqvist", number: 3, position: "Left Back", age: 23, status: "REHAB", rating: 7.4, goals: 0, contractUntil: "2027", wage: "£8,000/w" },
  { id: "8", name: "Carlos Ramos", number: 5, position: "Defensive Mid", age: 27, status: "AVAILABLE", rating: 7.7, goals: 1, contractUntil: "2027", wage: "£13,000/w" },
  { id: "9", name: "Amir Khan", number: 11, position: "Left Winger", age: 21, status: "AVAILABLE", rating: 7.6, goals: 3, contractUntil: "2029", wage: "£7,500/w" },
  { id: "10", name: "Samuel Eto'o Jr", number: 19, position: "Striker", age: 19, status: "AVAILABLE", rating: 7.2, goals: 2, contractUntil: "2028", wage: "£4,000/w" },
  { id: "11", name: "Nathan Walker", number: 2, position: "Right Back", age: 26, status: "AVAILABLE", rating: 7.5, goals: 0, contractUntil: "2026", wage: "£9,000/w" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const availableCount = SQUAD_PLAYERS.filter((p) => p.status === "AVAILABLE").length;
  const rehabCount = SQUAD_PLAYERS.filter((p) => p.status === "REHAB").length;

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSidebarOpen(false); // Auto close sidebar on mobile when clicked
  };

  return (
    <div className="min-h-screen bg-[#060c13] text-[#eaeff5] flex flex-col">
      {/* Top Navigation Bar */}
      <header className="h-16 border-b border-white/10 bg-[#0a111a]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 text-slate-300 transition"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X className="size-5 text-white" /> : <Menu className="size-5 text-white" />}
          </button>

          <Link href="/welcome" className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#0fa05c] text-white shadow-md shadow-[#0fa05c]/30">
              <ShieldCheck className="size-4.5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white">Pitchbook</span>
              <span className="hidden xs:inline text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-[#0fa05c]/20 text-[#0fa05c] border border-[#0fa05c]/30">
                Riverside FC
              </span>
            </div>
          </Link>
        </div>

        {/* Quick Info & Role Switcher / Sign out */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 bg-[#121b27] border border-white/10 px-3 py-1.5 rounded-lg text-xs">
            <span className="size-2 rounded-full bg-[#0fa05c] animate-pulse" />
            <span className="text-slate-300">Next: <strong className="text-white">vs Lakeside United</strong></span>
            <span className="text-slate-400">· Sat 15:00 Home</span>
          </div>

          <Link
            href="/login"
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/10 transition"
          >
            <LogOut className="size-3.5 text-slate-400" />
            <span>Switch Role</span>
          </Link>
        </div>
      </header>

      {/* Main Body Layout */}
      <div className="flex flex-1 relative overflow-hidden">
        {/* Mobile Backdrop Overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/70 z-20 md:hidden backdrop-blur-sm"
          />
        )}

        {/* Sidebar Navigation */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:static inset-y-16 md:inset-auto left-0 z-30 w-64 border-r border-white/10 bg-[#090f18] transition-transform duration-200 ease-in-out flex flex-col justify-between shrink-0 shadow-2xl md:shadow-none`}
        >
          <div className="p-3 space-y-1 overflow-y-auto">
            <div className="px-3 py-2 text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Club Management
            </div>

            {[
              { id: "overview", label: "Executive Overview", icon: Activity },
              { id: "squad", label: "Squad & Lineup", icon: Users, badge: `${availableCount} fit` },
              { id: "medical", label: "Medical & Rehab", icon: HeartPulse, badge: `${rehabCount} in rehab`, badgeColor: "text-amber-400 bg-amber-400/15 border-amber-400/30" },
              { id: "scouting", label: "Scouting Pipeline", icon: Binoculars, badge: "5 trials" },
              { id: "matches", label: "Matches & Tactics", icon: Trophy },
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
                  type="button"
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    isActive
                      ? "bg-[#0fa05c] text-white font-semibold shadow-md shadow-[#0fa05c]/20"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="size-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full border ${
                        isActive
                          ? "bg-black/25 text-white border-transparent"
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

          <div className="p-4 border-t border-white/10 text-xs text-slate-400">
            <p className="font-semibold text-white">Riverside FC</p>
            <p className="text-[11px] text-slate-400">Pitchbook Professional OS • 2026</p>
          </div>
        </aside>

        {/* Content Area — Dynamically switched based on activeTab */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto min-w-0 space-y-6">
          {/* TAB 1: EXECUTIVE OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Header Title */}
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Executive Club Overview</h1>
                <p className="text-xs text-slate-400 mt-1">Real-time squad readiness, league performance, and operational status</p>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-4">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider">Squad Available</span>
                    <Users className="size-4 text-[#0fa05c]" />
                  </div>
                  <p className="text-2xl font-bold text-white">{availableCount}/{SQUAD_PLAYERS.length}</p>
                  <p className="text-[11px] text-[#0fa05c] mt-1 flex items-center gap-1">
                    <CheckCircle2 className="size-3" />
                    <span>81.8% Match Fit</span>
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
                    <span>L. O&apos;Connor testing Fri</span>
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-4">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider">Scouting Pipeline</span>
                    <Binoculars className="size-4 text-[#0fa05c]" />
                  </div>
                  <p className="text-2xl font-bold text-white">34 Prospects</p>
                  <p className="text-[11px] text-slate-400 mt-1">5 in active 1st-team trial</p>
                </div>
              </div>

              {/* Next Fixture Banner */}
              <div className="rounded-xl border border-white/10 bg-gradient-to-r from-[#0d1726] to-[#0f1f1d] p-5">
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

                  <button
                    onClick={() => handleTabChange("squad")}
                    className="rounded-lg bg-[#0fa05c] hover:bg-[#0fa05c]/90 text-white text-xs font-semibold px-4 py-2.5 shadow transition"
                  >
                    View Starting Lineup →
                  </button>
                </div>
              </div>

              {/* Squad Preview */}
              <div className="rounded-xl border border-white/10 bg-[#0d141e] overflow-hidden">
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Active Squad Availability
                    </h3>
                    <p className="text-xs text-slate-400">First-team ratings, status, and season stats</p>
                  </div>
                  <button
                    onClick={() => handleTabChange("squad")}
                    className="text-xs text-[#0fa05c] hover:underline font-semibold"
                  >
                    Open Full Squad Manager →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#121b27] text-slate-400 border-b border-white/5 uppercase font-mono text-[10px]">
                      <tr>
                        <th className="p-3">#</th>
                        <th className="p-3">Player</th>
                        <th className="p-3">Position</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Rating</th>
                        <th className="p-3">Goals</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {SQUAD_PLAYERS.slice(0, 5).map((p) => (
                        <tr key={p.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-3 font-mono font-bold text-slate-400">{p.number}</td>
                          <td className="p-3 font-semibold text-white">{p.name}</td>
                          <td className="p-3 text-slate-300">{p.position}</td>
                          <td className="p-3">
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#0fa05c]/15 text-[#0fa05c] border border-[#0fa05c]/30 px-2 py-0.5 text-[10px] font-semibold">
                              Available
                            </span>
                          </td>
                          <td className="p-3 font-mono text-[#0fa05c] font-semibold">{p.rating}</td>
                          <td className="p-3 font-mono font-bold text-white">{p.goals}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SQUAD & LINEUP */}
          {activeTab === "squad" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Squad Management & Match Lineup</h1>
                  <p className="text-xs text-slate-400 mt-1">4-3-3 formation against Lakeside United with player contracts</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-[#0fa05c]/15 text-[#0fa05c] border border-[#0fa05c]/30 px-3 py-1.5 rounded-lg font-semibold">
                    Formation: 4-3-3 Attacking
                  </span>
                </div>
              </div>

              {/* Tactical Pitch Board */}
              <div className="rounded-xl border border-white/10 bg-[#0b1b14] p-6 relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 opacity-15 pointer-events-none border-2 border-white/40 m-4 rounded-lg flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-2 border-white/40" />
                  <div className="absolute top-0 w-48 h-20 border-2 border-white/40 border-t-0" />
                  <div className="absolute bottom-0 w-48 h-20 border-2 border-white/40 border-b-0" />
                </div>

                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0fa05c] mb-6 flex items-center gap-1.5">
                  <Trophy className="size-4" />
                  Starting XI (Tactical Matchboard)
                </h3>

                {/* Pitch Player Positions */}
                <div className="grid grid-rows-4 gap-6 relative z-10 text-center max-w-xl mx-auto">
                  {/* Attackers */}
                  <div className="flex justify-around">
                    <div className="bg-[#0d141e]/90 border border-[#0fa05c] rounded-lg p-2 shadow-lg w-28">
                      <span className="block text-[10px] text-[#0fa05c] font-bold">LW · #11</span>
                      <span className="block text-xs font-bold text-white truncate">A. Khan</span>
                    </div>
                    <div className="bg-[#0d141e]/90 border border-[#0fa05c] rounded-lg p-2 shadow-lg w-28 scale-105 ring-2 ring-[#0fa05c]/40">
                      <span className="block text-[10px] text-[#0fa05c] font-bold">ST · #9</span>
                      <span className="block text-xs font-bold text-white truncate">M. Vargas</span>
                      <span className="block text-[9px] text-amber-400">9 Goals</span>
                    </div>
                    <div className="bg-[#0d141e]/90 border border-[#0fa05c] rounded-lg p-2 shadow-lg w-28">
                      <span className="block text-[10px] text-[#0fa05c] font-bold">RW · #7</span>
                      <span className="block text-xs font-bold text-white truncate">K. Mensah</span>
                    </div>
                  </div>

                  {/* Midfielders */}
                  <div className="flex justify-around">
                    <div className="bg-[#0d141e]/90 border border-white/20 rounded-lg p-2 shadow w-28">
                      <span className="block text-[10px] text-slate-400 font-bold">CAM · #10</span>
                      <span className="block text-xs font-bold text-white truncate">L. Silva</span>
                    </div>
                    <div className="bg-[#0d141e]/90 border border-white/20 rounded-lg p-2 shadow w-28">
                      <span className="block text-[10px] text-slate-400 font-bold">CDM · #5</span>
                      <span className="block text-xs font-bold text-white truncate">C. Ramos</span>
                    </div>
                  </div>

                  {/* Defenders */}
                  <div className="flex justify-around">
                    <div className="bg-[#0d141e]/90 border border-white/20 rounded-lg p-2 shadow w-28">
                      <span className="block text-[10px] text-slate-400 font-bold">LB · #3</span>
                      <span className="block text-xs font-bold text-white truncate">Lindqvist</span>
                    </div>
                    <div className="bg-[#0d141e]/90 border border-white/20 rounded-lg p-2 shadow w-28">
                      <span className="block text-[10px] text-slate-400 font-bold">CB · #4</span>
                      <span className="block text-xs font-bold text-white truncate">D. Brennan</span>
                    </div>
                    <div className="bg-[#0d141e]/90 border border-white/20 rounded-lg p-2 shadow w-28">
                      <span className="block text-[10px] text-slate-400 font-bold">RB · #2</span>
                      <span className="block text-xs font-bold text-white truncate">N. Walker</span>
                    </div>
                  </div>

                  {/* Goalkeeper */}
                  <div className="flex justify-center">
                    <div className="bg-[#0d141e]/90 border border-amber-400/50 rounded-lg p-2 shadow-lg w-28">
                      <span className="block text-[10px] text-amber-400 font-bold">GK · #1</span>
                      <span className="block text-xs font-bold text-white truncate">J. Rossi</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Squad List Table */}
              <div className="rounded-xl border border-white/10 bg-[#0d141e] overflow-hidden">
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">All First Team Squad ({SQUAD_PLAYERS.length})</h3>
                  <span className="text-xs text-slate-400">Sorted by Squad Number</span>
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
                        <th className="p-3">Rating</th>
                        <th className="p-3">Weekly Wage</th>
                        <th className="p-3">Contract Expiry</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {SQUAD_PLAYERS.map((p) => (
                        <tr key={p.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-3 font-mono font-bold text-slate-400">{p.number}</td>
                          <td className="p-3 font-semibold text-white">{p.name}</td>
                          <td className="p-3 text-slate-300">{p.position}</td>
                          <td className="p-3 text-slate-400">{p.age}</td>
                          <td className="p-3">
                            {p.status === "AVAILABLE" ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-[#0fa05c]/15 text-[#0fa05c] border border-[#0fa05c]/30 px-2 py-0.5 text-[10px] font-semibold">
                                Match Fit
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2 py-0.5 text-[10px] font-semibold">
                                Rehab
                              </span>
                            )}
                          </td>
                          <td className="p-3 font-mono text-[#0fa05c] font-semibold">{p.rating}</td>
                          <td className="p-3 font-mono text-slate-300">{p.wage}</td>
                          <td className="p-3 text-slate-400 font-mono">{p.contractUntil}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MEDICAL & REHAB */}
          {activeTab === "medical" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Medical Department & Injury Tracking</h1>
                <p className="text-xs text-slate-400 mt-1">Daily injury status, physiotherapy treatment logs, and return-to-play clearances</p>
              </div>

              {/* Active Rehab Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-amber-500/20 bg-[#161d28] p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                        Grade II Hamstring
                      </span>
                      <h3 className="text-base font-bold text-white mt-2">Liam O&apos;Connor (#8 Central Mid)</h3>
                      <p className="text-xs text-slate-400 mt-1">Injured vs St. Marks · In Day 14 of 21</p>
                    </div>
                    <HeartPulse className="size-6 text-amber-400" />
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Rehabilitation Progress</span>
                      <span className="font-semibold text-amber-400">75% Complete</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: "75%" }} />
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                    <span>Target Clearance: <strong>Next Tuesday</strong></span>
                    <span className="text-[#0fa05c]">Cleared for Light Running</span>
                  </div>
                </div>

                <div className="rounded-xl border border-amber-500/20 bg-[#161d28] p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                        Lateral Ankle Sprain
                      </span>
                      <h3 className="text-base font-bold text-white mt-2">Henrik Lindqvist (#3 Left Back)</h3>
                      <p className="text-xs text-slate-400 mt-1">Training incident · In Day 8 of 14</p>
                    </div>
                    <HeartPulse className="size-6 text-amber-400" />
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Rehabilitation Progress</span>
                      <span className="font-semibold text-amber-400">55% Complete</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: "55%" }} />
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                    <span>Target Clearance: <strong>In 6 Days</strong></span>
                    <span className="text-amber-400">Gym Resistance Work</span>
                  </div>
                </div>
              </div>

              {/* Treatment Log Table */}
              <div className="rounded-xl border border-white/10 bg-[#0d141e] overflow-hidden">
                <div className="p-4 border-b border-white/10">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Medical Checkups & Logs</h3>
                </div>
                <div className="divide-y divide-white/5 text-xs">
                  {[
                    { date: "Today 09:30", player: "Liam O'Connor", test: "Ultrasound scan - Hamstring healing confirmed", doc: "Dr. Evans (Chief Physician)" },
                    { date: "Yesterday 14:00", player: "Henrik Lindqvist", test: "Proprioception & balance test passed", doc: "S. Miller (Head Physio)" },
                    { date: "16 Sep 10:15", player: "Mateo Vargas", test: "Routine post-match blood lactate recovery check", doc: "Dr. Evans" },
                  ].map((row, i) => (
                    <div key={i} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white/5">
                      <div>
                        <strong className="text-white">{row.player}</strong>
                        <span className="text-slate-400 ml-2">— {row.test}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 font-mono text-[11px]">
                        <span>{row.doc}</span>
                        <span>{row.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SCOUTING PIPELINE */}
          {activeTab === "scouting" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Scouting & Recruitment Pipeline</h1>
                  <p className="text-xs text-slate-400 mt-1">CRM-style prospect board from discovery to contract execution</p>
                </div>
                <button className="flex items-center gap-1.5 rounded-lg bg-[#0fa05c] hover:bg-[#0fa05c]/90 text-white text-xs font-semibold px-3 py-2 shadow">
                  <Plus className="size-3.5" />
                  <span>Add Prospect</span>
                </button>
              </div>

              {/* Kanban Board */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Column 1: Discovered */}
                <div className="rounded-xl border border-white/10 bg-[#0a111a] p-3 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Discovered</span>
                    <span className="text-[11px] rounded bg-white/10 px-2 py-0.5 font-mono text-slate-400">14</span>
                  </div>
                  <div className="rounded-lg border border-white/5 bg-[#121b27] p-3 space-y-1.5 hover:border-white/20 transition">
                    <span className="text-[10px] text-[#0fa05c] font-bold">CAM · Age 18</span>
                    <p className="text-xs font-bold text-white">Yannick N&apos;Diaye</p>
                    <p className="text-[11px] text-slate-400">Dakar Academy · Rating 8.2</p>
                    <p className="text-[10px] text-slate-500 font-mono">Est: £150,000</p>
                  </div>
                  <div className="rounded-lg border border-white/5 bg-[#121b27] p-3 space-y-1.5 hover:border-white/20 transition">
                    <span className="text-[10px] text-[#0fa05c] font-bold">CB · Age 20</span>
                    <p className="text-xs font-bold text-white">Lauri Virtanen</p>
                    <p className="text-[11px] text-slate-400">HJK Helsinki · Rating 7.9</p>
                    <p className="text-[10px] text-slate-500 font-mono">Est: £280,000</p>
                  </div>
                </div>

                {/* Column 2: Contacted / Watching */}
                <div className="rounded-xl border border-white/10 bg-[#0a111a] p-3 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Watching</span>
                    <span className="text-[11px] rounded bg-white/10 px-2 py-0.5 font-mono text-slate-400">8</span>
                  </div>
                  <div className="rounded-lg border border-white/5 bg-[#121b27] p-3 space-y-1.5 hover:border-white/20 transition">
                    <span className="text-[10px] text-[#0fa05c] font-bold">RW · Age 21</span>
                    <p className="text-xs font-bold text-white">Emil Berg</p>
                    <p className="text-[11px] text-slate-400">Malmö FF · Rating 8.5</p>
                    <span className="inline-block text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">Scout dispatched</span>
                  </div>
                </div>

                {/* Column 3: In Trial */}
                <div className="rounded-xl border border-white/10 bg-[#0a111a] p-3 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">In Trial</span>
                    <span className="text-[11px] rounded bg-amber-400/20 px-2 py-0.5 font-mono text-amber-300">5</span>
                  </div>
                  <div className="rounded-lg border border-amber-400/30 bg-[#141e2b] p-3 space-y-1.5 shadow-md">
                    <span className="text-[10px] text-amber-400 font-bold">ST · Age 19</span>
                    <p className="text-xs font-bold text-white">Samuel Eto&apos;o Jr</p>
                    <p className="text-[11px] text-slate-300">Scored 2 in U21 match</p>
                    <span className="inline-block text-[9px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-semibold">Sign Recommended</span>
                  </div>
                </div>

                {/* Column 4: Signed */}
                <div className="rounded-xl border border-white/10 bg-[#0a111a] p-3 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-xs font-bold text-[#0fa05c] uppercase tracking-wider">Signed (2026)</span>
                    <span className="text-[11px] rounded bg-[#0fa05c]/20 px-2 py-0.5 font-mono text-[#0fa05c]">7</span>
                  </div>
                  <div className="rounded-lg border border-[#0fa05c]/30 bg-[#0f2119] p-3 space-y-1.5">
                    <span className="text-[10px] text-[#0fa05c] font-bold">LW · #11</span>
                    <p className="text-xs font-bold text-white">Amir Khan</p>
                    <p className="text-[11px] text-slate-300">Signed 4-year contract</p>
                    <p className="text-[10px] text-slate-400 font-mono">Fee: £450,000</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: MATCHES & PERFORMANCE */}
          {activeTab === "matches" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Matches & League Standings</h1>
                <p className="text-xs text-slate-400 mt-1">Season results, expected goals (xG), and division table</p>
              </div>

              {/* League Table Card */}
              <div className="rounded-xl border border-white/10 bg-[#0d141e] overflow-hidden">
                <div className="p-4 border-b border-white/10">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Premier Division Standings</h3>
                </div>
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#121b27] text-slate-400 border-b border-white/5 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="p-3">Pos</th>
                      <th className="p-3">Club</th>
                      <th className="p-3">Played</th>
                      <th className="p-3">W</th>
                      <th className="p-3">D</th>
                      <th className="p-3">L</th>
                      <th className="p-3">GD</th>
                      <th className="p-3">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr className="hover:bg-white/5">
                      <td className="p-3 font-bold text-slate-400">1</td>
                      <td className="p-3 font-semibold text-white">Highland City FC</td>
                      <td className="p-3 font-mono">22</td>
                      <td className="p-3 font-mono">16</td>
                      <td className="p-3 font-mono">4</td>
                      <td className="p-3 font-mono">2</td>
                      <td className="p-3 font-mono text-[#0fa05c]">+28</td>
                      <td className="p-3 font-mono font-bold text-white">52</td>
                    </tr>
                    <tr className="bg-[#0fa05c]/10 border-l-4 border-[#0fa05c]">
                      <td className="p-3 font-bold text-[#0fa05c]">2</td>
                      <td className="p-3 font-bold text-white flex items-center gap-1.5">
                        <span>Riverside FC</span>
                        <span className="text-[10px] bg-[#0fa05c]/30 text-[#0fa05c] px-1.5 py-0.2 rounded font-semibold">Your Club</span>
                      </td>
                      <td className="p-3 font-mono">21</td>
                      <td className="p-3 font-mono">14</td>
                      <td className="p-3 font-mono">5</td>
                      <td className="p-3 font-mono">2</td>
                      <td className="p-3 font-mono text-[#0fa05c]">+24</td>
                      <td className="p-3 font-mono font-bold text-white">47</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="p-3 font-bold text-slate-400">3</td>
                      <td className="p-3 font-semibold text-white">Lakeside United</td>
                      <td className="p-3 font-mono">22</td>
                      <td className="p-3 font-mono">13</td>
                      <td className="p-3 font-mono">4</td>
                      <td className="p-3 font-mono">5</td>
                      <td className="p-3 font-mono text-[#0fa05c]">+18</td>
                      <td className="p-3 font-mono font-bold text-white">43</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: TRAINING WORKLOAD */}
          {activeTab === "training" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Training Workload & Attendance</h1>
                <p className="text-xs text-slate-400 mt-1">GPS high-speed running meters, session workload, and wellness ratings</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-4">
                  <p className="text-xs text-slate-400 uppercase font-bold">Attendance Average</p>
                  <p className="text-3xl font-bold text-white mt-1">94.2%</p>
                  <p className="text-xs text-[#0fa05c] mt-1">+2.4% vs last month</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-4">
                  <p className="text-xs text-slate-400 uppercase font-bold">High Speed Running (Avg)</p>
                  <p className="text-3xl font-bold text-white mt-1">784 m</p>
                  <p className="text-xs text-slate-400 mt-1">Optimal match intensity load</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-4">
                  <p className="text-xs text-slate-400 uppercase font-bold">Squad Wellness Score</p>
                  <p className="text-3xl font-bold text-[#0fa05c] mt-1">8.8 / 10</p>
                  <p className="text-xs text-slate-400 mt-1">Sleep, soreness & hydration survey</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: YOUTH ACADEMY */}
          {activeTab === "academy" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Youth Academy Development</h1>
                <p className="text-xs text-slate-400 mt-1">Age groups (U21, U18, U16), developmental goals, and 1st-team progression</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-5">
                  <span className="text-[10px] uppercase font-bold text-[#0fa05c] bg-[#0fa05c]/15 px-2 py-0.5 rounded">U21 Squad</span>
                  <h3 className="text-base font-bold text-white mt-2">18 Players Active</h3>
                  <p className="text-xs text-slate-400 mt-1">3 Players training with senior squad</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-5">
                  <span className="text-[10px] uppercase font-bold text-[#0fa05c] bg-[#0fa05c]/15 px-2 py-0.5 rounded">U18 Squad</span>
                  <h3 className="text-base font-bold text-white mt-2">22 Players Active</h3>
                  <p className="text-xs text-slate-400 mt-1">FA Youth Cup Semifinalists</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-5">
                  <span className="text-[10px] uppercase font-bold text-[#0fa05c] bg-[#0fa05c]/15 px-2 py-0.5 rounded">U16 Squad</span>
                  <h3 className="text-base font-bold text-white mt-2">24 Players Active</h3>
                  <p className="text-xs text-slate-400 mt-1">Technical skills development cycle</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: FINANCE & CONTRACTS */}
          {activeTab === "finance" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Club Finances & Player Contracts</h1>
                <p className="text-xs text-slate-400 mt-1">Payroll breakdown, transfer budget, and contract expiry notifications</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-4">
                  <p className="text-xs text-slate-400 uppercase font-bold">Annual Wage Bill</p>
                  <p className="text-2xl font-bold text-white mt-1">£5.42M</p>
                  <p className="text-xs text-slate-400 mt-1">54% of club revenue (Healthy)</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-4">
                  <p className="text-xs text-slate-400 uppercase font-bold">Remaining Transfer Budget</p>
                  <p className="text-2xl font-bold text-[#0fa05c] mt-1">£1.85M</p>
                  <p className="text-xs text-slate-400 mt-1">Winter window allocation</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-4">
                  <p className="text-xs text-slate-400 uppercase font-bold">Contracts Expiring in 2026</p>
                  <p className="text-2xl font-bold text-amber-400 mt-1">2 Players</p>
                  <p className="text-xs text-amber-400 mt-1">J. Rossi & N. Walker</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: CLUB SCHEDULE */}
          {activeTab === "calendar" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Club Calendar & Operations Schedule</h1>
                <p className="text-xs text-slate-400 mt-1">Integrated match fixtures, training blocks, and medical assessments</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0d141e] p-4 space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="size-5 text-[#0fa05c]" />
                    <div>
                      <strong className="text-white text-xs">Tomorrow · 10:00</strong>
                      <p className="text-[11px] text-slate-400">Pre-Match Tactical Preparation & Set Piece Drills</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">First Team</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-[#0fa05c]/10 border border-[#0fa05c]/20">
                  <div className="flex items-center gap-3">
                    <Trophy className="size-5 text-[#0fa05c]" />
                    <div>
                      <strong className="text-white text-xs">Saturday · 15:00</strong>
                      <p className="text-[11px] text-slate-300">Matchday 22: Riverside FC vs Lakeside United (Riverside Stadium)</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#0fa05c] text-white">Matchday</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <HeartPulse className="size-5 text-amber-400" />
                    <div>
                      <strong className="text-white text-xs">Sunday · 11:00</strong>
                      <p className="text-[11px] text-slate-400">Post-match Recovery Sessions & Physio Assessments</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/10 text-slate-300">Medical Center</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
