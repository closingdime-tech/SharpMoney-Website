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
    featured: false,
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
            Partner <span className="bg-gradient-to-r from-cyan to-blue-500 bg-clip-text text-transparent">Promotions</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Exclusive deals and bonuses from our trusted sportsbook partners. 
            Save money on deposits, get bonus bets, and more.
          </p>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto">
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
