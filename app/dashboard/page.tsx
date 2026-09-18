"use client";

import React, { useState, useMemo } from "react";
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
  FileText,
  DollarSign,
  ChevronRight,
  Sparkles,
  Zap,
  Sliders,
  Printer,
  ChevronDown,
  RefreshCw,
  Info,
  Shield,
  Target,
  BarChart3,
  Percent,
} from "lucide-react";

type Formation = "4-3-3" | "4-2-3-1" | "3-5-2" | "4-4-2";

interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  role: string;
  age: number;
  status: "AVAILABLE" | "REHAB" | "SUSPENDED";
  fitness: number; // 0-100%
  rating: number; // 1-10
  goals: number;
  assists: number;
  marketValue: string;
  wage: string;
  contractUntil: string;
  acwr: number; // Acute:Chronic Workload Ratio (0.8 - 1.3 is sweet spot, >1.5 is high injury risk)
  avatar: string;
}

const INITIAL_STARTERS: Player[] = [
  { id: "1", name: "Julian Rossi", number: 1, position: "GK", role: "Sweeper Keeper", age: 30, status: "AVAILABLE", fitness: 98, rating: 7.6, goals: 0, assists: 0, marketValue: "£3.8M", wage: "£12,000/w", contractUntil: "2026", acwr: 1.02, avatar: "JR" },
  { id: "2", name: "Nathan Walker", number: 2, position: "RB", role: "Inverted Wingback", age: 26, status: "AVAILABLE", fitness: 91, rating: 7.5, goals: 0, assists: 3, marketValue: "£5.2M", wage: "£9,000/w", contractUntil: "2026", acwr: 1.15, avatar: "NW" },
  { id: "3", name: "David Brennan", number: 4, position: "CB", role: "Ball-Playing Defender (C)", age: 28, status: "AVAILABLE", fitness: 96, rating: 7.8, goals: 1, assists: 0, marketValue: "£8.5M", wage: "£11,000/w", contractUntil: "2027", acwr: 0.98, avatar: "DB" },
  { id: "4", name: "Gabriel Souza", number: 6, position: "CB", role: "Covering Stopper", age: 25, status: "AVAILABLE", fitness: 94, rating: 7.7, goals: 0, assists: 0, marketValue: "£7.0M", wage: "£10,500/w", contractUntil: "2028", acwr: 1.05, avatar: "GS" },
  { id: "5", name: "Henrik Lindqvist", number: 3, position: "LB", role: "Attacking Fullback", age: 23, status: "REHAB", fitness: 55, rating: 7.4, goals: 0, assists: 2, marketValue: "£4.5M", wage: "£8,000/w", contractUntil: "2027", acwr: 1.48, avatar: "HL" },
  { id: "6", name: "Carlos Ramos", number: 5, position: "CDM", role: "Deep Anchor", age: 27, status: "AVAILABLE", fitness: 92, rating: 7.7, goals: 1, assists: 2, marketValue: "£9.0M", wage: "£13,000/w", contractUntil: "2027", acwr: 1.12, avatar: "CR" },
  { id: "7", name: "Lucas Silva", number: 10, position: "CAM", role: "Advanced Playmaker", age: 26, status: "AVAILABLE", fitness: 95, rating: 8.1, goals: 5, assists: 7, marketValue: "£14.2M", wage: "£16,000/w", contractUntil: "2027", acwr: 1.08, avatar: "LS" },
  { id: "8", name: "Liam O'Connor", number: 8, position: "CM", role: "Box-to-Box Mid", age: 25, status: "REHAB", fitness: 75, rating: 7.5, goals: 2, assists: 3, marketValue: "£7.8M", wage: "£10,000/w", contractUntil: "2028", acwr: 1.55, avatar: "LO" },
  { id: "9", name: "Kofi Mensah", number: 7, position: "RW", role: "Inside Forward", age: 22, status: "AVAILABLE", fitness: 93, rating: 7.9, goals: 4, assists: 5, marketValue: "£11.0M", wage: "£9,500/w", contractUntil: "2029", acwr: 1.18, avatar: "KM" },
  { id: "10", name: "Mateo Vargas", number: 9, position: "ST", role: "Complete Forward", age: 24, status: "AVAILABLE", fitness: 97, rating: 8.4, goals: 9, assists: 4, marketValue: "£18.5M", wage: "£14,500/w", contractUntil: "2028", acwr: 1.05, avatar: "MV" },
  { id: "11", name: "Amir Khan", number: 11, position: "LW", role: "Direct Winger", age: 21, status: "AVAILABLE", fitness: 90, rating: 7.6, goals: 3, assists: 4, marketValue: "£6.8M", wage: "£7,500/w", contractUntil: "2029", acwr: 1.22, avatar: "AK" },
];

const INITIAL_BENCH: Player[] = [
  { id: "12", name: "Marco Vieri", number: 12, position: "GK", role: "Backup Keeper", age: 22, status: "AVAILABLE", fitness: 99, rating: 6.9, goals: 0, assists: 0, marketValue: "£1.2M", wage: "£4,000/w", contractUntil: "2027", acwr: 0.95, avatar: "MV" },
  { id: "13", name: "Samuel Eto'o Jr", number: 19, position: "ST", role: "Poacher / Target Man", age: 19, status: "AVAILABLE", fitness: 96, rating: 7.2, goals: 2, assists: 1, marketValue: "£3.5M", wage: "£4,500/w", contractUntil: "2028", acwr: 1.02, avatar: "SE" },
  { id: "14", name: "Tariq Lamptey", number: 14, position: "RB", role: "Attacking Wingback", age: 24, status: "AVAILABLE", fitness: 88, rating: 7.3, goals: 0, assists: 2, marketValue: "£4.2M", wage: "£6,500/w", contractUntil: "2027", acwr: 1.10, avatar: "TL" },
  { id: "15", name: "Viktor Jensen", number: 16, position: "CB", role: "Traditional Stopper", age: 27, status: "AVAILABLE", fitness: 92, rating: 7.1, goals: 1, assists: 0, marketValue: "£3.0M", wage: "£5,500/w", contractUntil: "2026", acwr: 0.99, avatar: "VJ" },
  { id: "16", name: "Matteo Guendouzi", number: 20, position: "CM", role: "Deep Regista", age: 23, status: "AVAILABLE", fitness: 94, rating: 7.4, goals: 1, assists: 2, marketValue: "£5.8M", wage: "£7,000/w", contractUntil: "2028", acwr: 1.05, avatar: "MG" },
  { id: "17", name: "Kenzo Tanaka", number: 22, position: "CAM", role: "Shadow Striker", age: 20, status: "AVAILABLE", fitness: 95, rating: 7.3, goals: 2, assists: 3, marketValue: "£4.0M", wage: "£5,000/w", contractUntil: "2029", acwr: 1.09, avatar: "KT" },
  { id: "18", name: "Ben Chilwell", number: 18, position: "LB", role: "Inverted Wingback", age: 27, status: "AVAILABLE", fitness: 89, rating: 7.2, goals: 0, assists: 1, marketValue: "£3.6M", wage: "£6,000/w", contractUntil: "2027", acwr: 1.14, avatar: "BC" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("squad");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formation, setFormation] = useState<Formation>("4-3-3");
  const [matchMinute, setMatchMinute] = useState(0);
  const [showTacticalHeatmap, setShowTacticalHeatmap] = useState(false);
  const [showDossierModal, setShowDossierModal] = useState(false);

  const [starters, setStarters] = useState<Player[]>(INITIAL_STARTERS);
  const [bench, setBench] = useState<Player[]>(INITIAL_BENCH);
  const [selectedPlayerToSwap, setSelectedPlayerToSwap] = useState<Player | null>(null);

  // Computed Squad Metrics
  const totalMarketValue = "£88.5M";
  const wageBillAnnual = "£5.42M";
  const psrMargin = "+£14.2M";
  const matchFitCount = starters.filter(p => p.status === "AVAILABLE").length;

  const handleSwap = (playerA: Player, playerB: Player) => {
    // If playerA is in starters and playerB is in bench
    const isAStarter = starters.some(p => p.id === playerA.id);
    const isBStarter = starters.some(p => p.id === playerB.id);

    if (isAStarter && !isBStarter) {
      setStarters(starters.map(p => p.id === playerA.id ? playerB : p));
      setBench(bench.map(p => p.id === playerB.id ? playerA : p));
    } else if (!isAStarter && isBStarter) {
      setBench(bench.map(p => p.id === playerA.id ? playerB : p));
      setStarters(starters.map(p => p.id === playerB.id ? playerA : p));
    } else if (isAStarter && isBStarter) {
      // Both in starters, just exchange positions
      setStarters(starters.map(p => {
        if (p.id === playerA.id) return playerB;
        if (p.id === playerB.id) return playerA;
        return p;
      }));
    }
    setSelectedPlayerToSwap(null);
  };

  return (
    <div className="min-h-screen bg-[#060c13] text-[#eaeff5] flex flex-col font-sans">
      {/* ENTERPRISE HEADER BAR */}
      <header className="h-16 border-b border-white/10 bg-[#0a111a]/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 text-slate-300 transition cursor-pointer"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X className="size-5 text-white" /> : <Menu className="size-5 text-white" />}
          </button>

          <Link href="/welcome" className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#0fa05c] text-white shadow-md shadow-[#0fa05c]/30">
              <ShieldCheck className="size-4.5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white">PITCHBOOK FC</span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#0fa05c]/20 text-[#0fa05c] border border-[#0fa05c]/40">
                PRO ENTERPRISE
              </span>
            </div>
          </Link>
        </div>

        {/* Live Match Countdown & PSR Compliance Gauge */}
        <div className="flex items-center gap-2.5">
          {/* PSR Financial Compliance Tag */}
          <div className="hidden lg:flex items-center gap-1.5 bg-[#0f2117] border border-[#0fa05c]/30 px-3 py-1.5 rounded-lg text-xs">
            <Shield className="size-3.5 text-[#0fa05c]" />
            <span className="text-slate-300">PSR Status:</span>
            <strong className="text-[#0fa05c] font-mono">{psrMargin} SAFE</strong>
          </div>

          {/* Next Fixture Countdown */}
          <div className="hidden sm:flex items-center gap-2 bg-[#121b27] border border-white/10 px-3 py-1.5 rounded-lg text-xs">
            <span className="size-2 rounded-full bg-[#0fa05c] animate-pulse" />
            <span className="text-slate-300">Matchday 22:</span>
            <strong className="text-white">vs Lakeside Utd</strong>
            <span className="text-slate-400 font-mono">Sat 15:00</span>
          </div>

          {/* Export Tactical Dossier Button */}
          <button
            onClick={() => setShowDossierModal(true)}
            className="flex items-center gap-1.5 text-xs font-semibold bg-[#0fa05c] hover:bg-[#0fa05c]/90 text-white px-3 py-1.5 rounded-lg shadow-sm transition cursor-pointer"
          >
            <Printer className="size-3.5" />
            <span className="hidden sm:inline">Tactical Dossier (PDF)</span>
          </button>

          <Link
            href="/login"
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-white/10 hover:bg-white/10 transition"
          >
            <LogOut className="size-3.5 text-slate-400" />
            <span className="hidden md:inline">Role</span>
          </Link>
        </div>
      </header>

      {/* MAIN VIEWPORT */}
      <div className="flex flex-1 relative overflow-hidden">
        {/* Mobile Backdrop Overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/70 z-20 md:hidden backdrop-blur-sm"
          />
        )}

        {/* ENTERPRISE SIDEBAR NAVIGATION */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:static inset-y-16 md:inset-auto left-0 z-30 w-64 border-r border-white/10 bg-[#090f18] transition-transform duration-200 ease-in-out flex flex-col justify-between shrink-0 shadow-2xl md:shadow-none`}
        >
          <div className="p-3 space-y-1 overflow-y-auto">
            <div className="px-3 py-2 text-[10px] uppercase font-extrabold tracking-wider text-slate-400 flex items-center justify-between">
              <span>Club Departments</span>
              <span className="text-[9px] bg-white/10 px-1.5 py-0.2 rounded font-mono">1st Team</span>
            </div>

            {[
              { id: "squad", label: "Squad & 3D Pitchboard", icon: Users, badge: `${matchFitCount}/11 Fit`, badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30" },
              { id: "shadow", label: "Shadow Squad (Depth)", icon: Target, badge: "Shortlist", badgeColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30" },
              { id: "medical", label: "Medical & GPS ACWR", icon: HeartPulse, badge: "2 in Rehab", badgeColor: "text-amber-400 bg-amber-400/15 border-amber-400/30" },
              { id: "scouting", label: "Recruitment Pipeline", icon: Binoculars, badge: "34 Targets" },
              { id: "matches", label: "Opposition Scouting", icon: Trophy },
              { id: "finance", label: "Financials & PSR Cap", icon: Wallet, badge: "£88.5M Value" },
              { id: "training", label: "Training GPS Load", icon: TrendingUp },
              { id: "academy", label: "Youth Development", icon: GraduationCap, badge: "64 Prospects" },
              { id: "calendar", label: "Integrated Calendar", icon: CalendarDays },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    isActive
                      ? "bg-[#0fa05c] text-white font-bold shadow-md shadow-[#0fa05c]/25"
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
                          ? "bg-black/30 text-white border-transparent"
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

          <div className="p-4 border-t border-white/10 text-xs text-slate-400 bg-[#070c14]">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Riverside FC</span>
              <span className="text-[10px] text-emerald-400 font-mono">ONLINE</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">EFL Championship · Div 1</p>
          </div>
        </aside>

        {/* MAIN DISPLAY VIEW */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto min-w-0 space-y-6">

          {/* ========================================================================= */}
          {/* TAB 1: SQUAD & 3D INTERACTIVE TACTICAL PITCHBOARD (THE FLAGSHIP 50K MODULE) */}
          {/* ========================================================================= */}
          {activeTab === "squad" && (
            <div className="space-y-6">
              {/* Module Header with Formation Switcher and In-Game Minute Simulation */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#0d141e] border border-white/10 rounded-2xl p-4 shadow-xl">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-[#0fa05c] animate-pulse" />
                    <h1 className="text-xl font-bold text-white">Tactical Pitchboard & Matchday Starting XI</h1>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Interactive line-up creator with real player fitness battery, role specializations, and bench swap
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Formation Selector Dropdown */}
                  <div className="flex items-center gap-1.5 bg-[#141d2b] border border-white/10 px-3 py-1.5 rounded-lg text-xs">
                    <Sliders className="size-3.5 text-[#0fa05c]" />
                    <span className="text-slate-400">Formation:</span>
                    <select
                      value={formation}
                      onChange={(e) => setFormation(e.target.value as Formation)}
                      className="bg-transparent font-bold text-white outline-none cursor-pointer"
                    >
                      <option value="4-3-3" className="bg-[#141d2b]">4-3-3 Attacking</option>
                      <option value="4-2-3-1" className="bg-[#141d2b]">4-2-3-1 Modern Press</option>
                      <option value="3-5-2" className="bg-[#141d2b]">3-5-2 Wingback Overload</option>
                      <option value="4-4-2" className="bg-[#141d2b]">4-4-2 Diamond</option>
                    </select>
                  </div>

                  {/* Tactical Heatmap Toggle */}
                  <button
                    onClick={() => setShowTacticalHeatmap(!showTacticalHeatmap)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition cursor-pointer ${
                      showTacticalHeatmap
                        ? "bg-amber-400/20 border-amber-400/40 text-amber-300"
                        : "bg-[#141d2b] border-white/10 text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    {showTacticalHeatmap ? "🔥 Press Heatmap: ON" : "Tactical Heatmap"}
                  </button>

                  {/* Reset Starting XI */}
                  <button
                    onClick={() => {
                      setStarters(INITIAL_STARTERS);
                      setBench(INITIAL_BENCH);
                      setMatchMinute(0);
                    }}
                    className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white"
                    title="Reset to Default"
                  >
                    <RefreshCw className="size-4" />
                  </button>
                </div>
              </div>

              {/* In-Game Match Minute Fatigue Simulation Slider */}
              <div className="bg-[#0b121c] border border-white/10 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-[#0fa05c]" />
                  <span className="text-xs font-semibold text-white">In-Game Match Fatigue Simulator:</span>
                  <span className="font-mono text-xs font-bold text-[#0fa05c] bg-[#0fa05c]/20 px-2 py-0.5 rounded">
                    Minute {matchMinute}&apos;
                  </span>
                </div>
                <div className="flex items-center gap-3 flex-1 max-w-md">
                  <span className="text-[10px] text-slate-400 font-mono">0&apos; (Kickoff)</span>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    value={matchMinute}
                    onChange={(e) => setMatchMinute(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0fa05c]"
                  />
                  <span className="text-[10px] text-slate-400 font-mono">90&apos; (Full-time)</span>
                </div>
                {matchMinute > 60 && (
                  <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1 animate-pulse">
                    <AlertTriangle className="size-3" /> Sub Recommendations Active
                  </span>
                )}
              </div>

              {/* 2-COLUMN DISPLAY: THE VISUAL PITCH ON LEFT, INTERACTIVE BENCH ON RIGHT */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                
                {/* LEFT: THE INTERACTIVE DIGITAL GRASS PITCH (8 Cols) */}
                <div className="xl:col-span-8 rounded-2xl border-2 border-[#16402a] bg-[#072413] p-4 sm:p-6 relative overflow-hidden shadow-2xl">
                  {/* Pitch Realistic Field Markings */}
                  <div className="absolute inset-0 pointer-events-none opacity-20 border-4 border-white m-3 sm:m-6 rounded-xl flex items-center justify-center">
                    {/* Halfway Line */}
                    <div className="absolute inset-x-0 h-0.5 bg-white top-1/2 -translate-y-1/2" />
                    {/* Center Circle */}
                    <div className="w-36 h-36 rounded-full border-2 border-white" />
                    {/* Top Penalty Box */}
                    <div className="absolute top-0 w-64 h-28 border-2 border-white border-t-0" />
                    <div className="absolute top-0 w-28 h-12 border-2 border-white border-t-0" />
                    {/* Bottom Penalty Box */}
                    <div className="absolute bottom-0 w-64 h-28 border-2 border-white border-b-0" />
                    <div className="absolute bottom-0 w-28 h-12 border-2 border-white border-b-0" />
                  </div>

                  {/* Optional High-Press Heatmap Overlay */}
                  {showTacticalHeatmap && (
                    <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500 via-emerald-500 to-transparent mix-blend-screen" />
                  )}

                  {/* Pitch Header info */}
                  <div className="relative z-10 flex items-center justify-between text-xs mb-6 text-white/90">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-[#0fa05c] tracking-widest uppercase text-sm">
                        RIVERSIDE ARENA (HOME)
                      </span>
                      <span className="text-[11px] text-white/60">· Pitch Dim: 105m × 68m</span>
                    </div>
                    {selectedPlayerToSwap && (
                      <span className="rounded-full bg-amber-400 text-black px-3 py-1 font-bold text-xs animate-bounce shadow-lg">
                        Select a player to swap with {selectedPlayerToSwap.name}
                      </span>
                    )}
                  </div>

                  {/* DYNAMIC PLAYER FORMATION MATRIX */}
                  <div className="relative z-10 space-y-8 my-2 min-h-[520px] flex flex-col justify-between">
                    
                    {/* ROW 1: ATTACKERS (LW, ST, RW) */}
                    <div className="flex justify-around items-center px-4">
                      {starters.slice(8, 11).map((player) => {
                        const simulatedFitness = Math.max(20, Math.round(player.fitness - (matchMinute * 0.45)));
                        const isSelected = selectedPlayerToSwap?.id === player.id;
                        return (
                          <div
                            key={player.id}
                            onClick={() => {
                              if (selectedPlayerToSwap) handleSwap(selectedPlayerToSwap, player);
                              else setSelectedPlayerToSwap(player);
                            }}
                            className={`group relative bg-[#09141d]/95 hover:bg-[#0e2130] rounded-xl border p-2.5 text-center transition-all duration-150 cursor-pointer shadow-xl w-32 sm:w-36 ${
                              isSelected
                                ? "border-amber-400 ring-4 ring-amber-400/40 scale-105"
                                : "border-white/20 hover:border-[#0fa05c]"
                            }`}
                          >
                            {/* Number & Pos Badge */}
                            <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1">
                              <span className="size-5 rounded-full bg-[#0fa05c] text-white flex items-center justify-center shadow">
                                {player.number}
                              </span>
                              <span className="text-[#0fa05c]">{player.position}</span>
                            </div>

                            {/* Player Name & Role */}
                            <p className="text-xs font-extrabold text-white truncate">{player.name}</p>
                            <p className="text-[9px] text-slate-400 truncate leading-tight">{player.role}</p>

                            {/* Real-time Fitness Battery Bar */}
                            <div className="mt-2 pt-1 border-t border-white/10 flex items-center justify-between text-[10px]">
                              <span className="text-slate-400">Match Fit:</span>
                              <span className={`font-mono font-bold ${simulatedFitness < 60 ? "text-rose-400" : simulatedFitness < 75 ? "text-amber-400" : "text-emerald-400"}`}>
                                {simulatedFitness}%
                              </span>
                            </div>
                            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-0.5">
                              <div
                                className={`h-full ${simulatedFitness < 60 ? "bg-rose-400" : simulatedFitness < 75 ? "bg-amber-400" : "bg-emerald-400"}`}
                                style={{ width: `${simulatedFitness}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* ROW 2: MIDFIELDERS (CM, CAM, CDM) */}
                    <div className="flex justify-around items-center px-8">
                      {starters.slice(5, 8).map((player) => {
                        const simulatedFitness = Math.max(20, Math.round(player.fitness - (matchMinute * 0.48)));
                        const isSelected = selectedPlayerToSwap?.id === player.id;
                        return (
                          <div
                            key={player.id}
                            onClick={() => {
                              if (selectedPlayerToSwap) handleSwap(selectedPlayerToSwap, player);
                              else setSelectedPlayerToSwap(player);
                            }}
                            className={`group relative bg-[#09141d]/95 hover:bg-[#0e2130] rounded-xl border p-2.5 text-center transition-all duration-150 cursor-pointer shadow-xl w-32 sm:w-36 ${
                              isSelected
                                ? "border-amber-400 ring-4 ring-amber-400/40 scale-105"
                                : "border-white/20 hover:border-[#0fa05c]"
                            }`}
                          >
                            <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1">
                              <span className="size-5 rounded-full bg-[#0fa05c] text-white flex items-center justify-center shadow">
                                {player.number}
                              </span>
                              <span className="text-[#0fa05c]">{player.position}</span>
                            </div>
                            <p className="text-xs font-extrabold text-white truncate">{player.name}</p>
                            <p className="text-[9px] text-slate-400 truncate leading-tight">{player.role}</p>

                            <div className="mt-2 pt-1 border-t border-white/10 flex items-center justify-between text-[10px]">
                              <span className="text-slate-400">Match Fit:</span>
                              <span className={`font-mono font-bold ${simulatedFitness < 60 ? "text-rose-400" : simulatedFitness < 75 ? "text-amber-400" : "text-emerald-400"}`}>
                                {simulatedFitness}%
                              </span>
                            </div>
                            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-0.5">
                              <div
                                className={`h-full ${simulatedFitness < 60 ? "bg-rose-400" : simulatedFitness < 75 ? "bg-amber-400" : "bg-emerald-400"}`}
                                style={{ width: `${simulatedFitness}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* ROW 3: DEFENDERS (LB, CB, CB, RB) */}
                    <div className="flex justify-around items-center px-2">
                      {starters.slice(1, 5).map((player) => {
                        const simulatedFitness = Math.max(20, Math.round(player.fitness - (matchMinute * 0.40)));
                        const isSelected = selectedPlayerToSwap?.id === player.id;
                        return (
                          <div
                            key={player.id}
                            onClick={() => {
                              if (selectedPlayerToSwap) handleSwap(selectedPlayerToSwap, player);
                              else setSelectedPlayerToSwap(player);
                            }}
                            className={`group relative bg-[#09141d]/95 hover:bg-[#0e2130] rounded-xl border p-2 text-center transition-all duration-150 cursor-pointer shadow-xl w-28 sm:w-32 ${
                              isSelected
                                ? "border-amber-400 ring-4 ring-amber-400/40 scale-105"
                                : "border-white/20 hover:border-[#0fa05c]"
                            }`}
                          >
                            <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1">
                              <span className="size-4.5 rounded-full bg-[#0fa05c] text-white flex items-center justify-center shadow text-[10px]">
                                {player.number}
                              </span>
                              <span className="text-[#0fa05c]">{player.position}</span>
                            </div>
                            <p className="text-xs font-extrabold text-white truncate">{player.name}</p>
                            <p className="text-[9px] text-slate-400 truncate leading-tight">{player.role}</p>

                            <div className="mt-1.5 pt-1 border-t border-white/10 flex items-center justify-between text-[9px]">
                              <span className="text-slate-400">Fit:</span>
                              <span className="font-mono font-bold text-emerald-400">{simulatedFitness}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* ROW 4: GOALKEEPER */}
                    <div className="flex justify-center items-center">
                      {starters.slice(0, 1).map((player) => {
                        const isSelected = selectedPlayerToSwap?.id === player.id;
                        return (
                          <div
                            key={player.id}
                            onClick={() => {
                              if (selectedPlayerToSwap) handleSwap(selectedPlayerToSwap, player);
                              else setSelectedPlayerToSwap(player);
                            }}
                            className={`group relative bg-[#121924]/95 hover:bg-[#182333] rounded-xl border p-2.5 text-center transition-all duration-150 cursor-pointer shadow-xl w-36 ${
                              isSelected
                                ? "border-amber-400 ring-4 ring-amber-400/40 scale-105"
                                : "border-amber-400/40 hover:border-amber-400"
                            }`}
                          >
                            <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1">
                              <span className="size-5 rounded-full bg-amber-400 text-black flex items-center justify-center shadow font-bold">
                                {player.number}
                              </span>
                              <span className="text-amber-400 font-bold">GK</span>
                            </div>
                            <p className="text-xs font-extrabold text-white truncate">{player.name}</p>
                            <p className="text-[9px] text-amber-300/80">{player.role}</p>
                            <div className="mt-1 pt-1 border-t border-white/10 text-[10px] text-slate-400 flex justify-between">
                              <span>Fit:</span>
                              <span className="font-mono text-emerald-400 font-bold">{player.fitness}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* RIGHT: INTERACTIVE BENCH & SUBSTITUTE SQUAD (4 Cols) */}
                <div className="xl:col-span-4 space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-[#0d141e] p-4 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <h3 className="text-sm font-bold text-white">Substitutes & Reserves</h3>
                        <p className="text-[11px] text-slate-400">Click any bench player to swap into Starting XI</p>
                      </div>
                      <span className="text-[11px] font-mono bg-[#141d2b] text-[#0fa05c] px-2 py-0.5 rounded border border-white/5">
                        {bench.length} on Bench
                      </span>
                    </div>

                    <div className="divide-y divide-white/5 mt-2 max-h-[460px] overflow-y-auto">
                      {bench.map((player) => {
                        const isSelected = selectedPlayerToSwap?.id === player.id;
                        return (
                          <div
                            key={player.id}
                            onClick={() => {
                              if (selectedPlayerToSwap) handleSwap(selectedPlayerToSwap, player);
                              else setSelectedPlayerToSwap(player);
                            }}
                            className={`py-2.5 px-2 rounded-lg flex items-center justify-between transition cursor-pointer ${
                              isSelected
                                ? "bg-amber-400/20 border border-amber-400"
                                : "hover:bg-white/5"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="size-6 rounded-md bg-white/10 text-white font-mono text-xs flex items-center justify-center font-bold">
                                {player.number}
                              </span>
                              <div>
                                <p className="text-xs font-bold text-white leading-tight">{player.name}</p>
                                <p className="text-[10px] text-slate-400">{player.position} · {player.role}</p>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="text-xs font-mono font-bold text-[#0fa05c]">⭐ {player.rating}</span>
                              <p className="text-[10px] text-slate-400">Fit: {player.fitness}%</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tactical Coaching Advice Card */}
                  <div className="rounded-xl border border-emerald-500/20 bg-[#0f1f17] p-4">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1.5">
                      <Sparkles className="size-3.5" />
                      <span>Coaching Intelligence</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Lakeside United tire significantly around minute 70&apos; in their midfield pivot. Introducing <strong>Samuel Eto&apos;o Jr</strong> at minute 65&apos; offers a +28% counter-attack transition advantage.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: SHADOW SQUAD DEPTH CHART (THE RECRUITMENT ASSET MATRIX) */}
          {/* ========================================================================= */}
          {activeTab === "shadow" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0d141e] border border-white/10 rounded-2xl p-4">
                <div>
                  <h1 className="text-xl font-bold text-white">Shadow Squad & Succession Planning</h1>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Tier 1 (Starter) vs Tier 2 (Internal Backup) vs Tier 3 (External Scouted Target)
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono bg-[#141d2b] px-3 py-1.5 rounded-lg border border-white/10 text-[#0fa05c]">
                  <span>Total Asset Depth: £142.8M</span>
                </div>
              </div>

              {/* 3-Tier Succession Cards per Key Role */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {[
                  {
                    pos: "Striker (ST)",
                    starter: { name: "Mateo Vargas", age: 24, val: "£18.5M", rat: 8.4, status: "Starter" },
                    backup: { name: "Samuel Eto'o Jr", age: 19, val: "£3.5M", rat: 7.2, status: "Academy Tier 1" },
                    target: { name: "Yannick N'Diaye", club: "Dakar Acad.", age: 18, est: "£450K", grade: "A+" },
                  },
                  {
                    pos: "Attacking Mid (CAM)",
                    starter: { name: "Lucas Silva", age: 26, val: "£14.2M", rat: 8.1, status: "Starter" },
                    backup: { name: "Kenzo Tanaka", age: 20, val: "£4.0M", rat: 7.3, status: "Internal Sub" },
                    target: { name: "Emil Berg", club: "Malmö FF", age: 21, est: "£1.8M", grade: "A" },
                  },
                  {
                    pos: "Center Back (CB)",
                    starter: { name: "David Brennan (C)", age: 28, val: "£8.5M", rat: 7.8, status: "Starter" },
                    backup: { name: "Viktor Jensen", age: 27, val: "£3.0M", rat: 7.1, status: "Internal Sub" },
                    target: { name: "Lauri Virtanen", club: "HJK Helsinki", age: 20, est: "£850K", grade: "A-" },
                  },
                ].map((col, idx) => (
                  <div key={idx} className="rounded-xl border border-white/10 bg-[#0d141e] p-4 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="text-xs font-extrabold uppercase text-[#0fa05c]">{col.pos}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Position Depth: 3 Deep</span>
                    </div>

                    {/* Tier 1: Current Starter */}
                    <div className="rounded-lg border border-[#0fa05c]/30 bg-[#0f2117] p-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase font-bold text-emerald-400 bg-emerald-400/15 px-1.5 py-0.2 rounded">
                          Tier 1 · Starter
                        </span>
                        <span className="text-xs font-bold text-white font-mono">{col.starter.val}</span>
                      </div>
                      <p className="text-xs font-bold text-white mt-1.5">{col.starter.name}</p>
                      <p className="text-[10px] text-slate-300">Age: {col.starter.age} · Rating: <strong className="text-emerald-400">{col.starter.rat}</strong></p>
                    </div>

                    {/* Tier 2: Internal Backup */}
                    <div className="rounded-lg border border-white/10 bg-[#121b27] p-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase font-bold text-cyan-300 bg-cyan-400/15 px-1.5 py-0.2 rounded">
                          Tier 2 · Internal
                        </span>
                        <span className="text-xs font-bold text-white font-mono">{col.backup.val}</span>
                      </div>
                      <p className="text-xs font-bold text-white mt-1.5">{col.backup.name}</p>
                      <p className="text-[10px] text-slate-400">Age: {col.backup.age} · Rating: <strong className="text-cyan-300">{col.backup.rat}</strong></p>
                    </div>

                    {/* Tier 3: External Target */}
                    <div className="rounded-lg border border-amber-400/30 bg-[#191918] p-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase font-bold text-amber-400 bg-amber-400/15 px-1.5 py-0.2 rounded">
                          Tier 3 · Scout Target
                        </span>
                        <span className="text-xs font-bold text-amber-300 font-mono">Est: {col.target.est}</span>
                      </div>
                      <p className="text-xs font-bold text-white mt-1.5">{col.target.name}</p>
                      <p className="text-[10px] text-slate-400">{col.target.club} · Scout Grade: <strong className="text-amber-400">{col.target.grade}</strong></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: MEDICAL & ACUTE:CHRONIC GPS WORKLOAD (PREVENTS POINT DEDUCTION) */}
          {/* ========================================================================= */}
          {activeTab === "medical" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0d141e] border border-white/10 rounded-2xl p-4">
                <div>
                  <h1 className="text-xl font-bold text-white">Medical Center & GPS Workload Telemetry</h1>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Acute:Chronic Workload Ratio (ACWR) soft-tissue injury risk monitoring
                  </p>
                </div>
                <span className="text-xs bg-rose-500/15 text-rose-400 border border-rose-500/30 px-3 py-1.5 rounded-lg font-semibold">
                  2 Active Rehabilitation Cases
                </span>
              </div>

              {/* Live ACWR Risk Meter */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-xl border border-amber-500/30 bg-[#141b24] p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-rose-400 bg-rose-400/10 border border-rose-400/20 px-2 py-0.5 rounded-full uppercase">
                        High Workload Spike (ACWR: 1.55)
                      </span>
                      <h3 className="text-base font-bold text-white mt-2">Liam O&apos;Connor (#8 CM)</h3>
                      <p className="text-xs text-slate-400">Right Bicep Femoris Grade II Strain</p>
                    </div>
                    <HeartPulse className="size-6 text-rose-400" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Rehab Protocol Progression: Stage 3 of 4</span>
                      <strong className="text-emerald-400">75% Fit</strong>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#0fa05c] h-full rounded-full" style={{ width: "75%" }} />
                    </div>
                  </div>

                  <div className="p-3 bg-black/40 rounded-lg text-xs space-y-1 text-slate-300 border border-white/5">
                    <p className="flex justify-between"><span>GPS Sprint Distance:</span> <strong className="text-white font-mono">1,120m (Limit: 900m)</strong></p>
                    <p className="flex justify-between"><span>Return-to-Play Clearance:</span> <strong className="text-emerald-400 font-mono">Next Tuesday</strong></p>
                  </div>
                </div>

                <div className="rounded-xl border border-amber-500/30 bg-[#141b24] p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full uppercase">
                        Moderate Risk (ACWR: 1.48)
                      </span>
                      <h3 className="text-base font-bold text-white mt-2">Henrik Lindqvist (#3 LB)</h3>
                      <p className="text-xs text-slate-400">Lateral Ankle Ligament Sprain</p>
                    </div>
                    <HeartPulse className="size-6 text-amber-400" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Rehab Protocol Progression: Stage 2 of 4</span>
                      <strong className="text-amber-400">55% Fit</strong>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: "55%" }} />
                    </div>
                  </div>

                  <div className="p-3 bg-black/40 rounded-lg text-xs space-y-1 text-slate-300 border border-white/5">
                    <p className="flex justify-between"><span>Physio Assessment:</span> <strong className="text-white font-mono">Proprioception Passed</strong></p>
                    <p className="flex justify-between"><span>Target Full Training:</span> <strong className="text-amber-400 font-mono">In 6 Days</strong></p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: FINANCIALS & PSR / FFP COMPLIANCE BOARD (THE BOARDROOM TOOL) */}
          {/* ========================================================================= */}
          {activeTab === "finance" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0d141e] border border-white/10 rounded-2xl p-4">
                <div>
                  <h1 className="text-xl font-bold text-white">Club Financial Health & Profitability & Sustainability (PSR)</h1>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Wage-to-Turnover ratio, player book amortization, and rolling 3-year PSR monitoring
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono bg-[#0fa05c]/20 text-[#0fa05c] border border-[#0fa05c]/30 px-3 py-1.5 rounded-lg font-bold">
                    UEFA Rule Compliance: 54% (Limit: 70%)
                  </span>
                </div>
              </div>

              {/* Financial KPI Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Squad Asset Value</span>
                  <p className="text-2xl font-bold text-white mt-1">{totalMarketValue}</p>
                  <p className="text-[10px] text-emerald-400 mt-0.5">+14% vs purchase cost</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Annual Wage Bill</span>
                  <p className="text-2xl font-bold text-white mt-1">{wageBillAnnual}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">£104,200 / week total</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Remaining Transfer Cap</span>
                  <p className="text-2xl font-bold text-[#0fa05c] mt-1">£2.45M</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Winter window balance</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Contracts Due 2026</span>
                  <p className="text-2xl font-bold text-amber-400 mt-1">2 Players</p>
                  <p className="text-[10px] text-amber-400 mt-0.5">Free Transfer Risk</p>
                </div>
              </div>

              {/* Contract Expiration Watchlist */}
              <div className="rounded-xl border border-white/10 bg-[#0d141e] overflow-hidden">
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Contract Expiry & Renewal Alerts</h3>
                  <span className="text-xs text-slate-400 font-mono">Immediate Action Required</span>
                </div>
                <div className="divide-y divide-white/5 text-xs">
                  <div className="p-3.5 flex items-center justify-between hover:bg-white/5">
                    <div>
                      <strong className="text-white">Julian Rossi (#1 Goalkeeper)</strong>
                      <p className="text-[11px] text-slate-400">Contract expires: 30 June 2026 (3 months remaining)</p>
                    </div>
                    <button className="text-xs font-semibold bg-[#0fa05c] text-white px-3 py-1.5 rounded-lg">
                      Offer 2-Year Extension
                    </button>
                  </div>
                  <div className="p-3.5 flex items-center justify-between hover:bg-white/5">
                    <div>
                      <strong className="text-white">Nathan Walker (#2 Right Back)</strong>
                      <p className="text-[11px] text-slate-400">Contract expires: 30 June 2026 (Eligible for pre-contract)</p>
                    </div>
                    <button className="text-xs font-semibold bg-white/10 text-white hover:bg-white/20 px-3 py-1.5 rounded-lg">
                      Begin Negotiations
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: OPPOSITION SCOUTING & TACTICAL DOSSIER */}
          {/* ========================================================================= */}
          {activeTab === "matches" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0d141e] border border-white/10 rounded-2xl p-4">
                <div>
                  <h1 className="text-xl font-bold text-white">Next Opponent Scouting Dossier: Lakeside United</h1>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Tactical tendencies, set-piece vulnerabilities, and opposition key threat analysis
                  </p>
                </div>
                <span className="text-xs bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1.5 rounded-lg font-bold">
                  Opposition Rank: #3 (43 pts)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-5 space-y-3">
                  <h3 className="text-xs font-bold uppercase text-emerald-400 tracking-wider flex items-center gap-1.5">
                    <Target className="size-4" />
                    Key Exploitable Vulnerabilities
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                      <strong className="text-white">Left Flank Space:</strong> Their left-back over-commits forward. 64% of conceded goals originate from fast diagonal switches into the right half-space (Target zone for Kofi Mensah).
                    </li>
                    <li className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                      <strong className="text-white">Near-Post Corners:</strong> Goalkeeper hesitates on out-swinging corners into the 6-yard box.
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-5 space-y-3">
                  <h3 className="text-xs font-bold uppercase text-rose-400 tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="size-4" />
                    Opposition Danger Threat
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                      <strong className="text-white">Marcus Sterling (#10):</strong> 11 goals, 8 assists. Operates between our center-backs. Carlos Ramos assigned man-marking duty when out of possession.
                    </li>
                    <li className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                      <strong className="text-white">Direct Long Balls:</strong> 42% of their attacks bypass midfield directly into the front two runners.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* FALLBACK TABS FOR REMAINING MODULES */}
          {["scouting", "training", "academy", "calendar"].includes(activeTab) && (
            <div className="rounded-xl border border-white/10 bg-[#0d141e] p-6 text-center py-16 space-y-3">
              <div className="size-12 rounded-full bg-[#0fa05c]/20 text-[#0fa05c] flex items-center justify-center mx-auto">
                <ShieldCheck className="size-6" />
              </div>
              <h2 className="text-lg font-bold text-white capitalize">{activeTab} Management Portal</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Full enterprise telemetry active. Real-time data synchronization connected to Riverside FC database.
              </p>
              <button
                onClick={() => setActiveTab("squad")}
                className="text-xs bg-[#0fa05c] text-white px-4 py-2 rounded-lg font-semibold mt-2 cursor-pointer"
              >
                Return to Tactical Pitchboard
              </button>
            </div>
          )}

        </main>
      </div>

      {/* ========================================================================= */}
      {/* 4-PAGE PRINTABLE MATCHDAY TACTICAL DOSSIER MODAL (FOR PLAYERS & COACHES) */}
      {/* ========================================================================= */}
      {showDossierModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b131e] border border-white/20 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#070c14]">
              <div className="flex items-center gap-2">
                <FileText className="size-5 text-[#0fa05c]" />
                <div>
                  <h3 className="font-bold text-white text-sm">Official Matchday Tactical Dossier</h3>
                  <p className="text-[11px] text-slate-400">Matchday 22: Riverside FC vs Lakeside United</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 text-xs bg-[#0fa05c] hover:bg-[#0fa05c]/90 text-white font-semibold px-3 py-1.5 rounded-lg shadow cursor-pointer"
                >
                  <Printer className="size-3.5" />
                  <span>Print Dossier</span>
                </button>
                <button
                  onClick={() => setShowDossierModal(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Modal Document Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300 font-sans">
              <div className="border-b border-white/10 pb-4 flex justify-between items-center">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#0fa05c]">RIVERSIDE FOOTBALL CLUB · CONFIDENTIAL</span>
                  <h2 className="text-xl font-black text-white mt-1">TACTICAL BRIEFING: VS LAKESIDE UNITED</h2>
                  <p className="text-slate-400 text-xs">Kickoff: Saturday 15:00 GMT · Riverside Stadium</p>
                </div>
                <div className="text-right font-mono text-[11px]">
                  <p className="text-white font-bold">Formation: 4-3-3</p>
                  <p className="text-emerald-400">Match Readiness: 94.2%</p>
                </div>
              </div>

              {/* Pitch Summary */}
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2">
                <h4 className="font-bold text-white uppercase text-[11px] text-[#0fa05c]">Confirmed Starting XI</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div><strong className="text-white">GK:</strong> J. Rossi (#1)</div>
                  <div><strong className="text-white">RB:</strong> N. Walker (#2)</div>
                  <div><strong className="text-white">CB:</strong> D. Brennan (#4)</div>
                  <div><strong className="text-white">CB:</strong> G. Souza (#6)</div>
                  <div><strong className="text-white">LB:</strong> H. Lindqvist (#3)</div>
                  <div><strong className="text-white">CDM:</strong> C. Ramos (#5)</div>
                  <div><strong className="text-white">CAM:</strong> L. Silva (#10)</div>
                  <div><strong className="text-white">CM:</strong> L. O&apos;Connor (#8)</div>
                  <div><strong className="text-white">RW:</strong> K. Mensah (#7)</div>
                  <div><strong className="text-white">ST:</strong> M. Vargas (#9)</div>
                  <div><strong className="text-white">LW:</strong> A. Khan (#11)</div>
                </div>
              </div>

              {/* Set Piece Assignments */}
              <div className="space-y-2">
                <h4 className="font-bold text-white uppercase text-[11px] text-amber-400">Corner & Free-Kick Assignments</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <p className="font-bold text-white">Attacking Corners</p>
                    <p className="text-[11px] text-slate-400 mt-1">Taker: Lucas Silva (#10) · Target: Near-post flick-on David Brennan (#4)</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <p className="font-bold text-white">Defensive Zonal Setup</p>
                    <p className="text-[11px] text-slate-400 mt-1">Front 6-yard mark: Carlos Ramos (#5) · Penalty spot marker: Mateo Vargas (#9)</p>
                  </div>
                </div>
              </div>

              {/* Coaching Staff Signoff */}
              <div className="pt-4 border-t border-white/10 flex justify-between text-[11px] text-slate-400">
                <p>Prepared by: Mark Davies (Head Coach)</p>
                <p>Approved by: Sporting Directorate (Pitchbook FC)</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
