'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import OddsConverter from '@/components/Tools/OddsConverter';
import EVCalculator from '@/components/Tools/EVCalculator';
import NoVigCalculator from '@/components/Tools/NoVigCalculator';
import KellyCalculator from '@/components/Tools/KellyCalculator';
import HedgeCalculator from '@/components/Tools/HedgeCalculator';
import ArbitrageCalculator from '@/components/Tools/ArbitrageCalculator';
import ParlayCalculator from '@/components/Tools/ParlayCalculator';
import HoldCalculator from '@/components/Tools/HoldCalculator';
import OddsProbabilityChart from '@/components/Tools/OddsProbabilityChart';
import BankrollSimulator from '@/components/Tools/BankrollSimulator';
import UnitSizeCalculator from '@/components/Tools/UnitSizeCalculator';
import { APP_URL } from '@/lib/app-url';

// ============================================================================
// Tool definitions
// ============================================================================

interface ToolDef {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  category: 'essentials' | 'simulation';
}

const TOOLS: ToolDef[] = [
  {
    id: 'ev-calculator',
    name: 'EV Calculator',
    shortName: 'EV',
    icon: '📊',
    description: 'Calculate the expected value of any bet to find +EV opportunities.',
    category: 'essentials',
  },
  {
    id: 'no-vig-calculator',
    name: 'No-Vig Calculator',
    shortName: 'No-Vig',
    icon: '🎯',
    description: 'Strip the vig from any line to reveal the true fair odds underneath.',
    category: 'essentials',
  },
  {
    id: 'odds-converter',
    name: 'Odds Converter',
    shortName: 'Odds',
    icon: '🔄',
    description: 'Convert between American, Decimal, and Fractional odds instantly.',
    category: 'essentials',
  },
  {
    id: 'kelly-calculator',
    name: 'Kelly Criterion',
    shortName: 'Kelly',
    icon: '⚖️',
    description: 'Calculate optimal bet sizing using the Kelly Criterion formula.',
    category: 'essentials',
  },
  {
    id: 'hedge-calculator',
    name: 'Hedge Calculator',
    shortName: 'Hedge',
    icon: '🛡️',
    description: 'Lock in guaranteed profit by calculating the perfect hedge bet.',
    category: 'essentials',
  },
  {
    id: 'arbitrage-calculator',
    name: 'Arbitrage Calculator',
    shortName: 'Arb',
    icon: '💰',
    description: 'Find and calculate risk-free arbitrage opportunities across books.',
    category: 'essentials',
  },
  {
    id: 'parlay-calculator',
    name: 'Parlay Calculator',
    shortName: 'Parlay',
    icon: '🔗',
    description: 'Build parlays and see combined odds, payouts, and implied probabilities.',
    category: 'essentials',
  },
  {
    id: 'hold-calculator',
    name: 'Hold Calculator',
    shortName: 'Hold',
    icon: '🏦',
    description: 'Calculate the hold percentage a sportsbook is charging on a line.',
    category: 'essentials',
  },
  {
    id: 'odds-probability-chart',
    name: 'Odds to Probability Chart',
    shortName: 'Chart',
    icon: '📋',
    description: 'Reference chart mapping American odds to implied win probability.',
    category: 'essentials',
  },
  {
    id: 'unit-size-calculator',
    name: 'Unit Size Calculator',
    shortName: 'Units',
    icon: '📏',
    description: 'Determine your unit size based on bankroll and risk tolerance.',
    category: 'essentials',
  },
  {
    id: 'bankroll-simulator',
    name: 'Bankroll Simulator',
    shortName: 'Sim',
    icon: '📈',
    description: 'Simulate thousands of bets to visualize bankroll growth and variance.',
    category: 'simulation',
  },
];

const CATEGORIES = [
  { id: 'essentials', label: 'Essentials', color: 'text-cyan' },
  { id: 'simulation', label: 'Simulation', color: 'text-purple-400' },
] as const;

// ============================================================================
// Tool Renderer
// ============================================================================
function ToolRenderer({ toolId, isMobile }: { toolId: string; isMobile: boolean }) {
  switch (toolId) {
    case 'odds-converter':
      return <OddsConverter isMobile={isMobile} />;
    case 'ev-calculator':
      return <EVCalculator isMobile={isMobile} />;
    case 'no-vig-calculator':
      return <NoVigCalculator isMobile={isMobile} />;
    case 'kelly-calculator':
      return <KellyCalculator isMobile={isMobile} />;
    case 'hedge-calculator':
      return <HedgeCalculator isMobile={isMobile} />;
    case 'arbitrage-calculator':
      return <ArbitrageCalculator isMobile={isMobile} />;
    case 'parlay-calculator':
      return <ParlayCalculator isMobile={isMobile} />;
    case 'hold-calculator':
      return <HoldCalculator isMobile={isMobile} />;
    case 'odds-probability-chart':
      return <OddsProbabilityChart isMobile={isMobile} />;
    case 'unit-size-calculator':
      return <UnitSizeCalculator isMobile={isMobile} />;
    case 'bankroll-simulator':
      return <BankrollSimulator isMobile={isMobile} />;
    default:
      return null;
  }
}

// ============================================================================
// Main Page
// ============================================================================
export default function ToolsPage() {
  const router = useRouter();
  const [selectedTool, setSelectedTool] = useState<string>('ev-calculator');
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentTool = TOOLS.find((t) => t.id === selectedTool)!;

  const handleToolSelect = (id: string) => {
    setSelectedTool(id);
    setSidebarOpen(false);
    // Also update the URL for SEO (individual tool pages exist)
    router.push(`/tools/${id}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-black">
        {/* Hero Header */}
        <div className="border-b border-white/5 bg-gradient-to-b from-cyan/5 to-transparent">
          <div className="max-w-7xl mx-auto px-6 py-12 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              Free Betting <span className="gradient-text">Calculators</span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              {TOOLS.length} professional-grade tools to sharpen your edge. No sign-up required.
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          {/* Mobile: Tool selector dropdown */}
          {isMobile && (
            <div className="mb-6">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="w-full flex items-center justify-between bg-card-bg border border-card-border rounded-xl px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{currentTool.icon}</span>
                  <span className="font-semibold">{currentTool.name}</span>
                </div>
                <svg
                  className={`w-5 h-5 text-white/50 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {sidebarOpen && (
                <div className="mt-2 bg-card-bg border border-card-border rounded-xl overflow-hidden divide-y divide-white/5">
                  {CATEGORIES.map((cat) => {
                    const catTools = TOOLS.filter((t) => t.category === cat.id);
                    return (
                      <div key={cat.id} className="p-3">
                        <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${cat.color}`}>
                          {cat.label}
                        </div>
                        <div className="space-y-1">
                          {catTools.map((tool) => (
                            <button
                              key={tool.id}
                              onClick={() => handleToolSelect(tool.id)}
                              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                                selectedTool === tool.id
                                  ? 'bg-cyan/10 text-cyan'
                                  : 'text-white/70 hover:bg-white/5 hover:text-white'
                              }`}
                            >
                              <span className="text-lg">{tool.icon}</span>
                              <span className="text-sm font-medium">{tool.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <div className="flex items-start gap-8">
            {/* Desktop: Sidebar */}
            {!isMobile && (
              <aside className="w-64 shrink-0 sticky top-24 self-start">
                <div className="space-y-6">
                  {CATEGORIES.map((cat) => {
                    const catTools = TOOLS.filter((t) => t.category === cat.id);
                    return (
                      <div key={cat.id}>
                        <div className={`text-xs font-semibold uppercase tracking-wider mb-3 ${cat.color}`}>
                          {cat.label}
                        </div>
                        <div className="space-y-1">
                          {catTools.map((tool) => (
                            <button
                              key={tool.id}
                              onClick={() => handleToolSelect(tool.id)}
                              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left group ${
                                selectedTool === tool.id
                                  ? 'bg-cyan/10 text-cyan border border-cyan/20'
                                  : 'text-white/60 hover:bg-white/5 hover:text-white border border-transparent'
                              }`}
                            >
                              <span className="text-lg">{tool.icon}</span>
                              <div className="min-w-0">
                                <div className="text-sm font-medium truncate">{tool.name}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {/* CTA in sidebar */}
                  <div className="mt-8 p-4 bg-gradient-to-br from-cyan/10 to-blue/10 border border-cyan/20 rounded-xl">
                    <p className="text-sm font-semibold text-white mb-1">Want more?</p>
                    <p className="text-xs text-white/50 mb-3">
                      SharpMoney Pro gives you real-time +EV plays, market movement, and more.
                    </p>
                    <a
                      href={`${APP_URL}/signup?plan=pro&a=websitepro`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center bg-cyan text-black font-semibold text-sm px-4 py-2 rounded-lg hover:bg-cyan-dim transition-colors"
                    >
                      Try SharpMoney Pro
                    </a>
                  </div>
                </div>
              </aside>
            )}

            {/* Main Tool Content */}
            <div className="flex-1 min-w-0">
              {/* Tool header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{currentTool.icon}</span>
                  <h2 className="text-2xl md:text-3xl font-bold">{currentTool.name}</h2>
                </div>
                <p className="text-white/50">{currentTool.description}</p>
              </div>

              {/* Tool component */}
              <ToolRenderer toolId={selectedTool} isMobile={isMobile} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
