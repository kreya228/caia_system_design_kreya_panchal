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
      
      {/* Wrapped under Reusable DashboardLayout */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={
          <div className="space-y-8 animate-fade-in pb-12">
            
            {/* Upper Hero Panel */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-3xl font-extrabold tracking-tight text-white font-display">
                  System Overview
                </h3>
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

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="glass-card p-6 bg-white/[0.03] flex flex-col justify-between min-h-[120px]">
                <div className="flex justify-between items-center text-xs text-[#94A3B8]">
                  <span>Total Queries</span>
                  <span className="text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-md font-mono">+12.4%</span>
                </div>
                <div className="text-2xl font-bold font-display mt-2">1,248,391</div>
                <span className="text-[10px] text-[#475569] mt-1">Last 24 hours</span>
              </div>

              <div className="glass-card p-6 bg-white/[0.03] flex flex-col justify-between min-h-[120px]">
                <div className="flex justify-between items-center text-xs text-[#94A3B8]">
                  <span>Consensus Nodes</span>
                  <span className="text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-md font-mono">Stable</span>
                </div>
                <div className="text-2xl font-bold font-display mt-2">12 / 12</div>
                <span className="text-[10px] text-[#475569] mt-1">Active nodes online</span>
              </div>

              <div className="glass-card p-6 bg-white/[0.03] flex flex-col justify-between min-h-[120px]">
                <div className="flex justify-between items-center text-xs text-[#94A3B8]">
                  <span>Memory Cache Ratio</span>
                  <span className="text-[#EF4444] bg-[#EF4444]/10 px-2 py-0.5 rounded-md font-mono">-0.4%</span>
                </div>
                <div className="text-2xl font-bold font-display mt-2">98.4%</div>
                <span className="text-[10px] text-[#475569] mt-1">L1/L2 hits combined</span>
              </div>

              <div className="glass-card p-6 bg-white/[0.03] flex flex-col justify-between min-h-[120px]">
                <div className="flex justify-between items-center text-xs text-[#94A3B8]">
                  <span>Operational Status</span>
                  <span className="text-[#06B6D4] bg-[#06B6D4]/10 px-2 py-0.5 rounded-md font-mono">Normal</span>
                </div>
                <div className="text-2xl font-bold font-display mt-2">99.98%</div>
                <span className="text-[10px] text-[#475569] mt-1">Monthly uptime average</span>
              </div>
            </div>

            {/* Middle Analytics Graph and AI Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Analytics Graph Simulation */}
              <div className="glass-card p-6 bg-white/[0.03] lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-base text-white">Execution Metrics</h4>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-primary-500 rounded-full" />
                    <span className="text-xs text-[#94A3B8] font-mono mr-4">Write API</span>
                    <span className="w-2.5 h-2.5 bg-secondary-500 rounded-full" />
                    <span className="text-xs text-[#94A3B8] font-mono">Read API</span>
                  </div>
                </div>
                {/* Mock Chart Area */}
                <div className="h-64 flex items-end justify-between gap-1 pt-6 border-b border-white/[0.06] relative">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
                    <div className="border-b border-white w-full" />
                    <div className="border-b border-white w-full" />
                    <div className="border-b border-white w-full" />
                    <div className="border-b border-white w-full" />
                  </div>
                  {/* Mock Bars */}
                  <div className="w-full flex justify-around items-end h-full px-2 z-10">
                    {[50, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((val, idx) => (
                      <div key={idx} className="flex flex-col items-center w-6 sm:w-8 group">
                        <div className="w-full space-y-1">
                          <div className="bg-primary-500/80 hover:bg-primary-500 rounded-t-sm w-full transition-all duration-300" style={{ height: `${val * 1.5}px` }} />
                          <div className="bg-secondary-500/80 hover:bg-secondary-500 rounded-t-sm w-full transition-all duration-300" style={{ height: `${val * 0.8}px` }} />
                        </div>
                        <span className="text-[9px] text-[#475569] font-mono mt-2">M{idx + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Insights Panel */}
              <div className="glass-card p-6 bg-white/[0.03] space-y-4">
                <h4 className="font-bold text-base text-white flex items-center gap-2">
                  ✨ AI Insights
                </h4>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-primary-500/5 border border-primary-500/10 space-y-1">
                    <div className="flex justify-between items-center text-xs font-bold text-primary-400">
                      <span>Scaling Recommended</span>
                      <span>Now</span>
                    </div>
                    <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                      Read API requests spikes detected at node C4. Recommend scaling secondary read replication layers.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                    <div className="flex justify-between items-center text-xs font-bold text-secondary-400">
                      <span>Optimization Ready</span>
                      <span>2h ago</span>
                    </div>
                    <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                      Indexing optimization suggested on cluster `caia-core-prod` for cache improvements.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Section - Timeline and Recent Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Recent Blueprints Table */}
              <div className="glass-card p-6 bg-white/[0.03] lg:col-span-2 space-y-4">
                <h4 className="font-bold text-base text-white">Active Infrastructure Nodes</h4>
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
                        { name: 'caia-alpha-01', consensus: 'Raft', load: '32%', status: 'Nominal', color: 'text-[#22C55E]' },
                        { name: 'caia-beta-02', consensus: 'Paxos', load: '68%', status: 'High Load', color: 'text-[#F59E0B]' },
                        { name: 'caia-gamma-03', consensus: 'Raft', load: '14%', status: 'Nominal', color: 'text-[#22C55E]' },
                        { name: 'caia-delta-04', consensus: 'Paxos', load: '89%', status: 'Review', color: 'text-[#EF4444]' },
                      ].map((item, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 px-4 font-mono font-medium text-white">{item.name}</td>
                          <td className="py-4 px-4 text-[#94A3B8]">{item.consensus}</td>
                          <td className="py-4 px-4 font-mono text-[#94A3B8]">{item.load}</td>
                          <td className="py-4 px-4"><span className={`font-semibold ${item.color}`}>{item.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="glass-card p-6 bg-white/[0.03] space-y-4">
                <h4 className="font-bold text-base text-white">Activity Timeline</h4>
                <div className="space-y-4 relative pl-4 border-l border-white/[0.08]">
                  {[
                    { title: 'Schema Updated', desc: 'Added cluster shards configurations', time: '10m ago' },
                    { title: 'Security audit passed', desc: 'Verified 4 token gateways', time: '1h ago' },
                    { title: 'Failover recovery test', desc: 'Node C4 re-election simulation', time: 'Yesterday' }
                  ].map((act, idx) => (
                    <div key={idx} className="space-y-1 relative">
                      <div className="absolute left-[-21px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary-500 border-2 border-[#0B1120]" />
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
        } />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
