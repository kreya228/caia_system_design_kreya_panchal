import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import DashboardLayout from '../layouts/DashboardLayout';
import NotFound from '../pages/errors/NotFound';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ── All dashboard pages live under the reusable DashboardLayout ── */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* Default index — System Overview */}
        <Route index element={<DashboardIndex />} />

        {/* Stub sub-routes — replace with real page components in future PRs */}
        <Route path="concepts"   element={<ComingSoonPage title="Concepts"       description="Browse and manage all system design concepts." />} />
        <Route path="categories" element={<ComingSoonPage title="Categories"     description="View and organise concept categories." />} />
        <Route path="search"     element={<ComingSoonPage title="Search"         description="Full-text search across all CAIA knowledge nodes." />} />
        <Route path="analytics"  element={<ComingSoonPage title="Analytics"      description="Query telemetry, trend analysis, and performance insights." />} />
        <Route path="docs"       element={<ComingSoonPage title="Documentation"  description="API reference, integration guides, and system documentation." />} />
        <Route path="settings"   element={<ComingSoonPage title="Settings"       description="Configure workspace preferences, API keys, and system parameters." />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Dashboard Index Page — System Overview
   ───────────────────────────────────────────────────────────────────────────── */
function DashboardIndex() {
  return (
    <div className="space-y-8 animate-fade-in pb-12">

      {/* Hero Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            System Overview
          </h1>
          <p className="text-sm text-[#94A3B8] mt-1">
            Manage active AI pipelines, review cluster telemetry, and test consensus layers.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-[rgba(255,255,255,0.08)] hover:bg-white/[0.08] text-xs font-semibold transition-all">
            Export Schema
          </button>
          <button className="btn-gradient text-xs font-semibold px-4 py-2.5">
            + Create Workspace
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total Queries',       value: '1,248,391', sub: 'Last 24 hours',          badge: '+12.4%', badgeColor: '#22C55E' },
          { label: 'Consensus Nodes',     value: '12 / 12',   sub: 'Active nodes online',     badge: 'Stable',  badgeColor: '#22C55E' },
          { label: 'Memory Cache Ratio',  value: '98.4%',     sub: 'L1/L2 hits combined',    badge: '-0.4%',   badgeColor: '#EF4444' },
          { label: 'Operational Status',  value: '99.98%',    sub: 'Monthly uptime average', badge: 'Normal',  badgeColor: '#06B6D4' },
        ].map((kpi) => (
          <div key={kpi.label} className="glass-card p-6 bg-white/[0.03] flex flex-col justify-between min-h-[120px]">
            <div className="flex justify-between items-center text-xs text-[#94A3B8]">
              <span>{kpi.label}</span>
              <span
                className="px-2 py-0.5 rounded-md font-mono font-semibold"
                style={{ color: kpi.badgeColor, background: `${kpi.badgeColor}1a` }}
              >
                {kpi.badge}
              </span>
            </div>
            <div className="text-2xl font-bold mt-2">{kpi.value}</div>
            <span className="text-[10px] text-[#475569] mt-1">{kpi.sub}</span>
          </div>
        ))}
      </div>

      {/* Analytics + AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mock Chart */}
        <div className="glass-card p-6 bg-white/[0.03] lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-base text-white">Execution Metrics</h2>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6366f1]" aria-hidden="true" />
              <span className="text-xs text-[#94A3B8] font-mono mr-4">Write API</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4]" aria-hidden="true" />
              <span className="text-xs text-[#94A3B8] font-mono">Read API</span>
            </div>
          </div>
          <div className="h-56 flex items-end justify-between gap-1 pt-4 border-b border-white/[0.06] relative" aria-label="Execution metrics bar chart">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5" aria-hidden="true">
              {[0,1,2,3].map(i => <div key={i} className="border-b border-white w-full" />)}
            </div>
            <div className="w-full flex justify-around items-end h-full px-2 z-10">
              {[50, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((val, idx) => (
                <div key={idx} className="flex flex-col items-center w-6 sm:w-8">
                  <div className="w-full space-y-0.5">
                    <div className="bg-[#6366f1] hover:bg-[#818cf8] rounded-t-sm w-full transition-all duration-300" style={{ height: `${val * 1.2}px` }} />
                    <div className="bg-[#06b6d4] hover:bg-[#22d3ee] rounded-t-sm w-full transition-all duration-300" style={{ height: `${val * 0.6}px` }} />
                  </div>
                  <span className="text-[9px] text-[#475569] font-mono mt-1.5">M{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="glass-card p-6 bg-white/[0.03] space-y-4">
          <h2 className="font-bold text-base text-white flex items-center gap-2" aria-label="AI Insights">
            ✨ AI Insights
          </h2>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-[#6366f1]/5 border border-[#6366f1]/10 space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-[#818cf8]">
                <span>Scaling Recommended</span>
                <span>Now</span>
              </div>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                Read API requests spikes detected at node C4. Recommend scaling secondary read replication layers.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-[#22d3ee]">
                <span>Optimization Ready</span>
                <span>2h ago</span>
              </div>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                Indexing optimization suggested on cluster <code>caia-core-prod</code> for cache improvements.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Infra Nodes Table + Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6 bg-white/[0.03] lg:col-span-2 space-y-4">
          <h2 className="font-bold text-base text-white">Active Infrastructure Nodes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06] text-[#475569] uppercase font-mono tracking-wider">
                  <th className="py-3 px-4">Node Name</th>
                  <th className="py-3 px-4">Consensus</th>
                  <th className="py-3 px-4">Load Factor</th>
                  <th className="py-3 px-4">Telemetry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {[
                  { name: 'caia-alpha-01', consensus: 'Raft',  load: '32%', status: 'Nominal',   color: '#22C55E' },
                  { name: 'caia-beta-02',  consensus: 'Paxos', load: '68%', status: 'High Load', color: '#F59E0B' },
                  { name: 'caia-gamma-03', consensus: 'Raft',  load: '14%', status: 'Nominal',   color: '#22C55E' },
                  { name: 'caia-delta-04', consensus: 'Paxos', load: '89%', status: 'Review',    color: '#EF4444' },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 font-mono font-medium text-white">{item.name}</td>
                    <td className="py-4 px-4 text-[#94A3B8]">{item.consensus}</td>
                    <td className="py-4 px-4 font-mono text-[#94A3B8]">{item.load}</td>
                    <td className="py-4 px-4"><span style={{ color: item.color }} className="font-semibold">{item.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card p-6 bg-white/[0.03] space-y-4">
          <h2 className="font-bold text-base text-white">Activity Timeline</h2>
          <div className="space-y-4 relative pl-4 border-l border-white/[0.08]">
            {[
              { title: 'Schema Updated',        desc: 'Added cluster shards configurations',  time: '10m ago'  },
              { title: 'Security audit passed',  desc: 'Verified 4 token gateways',           time: '1h ago'   },
              { title: 'Failover recovery test', desc: 'Node C4 re-election simulation',      time: 'Yesterday' },
            ].map((act, idx) => (
              <div key={idx} className="space-y-1 relative">
                <div className="absolute left-[-21px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#6366f1] border-2 border-[#0f0f1a]" aria-hidden="true" />
                <div className="flex justify-between items-center text-xs font-semibold text-white">
                  <span>{act.title}</span>
                  <span className="text-[10px] text-[#475569] font-mono">{act.time}</span>
                </div>
                <p className="text-[11px] text-[#94A3B8]">{act.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Coming Soon stub — used by sidebar sub-routes not yet implemented
   ───────────────────────────────────────────────────────────────────────────── */
function ComingSoonPage({ title, description }) {
  return (
    <div className="animate-fade-in" style={{ padding: '48px 0' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          textAlign: 'center',
          padding: '64px 24px',
          background: 'rgba(26, 26, 46, 0.5)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--color-border)',
          borderRadius: 20,
          maxWidth: 480,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.15))',
            border: '1px solid rgba(99,102,241,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 26,
          }}
          aria-hidden="true"
        >
          🚧
        </div>
        <div>
          <h1
            style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              color: 'var(--color-on-surface)',
              margin: '0 0 8px',
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </h1>
          <p style={{ fontSize: 13, color: 'var(--color-on-surface-muted)', lineHeight: 1.6, margin: 0 }}>
            {description}
          </p>
        </div>
        <span
          style={{
            fontSize: 11,
            fontFamily: 'var(--font-family-mono)',
            color: 'var(--color-primary-400)',
            background: 'rgba(99,102,241,0.08)',
            border: '1px solid rgba(99,102,241,0.2)',
            padding: '4px 12px',
            borderRadius: 6,
          }}
        >
          Coming in a future PR
        </span>
      </div>
    </div>
  );
}

export default AppRoutes;
