import type { Metadata } from "next";

// ============================================================================
// SEO metadata for each individual tool page
// ============================================================================

const TOOL_META: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  "ev-calculator": {
    title: "Free EV Calculator — Expected Value Sports Betting Calculator",
    description:
      "Calculate the expected value (EV) of any sports bet for free. Find +EV opportunities by comparing your odds against the true fair line. No sign-up required.",
    keywords: [
      "EV calculator",
      "expected value calculator",
      "EV betting calculator",
      "+EV calculator",
      "plus EV calculator",
      "sports betting EV",
      "expected value sports betting",
      "positive expected value",
      "free EV calculator",
    ],
  },
  "no-vig-calculator": {
    title: "Free No-Vig Calculator — Remove the Vig & Find Fair Odds",
    description:
      "Strip the vig (juice) from any sportsbook line to reveal the true fair odds. Supports multiple devig methods including Power, Shin, and Multiplicative. Free, no sign-up.",
    keywords: [
      "no vig calculator",
      "devig calculator",
      "remove vig calculator",
      "no juice calculator",
      "fair odds calculator",
      "true odds calculator",
      "vig free odds",
      "strip the vig",
      "free no vig calculator",
    ],
  },
  "odds-converter": {
    title: "Free Odds Converter — American, Decimal & Fractional",
    description:
      "Instantly convert between American, Decimal, and Fractional odds formats. See implied probability for any line. Free betting odds converter, no sign-up required.",
    keywords: [
      "odds converter",
      "betting odds converter",
      "American odds converter",
      "decimal odds converter",
      "fractional odds converter",
      "odds conversion calculator",
      "implied probability calculator",
      "moneyline converter",
      "free odds converter",
    ],
  },
  "kelly-calculator": {
    title: "Free Kelly Criterion Calculator — Optimal Bet Sizing",
    description:
      "Calculate the optimal bet size using the Kelly Criterion formula. Maximize long-term bankroll growth with mathematically proven bet sizing. Free, no sign-up.",
    keywords: [
      "Kelly criterion calculator",
      "Kelly calculator",
      "optimal bet size calculator",
      "Kelly criterion formula",
      "bet sizing calculator",
      "Kelly staking calculator",
      "bankroll management calculator",
      "free Kelly calculator",
    ],
  },
  "hedge-calculator": {
    title: "Free Hedge Calculator — Lock In Guaranteed Profit",
    description:
      "Calculate the perfect hedge bet to lock in guaranteed profit regardless of the outcome. Enter your original bet and hedge odds to see exact amounts. Free, no sign-up.",
    keywords: [
      "hedge calculator",
      "hedge bet calculator",
      "hedging calculator",
      "guaranteed profit calculator",
      "hedge betting calculator",
      "sports betting hedge",
      "lock in profit calculator",
      "free hedge calculator",
    ],
  },
  "arbitrage-calculator": {
    title: "Free Arbitrage Calculator — Find Risk-Free Betting Profits",
    description:
      "Calculate arbitrage opportunities across sportsbooks for risk-free guaranteed profit. Enter odds from two books to find arb percentages and bet amounts. Free, no sign-up.",
    keywords: [
      "arbitrage calculator",
      "arb calculator",
      "arbitrage betting calculator",
      "sports arbitrage calculator",
      "sure bet calculator",
      "risk free betting",
      "arbitrage finder",
      "free arbitrage calculator",
    ],
  },
  "parlay-calculator": {
    title: "Free Parlay Calculator — Combined Odds & Payouts",
    description:
      "Build parlays and instantly see combined odds, total payouts, and implied probability. Add unlimited legs with American, Decimal, or Fractional odds. Free, no sign-up.",
    keywords: [
      "parlay calculator",
      "parlay payout calculator",
      "parlay odds calculator",
      "multi bet calculator",
      "accumulator calculator",
      "combo bet calculator",
      "parlay builder",
      "free parlay calculator",
    ],
  },
  "odds-probability-chart": {
    title: "Odds to Probability Chart — American Odds to Implied Win %",
    description:
      "Reference chart that maps American odds to implied win probability. See what -110, +150, or any line really means. Free, no sign-up required.",
    keywords: [
      "odds to probability chart",
      "american odds to probability",
      "implied probability chart",
      "betting odds chart",
      "odds conversion table",
    ],
  },
  "hold-calculator": {
    title: "Free Hold Calculator — Sportsbook Hold Percentage",
    description:
      "Calculate the hold percentage (overround) a sportsbook is charging on any line. Compare book holds to find the sharpest lines. Free, no sign-up required.",
    keywords: [
      "hold calculator",
      "hold percentage calculator",
      "overround calculator",
      "sportsbook hold",
      "vig calculator",
      "juice calculator",
      "book margin calculator",
      "free hold calculator",
    ],
  },
  "unit-size-calculator": {
    title: "Free Unit Size Calculator — Bankroll-Based Bet Sizing",
    description:
      "Determine your optimal unit size based on your bankroll and risk tolerance. Set up proper bankroll management for long-term sports betting success. Free, no sign-up.",
    keywords: [
      "unit size calculator",
      "bet unit calculator",
      "betting unit size",
      "bankroll unit calculator",
      "sports betting units",
      "unit betting calculator",
      "bankroll management",
      "free unit calculator",
    ],
  },
  "bankroll-simulator": {
    title: "Free Bankroll Simulator — Visualize Betting Variance",
    description:
      "Simulate thousands of bets to visualize bankroll growth, variance, and risk of ruin. See how win rate, odds, and bet sizing impact long-term results. Free, no sign-up.",
    keywords: [
      "bankroll simulator",
      "sports betting simulator",
      "betting variance simulator",
      "bankroll growth calculator",
      "risk of ruin calculator",
      "Monte Carlo betting",
      "betting simulation",
      "free bankroll simulator",
    ],
  },
};

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = TOOL_META[slug];

  if (!meta) {
    return {
      title: "Free Betting Calculators & Tools",
      description:
        "Professional-grade free sports betting calculators. No sign-up required.",
    };
  }

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: `${meta.title} | SharpMoney`,
      description: meta.description,
      url: `https://www.betsharpmoney.com/tools/${slug}`,
    },
    twitter: {
      title: `${meta.title} | SharpMoney`,
      description: meta.description,
    },
    alternates: {
      canonical: `https://www.betsharpmoney.com/tools/${slug}`,
    },
  };
}

export default function ToolLayout({ children }: { children: React.ReactNode }) {
  return children;
}
