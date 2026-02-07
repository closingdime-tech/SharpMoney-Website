'use client';

import Image from 'next/image';
import Link from 'next/link';

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

export default function ReviewsPage() {
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
            <span className="text-yellow-400">★★★★★</span>
            4.9 AVERAGE RATING
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            What Our <span className="bg-gradient-to-r from-cyan to-blue-500 bg-clip-text text-transparent">Members</span> Say
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Hear from real SharpMoney members who are winning every day.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="pb-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '4.9', label: 'Average Rating', icon: '⭐' },
            { value: '100%', label: '5-Star Reviews', icon: '🏆' },
            { value: '5K+', label: 'Community Members', icon: '👥' },
            { value: '1yr+', label: 'Longest Members', icon: '📅' },
          ].map((stat, i) => (
            <div key={i} className="bg-card-bg border border-card-border rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-cyan">{stat.value}</div>
              <div className="text-xs text-white/50 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="pb-16 px-6">
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
