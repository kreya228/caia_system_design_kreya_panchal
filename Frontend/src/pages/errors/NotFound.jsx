import React from 'react';

function NotFound() {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md animate-fade-in">
        <h1 className="text-9xl font-black tracking-widest text-gradient">404</h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Lost in space?</h2>
          <p className="text-on-surface-muted leading-relaxed">
            The page you're trying to reach doesn't exist or has been moved.
          </p>
        </div>
        <div>
          <a href="/dashboard" className="inline-block btn-gradient">
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
