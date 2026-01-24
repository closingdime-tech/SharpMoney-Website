'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

// SharpMoney Logo Component - uses actual logo image
function Logo({ className = "w-48" }: { className?: string }) {
  return (
    <Image 
      src="/logo.jpg"
      alt="SharpMoney"
      width={200}
      height={200}
      className={className}
    />
  );
}

// Navigation
function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <Logo className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold tracking-wider text-cyan">SHARPMONEY</span>
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-white/70 hover:text-cyan transition-colors">Features</a>
          <a href="#pricing" className="text-white/70 hover:text-cyan transition-colors">Pricing</a>
          <a href="#signal" className="text-white/70 hover:text-cyan transition-colors">Signal</a>
          <a href="#community" className="text-white/70 hover:text-cyan transition-colors">Community</a>
          <a 
            href="https://whop.com/sharpmoney/pro-7e/" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-cyan text-black font-semibold px-6 py-2 rounded-lg hover:bg-cyan-dim transition-colors"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          <a href="#features" className="text-white/70 hover:text-cyan transition-colors py-2">Features</a>
          <a href="#pricing" className="text-white/70 hover:text-cyan transition-colors py-2">Pricing</a>
          <a href="#signal" className="text-white/70 hover:text-cyan transition-colors py-2">Signal</a>
          <a href="#community" className="text-white/70 hover:text-cyan transition-colors py-2">Community</a>
          <a 
            href="https://whop.com/sharpmoney/pro-7e/" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-cyan text-black font-semibold px-6 py-3 rounded-lg text-center hover:bg-cyan-dim transition-colors"
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}

// Hero Section
function Hero() {
  // Restart video before it ends to avoid the text-heavy final frames
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    // Restart at 50% of the video to avoid the ending (adjust as needed)
    if (video.currentTime > video.duration * 0.5) {
      video.currentTime = 0;
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        ref={(el) => { if (el) el.playbackRate = 0.5; }}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h1 className="opacity-0 animate-fade-in-up text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Turn Your Hobby
          <br />
          <span className="gradient-text">into Your Side Hustle</span>
        </h1>
        
        <p className="opacity-0 animate-fade-in-up animation-delay-200 text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10">
          Sports betting isn't about opinions or predictions. It's about price, timing, and market movement — 
          and most bettors are always late. SharpMoney gives you the edge.
        </p>

        <div className="opacity-0 animate-fade-in-up animation-delay-400 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="https://whop.com/sharpmoney/pro-7e/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-cyan text-black font-bold text-lg px-10 py-4 rounded-lg hover:bg-cyan-dim transition-all pulse-glow"
          >
            Start Winning Today
          </a>
          <a 
            href="#features"
            className="border border-white/20 text-white font-semibold text-lg px-10 py-4 rounded-lg hover:border-cyan hover:text-cyan transition-all"
          >
            See How It Works
          </a>
        </div>

        {/* Stats bar */}
        <div className="opacity-0 animate-fade-in-up animation-delay-600 mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {/* Star Rating */}
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-cyan mb-1">4.9</div>
            <div className="text-yellow-400 text-xl">★★★★★</div>
          </div>
          {/* Other Stats */}
          {[
            { value: '5K+', label: 'Community Members' },
            { value: '20+', label: 'Sportsbooks' },
            { value: '5%+', label: 'ROI on Signal' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-cyan mb-2">{stat.value}</div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

// Features Section
function Features() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Fastest +EV Engine',
      description: 'Our Plus EV engine is one of the fastest in the industry, allowing you to get to bets before the market adjusts.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Market Trend Graphs',
      description: 'See historical pricing from the sharpest books — Pinnacle, Circa, Bookmaker — with Pinnacle limits to time your bets.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '20+ Sportsbooks',
      description: 'Complete market coverage including retail books, sharp books, exchanges, prediction markets, and offshore sportsbooks.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      title: 'Advanced Filters',
      description: 'The most advanced filters in the industry. Filter by EV %, Pinnacle limits, sportsbook, and market type — even per-book.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      ),
      title: 'One-Click Bet Links',
      description: 'Go straight from SharpMoney into your sportsbook bet slip — faster than anyone else — placing more bets throughout the day.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Full Mobile App',
      description: 'Every feature you see on web is fully available in our clean, fast mobile app — never miss a number.'
    },
  ];

  return (
    <section id="features" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-card-bg to-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Built for <span className="gradient-text">Serious Bettors</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Professional-grade tools to identify real value before the lines move.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div 
              key={i}
              className="gradient-border p-8 hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="text-cyan mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Plus EV Video Section
function PlusEVVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const handleLoadedData = () => {
    const video = videoRef.current;
    if (video && !isPlaying) {
      // Seek to 21 seconds to show as preview frame
      video.currentTime = 21;
      setIsReady(true);
    }
  };

  const handlePlayClick = () => {
    const video = videoRef.current;
    if (video) {
      // Reset to beginning and play
      video.currentTime = 0;
      video.play();
      setIsPlaying(true);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    // Reset to preview frame
    const video = videoRef.current;
    if (video) {
      video.currentTime = 21;
    }
  };

  return (
    <section id="plus-ev" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-card-bg/50 to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan/5 rounded-full blur-[120px]" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/30 text-cyan text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            WATCH THE BREAKDOWN
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            See <span className="gradient-text">Plus EV</span> in Action
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            If you're betting who you think will win, you're already losing. Watch how SharpMoney Plus EV 
            helps you identify real value before the lines move.
          </p>
        </div>

        {/* Video Container */}
        <div className="relative max-w-4xl mx-auto">
          <div className="gradient-border p-2 md:p-3">
            <div 
              className="relative rounded-xl overflow-hidden bg-black aspect-video cursor-pointer group"
              onClick={!isPlaying ? handlePlayClick : undefined}
            >
              <video
                ref={videoRef}
                controls={isPlaying}
                playsInline
                preload="auto"
                onLoadedData={handleLoadedData}
                onEnded={handleVideoEnd}
                className={`w-full h-full object-cover transition-opacity duration-300 ${isReady || isPlaying ? 'opacity-100' : 'opacity-0'}`}
              >
                <source src="/SharpMoney_1.mov" type="video/quicktime" />
                <source src="/SharpMoney_1.mov" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Loading state */}
              {!isReady && !isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <div className="w-8 h-8 border-2 border-cyan border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              
              {/* Play Button Overlay */}
              {!isPlaying && isReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-all group-hover:bg-black/30">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-cyan/90 flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-cyan shadow-[0_0_60px_rgba(0,229,255,0.5)]">
                    <svg className="w-12 h-12 md:w-16 md:h-16 text-black ml-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan/20 rounded-full blur-2xl" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue/20 rounded-full blur-2xl" />
        </div>
      </div>
    </section>
  );
}

// Pricing Section
function Pricing() {
  const plans = [
    {
      name: 'Core',
      price: '$29.99',
      period: '/month',
      description: 'Perfect for beginners learning +EV betting',
      features: [
        'Core +EV tool access',
        'Basic odds screen',
        'Basic filters (sportsbook, EV %, league)',
        'Community access',
      ],
      basics: true,
      notIncluded: [
        'Sharp sportsbooks',
        'Line movement charts',
        'Advanced filters',
      ],
      cta: 'Start with Core',
      href: 'https://whop.com/sharpmoney/core-ae/',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$79.99',
      period: '/month',
      description: 'For bettors who want professional-grade data',
      features: [
        'Full +EV opportunity feed',
        'Live odds from 20+ sportsbooks',
        '3 sharp books (true market pricing)',
        '4 exchanges + 2 prediction markets',
        'Line movement charts & history',
        '30-day historical data',
        'Kelly Criterion sizing',
        'Deep links to bet slips',
        'Advanced filters',
      ],
      notIncluded: [
        'SharpMoney Signal',
        'Professional handicapped plays',
      ],
      cta: 'Get Pro Access',
      href: 'https://whop.com/sharpmoney/pro-7e/',
      popular: true,
    },
    {
      name: 'Alpha',
      price: '$199.99',
      period: '/month',
      description: 'Maximum edge with zero limitations',
      features: [
        'Everything in Pro',
        'SharpMoney Signal (proprietary)',
        'Professional handicapped plays',
        'Signal strength bars & player prop signals',
        'Per-book custom EV thresholds',
        'Per-period EV and limit overrides',
        'Unlimited historical data',
        'All future add-ons included',
        'Priority support & early access',
      ],
      notIncluded: [],
      cta: 'Go Alpha',
      href: 'https://whop.com/sharpmoney/alpha-4e/',
      popular: false,
      gold: true,
    },
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 relative">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Choose Your <span className="gradient-text">Edge</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Every tier gives you real +EV tools. Pick the level that matches your game.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <a 
              key={i}
              href={plan.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative rounded-2xl p-8 block cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:-translate-y-2 ${
                plan.gold
                  ? 'bg-gradient-to-b from-yellow-500/20 to-transparent border-2 border-yellow-500 shadow-[0_0_40px_rgba(234,179,8,0.3)] hover:shadow-[0_0_60px_rgba(234,179,8,0.5)]'
                  : plan.popular 
                    ? 'bg-gradient-to-b from-cyan/10 to-transparent border-2 border-cyan glow-cyan hover:shadow-[0_0_60px_rgba(0,229,255,0.5)]' 
                    : plan.basics
                      ? 'bg-card-bg border-2 border-gray-500 hover:border-gray-400 hover:shadow-[0_0_30px_rgba(156,163,175,0.2)]'
                      : 'bg-card-bg border border-card-border'
              }`}
            >
              {plan.gold && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-sm font-bold px-4 py-1 rounded-full">
                  ⚡ MAXIMUM EDGE
                </div>
              )}
              {plan.basics && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                  THE BASICS
                </div>
              )}
              {plan.popular && !plan.gold && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan text-black text-sm font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-white/50">{plan.period}</span>
                </div>
                <p className="text-white/60 text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
                {plan.notIncluded.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 opacity-40">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div 
                className={`block w-full text-center py-4 rounded-lg font-semibold transition-all ${
                  plan.gold
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black'
                    : plan.popular
                      ? 'bg-cyan text-black'
                      : 'bg-white/10 text-white'
                }`}
              >
                {plan.cta}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// SharpMoney Signal Section
function Signal() {
  return (
    <section id="signal" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan/5 via-transparent to-blue/5" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-cyan/10 rounded-full blur-[100px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/30 text-cyan text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-cyan rounded-full animate-pulse" />
            ALPHA EXCLUSIVE
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Introducing <span className="gradient-text">SharpMoney Signal</span>
          </h2>
          
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            A proprietary system you won't find anywhere else. Everything behind it is built entirely in-house, 
            with all the logic baked right in. Here are the real, tracked results.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {[
            { value: '12,400', label: 'Total Bets', color: 'text-cyan' },
            { value: '6613W - 5218L', label: 'Record', color: 'text-white', highlight: true },
            { value: '55.9%', label: 'Win Rate', color: 'text-cyan' },
            { value: '+$70,108', label: 'Profit/Loss', color: 'text-green-400' },
            { value: '+5.9%', label: 'ROI', color: 'text-green-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-card-bg border border-card-border rounded-xl p-4 text-center">
              <div className={`text-xl md:text-2xl font-bold mb-1 ${stat.color}`}>
                {stat.highlight ? (
                  <>
                    <span className="text-green-400">6613W</span>
                    <span className="text-white/50"> - </span>
                    <span className="text-red-400">5218L</span>
                  </>
                ) : stat.value}
              </div>
              <div className="text-xs text-white/50 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Profit Chart Visualization */}
        <div className="gradient-border p-6 md:p-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">📈 Cumulative Profit/Loss Over Time</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 bg-green-400 rounded-full"></span>
              <span className="text-white/70">P/L: <span className="text-green-400 font-semibold">+$70,108</span></span>
              <span className="text-white/40 ml-2">| 11,831 graded bets</span>
            </div>
          </div>
          
          {/* Chart representation */}
          <div className="relative h-48 md:h-64">
            <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
              {/* Grid lines */}
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Horizontal grid lines */}
              {[0, 40, 80, 120, 160].map((y) => (
                <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              ))}
              
              {/* Area under curve */}
              <path
                d="M0,180 Q100,175 150,170 T250,150 T350,120 T450,80 T550,50 T650,40 T750,35 L800,30 L800,200 L0,200 Z"
                fill="url(#chartGradient)"
              />
              
              {/* Main line */}
              <path
                d="M0,180 Q100,175 150,170 T250,150 T350,120 T450,80 T550,50 T650,40 T750,35 L800,30"
                fill="none"
                stroke="#22c55e"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-white/40 -ml-2">
              <span>$+80K</span>
              <span>$+60K</span>
              <span>$+40K</span>
              <span>$+20K</span>
              <span>$0</span>
            </div>
          </div>
          
          <div className="text-center text-white/40 text-sm mt-4">
            Based on $100 flat betting per play
          </div>
        </div>

        {/* Features + CTA */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            {[
              'Every play includes our Signal price and visual strength rating',
              '55.9% win rate (only 52.4% needed to break even)',
              'Exposed over $70K in profit on tracked bets',
              'Simple to use. Hard to replicate.',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/80">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center md:text-left">
            <p className="text-2xl md:text-3xl font-bold mb-4">
              Ready to get the <span className="text-green-400">edge</span>?
            </p>
            <p className="text-white/60 mb-6">
              SharpMoney Signal is exclusively available in the Alpha package.
            </p>
            <a 
              href="https://whop.com/sharpmoney/alpha-4e/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-cyan text-black font-bold px-8 py-4 rounded-lg hover:bg-cyan-dim transition-all"
            >
              Unlock Signal Access
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Community Section
function Community() {
  return (
    <section id="community" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card-bg to-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            You're Never <span className="gradient-text">On Your Own</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Join one of the fastest-growing sports betting communities. Learn, share, and win together.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Discord */}
          <a 
            href="https://discord.gg/b4QmzcPhTt"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-border p-8 flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-300 group"
          >
            <div className="w-16 h-16 bg-[#5865F2] rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Discord Community</h3>
            <p className="text-white/60 mb-4">Market-specific discussions, community insights, and SharpMoney conversations.</p>
            <span className="text-cyan group-hover:underline">Join Discord →</span>
          </a>

          {/* X (Twitter) */}
          <a 
            href="https://x.com/BetSharpMoney"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-border p-8 flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-300 group"
          >
            <div className="w-16 h-16 bg-black border border-white/20 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Follow on X</h3>
            <p className="text-white/60 mb-4">Real-time updates, betting insights, and market analysis from the SharpMoney team.</p>
            <span className="text-cyan group-hover:underline">Follow Us →</span>
          </a>

          {/* YouTube */}
          <a 
            href="https://www.youtube.com/@BetSharpMoneyYT"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-border p-8 flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-300 group"
          >
            <div className="w-16 h-16 bg-[#FF0000] rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">YouTube Education</h3>
            <p className="text-white/60 mb-4">Weekly live streams and content focused on education — understand why the bets have value.</p>
            <span className="text-cyan group-hover:underline">Watch Now →</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTA() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan/10 via-blue/10 to-cyan/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan/10 rounded-full blur-[120px]" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Stop Guessing.<br />
          <span className="gradient-text">Follow the Market.</span>
        </h2>
        <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto">
          Join thousands of bettors using SharpMoney to find real value every day.
        </p>
        <a 
          href="https://whop.com/sharpmoney/pro-7e/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-cyan text-black font-bold text-xl px-12 py-5 rounded-lg hover:bg-cyan-dim transition-all pulse-glow"
        >
          Get Started Now
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Logo className="w-10 h-10 object-contain" />
            <span className="text-lg font-bold tracking-wider text-cyan">SHARPMONEY</span>
          </div>
          
          <div className="flex items-center gap-6 text-white/50 text-sm">
            <a href="#features" className="hover:text-cyan transition-colors">Features</a>
            <a href="#pricing" className="hover:text-cyan transition-colors">Pricing</a>
            <a href="https://discord.gg/b4QmzcPhTt" target="_blank" rel="noopener noreferrer" className="hover:text-cyan transition-colors">Discord</a>
            <a href="https://x.com/BetSharpMoney" target="_blank" rel="noopener noreferrer" className="hover:text-cyan transition-colors">X</a>
            <a href="https://www.youtube.com/@BetSharpMoneyYT" target="_blank" rel="noopener noreferrer" className="hover:text-cyan transition-colors">YouTube</a>
          </div>
          
          <div className="text-white/30 text-sm">
            © {new Date().getFullYear()} SharpMoney. All rights reserved.
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/5 text-center text-white/30 text-xs">
          SharpMoney provides tools for informational purposes. Sports betting involves risk. Please gamble responsibly.
        </div>
      </div>
    </footer>
  );
}

// Main Page
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <PlusEVVideo />
        <Pricing />
        <Signal />
        <Community />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
