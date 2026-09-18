"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Trophy,
  Users,
  Target,
  HeartPulse,
  Binoculars,
  Wallet,
  TrendingUp,
  GraduationCap,
  CalendarDays,
  ArrowRight,
  Sparkles,
  Cpu,
} from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#060c13] text-[#eaeff5] font-sans flex flex-col selection:bg-[#0fa05c]/30 selection:text-white">
      {/* TOP HEADER */}
      <header className="h-16 border-b border-white/10 bg-[#0a111a]/90 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#0fa05c] text-white shadow-md shadow-[#0fa05c]/30 group-hover:scale-105 transition">
              <ShieldCheck className="size-4.5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white">PITCHBOOK FC</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#0fa05c]/20 text-[#0fa05c] border border-[#0fa05c]/40">
                PRO ENTERPRISE
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition"
          >
            Switch Persona
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#0fa05c] hover:bg-[#0fa05c]/90 text-white px-4 py-2 rounded-lg shadow-md shadow-[#0fa05c]/25 transition"
          >
            <span>Launch Club Workspace</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#0fa05c]/10 border border-[#0fa05c]/30 px-3.5 py-1 text-xs font-semibold text-[#0fa05c]">
            <Sparkles className="size-3.5" />
            <span>INSTITUTIONAL TIER · £50,000 / SEASON CLUB DEPLOYMENT</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            The Comprehensive Intelligence Suite for Elite Football Operations
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Pitchbook FC Pro Enterprise powers EFL Championship, Premier League, and Continental clubs with real-time tactical board telemetry, Catapult GPS ACWR injury risk engines, 3-tier shadow recruitment matrices, and automated PSR financial compliance.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-[#0fa05c] hover:bg-[#0fa05c]/90 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-[#0fa05c]/30 transition hover:scale-[1.02]"
            >
              <span>Enter Active Riverside FC Workspace</span>
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-[#121c29] hover:bg-[#182535] text-slate-200 border border-white/10 font-semibold text-sm px-5 py-3 rounded-xl transition"
            >
              <span>Access Role Logins</span>
            </Link>
          </div>
        </div>

        {/* KEY CLUB TELEMETRY STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0d141e] border border-white/10 rounded-2xl p-5 text-center shadow-lg">
            <div className="text-xs font-mono uppercase text-slate-400 font-bold">First Team Valuation</div>
            <div className="text-3xl font-extrabold text-white mt-1">£142.8M</div>
            <div className="text-[11px] text-emerald-400 font-medium mt-1">3-Tier Squad Depth Tracked</div>
          </div>
          <div className="bg-[#0d141e] border border-white/10 rounded-2xl p-5 text-center shadow-lg">
            <div className="text-xs font-mono uppercase text-slate-400 font-bold">PSR FFP Buffer</div>
            <div className="text-3xl font-extrabold text-[#0fa05c] mt-1">+£14.2M</div>
            <div className="text-[11px] text-slate-300 font-medium mt-1">3-Year Rolling Compliance</div>
          </div>
          <div className="bg-[#0d141e] border border-white/10 rounded-2xl p-5 text-center shadow-lg">
            <div className="text-xs font-mono uppercase text-slate-400 font-bold">Active Scouting Pool</div>
            <div className="text-3xl font-extrabold text-white mt-1">34 Targets</div>
            <div className="text-[11px] text-cyan-400 font-medium mt-1">Europe & South America</div>
          </div>
          <div className="bg-[#0d141e] border border-white/10 rounded-2xl p-5 text-center shadow-lg">
            <div className="text-xs font-mono uppercase text-slate-400 font-bold">Table Standing</div>
            <div className="text-3xl font-extrabold text-white mt-1">#2 Auto-Promo</div>
            <div className="text-[11px] text-emerald-400 font-medium mt-1">EFL Championship (47 Pts)</div>
          </div>
        </div>

        {/* 9 INTEGRATED DEPARTMENTS */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Cpu className="size-5 text-[#0fa05c]" />
                All 9 Club Departments Integrated In One Single Pane of Glass
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Zero data silos between the Head Coach, Sporting Director, Medical Team, and Club Board.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
              100% OPERATIONAL
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. SQUAD & 3D PITCHBOARD */}
            <div className="bg-[#0d141e] border border-white/10 hover:border-[#0fa05c]/40 rounded-2xl p-5 space-y-3 transition group">
              <div className="flex items-center justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg bg-[#0fa05c]/15 text-[#0fa05c] border border-[#0fa05c]/30">
                  <Users className="size-5" />
                </div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase bg-emerald-500/10 px-2 py-0.5 rounded">
                  Head Coach
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition">
                1. 3D Tactical Pitchboard & Set-Pieces
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dynamic 4-3-3, 4-2-3-1, 3-5-2, and Custom Formations. Features in-game fatigue simulator (0&apos;-90&apos;) and Set-Piece Playbook with offensive/defensive corner positioning.
              </p>
            </div>

            {/* 2. SHADOW SQUAD */}
            <div className="bg-[#0d141e] border border-white/10 hover:border-cyan-500/40 rounded-2xl p-5 space-y-3 transition group">
              <div className="flex items-center justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                  <Target className="size-5" />
                </div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase bg-cyan-500/10 px-2 py-0.5 rounded">
                  Recruitment
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition">
                2. 3-Tier Shadow Squad Matrix
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Positions 1 through 11 mapped across Starter, Internal Backup, and Shortlist Targets. Immediate succession planning with depth valuation and gap risk analysis.
              </p>
            </div>

            {/* 3. MEDICAL & GPS ACWR */}
            <div className="bg-[#0d141e] border border-white/10 hover:border-amber-500/40 rounded-2xl p-5 space-y-3 transition group">
              <div className="flex items-center justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  <HeartPulse className="size-5" />
                </div>
                <span className="text-[10px] font-bold text-amber-400 uppercase bg-amber-500/10 px-2 py-0.5 rounded">
                  Medical Dept
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition">
                3. Medical Room & Catapult ACWR
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Acute-to-Chronic Workload Ratio (&gt;1.5 spike alerts) for soft-tissue injury prevention. Multi-phase return-to-play rehab milestones (Stage 1 to 4).
              </p>
            </div>

            {/* 4. RECRUITMENT PIPELINE */}
            <div className="bg-[#0d141e] border border-white/10 hover:border-emerald-500/40 rounded-2xl p-5 space-y-3 transition group">
              <div className="flex items-center justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg bg-[#0fa05c]/15 text-[#0fa05c] border border-[#0fa05c]/30">
                  <Binoculars className="size-5" />
                </div>
                <span className="text-[10px] font-bold text-[#0fa05c] uppercase bg-[#0fa05c]/10 px-2 py-0.5 rounded">
                  Scouting Hub
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition">
                4. Global Scouting & Talent Pipeline
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                34 scouted targets with position filters (FWD, MID, DEF, GK), live radar attributes, contract expiry dates, scouting dossiers, and 1-click CSV shortlist export.
              </p>
            </div>

            {/* 5. OPPOSITION & MATCH ANALYSIS */}
            <div className="bg-[#0d141e] border border-white/10 hover:border-indigo-500/40 rounded-2xl p-5 space-y-3 transition group">
              <div className="flex items-center justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                  <Trophy className="size-5" />
                </div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase bg-indigo-500/10 px-2 py-0.5 rounded">
                  Match Prep
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition">
                5. Opposition Intelligence & Video Hub
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Complete 14-man Lakeside United squad roster with individual threat tags, tactical exploitation instructions, and integrated Tactical Video Analysis Room.
              </p>
            </div>

            {/* 6. FINANCIALS & PSR */}
            <div className="bg-[#0d141e] border border-white/10 hover:border-rose-500/40 rounded-2xl p-5 space-y-3 transition group">
              <div className="flex items-center justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg bg-rose-500/15 text-rose-400 border border-rose-500/30">
                  <Wallet className="size-5" />
                </div>
                <span className="text-[10px] font-bold text-rose-400 uppercase bg-rose-500/10 px-2 py-0.5 rounded">
                  Board & Finance
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-rose-400 transition">
                6. PSR & FFP Financial Intelligence
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Premier League and EFL 3-year rolling amortisation simulator (£0M-£80M slider), live allowable deduction calculations, and instant 1-click CSV audit downloads.
              </p>
            </div>

            {/* 7. TRAINING GPS LOAD */}
            <div className="bg-[#0d141e] border border-white/10 hover:border-sky-500/40 rounded-2xl p-5 space-y-3 transition group">
              <div className="flex items-center justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg bg-sky-500/15 text-sky-400 border border-sky-500/30">
                  <TrendingUp className="size-5" />
                </div>
                <span className="text-[10px] font-bold text-sky-400 uppercase bg-sky-500/10 px-2 py-0.5 rounded">
                  Sports Science
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-sky-400 transition">
                7. Microcycle GPS Load Periodisation
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Weekly high-speed running metrics, sprint meters (&gt;25.2 km/h), player wellness ratings, and neuromuscular readiness scores prior to matchday kickoff.
              </p>
            </div>

            {/* 8. ACADEMY DEVELOPMENT */}
            <div className="bg-[#0d141e] border border-white/10 hover:border-purple-500/40 rounded-2xl p-5 space-y-3 transition group">
              <div className="flex items-center justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg bg-purple-500/15 text-purple-400 border border-purple-500/30">
                  <GraduationCap className="size-5" />
                </div>
                <span className="text-[10px] font-bold text-purple-400 uppercase bg-purple-500/10 px-2 py-0.5 rounded">
                  Category 1 Academy
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition">
                8. Youth Academy & IDP Pathways
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                64 active scholars across U21, U18, and U16 tiers. Individual Development Plans (IDPs), bio-banding tracking, and first-team transition readiness ratings.
              </p>
            </div>

            {/* 9. CALENDAR & LEAGUE TABLE */}
            <div className="bg-[#0d141e] border border-white/10 hover:border-emerald-500/40 rounded-2xl p-5 space-y-3 transition group">
              <div className="flex items-center justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <CalendarDays className="size-5" />
                </div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase bg-emerald-500/10 px-2 py-0.5 rounded">
                  Competition
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition">
                9. Fixtures Schedule & League Standings
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Live EFL Championship standings (24 clubs, Riverside FC #2 automatic promotion slot), TV broadcast schedules, and past match results breakdown.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM CALL TO ACTION BANNER */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1826] via-[#0d2217] to-[#0a1826] border border-[#0fa05c]/30 p-8 sm:p-12 text-center shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
              RIVERSIDE FC DEPLOYMENT ACTIVE
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Ready to Explore the Platform?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every department, tactical board, GPS telemetry feed, and financial simulator is fully interactive with zero mock placeholders.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-[#0fa05c] hover:bg-[#0fa05c]/90 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-[#0fa05c]/30 transition hover:scale-[1.02]"
              >
                <span>Launch Club Workspace</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-black/40 hover:bg-black/60 text-slate-200 border border-white/20 font-semibold text-sm px-5 py-3 rounded-xl transition"
              >
                <span>Switch Executive Persona</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#070c14] py-6 px-4 text-center text-xs text-slate-500">
        <p>© 2026 Pitchbook FC Technologies Ltd · Pro Enterprise Institutional Edition · Riverside FC Operations</p>
      </footer>
    </div>
  );
}
