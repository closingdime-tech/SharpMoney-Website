'use client';

import Image from 'next/image';
import Link from 'next/link';

// Promotion/Partnership offers - add new offers here
const offers = [
  {
    id: 'novig',
    name: 'NoVig',
    logo: '/promotions/NoVig logo(1) (1).png',
    offer: '10% Deposit Bonus up to $100',
    description: 'A revolutionary betting exchange with 0% fees on all transactions. Deposit $900, get $1000 to trade with! Our SharpMoney +EV bots find hundreds of +EV plays on NoVig every day.',
    highlights: [
      { icon: '❌', text: 'Zero Fees – No transaction fees, every dollar works harder for you' },
      { icon: '↔️', text: 'Trading Opportunities – Access to wider range of markets and plays' },
      { icon: '📊', text: 'Real-Time Data – Live market data and insights from our +EV bots' },
      { icon: '🤖', text: 'SharpMoney +EV Bots – Hundreds of +EV plays found daily on NoVig' },
    ],
    details: [
      'Use promo code "SharpMoney"',
      '10% bonus on first deposit (up to $100)',
      '0% transaction fees',
    ],
    ctaText: 'Claim Your Bonus',
    ctaLink: 'https://novig.onelink.me/JHQQ/cw47x45a',
    videoLink: 'https://youtu.be/sOwovIO-aCU?si=rQjsMR_OyJDy6wax',
    featured: true,
  },
  {
    id: 'edge-boost',
    name: 'Edge Boost',
    logo: '/promotions/EdgeBoost.jpg',
    offer: '$100 Deposit Match + Tier 3 Cash Back',
    description: 'A debit card built specifically for sports bettors. Organize your bankroll, access higher limits, enjoy quicker withdrawals, and earn cash back on deposits — all without usage fees or minimums.',
    highlights: [
      { icon: '💰', text: '$100 Deposit Match – Get $100 matched on your first $100 deposited' },
      { icon: '📈', text: 'Up to $250K Daily Limit – Higher deposit limits than traditional banks' },
      { icon: '💸', text: '0.35% Cash Back – Start at Tier 3 cash back on all eligible deposits' },
      { icon: '⚡', text: 'Faster Transactions – Avoid declined deposits, enjoy quicker withdrawals' },
      { icon: '🏦', text: 'Separate Bankroll – Keep gambling funds separate from everyday spending' },
      { icon: '🎰', text: 'Works Everywhere – Accepted at online operators and brick & mortar casinos' },
    ],
    details: [
      'SharpMoney exclusive: $100 deposit match',
      'Start at Tier 3 (0.35% cash back)',
      'No usage fees or minimums',
    ],
    ctaText: 'Get Edge Boost Card',
    ctaLink: 'https://www.edgeboost.bet/guide/?oid=313&affid=246',
    featured: true,
  },
  {
    id: 'prophetx',
    name: 'ProphetX',
    logo: '/promotions/prophetx (1).png',
    offer: 'Up to $200 in Prophet Cash',
    description: 'A cutting-edge sports betting exchange where you wager against other bettors, not the house. Get up to 20% better odds compared to traditional sportsbooks with peer-to-peer betting.',
    highlights: [
      { icon: '🟢', text: 'Peer-to-Peer Betting – Wager against other bettors for competitive odds' },
      { icon: '📈', text: 'Up to 20% Better Odds – More value compared to traditional sportsbooks' },
      { icon: '🎯', text: 'Back & Lay Bets – More control and flexibility in your betting strategies' },
      { icon: '⚡', text: 'Live Betting – Dynamic wagering as events unfold' },
      { icon: '🆓', text: 'Free to Play – Join with no cost and enjoy risk-free opportunities' },
      { icon: '🔒', text: 'Safe & Secure – Trusted security measures for confident betting' },
    ],
    details: [
      '1.5% back on all bets for first 30 days',
      'Earn up to $200 in Prophet Cash',
      'Redeemable for real cash',
    ],
    ctaText: 'Join ProphetX',
    ctaLink: 'https://prophetx.onelink.me/E5Yi/DIME',
    featured: true,
  },
  {
    id: 'pikkit-pro',
    name: 'Pikkit Pro',
    logo: '/promotions/Pikkit Logo.webp',
    offer: '10% OFF with code SHARPMONEY',
    description: 'The ultimate bet tracking app for serious sports bettors. Track your bets, analyze your performance, fix leaks, and actually know your numbers.',
    highlights: [
      { icon: '📊', text: 'Comprehensive Analytics – Dissect betting patterns with detailed stats' },
      { icon: '⏰', text: 'Real-Time Tracking – Instant updates on wins and losses' },
      { icon: '🚨', text: 'Custom Alerts – Get notified about market changes and opportunities' },
      { icon: '💬', text: 'Community Insights – Connect with like-minded bettors' },
      { icon: '🔐', text: 'Secure & Private – State-of-the-art encryption' },
    ],
    details: [
      'Use code SHARPMONEY at checkout',
      'Sign up via website only (not the app)',
      'Works on iOS, Android, and Web',
    ],
    ctaText: 'Get 10% Off Pikkit Pro',
    ctaLink: 'https://app.pikkit.com/subscribe?ref=SHARPMONEY',
    videoLink: 'https://www.youtube.com/watch?v=-ta0_vnGXdM',
    featured: true,
  },
];

function OfferCard({ offer }: { offer: typeof offers[0] }) {
  return (
    <div className={`relative rounded-2xl overflow-hidden bg-card-bg border ${
      offer.featured 
        ? 'border-cyan shadow-[0_0_30px_rgba(0,229,255,0.2)]' 
        : 'border-card-border'
    }`}>
      {offer.featured && (
        <div className="absolute top-4 right-4 bg-cyan text-black text-xs font-bold px-3 py-1 rounded-full z-10">
          FEATURED PARTNER
        </div>
      )}
      
      {/* Header with logo and main offer */}
      <div className="p-6 md:p-8 bg-gradient-to-r from-card-bg to-cyan/5">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Logo */}
          <div className="w-28 h-28 md:w-36 md:h-36 bg-white rounded-2xl flex items-center justify-center p-4 flex-shrink-0 shadow-lg">
            <Image
              src={offer.logo}
              alt={offer.name}
              width={120}
              height={120}
              className="object-contain"
            />
          </div>
          
          {/* Main info */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">{offer.name}</h3>
            <div className="inline-block bg-green-500/20 border border-green-500/50 text-green-400 text-lg md:text-xl font-bold px-4 py-2 rounded-lg mb-4">
              {offer.offer}
            </div>
            <p className="text-white/70 text-lg">{offer.description}</p>
          </div>
        </div>
      </div>
      
      {/* Highlights */}
      {offer.highlights && offer.highlights.length > 0 && (
        <div className="px-6 md:px-8 py-6 border-t border-white/5">
          <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wide mb-4">What You Get</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {offer.highlights.map((highlight, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                <span className="text-xl">{highlight.icon}</span>
                <span className="text-white/80 text-sm">{highlight.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Details and CTA */}
      <div className="px-6 md:px-8 py-6 border-t border-white/5 bg-black/30">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          {/* Details list */}
          {offer.details && offer.details.length > 0 && (
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {offer.details.map((detail, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                  <svg className="w-4 h-4 text-cyan flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {detail}
                </li>
              ))}
            </ul>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href={offer.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-cyan text-black font-bold px-8 py-4 rounded-lg hover:bg-cyan-dim transition-all"
            >
              {offer.ctaText}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            {offer.videoLink && (
              <a
                href={offer.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-red-600 text-white font-bold px-6 py-4 rounded-lg hover:bg-red-500 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Watch Video
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PromotionsPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/logo.jpg"
              alt="SharpMoney"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold tracking-wider text-cyan">SHARPMONEY</span>
          </Link>
          
          <Link 
            href="/"
            className="text-white/70 hover:text-cyan transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan/10 rounded-full blur-[120px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/30 text-cyan text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            EXCLUSIVE OFFERS
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Promotions & <span className="bg-gradient-to-r from-cyan to-blue-500 bg-clip-text text-transparent">Partnerships</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Exclusive deals and bonuses from our trusted partners — sportsbooks, exchanges, and betting tools. 
            Save money and get more value.
          </p>
        </div>
      </section>

      {/* SharpMoney Discounts Section */}
      <section className="pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-cyan/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </span>
            SharpMoney Discounts
          </h2>
          
          {/* LAUNCH25 Promo */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-cyan/20 via-blue-500/20 to-cyan/20 border-2 border-cyan shadow-[0_0_40px_rgba(0,229,255,0.3)]">
            <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
              LIMITED TIME
            </div>
            
            <div className="p-8 text-center">
              <div className="inline-block bg-cyan text-black text-sm font-bold px-4 py-2 rounded-full mb-4">
                🎉 LAUNCH SPECIAL
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-3">
                25% OFF Your First Month
              </h3>
              
              <p className="text-white/70 text-lg mb-6 max-w-xl mx-auto">
                Get started with SharpMoney Pro or Alpha at a discount. Use code <span className="text-cyan font-bold">LAUNCH25</span> at checkout.
              </p>
              
              <div className="inline-flex items-center gap-2 bg-black/50 border border-white/20 text-white font-mono text-2xl px-6 py-3 rounded-lg mb-8">
                <span className="text-white/50 text-base">Code:</span>
                LAUNCH25
              </div>
              
              {/* Product Links */}
              <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <a 
                  href="https://whop.com/sharpmoney/core-ae/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all hover:scale-105 opacity-70"
                >
                  <div className="text-sm text-white/50 mb-1">Core</div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-white/70 font-bold text-xl">$29.99</span>
                  </div>
                  <div className="text-xs text-white/40 mt-1">no discount</div>
                </a>
                
                <a 
                  href="https://whop.com/sharpmoney/pro-7e/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cyan/20 hover:bg-cyan/30 border-2 border-cyan rounded-xl p-4 transition-all hover:scale-105"
                >
                  <div className="text-sm text-cyan mb-1">Pro ⭐</div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-white/40 line-through text-sm">$79.99</span>
                    <span className="text-cyan font-bold text-xl">$59.99</span>
                  </div>
                  <div className="text-xs text-white/40 mt-1">first month</div>
                </a>
                
                <a 
                  href="https://whop.com/sharpmoney/alpha-4e/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-500/20 hover:bg-yellow-500/30 border-2 border-yellow-500 rounded-xl p-4 transition-all hover:scale-105"
                >
                  <div className="text-sm text-yellow-500 mb-1">Alpha ⚡</div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-white/40 line-through text-sm">$199.99</span>
                    <span className="text-yellow-500 font-bold text-xl">$149.99</span>
                  </div>
                  <div className="text-xs text-white/40 mt-1">first month</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Offers Grid */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-cyan/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </span>
            Partner Promotions
          </h2>
          
          {offers.length > 0 ? (
            <div className="space-y-6">
              {offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-card-bg border border-card-border rounded-2xl">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-xl font-semibold mb-2">Promotions Coming Soon</h3>
              <p className="text-white/50">
                We're finalizing exclusive deals with our partners. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-white/30 text-sm">
          <p>© {new Date().getFullYear()} SharpMoney. All rights reserved.</p>
          <p className="mt-2 text-xs">
            Promotions are subject to terms and conditions set by each partner. Please gamble responsibly.
          </p>
        </div>
      </footer>
    </div>
  );
}
