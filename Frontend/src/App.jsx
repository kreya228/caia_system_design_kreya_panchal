const APP_NAME = import.meta.env.VITE_APP_NAME || 'CAIA';

function App() {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col items-center justify-center">
      <div className="text-center space-y-6 p-8">
        {/* Logo / Brand */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gradient">
            {APP_NAME}
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-lg text-on-surface-muted max-w-md leading-relaxed">
          System Design Knowledge Base — your curated reference for architecture patterns, concepts, and best practices.
        </p>

        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-elevated border border-border text-sm text-on-surface-muted">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          React 19 · Vite · Tailwind CSS · MUI · Redux Toolkit
        </div>
      </div>
    </div>
  );
}

export default App;
