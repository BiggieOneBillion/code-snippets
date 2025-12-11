import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navbar */}
      <nav className="fixed w-full z-50 glass border-b border-white/10">
        <div className="content-wrapper">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">{'<>'}</span>
              </div>
              <span className="text-xl font-bold text-gradient">CodeShare</span>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/auth/signin"
                className="text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/auth/signup"
                className="btn btn-primary text-sm py-2 px-4"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative section" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] bg-primary/20 rounded-full blur-[80px] md:blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] bg-secondary/20 rounded-full blur-[80px] md:blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative content-wrapper text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 md:mb-8 animate-fade-in leading-tight">
            Share Code. <span className="text-gradient">Inspire Others.</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>Build Together.
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-foreground-secondary mb-8 md:mb-10 px-4 animate-slide-in">
            The modern platform for developers to store, share, and discover code snippets and documentation.
            Beautiful syntax highlighting, rich markdown support, and seamless collaboration.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Link href="/auth/signup" className="btn btn-primary w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3">
              Start Sharing for Free
            </Link>
            <Link href="/dashboard" className="btn btn-secondary w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3">
              Explore Feed
            </Link>
          </div>

          {/* Feature Preview */}
          <div className="mt-12 md:mt-16 lg:mt-20 relative mx-auto max-w-5xl px-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="glass rounded-lg md:rounded-xl border border-white/10 p-1 md:p-2 shadow-2xl">
              <div className="bg-background-secondary rounded-md md:rounded-lg overflow-hidden border border-white/5">
                <div className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 border-b border-white/5 bg-background-tertiary">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="ml-2 md:ml-4 text-xs text-foreground-muted font-mono">useDebounce.ts</div>
                </div>
                <div className="p-4 md:p-6 font-mono text-xs sm:text-sm overflow-x-auto text-left">
                  <div className="text-purple-400">import</div> <span className="text-foreground">{'{'}</span> <span className="text-yellow-300">useState</span>, <span className="text-yellow-300">useEffect</span> <span className="text-foreground">{'}'}</span> <div className="text-purple-400 inline">from</div> <span className="text-green-400">'react'</span>;
                  <br /><br />
                  <div className="text-purple-400 inline">export function</div> <span className="text-blue-400">useDebounce</span><span className="text-foreground">{'<'}</span><span className="text-green-300">T</span><span className="text-foreground">{'>'}</span>(<span className="text-orange-300">value</span>: <span className="text-green-300">T</span>, <span className="text-orange-300">delay</span>: <span className="text-green-300">number</span>): <span className="text-green-300">T</span> <span className="text-foreground">{'{'}</span>
                  <br />
                  &nbsp;&nbsp;<div className="text-purple-400 inline">const</div> [<span className="text-blue-300">debouncedValue</span>, <span className="text-blue-300">setDebouncedValue</span>] = <span className="text-yellow-300">useState</span>(<span className="text-orange-300">value</span>);
                  <br /><br />
                  &nbsp;&nbsp;<span className="text-yellow-300">useEffect</span>(() <div className="text-purple-400 inline">={'>'}</div> <span className="text-foreground">{'{'}</span>
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<div className="text-purple-400 inline">const</div> <span className="text-blue-300">handler</span> = <span className="text-yellow-300">setTimeout</span>(() <div className="text-purple-400 inline">={'>'}</div> <span className="text-foreground">{'{'}</span>
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">setDebouncedValue</span>(<span className="text-orange-300">value</span>);
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-foreground">{'}'}</span>, <span className="text-orange-300">delay</span>);
                  <br /><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<div className="text-purple-400 inline">return</div> () <div className="text-purple-400 inline">={'>'}</div> <span className="text-foreground">{'{'}</span>
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">clearTimeout</span>(<span className="text-blue-300">handler</span>);
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-foreground">{'}'}</span>;
                  <br />
                  &nbsp;&nbsp;<span className="text-foreground">{'}'}</span>, [<span className="text-orange-300">value</span>, <span className="text-orange-300">delay</span>]);
                  <br /><br />
                  &nbsp;&nbsp;<div className="text-purple-400 inline">return</div> <span className="text-blue-300">debouncedValue</span>;
                  <br />
                  <span className="text-foreground">{'}'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section bg-background-secondary/50">
        <div className="content-wrapper">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: 'Rich Editor',
                description: 'Full-featured Monaco editor with syntax highlighting for over 50 languages.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                )
              },
              {
                title: 'Organized Projects',
                description: 'Group your snippets into projects. Keep everything structured and accessible.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                )
              },
              {
                title: 'Community Driven',
                description: 'Share your solutions with the world or keep them private. It\'s your choice.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              }
            ].map((feature, i) => (
              <div key={i} className="card card-hover bg-surface/50 border-white/5 h-full">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-3 md:mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm md:text-base text-foreground-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
