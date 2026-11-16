export const heraResearch = {
  "sources": {
    "youtube": {
      "title": "YouTube creator scale across Southeast Asia",
      "publisher": "Google data, accessible summary by Seasia",
      "date": "Data: 2024-12 · Published: 2025-06",
      "url": "https://seasia.co/short/indonesia-leads-the-region-with-over-3-000-youtube-channels-and-more-than-1-million-subscribers",
      "confidence": "Medium",
      "note": "Latest six-market like-for-like channel count found. The original Google Indonesia page was replaced because it was not reliably accessible."
    },
    "income": {
      "title": "GDP per capita (current US$)",
      "publisher": "World Bank",
      "date": "2024",
      "url": "https://data.worldbank.org/?locations=TH-ID-PH-SG-MY-VN",
      "confidence": "High",
      "note": "Commercial-capacity proxy, not SaaS willingness-to-pay."
    },
    "english": {
      "title": "EF English Proficiency Index 2025",
      "publisher": "Education First",
      "date": "2025 edition",
      "url": "https://www.ef.com/assetscdn/WIBIwq6RdJvcD9bc8RMd/cefcom-epi-site/reports/2025/ef-epi-2025-english.pdf",
      "confidence": "Medium",
      "note": "Self-selected online test sample. Singapore is handled separately because EF excluded it in 2025."
    },
    "digital": {
      "title": "e-Conomy SEA 2025",
      "publisher": "Google, Temasek and Bain",
      "date": "2025-11-11",
      "url": "https://www.temasek.com.sg/content/dam/temasek-corporate/news-and-views/resources/reports/e-conomy-sea-2025-report.pdf",
      "confidence": "High",
      "note": "2025 annualised GMV based on H1 2025. Ecosystem proxy, not creative-software spend."
    },
    "hera": {
      "title": "Hera product use cases and audiences",
      "publisher": "Hera",
      "date": "Accessed 2026-08-29",
      "url": "https://hera.video/use-cases",
      "confidence": "High",
      "note": "First-party product positioning; claims are not independently tested."
    },
    "adobe": {
      "title": "After Effects plans",
      "publisher": "Adobe",
      "date": "Accessed 2026-08-29",
      "url": "https://www.adobe.com/products/aftereffects/plans.html",
      "confidence": "High",
      "note": "US list price; local prices vary."
    },
    "canva": {
      "title": "Canva plans and pricing",
      "publisher": "Canva",
      "date": "Accessed 2026-08-29",
      "url": "https://www.canva.com/pricing/",
      "confidence": "High",
      "note": "US list price; local prices vary."
    },
    "jitter": {
      "title": "Jitter product overview",
      "publisher": "Jitter",
      "date": "Accessed 2026-08-29",
      "url": "https://jitter.video/",
      "confidence": "High",
      "note": "First-party positioning."
    },
    "capcut": {
      "title": "How much does CapCut Pro cost?",
      "publisher": "CapCut",
      "date": "Accessed 2026-08-29",
      "url": "https://www.capcut.com/help/how-much-does-capcut-pro-cost",
      "confidence": "High",
      "note": "CapCut explicitly states pricing varies by region and platform."
    }
  },
  "markets": [
    {
      "code": "ID",
      "name": "Indonesia",
      "channels100k": 30000,
      "channels1m": 3000,
      "gdp": 4925,
      "digitalGmv": 99,
      "english": 471,
      "tag": "Scale candidate"
    },
    {
      "code": "VN",
      "name": "Vietnam",
      "channels100k": 30000,
      "channels1m": 2500,
      "gdp": 4700,
      "digitalGmv": 39,
      "english": 500,
      "tag": "Creator powerhouse"
    },
    {
      "code": "PH",
      "name": "Philippines",
      "channels100k": 6000,
      "channels1m": 450,
      "gdp": 3985,
      "digitalGmv": 36,
      "english": 569,
      "tag": "Low-friction test"
    },
    {
      "code": "TH",
      "name": "Thailand",
      "channels100k": 13000,
      "channels1m": 1300,
      "gdp": 7347,
      "digitalGmv": 57,
      "english": 402,
      "tag": "Localization-heavy"
    },
    {
      "code": "MY",
      "name": "Malaysia",
      "channels100k": 3000,
      "channels1m": 190,
      "gdp": 11874,
      "digitalGmv": 39,
      "english": 581,
      "tag": "Balanced niche"
    },
    {
      "code": "SG",
      "name": "Singapore",
      "channels100k": 1300,
      "channels1m": 170,
      "gdp": 90674,
      "digitalGmv": 29,
      "english": null,
      "tag": "Premium micro-market"
    }
  ],
  "competitors": [
    {
      "name": "Adobe After Effects",
      "type": "Status quo",
      "job": "Deep professional motion and compositing",
      "price": "US$22.99/mo annual plan",
      "strength": "Maximum control and ecosystem depth",
      "gap": "Steep learning curve and production time",
      "source": "adobe"
    },
    {
      "name": "Jitter",
      "type": "Direct adjacent",
      "job": "Browser-based collaborative motion design",
      "price": "Free entry; paid tiers",
      "strength": "Editable motion, team workflow, 400+ templates",
      "gap": "Still requires design decisions and timeline work",
      "source": "jitter"
    },
    {
      "name": "Canva",
      "type": "Bundled substitute",
      "job": "Fast template-led social content",
      "price": "Free; Pro US$144/year",
      "strength": "Distribution, templates, broad creation suite",
      "gap": "Motion is one capability inside a generalist tool",
      "source": "canva"
    },
    {
      "name": "CapCut",
      "type": "Workflow substitute",
      "job": "Social-first video editing and effects",
      "price": "Region and platform dependent",
      "strength": "Creator-native editing and strong template culture",
      "gap": "Not purpose-built for editable brand motion systems",
      "source": "capcut"
    }
  ],
  "interviewCodes": [
    {
      "theme": "Speed to first draft",
      "kind": "Purchase trigger",
      "definition": "Time from brief to a usable motion concept.",
      "question": "Does Hera reduce total turnaround, not just generation time?"
    },
    {
      "theme": "Creative control",
      "kind": "Objection",
      "definition": "Ability to tune timing, hierarchy, brand and composition.",
      "question": "Which edits force users back into specialist software?"
    },
    {
      "theme": "Workflow integration",
      "kind": "Friction",
      "definition": "Export, handoff and re-import cost across the editing stack.",
      "question": "Where does generated motion enter the existing editor?"
    },
    {
      "theme": "Template coverage",
      "kind": "Expectation",
      "definition": "Breadth and relevance of starting points for common jobs.",
      "question": "Which creator and agency jobs lack a credible starting point?"
    },
    {
      "theme": "Output trust",
      "kind": "Risk",
      "definition": "Brand consistency, artifacts and readiness for client delivery.",
      "question": "What makes a draft acceptable without a motion designer?"
    },
    {
      "theme": "Price and credits",
      "kind": "Commercial objection",
      "definition": "Perceived value relative to usage limits and alternatives.",
      "question": "Which usage pattern makes the subscription economical?"
    },
    {
      "theme": "Language and prompting",
      "kind": "Localization",
      "definition": "Ability to express motion intent in English or local languages.",
      "question": "Does prompt language change quality or completion rate?"
    }
  ],
  "defaultWeights": {
    "demand": 35,
    "commercial": 25,
    "accessibility": 25,
    "digital": 15
  }
};
