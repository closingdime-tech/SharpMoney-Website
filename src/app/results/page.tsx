'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const memberResults = [
  { src: '/results/matt.webp', name: 'Matt', profit: '+$45,163.95', roi: '+9.13%' },
  { src: '/results/johnny-updated.webp', name: 'Johnny', profit: '+$42,242.36', roi: '+6.33%' },
  { src: '/results/ckressin.webp', name: 'CKressin', profit: '+$30,410.07', roi: '+3.18%' },
  { src: '/results/doc.webp', name: 'Doc', profit: '+$17,463.88', roi: '+3.28%' },
  { src: '/results/greg.webp', name: 'Greg', profit: '+$15,870.01', roi: '+6.54%' },
  { src: '/results/sprii.jpg', name: 'Sprii', profit: '+$11,452.94', roi: '+16.69%' },
  { src: '/results/andrew.webp', name: 'Andrew', profit: '+$10,069.09', roi: '+2.54%' },
  { src: '/results/mooky.webp', name: 'Mooky', profit: '+$9,162.60', roi: '+5.01%' },
  { src: '/results/nobby.webp', name: 'Nobby', profit: '+$8,236.74', roi: '+3.56%' },
  { src: '/results/ry.jpg', name: 'Ry', profit: '+$8,256.19', roi: '+4.19%' },
  { src: '/results/tbone.webp', name: 'tbone', profit: '+$8,079.62', roi: '+1.75%' },
  { src: '/results/jeremy.webp', name: 'Jeremy', profit: '+$6,309.36', roi: '+1.89%' },
  { src: '/results/devin.jpg', name: 'Devin', profit: '+$5,358.26', roi: '+2.99%' },
  { src: '/results/nate.webp', name: 'Nate', profit: '+$5,184.40', roi: '+2.46%' },
  { src: '/results/riggs.webp', name: 'Riggs', profit: '+$5,090.93', roi: '+9.95%' },
  { src: '/results/sniper.webp', name: 'The Sniper', profit: '+$4,989.83', roi: '+6.97%' },
  { src: '/results/jtn28.webp', name: 'jtn28', profit: '+$5,007.11', roi: '+4.84%' },
  { src: '/results/ben.webp', name: 'Ben', profit: '+$2,021.45', roi: '+19.60%' },
  { src: '/results/bluexena.jpg', name: 'Bluexena', profit: '+$1,558.92', roi: '+3.68%' },
  { src: '/results/moneydish.webp', name: 'Moneydish', profit: '+$1,036.34', roi: '+4.83%' },
];

const reviews = [
  {
    name: 'Steve DiMartino',
    initials: 'SD',
    rating: 5,
    text: "The community within the SharpMoney discord are building something special and I am greatly thankful to be a part of this community. You can tell that the commitment and dedication to constantly improved ones strategy and knowledge in this space comes from the top down, starting with the owners. It's hard not to continually improve your skills while being a part of SharpMoney!",
    date: 'August 1, 2025',
    memberFor: '10 months',
  },
  {
    name: 'Joshua Hughes',
    initials: 'JH',
    rating: 5,
    text: "I've been a member of sharpmoney for over a year and this is by far the best discord i've been apart of. I've learned so much during this time & it has completely changed how I bet. I will definitely be a member for life!",
    date: 'February 2, 2026',
    memberFor: '3 months',
  },
  {
    name: 'Peyton Rhodes',
    initials: 'PR',
    rating: 5,
    text: 'Best service in the industry hands down. The owners and community have completely changed the way I see +EV betting.',
    date: 'January 22, 2026',
    memberFor: '3 days',
  },
  {
    name: 'Kyle DeLong',
    initials: 'KD',
    rating: 5,
    text: "SharpMoney Alpha has been an absolute game-changer. From day one, the community alone makes it worth joining — knowledgeable, welcoming, and genuinely supportive. Everyone wants to see each other win, and that kind of environment is rare.",
    date: 'February 2, 2026',
    memberFor: '5 days',
  },
  {
    name: 'Todd Buckholt',
    initials: 'TB',
    rating: 5,
    text: "In my first 3 months of using Sharp Money, I profited more than I had in the previous 9 months as a square bettor. The tools are amazingly helpful, but the commitment to educating and developing smarter betting habits is invaluable. Highly recommend to anyone looking to become a winning sports bettor.",
    date: 'October 20, 2025',
    memberFor: '2 months',
  },
  {
    name: 'LetsGoSquale',
    initials: 'LS',
    rating: 5,
    text: 'The Sharp Money Discord changed my life. In only 3 months I have profit over 20k God bless',
    date: 'October 20, 2025',
    memberFor: '4 months',
  },
  {
    name: 'Ryan St. Pierre',
    initials: 'RP',
    rating: 5,
    text: "Truly believe this is THE community for sports bettors hoping to be profitable long term. Everyone loves a get rich quick lotto, but it's not a sustainable approach. You find a great deal of lottos here too, but also how keep that bankroll building simultaneously. So much knowledge from so many experienced bettors willing to help out it's incredible. 12/5 stars!",
    date: 'August 7, 2025',
    memberFor: '9 months',
  },
  {
    name: 'Hayden Newton',
    initials: 'HN',
    rating: 5,
    text: 'Great owners that are very interactive with the community! Great tools and education to get yourself on great bets and beat the sports betting market!',
    date: 'February 1, 2026',
    memberFor: '5 days',
  },
  {
    name: 'John Furcick',
    initials: 'JF',
    rating: 5,
    text: "You don't just get access to the best +EV betting tools available when you sign up for SharpMoney. The discord also provides a fun community full of successful members willing to help share all of their experiences to help you grow as a bettor. The knowledge I have gained has been invaluable to my own success as a bettor.",
    date: 'August 12, 2025',
    memberFor: '1 year',
  },
  {
    name: 'Ryan Njoroge',
    initials: 'RN',
    rating: 5,
    text: "Far and away the best platform to learn about and succeed with +EV betting. I'm still learning something new everyday while seeing record profits!",
    date: 'October 18, 2025',
    memberFor: '3 months',
  },
];

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="bg-card-bg border border-card-border rounded-2xl p-6 hover:border-cyan/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.1)] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {review.initials}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white">{review.name}</h3>
          <div className="text-yellow-400 text-sm tracking-wide">
            {'★'.repeat(review.rating)}
          </div>
        </div>
      </div>

      {/* Quote */}
      <p className="text-white/70 leading-relaxed flex-1 mb-4">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-white/40 pt-4 border-t border-white/5">
        <span>{review.date}</span>
        <span className="bg-cyan/10 text-cyan px-2 py-1 rounded-full">
          Member for {review.memberFor}
        </span>
      </div>
    </div>
  );
}

function MemberResults() {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const visibleResults = showAll ? memberResults : memberResults.slice(0, 6);

  return (
    <>
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleResults.map((result, i) => (
              <button
                key={i}
                onClick={() => setLightboxImg(result.src)}
                className="group relative bg-card-bg border border-card-border rounded-2xl overflow-hidden hover:border-green-500/30 transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,197,94,0.15)] cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={result.src}
                    alt={`${result.name}'s profit chart`}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10 backdrop-blur-sm rounded-full p-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Info bar */}
                <div className="p-4 flex items-center justify-between">
                  <span className="text-white font-semibold">{result.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-green-400 font-bold text-sm">{result.profit}</span>
                    <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded-full">{result.roi} ROI</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Show More / Show Less */}
          {memberResults.length > 6 && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 hover:border-green-500/30 text-white/70 hover:text-green-400 font-semibold px-8 py-3 rounded-xl transition-all duration-300"
              >
                {showAll ? 'Show Less' : `Show All ${memberResults.length} Results`}
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxImg(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Expanded image */}
          <div
            className="relative max-w-lg w-full max-h-[85vh] aspect-[4/5]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImg}
              alt="Member result"
              fill
              className="object-contain rounded-xl"
              sizes="(max-width: 768px) 95vw, 512px"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}

export default function ResultsPage() {
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
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-500/10 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            VERIFIED ON PIKKIT
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Proven <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Results</span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Real profits from real members. Every chart is verified — see what SharpMoney members are earning.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="pb-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '4.9', label: 'Average Rating', icon: '⭐' },
            { value: '175', label: 'Total Reviews', icon: '📝' },
            { value: '95%+', label: '5-Star Reviews', icon: '🏆' },
            { value: '5K+', label: 'Community Members', icon: '👥' },
          ].map((stat, i) => (
            <div key={i} className="bg-card-bg border border-card-border rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-cyan">{stat.value}</div>
              <div className="text-xs text-white/50 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Member Profit Charts (first) */}
      <MemberResults />

      {/* Testimonials Section Header */}
      <section className="pb-4 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/30 text-cyan text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <span className="text-yellow-400">★★★★★</span>
            MEMBER TESTIMONIALS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="bg-gradient-to-r from-cyan to-blue-500 bg-clip-text text-transparent">Members</span> Say
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Hear directly from the SharpMoney community.
          </p>
        </div>
      </section>

      {/* Reviews Grid (second) */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-cyan/10 via-blue-500/10 to-cyan/10 border border-cyan/20 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Join Them?
          </h2>
          <p className="text-white/60 mb-8">
            Start your SharpMoney journey and become the next success story.
          </p>
          <a
            href="https://whop.com/sharpmoney/pro-7e/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-cyan text-black font-bold text-lg px-10 py-4 rounded-lg hover:bg-cyan-dim transition-all pulse-glow"
          >
            Get Started Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-white/30 text-sm">
          <p>© {new Date().getFullYear()} SharpMoney. All rights reserved.</p>
          <p className="mt-2 text-xs">
            All reviews are from verified Whop members. Results may vary. Please gamble responsibly.
          </p>
        </div>
      </footer>
    </div>
  );
}
