import React from 'react';

function Register() {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md glass-card p-8 space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-glow mb-2">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gradient">Create Account</h2>
          <p className="text-sm text-on-surface-muted">Join CAIA System Design Knowledge Base</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-on-surface-muted uppercase tracking-wider">Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-border text-on-surface focus:outline-none focus:border-primary-500 transition-colors"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-on-surface-muted uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-border text-on-surface focus:outline-none focus:border-primary-500 transition-colors"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-on-surface-muted uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-border text-on-surface focus:outline-none focus:border-primary-500 transition-colors"
            />
          </div>
          <button type="submit" className="w-full btn-gradient py-3 text-sm tracking-wide">
            Register
          </button>
        </form>

        <div className="text-center text-xs text-on-surface-muted">
          Already have an account?{' '}
          <a href="/login" className="text-primary-400 hover:text-primary-500 font-semibold transition-colors">
            Sign In here
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
