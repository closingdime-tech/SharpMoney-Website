'use client';

import Image from 'next/image';
import Link from 'next/link';

// Promotion/Partnership offers - add new offers here
const offers = [
  // {
  //   id: 'example',
  //   name: 'Example Sportsbook',
  //   logo: '/promotions/example-logo.png',
  //   offer: '10% Deposit Bonus',
  //   description: 'Get 10% extra on your first deposit up to $500.',
  //   details: [
  //     'New customers only',
  //     'Minimum deposit $50',
  //     'Bonus code: SHARPMONEY',
  //   ],
  //   ctaText: 'Claim Offer',
  //   ctaLink: 'https://example.com/promo',
  //   featured: true,
  // },
];

function OfferCard({ offer }: { offer: typeof offers[0] }) {
  return (
    <div className={`relative rounded-2xl p-6 md:p-8 bg-card-bg border ${
      offer.featured 
        ? 'border-cyan shadow-[0_0_30px_rgba(0,229,255,0.2)]' 
        : 'border-card-border'
    }`}>
      {offer.featured && (
        <div className="absolute -top-3 left-6 bg-cyan text-black text-xs font-bold px-3 py-1 rounded-full">
          FEATURED
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Logo */}
        <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-xl flex items-center justify-center p-4 flex-shrink-0">
          <Image
            src={offer.logo}
            alt={offer.name}
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold mb-1">{offer.name}</h3>
          <div className="text-cyan text-lg md:text-xl font-semibold mb-3">{offer.offer}</div>
          <p className="text-white/70 mb-4">{offer.description}</p>
          
          {/* Details list */}
          {offer.details && offer.details.length > 0 && (
            <ul className="space-y-2 mb-6">
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
          
          <a
            href={offer.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-cyan text-black font-semibold px-6 py-3 rounded-lg hover:bg-cyan-dim transition-all"
          >
            {offer.ctaText}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
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
