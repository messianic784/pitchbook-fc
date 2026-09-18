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
  Play,
  Share2,
  Award,
  Video,
  Eye,
  MapPin,
  SlidersHorizontal,
  Briefcase,
} from "lucide-react";

type Formation = "4-3-3" | "4-2-3-1" | "3-5-2" | "4-4-2";
type ExecutiveRole = "Head Coach" | "Sporting Director" | "Chief Medical Officer" | "Club Executive / CEO";

interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  role: string;
  age: number;
  nationality: string;
  height: string;
  foot: string;
  status: "AVAILABLE" | "REHAB" | "SUSPENDED";
  fitness: number;
  rating: number;
  goals: number;
  assists: number;
  marketValue: string;
  wage: string;
  contractUntil: string;
  acwr: number;
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
  notes: string;
}

interface ScoutTarget {
  id: string;
  name: string;
  age: number;
  position: string;
  currentClub: string;
  country: string;
  marketValue: string;
  estWage: string;
  scoutGrade: string;
  scoutScore: number;
  status: "Discovered" | "Watching" | "In Trial" | "Signed";
  keyStrengths: string[];
  notes: string;
  category: "Attack" | "Midfield" | "Defense" | "Goalkeeper";
}

const ALL_PLAYERS: Player[] = [
  { id: "1", name: "Julian Rossi", number: 1, position: "GK", role: "Sweeper Keeper", age: 30, nationality: "Italy 🇮🇹", height: "191 cm", foot: "Right", status: "AVAILABLE", fitness: 98, rating: 7.6, goals: 0, assists: 0, marketValue: "£3.8M", wage: "£12,000/w", contractUntil: "2026", acwr: 1.02, pace: 58, shooting: 25, passing: 74, dribbling: 52, defending: 82, physical: 79, notes: "Excellent distribution under high pressure. Contract expiring June 2026. Renewal recommended." },
  { id: "2", name: "Nathan Walker", number: 2, position: "RB", role: "Inverted Wingback", age: 26, nationality: "England 🏴󠁧󠁢󠁥󠁮󠁧󠁿", height: "178 cm", foot: "Right", status: "AVAILABLE", fitness: 91, rating: 7.5, goals: 0, assists: 3, marketValue: "£5.2M", wage: "£9,000/w", contractUntil: "2026", acwr: 1.15, pace: 84, shooting: 60, passing: 76, dribbling: 75, defending: 78, physical: 74, notes: "Tucks inside during build-up phase to form a 3-2 rest defense structure. Elite transition recovery." },
  { id: "3", name: "David Brennan (C)", number: 4, position: "CB", role: "Ball-Playing Defender", age: 28, nationality: "Ireland 🇮🇪", height: "188 cm", foot: "Right", status: "AVAILABLE", fitness: 96, rating: 7.8, goals: 1, assists: 0, marketValue: "£8.5M", wage: "£11,000/w", contractUntil: "2027", acwr: 0.98, pace: 72, shooting: 45, passing: 81, dribbling: 68, defending: 86, physical: 85, notes: "Club captain. Aerial win rate 73% in league. Dominates offensive set-pieces on near-post delivery." },
  { id: "4", name: "Gabriel Souza", number: 6, position: "CB", role: "Covering Stopper", age: 25, nationality: "Brazil 🇧🇷", height: "186 cm", foot: "Left", status: "AVAILABLE", fitness: 94, rating: 7.7, goals: 0, assists: 0, marketValue: "£7.0M", wage: "£10,500/w", contractUntil: "2028", acwr: 1.05, pace: 76, shooting: 38, passing: 77, dribbling: 65, defending: 84, physical: 82, notes: "Left-footed center back. Strong recovery pace against high balls over the top." },
  { id: "5", name: "Henrik Lindqvist", number: 3, position: "LB", role: "Attacking Fullback", age: 23, nationality: "Sweden 🇸🇪", height: "182 cm", foot: "Left", status: "REHAB", fitness: 55, rating: 7.4, goals: 0, assists: 2, marketValue: "£4.5M", wage: "£8,000/w", contractUntil: "2027", acwr: 1.48, pace: 82, shooting: 55, passing: 74, dribbling: 72, defending: 75, physical: 73, notes: "Recovering from ankle ligament sprain. Stage 2 gym resistance and proprioceptive work active." },
  { id: "6", name: "Carlos Ramos", number: 5, position: "CDM", role: "Deep Anchor", age: 27, nationality: "Spain 🇪🇸", height: "184 cm", foot: "Right", status: "AVAILABLE", fitness: 92, rating: 7.7, goals: 1, assists: 2, marketValue: "£9.0M", wage: "£13,000/w", contractUntil: "2027", acwr: 1.12, pace: 68, shooting: 64, passing: 84, dribbling: 76, defending: 85, physical: 83, notes: "Tactical anchor. Averaging 4.2 tackles and interceptions per 90. Key ball retention in central pivot." },
  { id: "7", name: "Lucas Silva", number: 10, position: "CAM", role: "Advanced Playmaker", age: 26, nationality: "Portugal 🇵🇹", height: "176 cm", foot: "Both", status: "AVAILABLE", fitness: 95, rating: 8.1, goals: 5, assists: 7, marketValue: "£14.2M", wage: "£16,000/w", contractUntil: "2027", acwr: 1.08, pace: 80, shooting: 82, passing: 89, dribbling: 88, defending: 52, physical: 68, notes: "Primary creative catalyst. Creates 3.1 expected chances per game. Excellent between the lines." },
  { id: "8", name: "Liam O'Connor", number: 8, position: "CM", role: "Box-to-Box Mid", age: 25, nationality: "Scotland 🏴󠁧󠁢󠁳󠁣󠁴󠁿", height: "181 cm", foot: "Right", status: "REHAB", fitness: 75, rating: 7.5, goals: 2, assists: 3, marketValue: "£7.8M", wage: "£10,000/w", contractUntil: "2028", acwr: 1.55, pace: 78, shooting: 74, passing: 80, dribbling: 76, defending: 77, physical: 81, notes: "Bicep femoris grade II strain. ACWR spike 1.55 monitored via Catapult GPS. Return cleared next Tuesday." },
  { id: "9", name: "Kofi Mensah", number: 7, position: "RW", role: "Inside Forward", age: 22, nationality: "Ghana 🇬🇭", height: "175 cm", foot: "Left", status: "AVAILABLE", fitness: 93, rating: 7.9, goals: 4, assists: 5, marketValue: "£11.0M", wage: "£9,500/w", contractUntil: "2029", acwr: 1.18, pace: 91, shooting: 79, passing: 75, dribbling: 86, defending: 44, physical: 72, notes: "Elite sprint velocity (34.8 km/h). Cuts inside onto strong left foot. High expected threat in half-spaces." },
  { id: "10", name: "Mateo Vargas", number: 9, position: "ST", role: "Complete Forward", age: 24, nationality: "Argentina 🇦🇷", height: "185 cm", foot: "Right", status: "AVAILABLE", fitness: 97, rating: 8.4, goals: 9, assists: 4, marketValue: "£18.5M", wage: "£14,500/w", contractUntil: "2028", acwr: 1.05, pace: 87, shooting: 88, passing: 78, dribbling: 84, defending: 42, physical: 84, notes: "Top goalscorer. 9 goals from 7.1 xG. Elite conversion efficiency. Formal interest from Wolves and Sevilla." },
  { id: "11", name: "Amir Khan", number: 11, position: "LW", role: "Direct Winger", age: 21, nationality: "England 🏴󠁧󠁢󠁥󠁮󠁧󠁿", height: "179 cm", foot: "Right", status: "AVAILABLE", fitness: 90, rating: 7.6, goals: 3, assists: 4, marketValue: "£6.8M", wage: "£7,500/w", contractUntil: "2029", acwr: 1.22, pace: 89, shooting: 74, passing: 77, dribbling: 83, defending: 46, physical: 70, notes: "Direct 1v1 dribbler. High progressive carry numbers in final third. Signed from youth system." },
  { id: "12", name: "Samuel Eto'o Jr", number: 19, position: "ST", role: "Target Man", age: 19, nationality: "Cameroon 🇨🇲", height: "186 cm", foot: "Right", status: "AVAILABLE", fitness: 96, rating: 7.2, goals: 2, assists: 1, marketValue: "£3.5M", wage: "£4,500/w", contractUntil: "2028", acwr: 1.02, pace: 83, shooting: 78, passing: 66, dribbling: 74, defending: 36, physical: 82, notes: "Academy graduate. Dynamic physical presence in the 18-yard box. Supersub impact profile." },
  { id: "13", name: "Kenzo Tanaka", number: 14, position: "CAM", role: "Roaming No. 10", age: 20, nationality: "Japan 🇯🇵", height: "174 cm", foot: "Both", status: "AVAILABLE", fitness: 95, rating: 7.3, goals: 1, assists: 2, marketValue: "£4.0M", wage: "£5,000/w", contractUntil: "2028", acwr: 1.04, pace: 82, shooting: 70, passing: 81, dribbling: 82, defending: 45, physical: 65, notes: "Smooth technical playmaker. High pass completion rate in congested central pockets." },
  { id: "14", name: "Viktor Jensen", number: 15, position: "CB", role: "Stopper", age: 27, nationality: "Denmark 🇩🇰", height: "190 cm", foot: "Right", status: "AVAILABLE", fitness: 92, rating: 7.1, goals: 0, assists: 0, marketValue: "£3.0M", wage: "£7,000/w", contractUntil: "2026", acwr: 1.08, pace: 67, shooting: 32, passing: 71, dribbling: 60, defending: 80, physical: 85, notes: "Solid aerial presence. Dependable reserve center-half." },
];

const SCOUT_TARGETS: ScoutTarget[] = [
  {
    id: "scout-1",
    name: "Yannick N'Diaye",
    age: 18,
    position: "CAM",
    currentClub: "Dakar Génération Foot",
    country: "Senegal 🇸🇳",
    marketValue: "£450,000",
    estWage: "£2,500/w",
    scoutGrade: "A+",
    scoutScore: 8.8,
    status: "Discovered",
    keyStrengths: ["Agility & Balance", "Vision under Press", "Ambipedal"],
    notes: "Outstanding technical ceiling. Profile resembles young Sadio Mané. Work permit criteria easily met under GBE wild-card rules.",
    category: "Midfield",
  },
  {
    id: "scout-2",
    name: "Emil Berg",
    age: 21,
    position: "RW",
    currentClub: "Malmö FF",
    country: "Sweden 🇸🇪",
    marketValue: "£1,800,000",
    estWage: "£6,500/w",
    scoutGrade: "A",
    scoutScore: 8.5,
    status: "Watching",
    keyStrengths: ["Explosive Acceleration", "Crossing from Deep", "Work Rate"],
    notes: "Lead scout dispatched for match vs AIK. 7 goals, 6 assists in Allsvenskan this term.",
    category: "Attack",
  },
  {
    id: "scout-3",
    name: "Lauri Virtanen",
    age: 20,
    position: "CB",
    currentClub: "HJK Helsinki",
    country: "Finland 🇫🇮",
    marketValue: "£850,000",
    estWage: "£3,500/w",
    scoutGrade: "A-",
    scoutScore: 8.1,
    status: "In Trial",
    keyStrengths: ["Aerial Duels (77%)", "Diagonal Long Passing", "Composure"],
    notes: "In training with U21 squad this week. Impressed coaching staff in 11v11 inter-squad friendly.",
    category: "Defense",
  },
  {
    id: "scout-4",
    name: "Amir Khan",
    age: 21,
    position: "LW",
    currentClub: "Riverside FC (Acquired)",
    country: "England 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    marketValue: "£6,800,000",
    estWage: "£7,500/w",
    scoutGrade: "Signed",
    scoutScore: 8.9,
    status: "Signed",
    keyStrengths: ["1v1 Dribble Success", "Rapid Transition", "Shooting Technique"],
    notes: "Successfully completed transfer in July for £450k fee. Valuation has surged to £6.8M.",
    category: "Attack",
  },
  {
    id: "scout-5",
    name: "Mateo Alvarez",
    age: 19,
    position: "GK",
    currentClub: "Defensor Sporting",
    country: "Uruguay 🇺🇾",
    marketValue: "£600,000",
    estWage: "£2,800/w",
    scoutGrade: "A",
    scoutScore: 8.3,
    status: "Watching",
    keyStrengths: ["Reflex Saves", "Box Domination", "Long Kick Distribution"],
    notes: "Identified by South American scouting network. Low release clause active until December.",
    category: "Goalkeeper",
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("squad");
  const [executiveRole, setExecutiveRole] = useState<ExecutiveRole>("Head Coach");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formation, setFormation] = useState<Formation>("4-3-3");
  const [matchMinute, setMatchMinute] = useState(0);
  const [showTacticalHeatmap, setShowTacticalHeatmap] = useState(false);
  const [showDossierModal, setShowDossierModal] = useState(false);
  const [selectedPlayerModal, setSelectedPlayerModal] = useState<Player | null>(null);
  const [selectedScoutTarget, setSelectedScoutTarget] = useState<ScoutTarget | null>(null);
  const [scoutCategoryFilter, setScoutCategoryFilter] = useState<string>("All");

  // Financial PSR Simulator Interactive State
  const [simulatedTransferSpend, setSimulatedTransferSpend] = useState(0);
  const [simulatedPlayerSales, setSimulatedPlayerSales] = useState(0);

  // Starters and Bench
  const [starters, setStarters] = useState<Player[]>(ALL_PLAYERS.slice(0, 11));
  const [bench, setBench] = useState<Player[]>(ALL_PLAYERS.slice(11));
  const [selectedPlayerToSwap, setSelectedPlayerToSwap] = useState<Player | null>(null);

  // Computed Financial Metrics
  const basePsrMargin = 14.2;
  const currentPsrMargin = Number((basePsrMargin - simulatedTransferSpend + simulatedPlayerSales).toFixed(2));
  const baseTurnover = 22.5;
  const currentWageBill = 5.42;
  const squadCostRatio = Math.round(((currentWageBill + simulatedTransferSpend * 0.2) / baseTurnover) * 100);

  const totalMarketValue = "£88.5M";
  const matchFitCount = starters.filter((p) => p.status === "AVAILABLE").length;

  const handleSwap = (playerA: Player, playerB: Player) => {
    const isAStarter = starters.some((p) => p.id === playerA.id);
    const isBStarter = starters.some((p) => p.id === playerB.id);

    if (isAStarter && !isBStarter) {
      setStarters(starters.map((p) => (p.id === playerA.id ? playerB : p)));
      setBench(bench.map((p) => (p.id === playerB.id ? playerA : p)));
    } else if (!isAStarter && isBStarter) {
      setBench(bench.map((p) => (p.id === playerA.id ? playerB : p)));
      setStarters(starters.map((p) => (p.id === playerB.id ? playerA : p)));
    } else if (isAStarter && isBStarter) {
      setStarters(
        starters.map((p) => {
          if (p.id === playerA.id) return playerB;
          if (p.id === playerB.id) return playerA;
          return p;
        })
      );
    }
    setSelectedPlayerToSwap(null);
  };

  const renderPlayerCard = (player: Player, fatigueRate: number, customWidth = "w-32 sm:w-36") => {
    const simulatedFitness = Math.max(20, Math.round(player.fitness - matchMinute * fatigueRate));
    const isSelected = selectedPlayerToSwap?.id === player.id;

    return (
      <div
        key={player.id}
        onClick={() => {
          if (selectedPlayerToSwap) handleSwap(selectedPlayerToSwap, player);
          else setSelectedPlayerModal(player);
        }}
        className={`group relative bg-[#09141d]/95 hover:bg-[#0e2130] rounded-xl border p-2 text-center transition-all duration-150 cursor-pointer shadow-xl ${customWidth} ${
          isSelected ? "border-amber-400 ring-4 ring-amber-400/40 scale-105" : "border-white/20 hover:border-[#0fa05c]"
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
          <span className="text-slate-400">Fit:</span>
          <span
            className={`font-mono font-bold ${
              simulatedFitness < 60 ? "text-rose-400" : simulatedFitness < 75 ? "text-amber-400" : "text-emerald-400"
            }`}
          >
            {simulatedFitness}%
          </span>
        </div>
        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-0.5">
          <div
            className={`h-full ${
              simulatedFitness < 60 ? "bg-rose-400" : simulatedFitness < 75 ? "bg-amber-400" : "bg-emerald-400"
            }`}
            style={{ width: `${simulatedFitness}%` }}
          />
        </div>
      </div>
    );
  };

  const renderGoalkeeperCard = (player: Player) => {
    if (!player) return null;
    const isSelected = selectedPlayerToSwap?.id === player.id;
    return (
      <div
        key={player.id}
        onClick={() => {
          if (selectedPlayerToSwap) handleSwap(selectedPlayerToSwap, player);
          else setSelectedPlayerModal(player);
        }}
        className={`group relative bg-[#121924]/95 hover:bg-[#182333] rounded-xl border p-2.5 text-center transition-all duration-150 cursor-pointer shadow-xl w-36 ${
          isSelected ? "border-amber-400 ring-4 ring-amber-400/40 scale-105" : "border-amber-400/40 hover:border-amber-400"
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
  };

  const renderPitchRows = () => {
    if (formation === "4-3-3") {
      return (
        <div className="relative z-10 space-y-7 my-2 min-h-[520px] flex flex-col justify-between">
          <div className="flex justify-around items-center px-4">
            {starters.slice(8, 11).map((player) => renderPlayerCard(player, 0.45))}
          </div>
          <div className="flex justify-around items-center px-8">
            {starters.slice(5, 8).map((player) => renderPlayerCard(player, 0.48))}
          </div>
          <div className="flex justify-around items-center px-2">
            {starters.slice(1, 5).map((player) => renderPlayerCard(player, 0.40))}
          </div>
          <div className="flex justify-center items-center">
            {renderGoalkeeperCard(starters[0])}
          </div>
        </div>
      );
    }

    if (formation === "4-2-3-1") {
      return (
        <div className="relative z-10 space-y-4 my-2 min-h-[520px] flex flex-col justify-between">
          <div className="flex justify-center items-center">
            {renderPlayerCard(starters[9], 0.45)}
          </div>
          <div className="flex justify-around items-center px-4">
            {[starters[10], starters[6], starters[8]].map((player) => renderPlayerCard(player, 0.48))}
          </div>
          <div className="flex justify-center gap-16 items-center px-8">
            {[starters[5], starters[7]].map((player) => renderPlayerCard(player, 0.46))}
          </div>
          <div className="flex justify-around items-center px-2">
            {starters.slice(1, 5).map((player) => renderPlayerCard(player, 0.40))}
          </div>
          <div className="flex justify-center items-center">
            {renderGoalkeeperCard(starters[0])}
          </div>
        </div>
      );
    }

    if (formation === "3-5-2") {
      return (
        <div className="relative z-10 space-y-6 my-2 min-h-[520px] flex flex-col justify-between">
          <div className="flex justify-center gap-12 items-center px-8">
            {[starters[9], starters[10]].map((player) => renderPlayerCard(player, 0.45))}
          </div>
          <div className="flex justify-between items-center px-1">
            {[starters[4], starters[5], starters[6], starters[7], starters[1]].map((player) => renderPlayerCard(player, 0.50, "w-24 sm:w-28 text-[9px]"))}
          </div>
          <div className="flex justify-around items-center px-8">
            {[starters[3], starters[2], starters[8]].map((player) => renderPlayerCard(player, 0.40))}
          </div>
          <div className="flex justify-center items-center">
            {renderGoalkeeperCard(starters[0])}
          </div>
        </div>
      );
    }

    return (
      <div className="relative z-10 space-y-6 my-2 min-h-[520px] flex flex-col justify-between">
        <div className="flex justify-center gap-12 items-center px-8">
          {[starters[9], starters[10]].map((player) => renderPlayerCard(player, 0.45))}
        </div>
        <div className="flex justify-around items-center px-4">
          {[starters[8], starters[5], starters[6], starters[7]].map((player) => renderPlayerCard(player, 0.46))}
        </div>
        <div className="flex justify-around items-center px-2">
          {starters.slice(1, 5).map((player) => renderPlayerCard(player, 0.40))}
        </div>
        <div className="flex justify-center items-center">
          {renderGoalkeeperCard(starters[0])}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#060c13] text-[#eaeff5] flex flex-col font-sans">
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

        <div className="flex items-center gap-2.5">
          <div className="hidden xl:flex items-center gap-2 bg-[#121d2b] border border-white/10 px-2.5 py-1 rounded-lg text-xs">
            <Briefcase className="size-3.5 text-[#0fa05c]" />
            <span className="text-slate-400">Active Persona:</span>
            <select
              value={executiveRole}
              onChange={(e) => {
                const role = e.target.value as ExecutiveRole;
                setExecutiveRole(role);
                if (role === "Head Coach") setActiveTab("squad");
                else if (role === "Sporting Director") setActiveTab("shadow");
                else if (role === "Chief Medical Officer") setActiveTab("medical");
                else if (role === "Club Executive / CEO") setActiveTab("finance");
              }}
              className="bg-transparent font-bold text-white outline-none cursor-pointer"
            >
              <option value="Head Coach" className="bg-[#121d2b]">Head Coach (Tactics)</option>
              <option value="Sporting Director" className="bg-[#121d2b]">Sporting Director (Recruitment)</option>
              <option value="Chief Medical Officer" className="bg-[#121d2b]">Chief Medical Officer (GPS/ACWR)</option>
              <option value="Club Executive / CEO" className="bg-[#121d2b]">Club Executive / CEO (PSR/P&L)</option>
            </select>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 bg-[#0f2117] border border-[#0fa05c]/30 px-3 py-1.5 rounded-lg text-xs">
            <Shield className="size-3.5 text-[#0fa05c]" />
            <span className="text-slate-300">PSR Margin:</span>
            <strong
              className={`font-mono ${
                currentPsrMargin < 0 ? "text-rose-400" : currentPsrMargin < 5 ? "text-amber-400" : "text-[#0fa05c]"
              }`}
            >
              {currentPsrMargin >= 0 ? `+£${currentPsrMargin}M SAFE` : `-£${Math.abs(currentPsrMargin)}M BREACH`}
            </strong>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-[#121b27] border border-white/10 px-3 py-1.5 rounded-lg text-xs">
            <span className="size-2 rounded-full bg-[#0fa05c] animate-pulse" />
            <span className="text-slate-300">Matchday 22:</span>
            <strong className="text-white">vs Lakeside Utd</strong>
            <span className="text-slate-400 font-mono">Sat 15:00</span>
          </div>

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
            <span className="hidden md:inline">Sign Out</span>
          </Link>
        </div>
      </header>

      <div className="flex flex-1 relative overflow-hidden">
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/70 z-20 md:hidden backdrop-blur-sm"
          />
        )}

        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:static inset-y-16 md:inset-auto left-0 z-30 w-64 border-r border-white/10 bg-[#090f18] transition-transform duration-200 ease-in-out flex flex-col justify-between shrink-0 shadow-2xl md:shadow-none`}
        >
          <div className="p-3 space-y-1 overflow-y-auto">
            <div className="px-3 py-2 text-[10px] uppercase font-extrabold tracking-wider text-slate-400 flex items-center justify-between">
              <span>Club Departments</span>
              <span className="text-[9px] bg-white/10 px-1.5 py-0.2 rounded font-mono text-emerald-400">Riverside FC</span>
            </div>

            {[
              { id: "squad", label: "Squad & 3D Pitchboard", icon: Users, badge: `${matchFitCount}/11 Fit`, badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30" },
              { id: "shadow", label: "Shadow Squad (Depth)", icon: Target, badge: "Shortlist", badgeColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30" },
              { id: "medical", label: "Medical & GPS ACWR", icon: HeartPulse, badge: "2 in Rehab", badgeColor: "text-amber-400 bg-amber-400/15 border-amber-400/30" },
              { id: "scouting", label: "Recruitment Pipeline", icon: Binoculars, badge: "34 Targets" },
              { id: "matches", label: "Opposition Scouting", icon: Trophy },
              { id: "finance", label: "Financials & PSR Cap", icon: Wallet, badge: `£${currentPsrMargin}M Margin` },
              { id: "training", label: "Training GPS Load", icon: TrendingUp },
              { id: "academy", label: "Youth Development", icon: GraduationCap, badge: "64 Scholars" },
              { id: "calendar", label: "Operations Schedule", icon: CalendarDays },
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
              <span className="font-bold text-white">Riverside Arena</span>
              <span className="text-[10px] text-emerald-400 font-mono">CAP: 28,500</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">EFL Championship · Div 1 (Season 2026/27)</p>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto min-w-0 space-y-6">

          {activeTab === "squad" && (
            <div className="space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#0d141e] border border-white/10 rounded-2xl p-4 shadow-xl">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-[#0fa05c] animate-pulse" />
                    <h1 className="text-xl font-bold text-white">Tactical Pitchboard & Match Lineup</h1>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Click any player card to inspect attribute dossier, or click two players sequentially to swap tactical positions
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-[#141d2b] border border-white/10 px-3 py-1.5 rounded-lg text-xs">
                    <Sliders className="size-3.5 text-[#0fa05c]" />
                    <span className="text-slate-400">Tactical Formation:</span>
                    <select
                      value={formation}
                      onChange={(e) => setFormation(e.target.value as Formation)}
                      className="bg-transparent font-bold text-white outline-none cursor-pointer"
                    >
                      <option value="4-3-3" className="bg-[#141d2b]">4-3-3 Attacking Overload</option>
                      <option value="4-2-3-1" className="bg-[#141d2b]">4-2-3-1 Modern High Press</option>
                      <option value="3-5-2" className="bg-[#141d2b]">3-5-2 Wingback Overload</option>
                      <option value="4-4-2" className="bg-[#141d2b]">4-4-2 Compact Low Block</option>
                    </select>
                  </div>

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

                  <button
                    onClick={() => {
                      setStarters(ALL_PLAYERS.slice(0, 11));
                      setBench(ALL_PLAYERS.slice(11));
                      setMatchMinute(0);
                    }}
                    className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white cursor-pointer"
                    title="Reset Starting XI"
                  >
                    <RefreshCw className="size-4" />
                  </button>
                </div>
              </div>

              <div className="bg-[#0b121c] border border-white/10 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-[#0fa05c]" />
                  <span className="text-xs font-semibold text-white">Match Fatigue Simulator:</span>
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
                  <span className="text-[10px] text-slate-400 font-mono">90&apos; (Full-Time)</span>
                </div>
                {matchMinute > 60 && (
                  <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1 animate-pulse">
                    <AlertTriangle className="size-3" /> Tactical Substitution Window Active
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                <div className="xl:col-span-8 rounded-2xl border-2 border-[#16402a] bg-[#072413] p-4 sm:p-6 relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 pointer-events-none opacity-20 border-4 border-white m-3 sm:m-6 rounded-xl flex items-center justify-center">
                    <div className="absolute inset-x-0 h-0.5 bg-white top-1/2 -translate-y-1/2" />
                    <div className="w-36 h-36 rounded-full border-2 border-white" />
                    <div className="absolute top-0 w-64 h-28 border-2 border-white border-t-0" />
                    <div className="absolute top-0 w-28 h-12 border-2 border-white border-t-0" />
                    <div className="absolute bottom-0 w-64 h-28 border-2 border-white border-b-0" />
                    <div className="absolute bottom-0 w-28 h-12 border-2 border-white border-b-0" />
                  </div>

                  {showTacticalHeatmap && (
                    <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500 via-emerald-500 to-transparent mix-blend-screen" />
                  )}

                  <div className="relative z-10 flex items-center justify-between text-xs mb-6 text-white/90">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-[#0fa05c] tracking-widest uppercase text-sm">
                        RIVERSIDE STADIUM (HOME)
                      </span>
                      <span className="text-[11px] text-white/60">· 105m × 68m Hybrid Grass</span>
                    </div>
                    {selectedPlayerToSwap && (
                      <span className="rounded-full bg-amber-400 text-black px-3 py-1 font-bold text-xs animate-bounce shadow-lg">
                        Select swap partner for {selectedPlayerToSwap.name}
                      </span>
                    )}
                  </div>

                  {renderPitchRows()}
                </div>

                <div className="xl:col-span-4 space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-[#0d141e] p-4 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <h3 className="text-sm font-bold text-white">Substitutes & Reserves</h3>
                        <p className="text-[11px] text-slate-400">Click to view dossier or swap onto pitch</p>
                      </div>
                      <span className="text-[11px] font-mono bg-[#141d2b] text-[#0fa05c] px-2 py-0.5 rounded border border-white/5">
                        {bench.length} Reserves
                      </span>
                    </div>

                    <div className="divide-y divide-white/5 mt-2 max-h-[460px] overflow-y-auto">
                      {bench.map((player) => (
                        <div
                          key={player.id}
                          className="py-2.5 px-2 rounded-lg flex items-center justify-between transition hover:bg-white/5"
                        >
                          <div
                            onClick={() => setSelectedPlayerModal(player)}
                            className="flex items-center gap-2.5 cursor-pointer flex-1"
                          >
                            <span className="size-6 rounded-md bg-white/10 text-white font-mono text-xs flex items-center justify-center font-bold">
                              {player.number}
                            </span>
                            <div>
                              <p className="text-xs font-bold text-white leading-tight hover:text-[#0fa05c] transition">{player.name}</p>
                              <p className="text-[10px] text-slate-400">{player.position} · {player.role}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedPlayerToSwap(player)}
                              className="text-[10px] bg-[#141d2b] hover:bg-[#0fa05c] hover:text-white text-slate-300 px-2 py-1 rounded border border-white/10 transition cursor-pointer"
                            >
                              Swap In
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-emerald-500/20 bg-[#0f1f17] p-4">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1.5">
                      <Sparkles className="size-3.5" />
                      <span>Tactical Intelligence Engine</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Lakeside United tire after minute 70&apos; in their double-pivot. Introducing <strong>Samuel Eto&apos;o Jr</strong> provides an immediate +28% aerial threat against their exhausted right-sided center-half.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "shadow" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0d141e] border border-white/10 rounded-2xl p-4">
                <div>
                  <h1 className="text-xl font-bold text-white">Shadow Squad & Succession Planning Matrix</h1>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Multi-Tier Depth Blueprint: Tier 1 (Incumbent Starter) vs Tier 2 (Internal Talent) vs Tier 3 (External Scout Shortlist)
                  </p>
                </div>
                <span className="text-xs font-mono bg-[#141d2b] px-3 py-1.5 rounded-lg border border-white/10 text-[#0fa05c]">
                  Total Succession Asset Depth: £142.8M
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {[
                  { pos: "Striker (ST)", starter: { name: "Mateo Vargas", age: 24, val: "£18.5M", rat: 8.4 }, backup: { name: "Samuel Eto'o Jr", age: 19, val: "£3.5M", rat: 7.2 }, target: { name: "Yannick N'Diaye", club: "Dakar Acad.", age: 18, est: "£450K", grade: "A+" } },
                  { pos: "Attacking Mid (CAM)", starter: { name: "Lucas Silva", age: 26, val: "£14.2M", rat: 8.1 }, backup: { name: "Kenzo Tanaka", age: 20, val: "£4.0M", rat: 7.3 }, target: { name: "Emil Berg", club: "Malmö FF", age: 21, est: "£1.8M", grade: "A" } },
                  { pos: "Center Back (CB)", starter: { name: "David Brennan (C)", age: 28, val: "£8.5M", rat: 7.8 }, backup: { name: "Viktor Jensen", age: 27, val: "£3.0M", rat: 7.1 }, target: { name: "Lauri Virtanen", club: "HJK Helsinki", age: 20, est: "£850K", grade: "A-" } },
                ].map((col, idx) => (
                  <div key={idx} className="rounded-xl border border-white/10 bg-[#0d141e] p-4 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="text-xs font-extrabold uppercase text-[#0fa05c]">{col.pos}</span>
                      <span className="text-[10px] text-slate-400 font-mono">3-Tier Succession</span>
                    </div>

                    <div className="rounded-lg border border-[#0fa05c]/30 bg-[#0f2117] p-2.5">
                      <span className="text-[9px] uppercase font-bold text-emerald-400 bg-emerald-400/15 px-1.5 py-0.2 rounded">Tier 1 · Starter</span>
                      <p className="text-xs font-bold text-white mt-1">{col.starter.name}</p>
                      <p className="text-[10px] text-slate-300">Age: {col.starter.age} · Rating: <strong className="text-emerald-400">{col.starter.rat}</strong> · {col.starter.val}</p>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-[#121b27] p-2.5">
                      <span className="text-[9px] uppercase font-bold text-cyan-300 bg-cyan-400/15 px-1.5 py-0.2 rounded">Tier 2 · Internal Backup</span>
                      <p className="text-xs font-bold text-white mt-1">{col.backup.name}</p>
                      <p className="text-[10px] text-slate-400">Age: {col.backup.age} · Rating: <strong className="text-cyan-300">{col.backup.rat}</strong> · {col.backup.val}</p>
                    </div>

                    <div className="rounded-lg border border-amber-400/30 bg-[#191918] p-2.5">
                      <span className="text-[9px] uppercase font-bold text-amber-400 bg-amber-400/15 px-1.5 py-0.2 rounded">Tier 3 · Shortlist Target</span>
                      <p className="text-xs font-bold text-white mt-1">{col.target.name}</p>
                      <p className="text-[10px] text-slate-400">{col.target.club} · Grade: <strong className="text-amber-400">{col.target.grade}</strong> · {col.target.est}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "medical" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0d141e] border border-white/10 rounded-2xl p-4">
                <div>
                  <h1 className="text-xl font-bold text-white">Medical Center & GPS Workload Telemetry</h1>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Acute:Chronic Workload Ratio (ACWR) soft-tissue injury risk monitoring with Catapult GPS integrations
                  </p>
                </div>
                <span className="text-xs bg-rose-500/15 text-rose-400 border border-rose-500/30 px-3 py-1.5 rounded-lg font-semibold">
                  2 Active Rehab Cases
                </span>
              </div>

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
                      <span>Stage 3 of 4: Running & Aerobic Conditioning</span>
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
                      <span>Stage 2 of 4: Gym Resistance & Proprioception</span>
                      <strong className="text-amber-400">55% Fit</strong>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: "55%" }} />
                    </div>
                  </div>

                  <div className="p-3 bg-black/40 rounded-lg text-xs space-y-1 text-slate-300 border border-white/5">
                    <p className="flex justify-between"><span>Physio Assessment:</span> <strong className="text-white font-mono">Balance Test Passed</strong></p>
                    <p className="flex justify-between"><span>Target Full Training:</span> <strong className="text-amber-400 font-mono">In 6 Days</strong></p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "scouting" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0d141e] border border-white/10 rounded-2xl p-4">
                <div>
                  <h1 className="text-xl font-bold text-white">Global Scouting & Recruitment Pipeline</h1>
                  <p className="text-xs text-slate-400 mt-0.5">34 active prospects tracked across Europe, South America, and West Africa</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex bg-[#121b27] border border-white/10 rounded-lg p-1 text-xs">
                    {["All", "Attack", "Midfield", "Defense", "Goalkeeper"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setScoutCategoryFilter(cat)}
                        className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                          scoutCategoryFilter === cat ? "bg-[#0fa05c] text-white font-bold" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {["Discovered", "Watching", "In Trial", "Signed"].map((stage) => {
                  const filteredTargets = SCOUT_TARGETS.filter(
                    (t) => t.status === stage && (scoutCategoryFilter === "All" || t.category === scoutCategoryFilter)
                  );
                  return (
                    <div key={stage} className="rounded-xl border border-white/10 bg-[#0a111a] p-3 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{stage}</span>
                        <span className="text-[11px] rounded bg-white/10 px-2 py-0.5 font-mono text-slate-400">
                          {filteredTargets.length}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {filteredTargets.map((target) => (
                          <div
                            key={target.id}
                            onClick={() => setSelectedScoutTarget(target)}
                            className="rounded-lg border border-white/5 bg-[#121b27] p-3 space-y-1 hover:border-[#0fa05c]/50 transition cursor-pointer group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-[#0fa05c] font-bold">{target.position} · Age {target.age}</span>
                              <span className="text-[10px] font-mono font-bold bg-[#0fa05c]/20 text-[#0fa05c] px-1.5 py-0.5 rounded">
                                Grade {target.scoutGrade}
                              </span>
                            </div>
                            <p className="text-xs font-bold text-white group-hover:text-[#0fa05c] transition">{target.name}</p>
                            <p className="text-[11px] text-slate-400">{target.currentClub} · {target.country}</p>
                            <p className="text-[10px] text-slate-500 font-mono">Val: {target.marketValue}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "matches" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0d141e] border border-white/10 rounded-2xl p-4">
                <div>
                  <h1 className="text-xl font-bold text-white">Opposition Dossier: Lakeside United</h1>
                  <p className="text-xs text-slate-400 mt-0.5">Manager: Thomas Lindqvist · Tactical System: 4-2-3-1 High Press</p>
                </div>
                <span className="text-xs bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1.5 rounded-lg font-bold">
                  Opposition League Rank: #3 (43 pts)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-5 space-y-3">
                  <h3 className="text-xs font-bold uppercase text-emerald-400 tracking-wider flex items-center gap-1.5">
                    <Target className="size-4" />
                    Key Exploitable Weaknesses
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                      <strong className="text-white">Left Flank Transition Space:</strong> Their left-back over-commits forward in possession. 64% of conceded goals originate from rapid switches into the right half-space (Exploitation channel for Kofi Mensah).
                    </li>
                    <li className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                      <strong className="text-white">Near-Post Delivery Hesitation:</strong> Lakeside GK vacates goal line early on out-swinging deliveries. David Brennan assigned near-post flick-on header.
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-5 space-y-3">
                  <h3 className="text-xs font-bold uppercase text-rose-400 tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="size-4" />
                    Opposition Danger Profiles
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                      <strong className="text-white">Marcus Sterling (#10 CAM):</strong> 11 goals, 8 assists. Carlos Ramos assigned shadow marking duty when Lakeside enter our middle defensive third.
                    </li>
                    <li className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                      <strong className="text-white">Direct Channel Balls:</strong> 42% of Lakeside build-up bypasses midfield directly to their physical front runners.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0d141e] p-5 space-y-3">
                <h3 className="text-xs font-bold uppercase text-white tracking-wider flex items-center gap-2">
                  <Play className="size-4 text-[#0fa05c]" />
                  Matchday Set-Piece Execution Plan
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                    <p className="font-bold text-emerald-400">Attacking Corner Routine 1</p>
                    <p className="text-slate-300 text-[11px]">Near-post dart by David Brennan with Mateo Vargas pulling goalkeeper away to back post.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                    <p className="font-bold text-cyan-300">Attacking Free-Kick Routine 2</p>
                    <p className="text-slate-300 text-[11px]">Direct inswinger by Lucas Silva aiming at the 6-yard perimeter with Gabriel Souza charging blindside.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                    <p className="font-bold text-amber-300">Defensive Zonal Structure</p>
                    <p className="text-slate-300 text-[11px]">4 zonal defenders across 6-yard box, 3 man-markers on primary aerial targets, 1 edge-of-box sweeper.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "finance" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0d141e] border border-white/10 rounded-2xl p-4">
                <div>
                  <h1 className="text-xl font-bold text-white">Club Financial Health & Interactive PSR Simulator</h1>
                  <p className="text-xs text-slate-400 mt-0.5">Real-time rolling 3-year Profitability & Sustainability Rules (PSR) stress testing</p>
                </div>
                <span
                  className={`text-xs font-mono px-3 py-1.5 rounded-lg font-bold border ${
                    squadCostRatio <= 70
                      ? "bg-[#0fa05c]/20 text-[#0fa05c] border-[#0fa05c]/30"
                      : "bg-rose-500/20 text-rose-400 border-rose-500/30"
                  }`}
                >
                  UEFA Squad Cost Ratio: {squadCostRatio}% (Cap: 70%)
                </span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Total Squad Value</span>
                  <p className="text-2xl font-bold text-white mt-1">{totalMarketValue}</p>
                  <p className="text-[10px] text-emerald-400 mt-0.5">+14% appreciation vs buy cost</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Annual Wage Bill</span>
                  <p className="text-2xl font-bold text-white mt-1">£5.42M</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">£104,200/week total payroll</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Simulated PSR Margin</span>
                  <p
                    className={`text-2xl font-bold mt-1 font-mono ${
                      currentPsrMargin < 0 ? "text-rose-400" : currentPsrMargin < 5 ? "text-amber-400" : "text-[#0fa05c]"
                    }`}
                  >
                    £{currentPsrMargin}M
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">EFL limit: £39M loss over 3 yrs</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Expiring Contracts (2026)</span>
                  <p className="text-2xl font-bold text-amber-400 mt-1">2 Players</p>
                  <p className="text-[10px] text-amber-400 mt-0.5">J. Rossi & N. Walker</p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0b121c] p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <SlidersHorizontal className="size-4 text-[#0fa05c]" />
                      Interactive Transfer Window PSR Stress-Test Simulator
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Adjust prospective winter/summer transfer fees to verify compliance and prevent points deduction penalties
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSimulatedTransferSpend(0);
                      setSimulatedPlayerSales(0);
                    }}
                    className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-white/5 border border-white/10 cursor-pointer"
                  >
                    Reset Simulator
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Simulate Transfer Outlay (Acquisitions):</span>
                      <strong className="text-rose-400 font-mono">£{simulatedTransferSpend}.0M</strong>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      step="1"
                      value={simulatedTransferSpend}
                      onChange={(e) => setSimulatedTransferSpend(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>£0M</span>
                      <span>£10M</span>
                      <span>£20M</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Simulate Player Sales (Capital Inflow):</span>
                      <strong className="text-emerald-400 font-mono">+£{simulatedPlayerSales}.0M</strong>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="25"
                      step="1"
                      value={simulatedPlayerSales}
                      onChange={(e) => setSimulatedPlayerSales(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>£0M</span>
                      <span>£12.5M</span>
                      <span>£25M</span>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-3.5 rounded-xl border text-xs flex items-center justify-between ${
                    currentPsrMargin < 0
                      ? "bg-rose-500/10 border-rose-500/30 text-rose-300"
                      : currentPsrMargin < 5
                      ? "bg-amber-400/10 border-amber-400/30 text-amber-300"
                      : "bg-[#0fa05c]/10 border-[#0fa05c]/30 text-emerald-300"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {currentPsrMargin < 0 ? (
                      <AlertTriangle className="size-5 text-rose-400 shrink-0" />
                    ) : (
                      <CheckCircle2 className="size-5 text-[#0fa05c] shrink-0" />
                    )}
                    <div>
                      <strong className="text-white block font-bold">
                        {currentPsrMargin < 0
                          ? "REGULATORY BREACH DETECTED: -£" + Math.abs(currentPsrMargin) + "M Margin"
                          : "PSR COMPLIANCE ASSURED: +£" + currentPsrMargin + "M Cushion"}
                      </strong>
                      <p className="text-[11px] opacity-90 mt-0.5">
                        {currentPsrMargin < 0
                          ? "This transfer outlay triggers EFL Rule 16.4 investigation with potential 6 to 9 point league deduction."
                          : "Club retains full financial compliance cushion under EFL Championship and UEFA Financial Fair Play directives."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "training" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0d141e] border border-white/10 rounded-2xl p-4">
                <div>
                  <h1 className="text-xl font-bold text-white">Catapult / STATSports GPS Training Telemetry</h1>
                  <p className="text-xs text-slate-400 mt-0.5">Weekly high-speed running meters, sprint volume, and neuromuscular readiness</p>
                </div>
                <span className="text-xs bg-[#0fa05c]/15 text-[#0fa05c] border border-[#0fa05c]/30 px-3 py-1.5 rounded-lg font-bold">
                  Squad Readiness: 94.2%
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-4">
                  <p className="text-xs text-slate-400 uppercase font-bold">High Speed Running (Squad Avg)</p>
                  <p className="text-3xl font-bold text-white mt-1">784 m</p>
                  <p className="text-xs text-emerald-400 mt-1">Optimal match intensity calibration</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-4">
                  <p className="text-xs text-slate-400 uppercase font-bold">Sprint Volume (&gt;25.2 km/h)</p>
                  <p className="text-3xl font-bold text-white mt-1">34 sprints</p>
                  <p className="text-xs text-slate-400 mt-1">K. Mensah peak speed: 34.8 km/h</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-4">
                  <p className="text-xs text-slate-400 uppercase font-bold">Squad Wellness Score</p>
                  <p className="text-3xl font-bold text-[#0fa05c] mt-1">8.8 / 10</p>
                  <p className="text-xs text-slate-400 mt-1">Sleep quality, soreness, & hydration index</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "academy" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0d141e] border border-white/10 rounded-2xl p-4">
                <div>
                  <h1 className="text-xl font-bold text-white">Youth Academy & Development Pathways</h1>
                  <p className="text-xs text-slate-400 mt-0.5">U21, U18, and U16 age group progression with Individual Development Plans (IDPs)</p>
                </div>
                <span className="text-xs bg-[#0fa05c]/15 text-[#0fa05c] border border-[#0fa05c]/30 px-3 py-1.5 rounded-lg font-bold">
                  64 Academy Scholars Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-5 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-[#0fa05c] bg-[#0fa05c]/15 px-2 py-0.5 rounded">U21 Development Squad</span>
                  <h3 className="text-base font-bold text-white">18 Players Enrolled</h3>
                  <p className="text-xs text-slate-400">3 players training with 1st team squad on permanent basis (including S. Eto&apos;o Jr)</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-5 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-[#0fa05c] bg-[#0fa05c]/15 px-2 py-0.5 rounded">U18 Youth Scholars</span>
                  <h3 className="text-base font-bold text-white">22 Players Enrolled</h3>
                  <p className="text-xs text-slate-400">FA Youth Cup Semifinalists · 4 professional contracts pending sign-off</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#0d141e] p-5 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-[#0fa05c] bg-[#0fa05c]/15 px-2 py-0.5 rounded">U16 Foundation Phase</span>
                  <h3 className="text-base font-bold text-white">24 Players Enrolled</h3>
                  <p className="text-xs text-slate-400">Bio-banding growth spurt and technical ball-mastery tracking cycles</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "calendar" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0d141e] border border-white/10 rounded-2xl p-4">
                <div>
                  <h1 className="text-xl font-bold text-white">Club Operations Schedule</h1>
                  <p className="text-xs text-slate-400 mt-0.5">Integrated fixtures, training cycles, travel logistics, and medical assessments</p>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0d141e] p-4 space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="size-5 text-[#0fa05c]" />
                    <div>
                      <strong className="text-white text-xs">Tomorrow · 10:00 - 12:00</strong>
                      <p className="text-[11px] text-slate-400">Pre-Match Tactical Preparation & Set Piece Drills</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">First Team</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#0fa05c]/10 border border-[#0fa05c]/30">
                  <div className="flex items-center gap-3">
                    <Trophy className="size-5 text-[#0fa05c]" />
                    <div>
                      <strong className="text-white text-xs">Saturday · 15:00 Kickoff</strong>
                      <p className="text-[11px] text-slate-300">Matchday 22: Riverside FC vs Lakeside United (Riverside Stadium)</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#0fa05c] text-white font-bold">Matchday</span>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {selectedPlayerModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b131e] border border-white/20 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl space-y-4 p-6">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-[#0fa05c] text-white font-mono font-bold text-lg flex items-center justify-center shadow-lg">
                  #{selectedPlayerModal.number}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">{selectedPlayerModal.name}</h2>
                  <p className="text-xs text-slate-400">{selectedPlayerModal.position} · {selectedPlayerModal.role} · {selectedPlayerModal.nationality}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPlayerModal(null)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center">
              <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                <span className="text-[10px] text-slate-400">PACE</span>
                <p className="text-base font-bold text-white mt-0.5">{selectedPlayerModal.pace}</p>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                <span className="text-[10px] text-slate-400">SHOT</span>
                <p className="text-base font-bold text-white mt-0.5">{selectedPlayerModal.shooting}</p>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                <span className="text-[10px] text-slate-400">PASS</span>
                <p className="text-base font-bold text-white mt-0.5">{selectedPlayerModal.passing}</p>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                <span className="text-[10px] text-slate-400">DRIBBLE</span>
                <p className="text-base font-bold text-white mt-0.5">{selectedPlayerModal.dribbling}</p>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                <span className="text-[10px] text-slate-400">DEFEND</span>
                <p className="text-base font-bold text-white mt-0.5">{selectedPlayerModal.defending}</p>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                <span className="text-[10px] text-slate-400">PHYSICAL</span>
                <p className="text-base font-bold text-white mt-0.5">{selectedPlayerModal.physical}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-black/40 p-3 rounded-xl border border-white/5">
              <div>
                <span className="text-slate-400 text-[10px]">Market Valuation:</span>
                <p className="font-mono font-bold text-emerald-400">{selectedPlayerModal.marketValue}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Weekly Wage:</span>
                <p className="font-mono font-bold text-white">{selectedPlayerModal.wage}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Contract Expiry:</span>
                <p className="font-mono font-bold text-white">{selectedPlayerModal.contractUntil}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">ACWR Risk:</span>
                <p className="font-mono font-bold text-cyan-300">{selectedPlayerModal.acwr} Ratio</p>
              </div>
            </div>

            <div className="p-3 bg-[#0d1722] rounded-xl border border-white/5 text-xs">
              <strong className="text-white text-[11px] uppercase tracking-wider block mb-1">Coaching Staff & Medical Evaluation:</strong>
              <p className="text-slate-300 leading-relaxed">{selectedPlayerModal.notes}</p>
            </div>
          </div>
        </div>
      )}

      {selectedScoutTarget && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b131e] border border-white/20 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-[#0fa05c]/20 text-[#0fa05c] border border-[#0fa05c]/30 px-2 py-0.5 rounded font-bold">
                    Grade {selectedScoutTarget.scoutGrade} ({selectedScoutTarget.scoutScore}/10)
                  </span>
                  <span className="text-xs text-slate-400">{selectedScoutTarget.position} · Age {selectedScoutTarget.age}</span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1">{selectedScoutTarget.name}</h2>
                <p className="text-xs text-slate-400">{selectedScoutTarget.currentClub} · {selectedScoutTarget.country}</p>
              </div>
              <button
                onClick={() => setSelectedScoutTarget(null)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-black/40 p-3 rounded-xl border border-white/5">
              <div>
                <span className="text-slate-400 text-[10px]">Estimated Valuation:</span>
                <p className="font-mono font-bold text-emerald-400">{selectedScoutTarget.marketValue}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Estimated Wage:</span>
                <p className="font-mono font-bold text-white">{selectedScoutTarget.estWage}</p>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 uppercase font-bold">Verified Key Strengths:</span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {selectedScoutTarget.keyStrengths.map((str, idx) => (
                  <span key={idx} className="text-xs bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-2.5 py-1 rounded-md">
                    ✓ {str}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 bg-[#0d1722] rounded-xl border border-white/5 text-xs space-y-1">
              <strong className="text-white text-[11px] uppercase tracking-wider block">Senior Scout Assessment:</strong>
              <p className="text-slate-300 leading-relaxed">{selectedScoutTarget.notes}</p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => alert("Chief Scout dispatched to watch " + selectedScoutTarget.name + " at next fixture.")}
                className="flex-1 bg-[#0fa05c] hover:bg-[#0fa05c]/90 text-white font-bold py-2 px-3 rounded-lg text-xs shadow cursor-pointer text-center"
              >
                Dispatch Chief Scout
              </button>
              <button
                onClick={() => setSelectedScoutTarget(null)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showDossierModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b131e] border border-white/20 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
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

            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300 font-sans">
              <div className="border-b border-white/10 pb-4 flex justify-between items-center">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#0fa05c]">RIVERSIDE FOOTBALL CLUB · CONFIDENTIAL</span>
                  <h2 className="text-xl font-black text-white mt-1">TACTICAL BRIEFING: VS LAKESIDE UNITED</h2>
                  <p className="text-slate-400 text-xs">Kickoff: Saturday 15:00 GMT · Riverside Stadium</p>
                </div>
                <div className="text-right font-mono text-[11px]">
                  <p className="text-white font-bold">Formation: {formation}</p>
                  <p className="text-emerald-400">Match Readiness: 94.2%</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2">
                <h4 className="font-bold text-white uppercase text-[11px] text-[#0fa05c]">Confirmed Starting XI</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  {starters.map((p) => (
                    <div key={p.id}><strong className="text-white">{p.position}:</strong> {p.name} (#{p.number})</div>
                  ))}
                </div>
              </div>

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
