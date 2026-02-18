'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// ============================================================
// COURSE DATA — 11 Main Videos + 3 Alpha Videos
// ============================================================

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number; // index of correct option
}

interface CourseVideo {
  id: number;
  chapter: number;
  chapterTitle: string;
  title: string;
  description: string;
  videoSrc: string; // URL to MP4 (GitHub Releases or local)
  duration: string;
  quiz: QuizQuestion[];
}

const courseVideos: CourseVideo[] = [
  // ---- Before Course (no quiz) ----
  {
    id: 0,
    chapter: 0,
    chapterTitle: 'Welcome',
    title: 'How the Academy Works',
    description: 'Before we begin — learn how the grading system works, what rewards you can earn, and how to get the most out of this course.',
    videoSrc: 'https://github.com/closingdime-tech/SharpMoney-Website/releases/download/Course-Videos/Before.Course.mp4',
    duration: '3 min',
    quiz: [],
  },
  // ---- Chapter 1: Introduction ----
  {
    id: 1,
    chapter: 1,
    chapterTitle: 'Introduction',
    title: 'Course Introduction',
    description: 'An overview of what you\'ll learn, how the course is structured, and what separates the 1% of profitable sports bettors from the rest.',
    videoSrc: 'https://github.com/closingdime-tech/SharpMoney-Website/releases/download/Course-Videos/SharpMoney.Free.Course.1.1.mp4',
    duration: '8 min',
    quiz: [
      {
        question: 'According to Robbie, what percentage of people who watch this course will likely NOT become profitable sports bettors?',
        options: ['25%', 'More than 50%', '75%', '90%'],
        correct: 1,
      },
      {
        question: 'Robbie says anyone can be a profitable sports bettor as long as they are:',
        options: ['Betting on the right sports', 'Committed to the process', 'Already wealthy', 'Watching sports every day'],
        correct: 1,
      },
      {
        question: 'Which of these is NOT a reason Robbie says people fail at profitable sports betting?',
        options: ["It's too much effort", "They don't understand the math", "They think it's boring", "They don't have enough money to start"],
        correct: 3,
      },
      {
        question: "What was Robbie's original sports betting income goal before realizing its full potential?",
        options: ['$2,000–$3,000 per month', '$200–$300 per month', '$50–$100 per month', '$1,000 per month'],
        correct: 1,
      },
      {
        question: 'After completing this course, Robbie says you will be ____ compared to 99% of other sports bettors.',
        options: ['Richer', 'More educated', 'More disciplined', 'Faster at placing bets'],
        correct: 1,
      },
    ],
  },
  {
    id: 2,
    chapter: 1,
    chapterTitle: 'Introduction',
    title: 'Meet Robbie (ClosingDime)',
    description: 'Get to know the founder of SharpMoney — his background, how he got into sports betting, and how he turned $2,000 into a full-time edge.',
    videoSrc: 'https://github.com/closingdime-tech/SharpMoney-Website/releases/download/Course-Videos/SharpMoney.Course.1.2.mp4',
    duration: '10 min',
    quiz: [
      {
        question: 'How much money did Robbie start his sports betting journey with?',
        options: ['$500', '$1,000', '$2,000', '$10,000'],
        correct: 2,
      },
      {
        question: 'Why did Robbie start a YouTube channel about one year into his sports betting journey?',
        options: ['To sell a course', 'He was getting limited by sportsbooks and wanted to stay involved in the community', 'His friends told him to', 'To get sponsored by sportsbooks'],
        correct: 1,
      },
      {
        question: 'How much profit did Robbie make in his first year of sports betting?',
        options: ['About $5,000', 'About $15,000', 'About $30,000', 'About $55,000'],
        correct: 2,
      },
      {
        question: 'What is true about Robbie\'s personal situation while making money sports betting?',
        options: ['He does it full-time with no other job', 'He works full-time, has a part-time job, and has two kids under three', "He's a retired math teacher", "He's a college student"],
        correct: 1,
      },
      {
        question: 'Why did Robbie originally start looking into profitable sports betting?',
        options: ['He wanted to get rich quick', "He didn't want to lose money over a lifetime of sports betting", 'A friend dared him', 'He lost a big bet and wanted revenge'],
        correct: 1,
      },
    ],
  },
  {
    id: 3,
    chapter: 1,
    chapterTitle: 'Introduction',
    title: 'The Sports Betting Industry',
    description: 'A wake-up call about how the sports betting industry really works, why 97% of bettors lose, and how sportsbooks are designed to take your money.',
    videoSrc: 'https://github.com/closingdime-tech/SharpMoney-Website/releases/download/Course-Videos/SharpMoney.Course.1.3.mp4',
    duration: '12 min',
    quiz: [
      {
        question: 'In 2023, how much money was wagered on sports betting in the United States?',
        options: ['$50 billion', '$73 billion', '$93 billion', '$120 billion'],
        correct: 2,
      },
      {
        question: 'What percentage ROI are sportsbooks making on same game parlays?',
        options: ['5%', '9%', '13%', '18%'],
        correct: 3,
      },
      {
        question: 'For every $100 bet in 2023, how much was the average bettor expected to lose?',
        options: ['$3', '$5', '$9', '$15'],
        correct: 2,
      },
      {
        question: 'Why does Robbie say knowing sports well does NOT make you a good sports bettor?',
        options: ['Sports knowledge is irrelevant to betting odds and price sensitivity', 'Only mathematicians can bet profitably', 'You need to play the sport professionally first', 'Sports analysts always pick winners'],
        correct: 0,
      },
      {
        question: 'Why does Robbie say celebrity-endorsed parlays on sportsbooks are bad bets?',
        options: ['Celebrities are unlucky', 'The sportsbook puts their face on terrible bets because more people will take them', "They're always for the wrong sport", 'The odds are always even money'],
        correct: 1,
      },
    ],
  },

  // ---- Chapter 2: The Basics ----
  {
    id: 4,
    chapter: 2,
    chapterTitle: 'The Basics',
    title: 'What is +EV Betting?',
    description: 'The core concept behind profitable sports betting — what positive expected value means and the three main top-down strategies.',
    videoSrc: '',
    duration: '15 min',
    quiz: [
      {
        question: 'Top-down betting requires extensive knowledge of the sports you\'re betting on. True or false?',
        options: ['True', 'False'],
        correct: 1,
      },
      {
        question: 'In the outlier example, if 10 books have the Patriots at +110 and one book has +130, what should you do?',
        options: ['Bet the +110 since most books agree', "Bet the +130 because it's an outlier with value", 'Wait for more books to move', 'Avoid the game entirely'],
        correct: 1,
      },
      {
        question: 'What typical ROI range can you expect from top-down betting?',
        options: ['10–15%', '5–8%', '1–3%', 'Less than 0.5%'],
        correct: 2,
      },
      {
        question: "Which of these is Robbie's FAVORITE top-down strategy?",
        options: ['Market average / outlier strategy', 'Sharp book comparison', 'Steam chasing', 'Arbitrage betting'],
        correct: 2,
      },
      {
        question: 'Why do mispriced lines on sportsbooks typically not last very long?',
        options: ['The government forces corrections', 'The book knows the market is correct and will adjust quickly', 'Other bettors complain', 'Lines never change once posted'],
        correct: 1,
      },
    ],
  },
  {
    id: 5,
    chapter: 2,
    chapterTitle: 'The Basics',
    title: 'Understanding the Vig',
    description: 'Learn what the vig (juice) is, how sportsbooks build their margin into the odds, and why understanding it is essential to finding value.',
    videoSrc: '',
    duration: '10 min',
    quiz: [
      {
        question: 'What is the "vig" in sports betting?',
        options: ['A type of bet', 'The commission sportsbooks charge built into the odds', 'A bonus offered to new bettors', 'The closing line value'],
        correct: 1,
      },
      {
        question: 'What is the approximate vig percentage on a standard -110 / -110 line?',
        options: ['2.5%', '4.76%', '7%', '10%'],
        correct: 1,
      },
      {
        question: 'Why do sportsbooks add MORE vig to certain markets like bench player props?',
        options: ['Those markets are more popular', 'Regulations require higher vig on props', 'They are less confident in the accuracy of those lines', 'Bench players are harder to track'],
        correct: 2,
      },
      {
        question: 'Which sportsbook is known for having the lowest vig in the industry?',
        options: ['DraftKings', 'FanDuel', 'Pinnacle', 'BetMGM'],
        correct: 2,
      },
      {
        question: 'If a sportsbook offers -110 on both sides of a bet, how much total money do they keep from $220 in total wagers?',
        options: ['$0', '$10', '$20', '$22'],
        correct: 1,
      },
    ],
  },
  {
    id: 6,
    chapter: 2,
    chapterTitle: 'The Basics',
    title: 'Implied Win Probability',
    description: 'How to convert American odds into implied probabilities — the key skill for comparing what a sportsbook thinks vs. what the real probability is.',
    videoSrc: '',
    duration: '10 min',
    quiz: [
      {
        question: 'What is the implied win probability of a -150 line?',
        options: ['50%', '55%', '60%', '65%'],
        correct: 2,
      },
      {
        question: 'When calculating implied probability for negative odds, what formula do you use?',
        options: ['100 / (Odds + 100)', 'Odds / (Odds + 100)', 'Odds / 100', '100 / Odds'],
        correct: 1,
      },
      {
        question: "Why do implied probabilities from a sportsbook's odds typically add up to MORE than 100%?",
        options: ['Because of rounding errors', 'Because the vig is built into both sides', 'Because there are more than two outcomes', 'Because odds change throughout the day'],
        correct: 1,
      },
      {
        question: 'What is the implied probability of +200 odds?',
        options: ['25%', '33.3%', '40%', '50%'],
        correct: 1,
      },
      {
        question: 'Understanding implied probability helps you identify +EV bets by:',
        options: ['Telling you which team will win', "Comparing the book's implied probability to the true probability", 'Guaranteeing a profit on every bet', 'Predicting final scores'],
        correct: 1,
      },
    ],
  },
  {
    id: 7,
    chapter: 2,
    chapterTitle: 'The Basics',
    title: 'No-Vig Fair Odds',
    description: 'How to remove the vig from any betting line to reveal the true fair odds — the foundation for identifying positive expected value.',
    videoSrc: '',
    duration: '12 min',
    quiz: [
      {
        question: 'What is the purpose of removing the vig from a betting line?',
        options: ['To determine how much the sportsbook will pay you', 'To calculate your bankroll size', 'To find the true fair value so you can identify +EV opportunities', 'To determine which sport to bet on'],
        correct: 2,
      },
      {
        question: 'Which devigging method does Robbie teach as the most commonly used in the industry?',
        options: ['Additive method', 'Shin method', 'Multiplicative method', 'Power method'],
        correct: 2,
      },
      {
        question: 'If the no-vig fair odds for a bet are +110 and a sportsbook is offering +130, this bet is:',
        options: ['Negative EV', 'Neutral EV', 'Positive EV', 'Impossible to determine'],
        correct: 2,
      },
      {
        question: 'Which type of sportsbook should you use as a benchmark for fair odds?',
        options: ['Retail books like DraftKings or FanDuel', 'Sharp books like Pinnacle', 'Offshore books', 'Any book with good promotions'],
        correct: 1,
      },
      {
        question: 'Devigging both sides of a line results in probabilities that add up to:',
        options: ['More than 100%', 'Exactly 100%', 'Less than 100%', 'It varies'],
        correct: 1,
      },
    ],
  },

  // ---- Chapter 3: Strategy & Concepts ----
  {
    id: 8,
    chapter: 3,
    chapterTitle: 'Strategy & Concepts',
    title: 'Expected Value',
    description: 'The math behind every profitable bet — learn how to calculate EV, why volume matters, and how small edges compound into real money.',
    videoSrc: '',
    duration: '12 min',
    quiz: [
      {
        question: 'If you bet $100 at +110 odds with a 50% true win probability, what is your expected value per bet?',
        options: ['-$5', '$0', '+$5', '+$10'],
        correct: 2,
      },
      {
        question: 'What does a positive expected value (+EV) mean?',
        options: ['You will win every bet', 'You expect to profit over a large number of bets', 'The sportsbook made an error', 'The game will go over the total'],
        correct: 1,
      },
      {
        question: 'Approximately how much profit per bet did Robbie average over his tracked betting history?',
        options: ['$5', '$10', 'About $21', '$50'],
        correct: 2,
      },
      {
        question: 'Why is placing a high VOLUME of +EV bets important?',
        options: ['You get loyalty bonuses from sportsbooks', 'The law of large numbers means your results converge to the expected value', 'More bets means more excitement', 'Sportsbooks give you better odds with volume'],
        correct: 1,
      },
      {
        question: 'A bet with +2% EV means that for every $100 you wager, you expect to profit:',
        options: ['$0.20', '$2.00', '$20.00', '$200.00'],
        correct: 1,
      },
    ],
  },
  {
    id: 9,
    chapter: 3,
    chapterTitle: 'Strategy & Concepts',
    title: 'Bankroll Management & Units',
    description: 'How to protect and grow your bankroll using a unit-based system, the Kelly Criterion, and responsible bet sizing strategies.',
    videoSrc: '',
    duration: '12 min',
    quiz: [
      {
        question: 'In the sports betting industry, one unit typically represents what percentage of your total bankroll?',
        options: ['0.5%', '1%', '5%', '10%'],
        correct: 1,
      },
      {
        question: 'What is the primary purpose of using a unit-based betting system?',
        options: ['To bet the same dollar amount every time', 'To manage risk and scale bets relative to your bankroll', 'To maximize single-bet payouts', 'To track wins and losses for taxes'],
        correct: 1,
      },
      {
        question: 'The Kelly Criterion is used to determine:',
        options: ['Which sport to bet on', 'The optimal bet size based on your edge and odds', 'The best sportsbook to use', 'When to cash out'],
        correct: 1,
      },
      {
        question: 'What happens if you consistently over-bet (risking too much per bet)?',
        options: ['You make money faster', "Nothing, it's the same as flat betting", 'You increase your risk of ruin — potentially losing your entire bankroll', 'Sportsbooks will limit you sooner'],
        correct: 2,
      },
      {
        question: 'For beginners, Robbie recommends which approach to bet sizing?',
        options: ['Bet your entire bankroll on the highest EV play', 'Use a consistent flat unit size (e.g. 1% of bankroll)', 'Only bet on favorites', 'Let the sportsbook decide your bet size'],
        correct: 1,
      },
    ],
  },

  // ---- Chapter 4: Using SharpMoney ----
  {
    id: 10,
    chapter: 4,
    chapterTitle: 'Using SharpMoney',
    title: 'SharpMoney +EV Tool Tutorial',
    description: 'A full walkthrough of the SharpMoney platform — how to set up your account, configure filters, read the odds screen, and use line movement charts.',
    videoSrc: '',
    duration: '25 min',
    quiz: [
      {
        question: 'How many sportsbooks does SharpMoney display live odds from?',
        options: ['5', '10', '20+', '50+'],
        correct: 2,
      },
      {
        question: 'What are "sharp books" in the SharpMoney tool used for?',
        options: ['Placing bets with higher limits', 'Getting bonus offers', 'Establishing fair value and true market pricing', 'Showing only NFL odds'],
        correct: 2,
      },
      {
        question: 'What do line movement charts in SharpMoney show you?',
        options: ['Only the final score predictions', 'How odds have moved over time across multiple books', 'Your personal betting history', "Tomorrow's odds"],
        correct: 1,
      },
      {
        question: 'What is the purpose of one-click deep links in SharpMoney?',
        options: ['They show you YouTube tutorials', 'They take you directly to the bet slip on the sportsbook app', 'They link to news articles about the game', 'They share bets on social media'],
        correct: 1,
      },
      {
        question: 'In the SharpMoney Pro plan, how many sharp sportsbooks are included for price comparison?',
        options: ['1', '2', '3', '5'],
        correct: 2,
      },
    ],
  },
  {
    id: 11,
    chapter: 4,
    chapterTitle: 'Using SharpMoney',
    title: '+EV Strategies & Line Movement',
    description: 'Watch Robbie use SharpMoney live to find real bets — learn to read line movement, identify good vs. bad plays, and understand when the market is telling you to bet.',
    videoSrc: '',
    duration: '30 min',
    quiz: [
      {
        question: 'According to Robbie, what is one of the FIRST things you should check before placing any bet on the tool?',
        options: ['How many people are betting on it', 'The weather forecast', 'Whether Pinnacle (or other sharp books) has high limits on the market', "The team's win/loss record"],
        correct: 2,
      },
      {
        question: 'In the Memphis Grizzlies under example, what made it a GOOD bet?',
        options: ['The Grizzlies were on a losing streak', 'Multiple sharp books agreed, and the line was moving in the direction of value', 'It was a primetime game', 'The odds were better than -110'],
        correct: 1,
      },
      {
        question: "What is one sign of a 'bad' or risky bet according to Robbie's analysis?",
        options: ['High EV percentage with no supporting line movement', 'The game starts after 9pm', 'Too many sportsbooks offering the same odds', 'The bet is on an underdog'],
        correct: 0,
      },
      {
        question: 'Why does Robbie emphasize checking line movement BEFORE placing a bet?',
        options: ['To see if other people are betting', 'To understand if the market supports the edge — confirming real value vs. a stale line', 'To predict the final score', 'To get better odds later'],
        correct: 1,
      },
      {
        question: 'What does Robbie say about bets where the EV is high but the market is moving AGAINST you?',
        options: ['Always bet them — high EV is all that matters', 'Double your bet size', 'Be cautious — the line may be stale or the edge may not be real', 'Report it to the sportsbook'],
        correct: 2,
      },
    ],
  },
];

// ---- Alpha Course (Placeholder — Not Yet Filmed) ----
interface AlphaVideo {
  id: number;
  title: string;
  description: string;
  comingSoon: boolean;
}

const alphaVideos: AlphaVideo[] = [
  {
    id: 0,
    title: 'SharpMoney Signal',
    description: 'Our proprietary system that identifies edges invisible to standard +EV tools. Learn how Signal works, the data behind its 5.4% ROI across 20,000+ tracked bets, and how to use it in your daily betting workflow.',
    comingSoon: true,
  },
  {
    id: 1,
    title: 'SharpMoney Handicapped Plays',
    description: 'Go inside the process of our professional handicappers. Learn how MathWins and Sigma Squirrel analyze games, build models, and generate originated plays that consistently beat the market.',
    comingSoon: true,
  },
  {
    id: 2,
    title: 'Advanced +EV Tool Settings',
    description: 'Unlock the full power of SharpMoney with per-book custom EV thresholds, per-period limit overrides, advanced filtering, and unlimited historical data. The settings that separate power users from everyone else.',
    comingSoon: true,
  },
];

// ============================================================
// GRADE CALCULATION
// ============================================================

function getGrade(percentage: number): { letter: string; reward: string; color: string } {
  if (percentage >= 90) return { letter: 'A+', reward: 'Free month of Pro', color: 'text-green-400' };
  if (percentage >= 80) return { letter: 'A', reward: '75% off first month of Pro', color: 'text-green-400' };
  if (percentage >= 70) return { letter: 'B', reward: '50% off first month of Pro', color: 'text-cyan' };
  if (percentage >= 60) return { letter: 'C', reward: '25% off first month of Pro', color: 'text-yellow-400' };
  return { letter: 'F', reward: 'Retake available', color: 'text-red-400' };
}

function getPromoCode(percentage: number): string {
  if (percentage >= 90) return 'ACADEMY100';
  if (percentage >= 80) return 'ACADEMY75';
  if (percentage >= 70) return 'ACADEMY50';
  if (percentage >= 60) return 'ACADEMY25';
  return '';
}

// ============================================================
// COMPONENTS
// ============================================================

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

// Navigation (consistent with other pages)
function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <Logo className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold tracking-wider text-cyan">SHARPMONEY</span>
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="/#features" className="text-white/70 hover:text-cyan transition-colors">Features</a>
          <a href="/#pricing" className="text-white/70 hover:text-cyan transition-colors">Pricing</a>
          <a href="/promotions" className="text-white/70 hover:text-cyan transition-colors">Promos</a>
          <a href="/results" className="text-white/70 hover:text-cyan transition-colors">Results</a>
          <a 
            href="https://whop.com/sharpmoney/pro-7e/" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-cyan text-black font-semibold px-6 py-2 rounded-lg hover:bg-cyan-dim transition-colors"
          >
            Get Started
          </a>
        </div>

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

      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          <a href="/#features" className="text-white/70 hover:text-cyan transition-colors py-2">Features</a>
          <a href="/#pricing" className="text-white/70 hover:text-cyan transition-colors py-2">Pricing</a>
          <a href="/promotions" className="text-white/70 hover:text-cyan transition-colors py-2">Promos</a>
          <a href="/results" className="text-white/70 hover:text-cyan transition-colors py-2">Results</a>
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

// ---- Landing Page (before email capture) ----
function CourseLanding({ onEnroll }: { onEnroll: (email: string) => void }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    onEnroll(email);
  };

  return (
    <section className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/20 rounded-full px-4 py-2 mb-6">
            <span className="text-cyan text-sm font-medium">FREE COURSE</span>
            <span className="text-white/40 text-sm">•</span>
            <span className="text-white/60 text-sm">12 Videos • 4 Chapters</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            SharpMoney<br />
            <span className="gradient-text">Betting Academy</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-4">
            A free course that teaches you how professional sports bettors actually make money. 
            Learn +EV betting from the ground up — and earn a discount on SharpMoney Pro when you graduate.
          </p>
          
          <p className="text-white/40 text-sm">
            Join the top 1% of sports bettors who understand the math behind the market.
          </p>
        </div>

        {/* What You'll Learn */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            { icon: '📊', title: 'The Math Behind Profitable Betting', desc: 'Expected value, implied probability, vig removal, and no-vig fair odds.' },
            { icon: '🎯', title: 'Top-Down Betting Strategies', desc: 'Outlier detection, sharp book comparison, and steam chasing — no sports knowledge required.' },
            { icon: '💰', title: 'Bankroll Management', desc: 'Unit sizing, the Kelly Criterion, and how to protect your bankroll while maximizing growth.' },
            { icon: '⚡', title: 'How to Use SharpMoney', desc: 'Full tool tutorial — filters, line movement charts, deep links, and live bet analysis.' },
          ].map((item, i) => (
            <div key={i} className="bg-card-bg border border-card-border rounded-xl p-6">
              <span className="text-3xl mb-3 block">{item.icon}</span>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-white/50 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Grade Rewards */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">The Higher You Score, The More You Save</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { grade: 'A+', range: '90–100%', reward: 'Free month of Pro', icon: '🏆', bg: 'from-green-500/15 to-green-500/5', border: 'border-green-500/40', text: 'text-green-400' },
              { grade: 'A', range: '80–89%', reward: '75% off first month', icon: '🥇', bg: 'from-green-500/10 to-green-500/0', border: 'border-green-500/25', text: 'text-green-400' },
              { grade: 'B', range: '70–79%', reward: '50% off first month', icon: '🥈', bg: 'from-cyan/10 to-cyan/0', border: 'border-cyan/25', text: 'text-cyan' },
              { grade: 'C', range: '60–69%', reward: '25% off first month', icon: '🥉', bg: 'from-yellow-500/10 to-yellow-500/0', border: 'border-yellow-500/25', text: 'text-yellow-400' },
            ].map((tier, i) => (
              <div key={i} className={`bg-gradient-to-b ${tier.bg} border ${tier.border} rounded-2xl p-6 text-center`}>
                <div className="text-2xl mb-2">{tier.icon}</div>
                <div className={`text-4xl font-black mb-1 ${tier.text}`}>{tier.grade}</div>
                <div className="text-white/30 text-xs mb-3 font-medium">{tier.range}</div>
                <div className="text-white/80 text-sm font-semibold">{tier.reward}</div>
              </div>
            ))}
          </div>
          
          <p className="text-white/30 text-xs text-center mt-4">
            5 quiz questions after each video &bull; Your cumulative score determines your grade
          </p>
        </div>

        {/* SharpMoney Pro Showcase */}
        <div className="bg-card-bg border border-cyan/20 rounded-2xl overflow-hidden mb-16">
          {/* Video Demo */}
          <div className="aspect-video bg-black">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/SharpMoney_1.mov" type="video/quicktime" />
              <source src="/SharpMoney_1.mov" type="video/mp4" />
            </video>
          </div>

          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/20 rounded-full px-3 py-1">
                <span className="text-cyan text-xs font-semibold">MOST POPULAR</span>
              </div>
              <span className="text-white/30 text-sm">What you&apos;re working toward</span>
            </div>

            <h3 className="text-2xl font-bold mb-2">
              SharpMoney Pro — <span className="text-cyan">$79.99/mo</span>
            </h3>
            <p className="text-white/50 mb-6">
              Professional-grade +EV tools that give you the same data the sharpest bettors in the world use. 
              This is what you&apos;ll learn to master in this course.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Full +EV opportunity feed',
                'Live odds from 20+ sportsbooks',
                '3 sharp books (true market pricing)',
                '4 exchanges + 2 prediction markets',
                'Line movement charts & history',
                '30-day historical data',
                'Kelly Criterion sizing',
                'Deep links to bet slips',
                'Advanced filters',
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/70">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-white/40 text-sm">
                Ace this course and get <span className="text-green-400 font-semibold">a free month</span> to try it yourself.
              </p>
            </div>
          </div>
        </div>

        {/* Email Capture */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-b from-cyan/10 to-cyan/5 border-2 border-cyan/30 rounded-2xl p-10 md:p-14 text-center shadow-[0_0_60px_rgba(0,229,255,0.1)]">
            <div className="text-5xl mb-4">🎓</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Start Learning — Free</h2>
            <p className="text-white/60 mb-8 text-lg max-w-lg mx-auto">
              Enter your email to begin the course. We&apos;ll send your promo code when you graduate.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-4">
              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                className="flex-1 px-5 py-4 bg-black border-2 border-white/10 rounded-xl text-white text-lg placeholder-white/30 focus:outline-none focus:border-cyan transition-colors"
              />
              <button
                type="submit"
                className="bg-cyan text-black font-bold px-8 py-4 rounded-xl hover:bg-cyan-dim transition-colors text-lg whitespace-nowrap shadow-[0_0_20px_rgba(0,229,255,0.3)]"
              >
                Start the Course →
              </button>
            </form>
            {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
            
            <p className="text-white/30 text-sm">No spam. No credit card. Just free education and your promo code.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Sidebar Video List ----
function CourseSidebar({
  completedVideos,
  quizScores,
  activeVideoId,
  onSelectVideo,
  courseComplete,
}: {
  completedVideos: Set<number>;
  quizScores: Record<number, number>;
  activeVideoId: number | null;
  onSelectVideo: (id: number) => void;
  courseComplete: boolean;
}) {
  // Group by chapter
  const chapters = courseVideos.reduce((acc, video) => {
    if (!acc[video.chapter]) {
      acc[video.chapter] = { title: video.chapterTitle, videos: [] };
    }
    acc[video.chapter].videos.push(video);
    return acc;
  }, {} as Record<number, { title: string; videos: CourseVideo[] }>);

  const videosWithQuizzes = courseVideos.filter(v => v.quiz.length > 0);
  const quizVideoIds = new Set(videosWithQuizzes.map(v => v.id));
  const totalCorrect = Object.entries(quizScores)
    .filter(([id]) => quizVideoIds.has(Number(id)))
    .reduce((a, [, b]) => a + b, 0);
  const totalAttempted = Object.keys(quizScores).filter(id => quizVideoIds.has(Number(id))).length;
  const totalPossible = totalAttempted * 5;
  const percentage = totalPossible > 0 ? Math.round((totalCorrect / totalPossible) * 100) : 0;

  return (
    <aside className="w-full lg:w-80 shrink-0 bg-card-bg border border-card-border rounded-2xl p-4 h-fit lg:sticky lg:top-24">
      {/* Progress */}
      <div className="mb-4 pb-4 border-b border-white/10">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white/60">Progress</span>
          <span className="text-cyan font-mono">{completedVideos.size}/{courseVideos.length}</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-cyan rounded-full transition-all duration-500"
            style={{ width: `${(completedVideos.size / courseVideos.length) * 100}%` }}
          />
        </div>
        {totalAttempted > 0 && (
          <div className="flex justify-between text-xs mt-2">
            <span className="text-white/40">Score: {totalCorrect}/{totalPossible}</span>
            <span className={`font-semibold ${getGrade(percentage).color}`}>
              {percentage}% ({getGrade(percentage).letter})
            </span>
          </div>
        )}
      </div>

      {/* Chapter list */}
      <div className="space-y-4">
        {Object.entries(chapters).map(([chNum, chapter]) => (
          <div key={chNum}>
            <div className="text-xs text-white/40 uppercase tracking-wider mb-2 font-semibold">
              Chapter {chNum}: {chapter.title}
            </div>
            <div className="space-y-1">
              {chapter.videos.map((video) => {
                const isCompleted = completedVideos.has(video.id);
                const isActive = activeVideoId === video.id;
                const isLocked = video.id > 0 && !completedVideos.has(video.id - 1) && !isCompleted;
                const score = quizScores[video.id];

                return (
                  <button
                    key={video.id}
                    onClick={() => !isLocked && onSelectVideo(video.id)}
                    disabled={isLocked}
                    className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition-colors text-sm ${
                      isActive
                        ? 'bg-cyan/15 border border-cyan/30 text-white'
                        : isCompleted
                        ? 'bg-green-500/10 hover:bg-green-500/15 text-white/80'
                        : isLocked
                        ? 'opacity-40 cursor-not-allowed text-white/40'
                        : 'hover:bg-white/5 text-white/70'
                    }`}
                  >
                    {/* Status icon */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                      isCompleted
                        ? 'bg-green-500 text-black'
                        : isActive
                        ? 'bg-cyan text-black'
                        : isLocked
                        ? 'bg-white/10 text-white/30'
                        : 'bg-white/10 text-white/60'
                    }`}>
                      {isCompleted ? '✓' : isLocked ? '🔒' : video.id + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="truncate font-medium">{video.title}</div>
                      <div className="text-xs text-white/40 flex items-center gap-2">
                        <span>{video.duration}</span>
                        {score !== undefined && video.quiz.length > 0 && (
                          <span className={score >= 3 ? 'text-green-400' : 'text-yellow-400'}>
                            {score}/5
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

// ---- Quiz Component ----
function Quiz({
  video,
  onComplete,
}: {
  video: CourseVideo;
  onComplete: (score: number) => void;
}) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizDone, setQuizDone] = useState(false);

  const question = video.quiz[currentQ];
  const isCorrect = selectedAnswer === question?.correct;
  const totalCorrect = answers.filter((a, i) => a === video.quiz[i].correct).length;

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelectedAnswer(idx);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
  };

  const handleNext = () => {
    const newAnswers = [...answers, selectedAnswer!];
    setAnswers(newAnswers);

    if (currentQ + 1 >= video.quiz.length) {
      // Quiz complete
      const finalCorrect = newAnswers.filter((a, i) => a === video.quiz[i].correct).length;
      setQuizDone(true);
      // We need to set the final score here, but let's just show summary first
      setTimeout(() => {
        onComplete(finalCorrect);
      }, 0);
      return;
    }

    setCurrentQ(currentQ + 1);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (quizDone) {
    const finalCorrect = [...answers].filter((a, i) => a === video.quiz[i].correct).length;
    return (
      <div className="bg-card-bg border border-card-border rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">{finalCorrect >= 4 ? '🎉' : finalCorrect >= 3 ? '👍' : '📚'}</div>
        <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
        <p className="text-white/60 mb-4">
          You scored <span className={`font-bold ${finalCorrect >= 3 ? 'text-green-400' : 'text-yellow-400'}`}>{finalCorrect}/5</span> on {video.title}
        </p>
        <div className="flex justify-center gap-2 mb-6">
          {video.quiz.map((q, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                answers[i] === q.correct ? 'bg-green-500 text-black' : 'bg-red-500/80 text-white'
              }`}
            >
              {answers[i] === q.correct ? '✓' : '✗'}
            </div>
          ))}
        </div>
        <p className="text-white/40 text-sm">Moving to the next video...</p>
      </div>
    );
  }

  return (
    <div className="bg-card-bg border border-card-border rounded-2xl p-6 md:p-8">
      {/* Quiz header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">Quiz: {video.title}</h3>
        <span className="text-white/40 text-sm font-mono">
          {currentQ + 1}/{video.quiz.length}
        </span>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mb-6">
        {video.quiz.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i < currentQ
                ? answers[i] === video.quiz[i].correct
                  ? 'bg-green-500'
                  : 'bg-red-500/80'
                : i === currentQ
                ? 'bg-cyan'
                : 'bg-white/10'
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <p className="text-white text-lg mb-6 leading-relaxed">{question.question}</p>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, idx) => {
          const letter = String.fromCharCode(65 + idx); // A, B, C, D
          let optionStyle = 'border-white/10 hover:border-white/30 hover:bg-white/5';
          
          if (showResult) {
            if (idx === question.correct) {
              optionStyle = 'border-green-500 bg-green-500/15 text-green-400';
            } else if (idx === selectedAnswer && idx !== question.correct) {
              optionStyle = 'border-red-500 bg-red-500/15 text-red-400';
            } else {
              optionStyle = 'border-white/5 opacity-40';
            }
          } else if (selectedAnswer === idx) {
            optionStyle = 'border-cyan bg-cyan/10';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex items-center gap-3 ${optionStyle}`}
            >
              <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold shrink-0">
                {letter}
              </span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {/* Action button */}
      {!showResult ? (
        <button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className={`w-full py-3 rounded-lg font-bold transition-colors ${
            selectedAnswer !== null
              ? 'bg-cyan text-black hover:bg-cyan-dim'
              : 'bg-white/10 text-white/30 cursor-not-allowed'
          }`}
        >
          Submit Answer
        </button>
      ) : (
        <div className="space-y-3">
          <div className={`text-center py-2 rounded-lg text-sm font-medium ${
            isCorrect ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'
          }`}>
            {isCorrect ? 'Correct!' : `Incorrect — the answer was ${String.fromCharCode(65 + question.correct)}`}
          </div>
          <button
            onClick={handleNext}
            className="w-full py-3 rounded-lg font-bold bg-cyan text-black hover:bg-cyan-dim transition-colors"
          >
            {currentQ + 1 >= video.quiz.length ? 'See Results' : 'Next Question'}
          </button>
        </div>
      )}
    </div>
  );
}

// ---- Video Player + Quiz View ----
function VideoView({
  video,
  isCompleted,
  quizScore,
  onQuizComplete,
}: {
  video: CourseVideo;
  isCompleted: boolean;
  quizScore: number | undefined;
  onQuizComplete: (videoId: number, score: number) => void;
}) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);

  // Reset state when video changes
  useEffect(() => {
    setShowQuiz(false);
    setVideoEnded(false);
  }, [video.id]);

  // When video ends, mark it and auto-show quiz (or continue for no-quiz videos)
  const handleVideoEnd = () => {
    setVideoEnded(true);
    if (video.quiz.length === 0 && !isCompleted) {
      // No quiz — auto-continue
      onQuizComplete(video.id, 0);
    } else if (video.quiz.length > 0 && !isCompleted) {
      setShowQuiz(true);
      // Scroll to quiz after a short delay
      setTimeout(() => {
        quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  };

  return (
    <div className="flex-1 min-w-0 space-y-6">
      {/* Video Header */}
      <div>
        <div className="text-cyan text-sm font-semibold mb-1">
          {video.chapter > 0 ? `Chapter ${video.chapter}: ${video.chapterTitle}` : video.chapterTitle}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">{video.title}</h2>
        <p className="text-white/50">{video.description}</p>
      </div>

      {/* Video Player */}
      <div className="aspect-video bg-card-bg border border-card-border rounded-2xl overflow-hidden">
        {video.videoSrc ? (
          <video
            ref={videoRef}
            key={video.videoSrc}
            controls
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-full object-contain bg-black"
          >
            <source src={video.videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-white/30">
            <svg className="w-16 h-16 mb-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm">Video coming soon</p>
            <p className="text-xs text-white/20 mt-1">Check back shortly</p>
          </div>
        )}
      </div>

      {/* Quiz Section */}
      <div ref={quizRef}>
      {video.quiz.length === 0 ? (
        // No quiz — just a continue button or completed state
        isCompleted ? (
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500 text-black flex items-center justify-center text-xl font-bold">✓</div>
            <div>
              <div className="font-semibold text-green-400">Completed</div>
              <div className="text-white/50 text-sm">No quiz for this video</div>
            </div>
          </div>
        ) : !videoEnded ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <p className="text-white/40 text-sm">Watch the video to continue</p>
          </div>
        ) : null
      ) : isCompleted && quizScore !== undefined ? (
        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500 text-black flex items-center justify-center text-xl font-bold">✓</div>
            <div>
              <div className="font-semibold text-green-400">Completed</div>
              <div className="text-white/50 text-sm">You scored {quizScore}/5 on this quiz</div>
            </div>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${i < quizScore ? 'bg-green-500' : 'bg-white/20'}`}
              />
            ))}
          </div>
        </div>
      ) : !videoEnded && !showQuiz ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
          <p className="text-white/40 text-sm">Watch the video to unlock the quiz</p>
        </div>
      ) : showQuiz ? (
        <Quiz
          video={video}
          onComplete={(score) => onQuizComplete(video.id, score)}
        />
      ) : null}
      </div>
    </div>
  );
}

// ---- Course Completion Screen ----
function CourseComplete({
  quizScores,
  onUnlockAlpha,
}: {
  quizScores: Record<number, number>;
  onUnlockAlpha: () => void;
}) {
  const totalCorrect = Object.values(quizScores).reduce((a, b) => a + b, 0);
  const totalPossible = courseVideos.filter(v => v.quiz.length > 0).length * 5; // 55 (11 videos with quizzes × 5)
  const percentage = totalPossible > 0 ? Math.round((totalCorrect / totalPossible) * 100) : 0;
  const grade = getGrade(percentage);
  const promoCode = getPromoCode(percentage);

  return (
    <div className="flex-1 min-w-0 space-y-8">
      {/* Graduation Banner */}
      <div className="text-center py-16 px-6 bg-gradient-to-b from-cyan/10 to-transparent rounded-2xl border border-cyan/20">
        <div className="text-6xl mb-6">🎓</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Congratulations, Graduate!
        </h2>
        <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
          You&apos;ve completed the SharpMoney Betting Academy. You now understand +EV betting better than 99% of sports bettors.
        </p>

        {/* Grade */}
        <div className="inline-flex flex-col items-center bg-black/50 rounded-2xl p-8 border border-white/10">
          <div className="text-white/40 text-sm uppercase tracking-wider mb-2">Your Grade</div>
          <div className={`text-7xl font-bold mb-2 ${grade.color}`}>{grade.letter}</div>
          <div className="text-white/50 text-sm mb-1">{totalCorrect}/{totalPossible} correct ({percentage}%)</div>
          <div className="text-cyan font-semibold text-lg">{grade.reward}</div>
        </div>
      </div>

      {/* Promo Code */}
      {promoCode ? (
        <div className="bg-card-bg border border-cyan/30 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Your Promo Code</h3>
          <p className="text-white/50 text-sm mb-4">Use this code when signing up for SharpMoney Pro</p>
          
          <div className="inline-flex items-center gap-3 bg-black border border-cyan rounded-xl px-8 py-4 mb-6">
            <span className="text-3xl font-mono font-bold text-cyan tracking-widest">{promoCode}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://whop.com/sharpmoney/pro-7e/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan text-black font-bold px-8 py-3 rounded-lg hover:bg-cyan-dim transition-colors"
            >
              Get Pro Access →
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-card-bg border border-red-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Keep Studying!</h3>
          <p className="text-white/50 text-sm mb-4">
            You need at least 60% to earn a promo code. Review the videos and retake the course to improve your score.
          </p>
        </div>
      )}

      {/* Score Breakdown */}
      <div className="bg-card-bg border border-card-border rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-4">Score Breakdown</h3>
        <div className="space-y-2">
          {courseVideos.filter(v => v.quiz.length > 0).map((video) => {
            const score = quizScores[video.id] ?? 0;
            return (
              <div key={video.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-white/40 text-sm w-6">{video.id}.</span>
                  <span className="text-white/80 text-sm">{video.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i < score ? 'bg-green-500' : 'bg-white/20'}`} />
                    ))}
                  </div>
                  <span className={`text-sm font-mono ${score >= 3 ? 'text-green-400' : 'text-yellow-400'}`}>
                    {score}/5
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alpha Unlock */}
      <div className="bg-gradient-to-r from-yellow-500/10 to-amber-600/10 border border-yellow-500/30 rounded-2xl p-8 text-center">
        <div className="text-3xl mb-4">🔓</div>
        <h3 className="text-2xl font-bold mb-2">Alpha Course Unlocked</h3>
        <p className="text-white/50 mb-6 max-w-xl mx-auto">
          As an Academy graduate, you now have access to 3 exclusive lessons about SharpMoney&apos;s most powerful features. 
          Complete all three to earn <span className="text-yellow-400 font-semibold">50% off your first month of Alpha</span>.
        </p>
        <button
          onClick={onUnlockAlpha}
          className="bg-yellow-500 text-black font-bold px-8 py-3 rounded-lg hover:bg-yellow-400 transition-colors"
        >
          Start the Alpha Course →
        </button>
      </div>
    </div>
  );
}

// ---- Alpha Course Section ----
function AlphaCourseView() {
  return (
    <div className="flex-1 min-w-0 space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-4">
          <span className="text-yellow-400 text-sm font-medium">ALPHA COURSE</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">Go Beyond Pro</h2>
        <p className="text-white/50 max-w-2xl mx-auto">
          Three exclusive lessons that showcase SharpMoney&apos;s most powerful features — only available to Academy graduates.
        </p>
      </div>

      <div className="space-y-4">
        {alphaVideos.map((video, i) => (
          <div
            key={video.id}
            className="bg-card-bg border border-yellow-500/20 rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center font-bold shrink-0">
                {i + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                <p className="text-white/50 text-sm mb-4">{video.description}</p>
                <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-4 py-2">
                  <span className="text-yellow-400 text-sm font-medium">Coming Soon</span>
                  <span className="text-white/30 text-sm">— Video in production</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alpha Promo Note */}
      <div className="bg-card-bg border border-yellow-500/30 rounded-2xl p-6 text-center">
        <p className="text-white/50 text-sm">
          Once all three Alpha videos are live, completing them will unlock promo code{' '}
          <span className="text-yellow-400 font-mono font-bold">ALPHA50</span>{' '}
          for 50% off your first month of SharpMoney Alpha.
        </p>
      </div>
    </div>
  );
}

// ---- Footer ----
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
            <a href="/#features" className="hover:text-cyan transition-colors">Features</a>
            <a href="/#pricing" className="hover:text-cyan transition-colors">Pricing</a>
            <a href="/promotions" className="hover:text-cyan transition-colors">Promos</a>
            <a href="/results" className="hover:text-cyan transition-colors">Results</a>
            <a href="https://discord.gg/b4QmzcPhTt" target="_blank" rel="noopener noreferrer" className="hover:text-cyan transition-colors">Discord</a>
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

// ============================================================
// MAIN PAGE
// ============================================================

export default function LearnPage() {
  const [enrolled, setEnrolled] = useState(false);
  const [email, setEmail] = useState('');
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  const [completedVideos, setCompletedVideos] = useState<Set<number>>(new Set());
  const [quizScores, setQuizScores] = useState<Record<number, number>>({});
  const [showAlpha, setShowAlpha] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const courseComplete = completedVideos.size === courseVideos.length;

  const handleEnroll = (userEmail: string) => {
    setEmail(userEmail);
    setEnrolled(true);
    setActiveVideoId(0); // Start at first video
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  };

  const handleQuizComplete = (videoId: number, score: number) => {
    setQuizScores((prev) => ({ ...prev, [videoId]: score }));
    setCompletedVideos((prev) => {
      const next = new Set(prev);
      next.add(videoId);
      return next;
    });

    // Auto-advance to next video or completion after a short delay
    setTimeout(() => {
      if (videoId + 1 < courseVideos.length) {
        setActiveVideoId(videoId + 1);
      } else {
        setActiveVideoId(null); // Show completion screen
      }
    }, 2000);
  };

  const activeVideo = activeVideoId !== null ? courseVideos[activeVideoId] : null;

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-black">
        {!enrolled ? (
          <CourseLanding onEnroll={handleEnroll} />
        ) : (
          <div className="pt-24 pb-20 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
              {/* Mobile sidebar toggle */}
              <button
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                className="lg:hidden w-full bg-card-bg border border-card-border rounded-xl px-4 py-3 mb-4 flex items-center justify-between"
              >
                <span className="text-white/70 text-sm font-medium">
                  Course Progress: {completedVideos.size}/{courseVideos.length}
                </span>
                <svg className={`w-5 h-5 text-white/50 transition-transform ${mobileSidebarOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar — always visible on desktop, toggle on mobile */}
                <div className={`${mobileSidebarOpen ? 'block' : 'hidden'} lg:block`}>
                  <CourseSidebar
                    completedVideos={completedVideos}
                    quizScores={quizScores}
                    activeVideoId={activeVideoId}
                    onSelectVideo={(id) => {
                      setActiveVideoId(id);
                      setShowAlpha(false);
                      setMobileSidebarOpen(false);
                    }}
                    courseComplete={courseComplete}
                  />
                </div>

                {/* Main Content */}
                {showAlpha ? (
                  <AlphaCourseView />
                ) : courseComplete && activeVideoId === null ? (
                  <CourseComplete
                    quizScores={quizScores}
                    onUnlockAlpha={() => setShowAlpha(true)}
                  />
                ) : activeVideo ? (
                  <VideoView
                    video={activeVideo}
                    isCompleted={completedVideos.has(activeVideo.id)}
                    quizScore={quizScores[activeVideo.id]}
                    onQuizComplete={handleQuizComplete}
                  />
                ) : (
                  // Welcome state / no video selected
                  <div className="flex-1 flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                      <div className="text-4xl mb-4">📚</div>
                      <h2 className="text-2xl font-bold mb-2">Welcome to the Academy</h2>
                      <p className="text-white/50 mb-6">Select a video from the sidebar to begin.</p>
                      <button
                        onClick={() => setActiveVideoId(0)}
                        className="bg-cyan text-black font-bold px-8 py-3 rounded-lg hover:bg-cyan-dim transition-colors"
                      >
                        Start Video 1 →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
