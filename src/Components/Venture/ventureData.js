// Everything on the ShoesFit case study, taken from the project's own documents:
// graduation decks, the AAST Rally 2024 submission, the business plan (Sep 2024),
// the Business Model Canvas, and the production budget.

// The startup was renamed from ShoesFit to Vectos; awards and milestones
// below were earned under the original name, so they keep it.
export const venture = {
  name: "Vectos",
  formerly: "ShoesFit",
  tagline: "We are your private hospital.",
  pitch:
    "AI-powered smart shoes that monitor heart rate, blood oxygen, temperature, and movement — and use machine learning to flag health risks early, before they become emergencies.",
  role: "Founder & Team Lead",
  period: "2024 – 2025",
  mission: "Our primary goal is to sustain life, not just a lifestyle.",
  badges: [
    { label: "7th place", detail: "AAST Rally 2024", tone: "violet" },
    { label: "Top 10 · $1,000", detail: "Plan International", tone: "gold" },
  ],
};

export const problem = {
  text:
    "Heart conditions in athletes often stay hidden until a severe event happens. High-intensity sport can amplify problems that show no symptoms, so early, continuous monitoring is the difference between a warning and a tragedy.",
  stats: [
    { value: "1 in 40,000", label: "young athletes die of sudden cardiac death every year" },
    { value: "80%", label: "of them showed no symptoms or family history beforehand" },
  ],
};

// sensors → ESP32 → Flask + ML → dashboard
export const pipeline = [
  {
    step: "Sense",
    title: "Biomedical sensors",
    detail: "Heart rate & SpO₂ (MAX30102), motion (MPU6050), temperature & sweat (DHT22), ECG (AD8232).",
    metric: "97% heart-rate accuracy",
  },
  {
    step: "Connect",
    title: "ESP32 microcontroller",
    detail: "Syncs every reading and streams it over Wi-Fi / Bluetooth from a custom PCB inside a TPU-printed sole.",
    metric: "Wi-Fi + BLE",
  },
  {
    step: "Predict",
    title: "ML models on Flask",
    detail: "Random Forest for calories burned, Decision Tree for stress level & sleep quality.",
    metric: "99.5% model accuracy",
  },
  {
    step: "Act",
    title: "Web dashboard",
    detail: "Real-time charts, daily health summaries, and alerts with recommended next steps.",
    metric: "Live health insights",
  },
];

export const milestones = [
  { date: "May 2024", title: "Graduation Project I", detail: "Smart-shoe concept and research defended at AAST." },
  { date: "Jun 2024", title: "Working prototype", detail: "Sensors integrated into the shoe, data flowing to the web app." },
  { date: "2024", title: "AAST Rally — 7th place", detail: "Reached the final of Egypt's entrepreneurship rally.", highlight: true },
  { date: "2024", title: "Plan International — Top 10", detail: "Selected in the top 10 and awarded $1,000 in funding.", highlight: true },
  { date: "Sep 2024", title: "Business plan & BMC", detail: "Full business model, pricing, 5-year forecast, and production budget." },
  { date: "2025", title: "Graduation Project II", detail: "AI models deployed, redesigned 3D-printed sole, new dashboard." },
  { date: "Next", title: "Launch", detail: "Mobile app, Parkinson's severity model, and a first production batch.", upcoming: true },
];

export const market = [
  { value: "$61.3B", label: "Wearable tech market (2022)", note: "growing 15.9% a year to 2030" },
  { value: "70%", label: "would buy smart shoes", note: "survey of 500 respondents" },
  { value: "$200 / $300", label: "Standard & Premium tiers", note: "below Nike Adapt BB at $350" },
  { value: "Year 2", label: "Projected break-even", note: "from the 5-year financial plan" },
];

export const revenueStreams = ["Product sales", "Premium subscription", "Telemedicine partnerships", "Healthcare & sports clubs"];

// "Focus" and "key features" exactly as positioned in the pitch deck
export const competitors = {
  columns: ["Vectos", "Nike Adapt BB", "Under Armour HOVR", "IOFIT"],
  rows: [
    { label: "Main focus", values: ["Health & disease prevention", "Lifestyle", "Runners", "Sports players"] },
    { label: "Heart-rate tracking", values: [true, true, false, false] },
    { label: "Blood oxygen (SpO₂)", values: [true, false, false, false] },
    { label: "AI disease-risk prediction", values: [true, false, false, false] },
    { label: "Stress & sleep insights", values: [true, false, false, false] },
    { label: "Movement & speed", values: [true, true, true, true] },
  ],
};

export const team = [
  { name: "Osama Megahed", role: "Founder & Team Lead", focus: "Product, web platform, sensor-AI integration", lead: true },
  { name: "Ahmed Hesham", role: "AI & Software", focus: "ML models and the software platform" },
  { name: "Ebraheem Ragab", role: "Hardware", focus: "Embedded systems and biomedical sensors" },
];

export const supervisors = ["Prof. Omneya Atallah", "Dr. Shaimaa Farghaly"];
