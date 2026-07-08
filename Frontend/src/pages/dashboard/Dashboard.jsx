import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

function Dashboard() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#F8FAFC] flex font-sans overflow-x-hidden relative">
      {/* Background glow meshes */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-secondary-500/10 to-transparent rounded-full blur-[150px] pointer-events-none" />

      {/* FIXED LEFT SIDEBAR */}
      <aside className="w-80 border-r border-[rgba(255,255,255,0.08)] bg-[#0B1120]/80 backdrop-blur-xl p-6 hidden lg:flex flex-col justify-between sticky top-0 h-screen z-20">
        <div className="space-y-8">
          {/* Logo Brand */}
          <div className="flex items-center gap-3.5">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse-glow" />
              <div className="relative w-11 h-11 rounded-xl bg-surface flex items-center justify-center border border-[rgba(255,255,255,0.1)]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400 font-extrabold text-xl font-display">C</span>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-[#F8FAFC] font-display">
                CAIA Studio
              </h1>
              <p className="text-[9px] text-[#94A3B8] tracking-widest uppercase font-mono">Enterprise AI Suite</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <div className="text-[10px] font-bold text-[#475569] uppercase tracking-wider px-3 mb-2">Main Menu</div>
            <nav className="space-y-1">
              <Link 
                to="/dashboard"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  location.pathname === '/dashboard'
                    ? 'bg-gradient-to-r from-primary-500/15 to-secondary-500/5 border border-primary-500/20 text-[#F8FAFC]'
                    : 'text-[#94A3B8] hover:bg-white/5 hover:text-[#F8FAFC]'
                }`}
              >
                <span className="text-lg">📊</span>
                <span className="font-semibold text-sm">Dashboard Overview</span>
              </Link>
              <Link 
                to="/login"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#94A3B8] hover:bg-white/5 hover:text-[#F8FAFC] transition-all duration-300"
              >
                <span className="text-lg">🔒</span>
                <span className="font-medium text-sm">Security Portal</span>
              </Link>
              <Link 
                to="/register"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#94A3B8] hover:bg-white/5 hover:text-[#F8FAFC] transition-all duration-300"
              >
                <span className="text-lg">✨</span>
                <span className="font-medium text-sm">Create Workspace</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Workspace details footer */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-[rgba(255,255,255,0.06)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#94A3B8]">Telemetry Node</span>
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
          </div>
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-[#475569]">API LATEST</span>
            <span className="text-secondary-400">v1.2.4</span>
          </div>
        </div>
      </aside>

      {/* RIGHT SIDE MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP NAVIGATION BAR */}
        <header className="h-20 border-b border-[rgba(255,255,255,0.08)] px-8 flex items-center justify-between bg-[#0B1120]/40 backdrop-blur-md sticky top-0 z-10">
          {/* Search bar */}
          <div className="relative w-72 hidden md:block">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm">🔍</span>
            <input 
              type="text" 
              placeholder="Search workspaces & nodes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-[rgba(255,255,255,0.08)] text-[#F8FAFC] text-sm placeholder-[#94A3B8] focus:outline-none focus:border-primary-500 focus:bg-white/[0.06] transition-all"
            />
          </div>

          <div className="flex items-center gap-6 ml-auto">
            {/* Notification trigger */}
            <button className="relative p-2 rounded-lg bg-white/[0.03] border border-[rgba(255,255,255,0.08)] hover:bg-white/[0.08] transition-colors text-lg">
              🔔
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#EF4444] rounded-full border-2 border-[#0B1120]" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 p-1.5 pr-3 rounded-xl bg-white/[0.03] border border-[rgba(255,255,255,0.08)] hover:bg-white/[0.08] transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-500 to-secondary-500 flex items-center justify-center font-bold text-white text-sm">
                  JD
                </div>
                <span className="text-xs font-semibold text-[#94A3B8] hidden sm:block">John Doe</span>
                <span className="text-[10px] text-[#475569]">▼</span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#111827] border border-[rgba(255,255,255,0.08)] p-2 shadow-card animate-fade-in z-30">
                  <Link to="/login" className="block px-4 py-2.5 text-xs rounded-lg hover:bg-white/[0.05] transition-colors text-[#F8FAFC]">
                    Profile Account
                  </Link>
                  <Link to="/login" className="block px-4 py-2.5 text-xs rounded-lg hover:bg-white/[0.05] transition-colors text-[#F8FAFC]">
                    System Settings
                  </Link>
                  <div className="border-t border-white/[0.06] my-1" />
                  <Link to="/login" className="block px-4 py-2.5 text-xs rounded-lg text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors">
                    Sign Out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* DASHBOARD VIEWPORT */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
