export interface Project {
  name: string;
  category: string;
  tools: string;
  image: string;
  link?: string;
}

export const projects: Project[] = [
  {
    name: "Veridra Capital",
    category: "Fraud-Prevention Platform",
    tools: "Python, Fine-Tuned LLM, FastAPI",
    image: "/images/veridra.png",
  },
  {
    name: "S&P 500 Risk Engine",
    category: "Portfolio Risk Analytics",
    tools: "Python, VaR / ES, Ensemble ML",
    image: "/images/proj-risk-engine.webp",
    link: "https://github.com/jainamh029/risk_management",
  },
  {
    name: "PE Deal Toolkit",
    category: "LBO Engine & Screener",
    tools: "Python, Dash, IRR / MOIC",
    image: "/images/proj-pe-deal-suite.png",
    link: "https://jainamh029.github.io/pe-deal-suite/",
  },
  {
    name: "Options Pricing Engine",
    category: "Real-Time Derivatives Pricing",
    tools: "Python, FastAPI, BSM / Binomial / MC",
    image: "/images/proj-options-pricing.png",
    link: "https://jainamh029.github.io/options-pricing-engine/",
  },
  {
    name: "MVPX Index",
    category: "Systematic Benchmark",
    tools: "Python, Rules-Based, Backtested",
    image: "/images/proj-mvpx.png",
    link: "https://jainamh029.github.io/MVPX/",
  },
];
