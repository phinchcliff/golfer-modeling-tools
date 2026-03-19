import { useState, useMemo } from "react";

const RAW_FIELD_DATA = [
  { dg_id: 19895, player_name: "Schauffele, Xander", country: "USA", dg_rank: 7,  owgr_rank: 7,   sg_ott: 0.682, sg_app: 0.901, sg_arg: 0.289, sg_putt: 0.441, sg_total: 2.313, driving_dist: 7.2,  driving_acc: 0.041, win: 0.078, top_5: 0.241, top_10: 0.369, top_20: 0.533, make_cut: 0.829 },
  { dg_id: 17646, player_name: "Fitzpatrick, Matt",  country: "ENG", dg_rank: 8,  owgr_rank: 15,  sg_ott: 0.521, sg_app: 0.876, sg_arg: 0.312, sg_putt: 0.389, sg_total: 2.098, driving_dist: 4.1,  driving_acc: 0.089, win: 0.063, top_5: 0.218, top_10: 0.344, top_20: 0.512, make_cut: 0.833 },
  { dg_id: 29433, player_name: "Bridgeman, Jacob",  country: "USA", dg_rank: 17, owgr_rank: 20,  sg_ott: 0.712, sg_app: 0.654, sg_arg: 0.198, sg_putt: 0.523, sg_total: 2.087, driving_dist: 9.8,  driving_acc: 0.031, win: 0.058, top_5: 0.198, top_10: 0.321, top_20: 0.489, make_cut: 0.812 },
  { dg_id: 26096, player_name: "Bhatia, Akshay",    country: "USA", dg_rank: 14, owgr_rank: 22,  sg_ott: 0.834, sg_app: 0.712, sg_arg: 0.156, sg_putt: 0.298, sg_total: 2.000, driving_dist: 12.4, driving_acc: 0.021, win: 0.052, top_5: 0.187, top_10: 0.309, top_20: 0.471, make_cut: 0.801 },
  { dg_id: 17536, player_name: "Spaun, J.J.",        country: "USA", dg_rank: 27, owgr_rank: 12,  sg_ott: 0.589, sg_app: 0.743, sg_arg: 0.267, sg_putt: 0.312, sg_total: 1.911, driving_dist: 5.6,  driving_acc: 0.067, win: 0.044, top_5: 0.163, top_10: 0.278, top_20: 0.434, make_cut: 0.789 },
  { dg_id: 23602, player_name: "Hojgaard, Nicolai", country: "DEN", dg_rank: 31, owgr_rank: 47,  sg_ott: 0.623, sg_app: 0.698, sg_arg: 0.234, sg_putt: 0.334, sg_total: 1.889, driving_dist: 6.8,  driving_acc: 0.054, win: 0.041, top_5: 0.158, top_10: 0.271, top_20: 0.423, make_cut: 0.782 },
  { dg_id: 14636, player_name: "Spieth, Jordan",     country: "USA", dg_rank: 35, owgr_rank: 64,  sg_ott: 0.312, sg_app: 0.623, sg_arg: 0.445, sg_putt: 0.489, sg_total: 1.869, driving_dist: -1.2, driving_acc: 0.112, win: 0.038, top_5: 0.152, top_10: 0.263, top_20: 0.412, make_cut: 0.776 },
  { dg_id: 14139, player_name: "Thomas, Justin",    country: "USA", dg_rank: 38, owgr_rank: 14,  sg_ott: 0.534, sg_app: 0.712, sg_arg: 0.289, sg_putt: 0.298, sg_total: 1.833, driving_dist: 3.4,  driving_acc: 0.078, win: 0.035, top_5: 0.145, top_10: 0.251, top_20: 0.398, make_cut: 0.771 },
  { dg_id: 13126, player_name: "Taylor, Nick",      country: "CAN", dg_rank: 39, owgr_rank: 62,  sg_ott: 0.489, sg_app: 0.667, sg_arg: 0.312, sg_putt: 0.345, sg_total: 1.813, driving_dist: 2.8,  driving_acc: 0.082, win: 0.033, top_5: 0.141, top_10: 0.245, top_20: 0.389, make_cut: 0.768 },
  { dg_id: 23014, player_name: "Theegala, Sahith",  country: "USA", dg_rank: 40, owgr_rank: 73,  sg_ott: 0.712, sg_app: 0.589, sg_arg: 0.198, sg_putt: 0.289, sg_total: 1.788, driving_dist: 8.9,  driving_acc: 0.038, win: 0.031, top_5: 0.136, top_10: 0.238, top_20: 0.381, make_cut: 0.763 },
  { dg_id: 17576, player_name: "Conners, Corey",    country: "CAN", dg_rank: 42, owgr_rank: 40,  sg_ott: 0.445, sg_app: 0.756, sg_arg: 0.178, sg_putt: 0.389, sg_total: 1.768, driving_dist: 1.9,  driving_acc: 0.098, win: 0.029, top_5: 0.131, top_10: 0.231, top_20: 0.371, make_cut: 0.758 },
  { dg_id: 17780, player_name: "Pendrith, Taylor",  country: "CAN", dg_rank: 44, owgr_rank: 66,  sg_ott: 0.867, sg_app: 0.534, sg_arg: 0.145, sg_putt: 0.198, sg_total: 1.744, driving_dist: 14.2, driving_acc: 0.018, win: 0.027, top_5: 0.126, top_10: 0.223, top_20: 0.361, make_cut: 0.752 },
  { dg_id: 23838, player_name: "Hojgaard, Rasmus",  country: "DEN", dg_rank: 47, owgr_rank: 53,  sg_ott: 0.578, sg_app: 0.623, sg_arg: 0.267, sg_putt: 0.267, sg_total: 1.735, driving_dist: 5.1,  driving_acc: 0.071, win: 0.025, top_5: 0.122, top_10: 0.217, top_20: 0.353, make_cut: 0.748 },
  { dg_id: 28635, player_name: "McCarty, Matt",     country: "USA", dg_rank: 50, owgr_rank: 43,  sg_ott: 0.534, sg_app: 0.612, sg_arg: 0.289, sg_putt: 0.278, sg_total: 1.713, driving_dist: 3.8,  driving_acc: 0.076, win: 0.023, top_5: 0.118, top_10: 0.210, top_20: 0.344, make_cut: 0.743 },
  { dg_id: 15466, player_name: "Cantlay, Patrick",  country: "USA", dg_rank: 24, owgr_rank: 35,  sg_ott: 0.389, sg_app: 0.698, sg_arg: 0.312, sg_putt: 0.298, sg_total: 1.697, driving_dist: -0.4, driving_acc: 0.094, win: 0.021, top_5: 0.114, top_10: 0.203, top_20: 0.335, make_cut: 0.738 },
  { dg_id: 18841, player_name: "Hovland, Viktor",   country: "NOR", dg_rank: 16, owgr_rank: 18,  sg_ott: 0.623, sg_app: 0.589, sg_arg: 0.245, sg_putt: 0.223, sg_total: 1.680, driving_dist: 7.6,  driving_acc: 0.048, win: 0.019, top_5: 0.110, top_10: 0.196, top_20: 0.326, make_cut: 0.733 },
  { dg_id: 18554, player_name: "Rai, Aaron",        country: "ENG", dg_rank: 67, owgr_rank: 38,  sg_ott: 0.412, sg_app: 0.667, sg_arg: 0.289, sg_putt: 0.289, sg_total: 1.657, driving_dist: 0.8,  driving_acc: 0.088, win: 0.018, top_5: 0.106, top_10: 0.190, top_20: 0.317, make_cut: 0.728 },
  { dg_id: 23465, player_name: "Greyserman, Max",   country: "USA", dg_rank: 71, owgr_rank: 56,  sg_ott: 0.489, sg_app: 0.623, sg_arg: 0.234, sg_putt: 0.298, sg_total: 1.644, driving_dist: 2.3,  driving_acc: 0.081, win: 0.016, top_5: 0.102, top_10: 0.183, top_20: 0.308, make_cut: 0.723 },
  { dg_id: 16243, player_name: "Koepka, Brooks",    country: "USA", dg_rank: 96, owgr_rank: 173, sg_ott: 0.712, sg_app: 0.534, sg_arg: 0.156, sg_putt: 0.212, sg_total: 1.614, driving_dist: 9.1,  driving_acc: 0.035, win: 0.015, top_5: 0.098, top_10: 0.176, top_20: 0.299, make_cut: 0.718 },
  { dg_id: 17539, player_name: "Homa, Max",         country: "USA", dg_rank: 77, owgr_rank: 142, sg_ott: 0.445, sg_app: 0.612, sg_arg: 0.267, sg_putt: 0.267, sg_total: 1.591, driving_dist: 1.6,  driving_acc: 0.085, win: 0.013, top_5: 0.094, top_10: 0.169, top_20: 0.289, make_cut: 0.712 },
];

// Deduplicate by dg_id — always keep first occurrence
const FIELD_DATA = Array.from(
  RAW_FIELD_DATA.reduce((map, player) => {
    if (!map.has(player.dg_id)) map.set(player.dg_id, player);
    return map;
  }, new Map()).values()
);

const WEIGHT_CATEGORIES = [
  { key: "sg_app",       label: "SG: Approach",      color: "#0ea5e9", description: "Strokes gained on approach shots" },
  { key: "sg_ott",       label: "SG: Off the Tee",   color: "#10b981", description: "Strokes gained driving" },
  { key: "sg_putt",      label: "SG: Putting",       color: "#8b5cf6", description: "Strokes gained on the greens" },
  { key: "sg_arg",       label: "SG: Around Green",  color: "#f59e0b", description: "Strokes gained chipping/pitching" },
  { key: "driving_dist", label: "Driving Distance",  color: "#06b6d4", description: "Raw distance off the tee" },
  { key: "driving_acc",  label: "Driving Accuracy",  color: "#ec4899", description: "Fairways hit percentage" },
];

const DEFAULT_WEIGHTS = { sg_app: 30, sg_ott: 25, sg_putt: 25, sg_arg: 10, driving_dist: 5, driving_acc: 5 };

const PRESETS = [
  { name: "Balanced",          weights: { sg_app: 30, sg_ott: 25, sg_putt: 25, sg_arg: 10, driving_dist: 5,  driving_acc: 5  } },
  { name: "Bomber Course",     weights: { sg_app: 20, sg_ott: 40, sg_putt: 15, sg_arg: 5,  driving_dist: 15, driving_acc: 5  } },
  { name: "Approach Heavy",    weights: { sg_app: 45, sg_ott: 20, sg_putt: 20, sg_arg: 10, driving_dist: 3,  driving_acc: 2  } },
  { name: "Links Style",       weights: { sg_app: 25, sg_ott: 30, sg_putt: 20, sg_arg: 15, driving_dist: 5,  driving_acc: 5  } },
  { name: "Putter's Paradise", weights: { sg_app: 20, sg_ott: 15, sg_putt: 45, sg_arg: 15, driving_dist: 3,  driving_acc: 2  } },
];

function normalize(players, weights) {
  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  if (totalWeight === 0) return players;
  const stats = {};
  WEIGHT_CATEGORIES.forEach(({ key }) => {
    const vals = players.map(p => p[key]).filter(v => v != null);
    const min = Math.min(...vals), max = Math.max(...vals);
    stats[key] = { min, range: max - min || 1 };
  });
  return players.map(p => {
    let score = 0;
    WEIGHT_CATEGORIES.forEach(({ key }) => {
      score += ((p[key] - stats[key].min) / stats[key].range) * (weights[key] / totalWeight);
    });
    return { ...p, modelScore: score };
  }).sort((a, b) => b.modelScore - a.modelScore);
}

const fmt  = val => `${(val * 100).toFixed(1)}%`;
const fmtSG = val => val >= 0 ? `+${val.toFixed(3)}` : val.toFixed(3);

export default function App() {
  const [weights, setWeights]               = useState(DEFAULT_WEIGHTS);
  const [activePreset, setActivePreset]     = useState("Balanced");
  const [sortKey, setSortKey]               = useState("modelScore");
  const [expandedPlayer, setExpandedPlayer] = useState(null);
  const [searchQuery, setSearchQuery]       = useState("");

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  const weightOk    = totalWeight === 100;

  const baselineRanks = useMemo(() => {
    const sorted = [...FIELD_DATA].sort((a, b) => b.win - a.win);
    return Object.fromEntries(sorted.map((p, i) => [p.dg_id, i + 1]));
  }, []);

  const modelRanks = useMemo(() => {
    const sorted = normalize(FIELD_DATA, weights);
    return Object.fromEntries(sorted.map((p, i) => [p.dg_id, i + 1]));
  }, [weights]);

  const rankedPlayers = useMemo(() => {
    let players = normalize(FIELD_DATA, weights);
    if (searchQuery) players = players.filter(p =>
      p.player_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.country.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (sortKey !== "modelScore") players = [...players].sort((a, b) => b[sortKey] - a[sortKey]);
    return players;
  }, [weights, sortKey, searchQuery]);

  const handleWeight = (key, val) => { setWeights(prev => ({ ...prev, [key]: Number(val) })); setActivePreset(null); };
  const applyPreset  = preset => { setWeights(preset.weights); setActivePreset(preset.name); };
  const getRankDelta = player => baselineRanks[player.dg_id] - modelRanks[player.dg_id];

  const COL = "36px 44px 1fr 80px 68px 68px 68px 68px 72px";

  return (
    <div style={{ minHeight: "100vh", background: "#f4f4f4", color: "#1a1a2e", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>

      {/* ── Header ── */}
      <div style={{
        background: "#fff", borderBottom: "1px solid #e4e4e4",
        padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: 36, height: 36, borderRadius: "9px",
            background: "linear-gradient(135deg,#0ea5e9,#10b981)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "17px",
          }}>⛳</div>
          <div>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "#111827", letterSpacing: "-0.3px" }}>Golf Model</div>
            <div style={{ fontSize: "11px", color: "#9ca3af" }}>Valspar Championship · Copperhead Course</div>
          </div>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: "6px",
          background: "#f0fdf4", borderRadius: "20px", padding: "5px 12px",
          fontSize: "12px", color: "#16a34a", border: "1px solid #bbf7d0",
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16a34a", display: "inline-block" }} />
          {FIELD_DATA.length} players · Live
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "310px 1fr", minHeight: "calc(100vh - 65px)" }}>

        {/* ── Left Panel ── */}
        <div style={{
          background: "#fff", borderRight: "1px solid #e4e4e4",
          padding: "22px 18px", overflowY: "auto",
          maxHeight: "calc(100vh - 65px)", position: "sticky", top: "65px",
        }}>

          {/* Weight bar */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "7px" }}>
              <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1px", color: "#6b7280", textTransform: "uppercase" }}>Weight Allocation</span>
              <span style={{ fontSize: "12px", fontWeight: 700, color: weightOk ? "#16a34a" : "#dc2626" }}>{totalWeight}%</span>
            </div>
            <div style={{ height: "5px", background: "#f3f4f6", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${Math.min(totalWeight, 100)}%`,
                background: weightOk ? "linear-gradient(90deg,#0ea5e9,#10b981)" : "#dc2626",
                borderRadius: "3px", transition: "width 0.2s, background 0.2s",
              }} />
            </div>
            {!weightOk && <div style={{ fontSize: "11px", color: "#dc2626", marginTop: "5px" }}>Weights must sum to 100%</div>}
          </div>

          {/* Presets */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1px", color: "#6b7280", textTransform: "uppercase", marginBottom: "9px" }}>Course Presets</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {PRESETS.map(p => (
                <button key={p.name} onClick={() => applyPreset(p)} style={{
                  padding: "5px 11px", borderRadius: "20px", fontFamily: "inherit",
                  border: `1.5px solid ${activePreset === p.name ? "#0ea5e9" : "#e5e7eb"}`,
                  background: activePreset === p.name ? "#eff6ff" : "#f9fafb",
                  color: activePreset === p.name ? "#0369a1" : "#4b5563",
                  fontSize: "12px", fontWeight: activePreset === p.name ? 600 : 400,
                  cursor: "pointer", transition: "all 0.15s",
                }}>{p.name}</button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1px", color: "#6b7280", textTransform: "uppercase", marginBottom: "13px" }}>Category Weights</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {WEIGHT_CATEGORIES.map(({ key, label, color, description }) => (
              <div key={key}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "7px" }}>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{label}</div>
                    <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "1px" }}>{description}</div>
                  </div>
                  <div style={{
                    fontSize: "14px", fontWeight: 700, color,
                    background: `${color}18`, borderRadius: "6px",
                    padding: "2px 8px", minWidth: "34px", textAlign: "center",
                  }}>{weights[key]}</div>
                </div>
                <input type="range" min={0} max={100} value={weights[key]}
                  onChange={e => handleWeight(key, e.target.value)}
                  style={{ width: "100%", accentColor: color, cursor: "pointer" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div style={{ padding: "20px 22px" }}>

          {/* Toolbar */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
            <input type="text" placeholder="Search player or country..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                flex: 1, background: "#fff", border: "1px solid #e5e7eb",
                borderRadius: "8px", padding: "8px 13px", color: "#111827",
                fontSize: "13px", fontFamily: "inherit", outline: "none",
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              }}
            />
            <select value={sortKey} onChange={e => setSortKey(e.target.value)} style={{
              background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px",
              padding: "8px 13px", color: "#374151", fontSize: "12px",
              fontFamily: "inherit", cursor: "pointer", outline: "none",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}>
              <option value="modelScore">Sort: Model Score</option>
              <option value="win">Sort: Win %</option>
              <option value="top_10">Sort: Top 10 %</option>
              <option value="make_cut">Sort: Make Cut %</option>
              <option value="sg_total">Sort: SG Total</option>
            </select>
          </div>

          {/* Column headers */}
          <div style={{
            display: "grid", gridTemplateColumns: COL, gap: "6px",
            padding: "7px 13px", fontSize: "10px", fontWeight: 600,
            letterSpacing: "1px", color: "#9ca3af", textTransform: "uppercase", marginBottom: "4px",
          }}>
            <div>#</div><div>±</div><div>Player</div>
            <div style={{ textAlign: "right" }}>Score</div>
            <div style={{ textAlign: "right" }}>Win</div>
            <div style={{ textAlign: "right" }}>Top 10</div>
            <div style={{ textAlign: "right" }}>Cut</div>
            <div style={{ textAlign: "right" }}>SG Tot</div>
            <div style={{ textAlign: "right" }}>DG Rank</div>
          </div>

          {/* Rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            {rankedPlayers.map((player, index) => {
              const delta      = getRankDelta(player);
              const isExpanded = expandedPlayer === player.dg_id;
              const rank       = index + 1;
              const isTop3     = rank <= 3;

              return (
                <div key={player.dg_id}>
                  <div
                    onClick={() => setExpandedPlayer(isExpanded ? null : player.dg_id)}
                    style={{
                      display: "grid", gridTemplateColumns: COL, gap: "6px",
                      padding: "11px 13px", alignItems: "center", cursor: "pointer",
                      background: isExpanded ? "#eff6ff" : isTop3 ? "#f0fdf4" : "#fff",
                      border: `1px solid ${isExpanded ? "#bfdbfe" : isTop3 ? "#bbf7d0" : "#e9e9e9"}`,
                      borderRadius: isExpanded ? "9px 9px 0 0" : "8px",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                      transition: "box-shadow 0.15s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 3px 8px rgba(0,0,0,0.09)"; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.04)"; }}
                  >
                    <div style={{ fontSize: "14px", fontWeight: 700, color: rank === 1 ? "#0ea5e9" : rank === 2 ? "#10b981" : rank === 3 ? "#8b5cf6" : "#9ca3af" }}>{rank}</div>
                    <div style={{ fontSize: "11px", fontWeight: 700, textAlign: "center", color: delta > 0 ? "#16a34a" : delta < 0 ? "#dc2626" : "#d1d5db" }}>
                      {delta > 0 ? `▲${delta}` : delta < 0 ? `▼${Math.abs(delta)}` : "—"}
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{player.player_name}</div>
                      <div style={{ fontSize: "10px", color: "#9ca3af", marginTop: "1px" }}>{player.country}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ display: "inline-block", background: "#eff6ff", borderRadius: "5px", padding: "2px 8px", fontSize: "12px", fontWeight: 700, color: "#0369a1" }}>
                        {(player.modelScore * 100).toFixed(1)}
                      </span>
                    </div>
                    <div style={{ textAlign: "right", fontSize: "12px", color: "#374151" }}>{fmt(player.win)}</div>
                    <div style={{ textAlign: "right", fontSize: "12px", color: "#374151" }}>{fmt(player.top_10)}</div>
                    <div style={{ textAlign: "right", fontSize: "12px", color: "#374151" }}>{fmt(player.make_cut)}</div>
                    <div style={{ textAlign: "right", fontSize: "12px", color: "#374151" }}>{fmtSG(player.sg_total)}</div>
                    <div style={{ textAlign: "right", fontSize: "12px", color: "#9ca3af" }}>#{player.dg_rank}</div>
                  </div>

                  {isExpanded && (
                    <div style={{
                      background: "#f8fafc", border: "1px solid #bfdbfe",
                      borderTop: "none", borderRadius: "0 0 9px 9px", padding: "15px 17px",
                    }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "9px", marginBottom: "10px" }}>
                        {WEIGHT_CATEGORIES.map(({ key, label, color }) => (
                          <div key={key} style={{ background: "#fff", borderRadius: "8px", padding: "11px", border: "1px solid #e5e7eb" }}>
                            <div style={{ fontSize: "10px", color: "#9ca3af", fontWeight: 600, letterSpacing: "0.5px", marginBottom: "3px" }}>{label}</div>
                            <div style={{ fontSize: "16px", fontWeight: 700, color }}>
                              {key.startsWith("sg_") ? fmtSG(player[key]) : player[key].toFixed(3)}
                            </div>
                            <div style={{ fontSize: "10px", color: "#d1d5db", marginTop: "2px" }}>Weight: {weights[key]}%</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "7px" }}>
                        {[["Win", player.win], ["Top 5", player.top_5], ["Top 10", player.top_10], ["Top 20", player.top_20]].map(([label, val]) => (
                          <div key={label} style={{ background: "#fff", borderRadius: "8px", padding: "9px", border: "1px solid #e5e7eb", textAlign: "center" }}>
                            <div style={{ fontSize: "10px", color: "#9ca3af", fontWeight: 600, marginBottom: "3px" }}>{label}</div>
                            <div style={{ fontSize: "14px", fontWeight: 700, color: "#0369a1" }}>{fmt(val)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
