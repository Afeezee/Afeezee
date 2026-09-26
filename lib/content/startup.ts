export type ProductStatus =
  | "live"
  | "pilot"
  | "hackathon-win"
  | "concept"
  | "in-progress"
  | "shipped";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription?: string;
  status: ProductStatus;
  url?: string;
  category: string;
  techStack?: string[];
  featured?: boolean;
  linkedTo?: { label: string; href: string }[];
};

export const cereusProducts: Product[] = [
  {
    slug: "cereus-lens",
    name: "Cereus Lens",
    tagline: "AI + AR digital gallery experience.",
    description:
      "Scan an artwork and get an AI interpretation, a \"bring to life\" animation, and an \"explore the math\" breakdown. Cereus's flagship consumer product.",
    longDescription:
      "Cereus Lens is a mobile-first AI+AR experience for engaging with visual art. Point the camera at a piece and receive: a contextual AI interpretation of the work, a short generative \"bring to life\" animation, and — for the geometrically curious — an \"explore the math\" breakdown of the underlying composition. Built as a showcase of Cereus's applied-AI craft.",
    status: "live",
    url: "https://lens.cereustechnologies.com",
    category: "AI + AR",
    techStack: ["Next.js", "Groq (Llama)", "Vercel"],
    featured: true,
  },
  {
    slug: "radioact",
    name: "RadioAct",
    tagline: "Patient-first radiology triage on Ontomorph.",
    description:
      "Radiology triage app built on the Ontomorph digital-twin platform. Won the Ontomorph hackathon challenge; now in pilot with ~100 registered users, NDPR compliant.",
    longDescription:
      "RadioAct is a patient-first radiology triage application built on top of the Ontomorph digital-twin platform. It won the Ontomorph hackathon it was built for and moved directly into a pilot with real clinicians. NDPR compliant, ~100 registered users at last count, and shaped by real patient-workflow feedback rather than a synthetic demo.",
    status: "pilot",
    url: "https://radioact.app",
    category: "Health tech",
    techStack: ["Next.js", "Supabase", "Ontomorph"],
    featured: true,
  },
  {
    slug: "okawe",
    name: "Okawe",
    tagline: "AI-powered academic e-library.",
    description:
      "Read textbooks, ask an AI questions inline, and generate quizzes from what you read. Users can contribute books to the library.",
    longDescription:
      "Okawe is an AI-native academic e-library. Students can read textbooks in-browser, ask questions against the source in context, and generate quizzes from any passage. A user-contribution model lets the library grow organically without a central editorial team.",
    status: "live",
    url: "https://okawe.vercel.app",
    category: "EdTech",
    techStack: ["Next.js", "Neon", "Clerk", "Groq"],
    featured: true,
  },
  {
    slug: "sculptform",
    name: "Sculptform",
    tagline: "AI-native form and survey builder.",
    description:
      "Reconciles multiple source documents (briefs, PDFs, notes) into a single well-structured form or survey.",
    longDescription:
      "Sculptform is an AI-native form and survey builder. Point it at multiple sources — a Word brief, a PDF specification, a Notion doc — and it reconciles them into one coherent, well-structured form. Aimed at researchers, ops teams, and anyone tired of stitching requirements together by hand.",
    status: "live",
    url: "https://sculptform.live",
    category: "Productivity",
    techStack: ["Next.js", "Supabase", "Clerk"],
    featured: true,
  },
  {
    slug: "antibite",
    name: "AntiBite",
    tagline: "Snakebite prevention, first-aid & response PWA.",
    description:
      "Entered for the Wellcome Snakebite Innovation Prize. Currently the ONE product actively in progress across the Cereus portfolio.",
    longDescription:
      "AntiBite is a progressive web app for snakebite prevention, first-aid, and response — targeted at communities where snakebite envenomation is a real, under-served public-health problem. Built as an entry for the Wellcome Snakebite Innovation Prize, and the only Cereus product currently in active build rather than shipped-and-parked.",
    status: "in-progress",
    category: "Health tech · PWA",
    techStack: ["Next.js", "PWA", "Supabase"],
    featured: true,
  },
  {
    slug: "anaxim",
    name: "Anaxim",
    tagline: "Adaptive EdTech.",
    description: "Adaptive learning platform. Shipped, used for positioning.",
    status: "shipped",
    category: "EdTech",
  },
  {
    slug: "skinaid",
    name: "SkinAid",
    tagline: "AI-assisted dermatology.",
    description:
      "Dermatology-focused AI tool. Presented at ACEIC 2026. Shipped and used for positioning.",
    status: "shipped",
    category: "Health tech",
  },
  {
    slug: "fakesmash",
    name: "FakeSmash",
    tagline: "Deepfake research platform.",
    description:
      "Product surface for the multimodal deepfake-detection research programme (UniOsun PhD).",
    status: "shipped",
    category: "Research platform",
    linkedTo: [
      { label: "See the research", href: "/research/publications/fakesmash-multimodal-deepfake-detection" },
    ],
  },
  {
    slug: "eqlize",
    name: "EQlize",
    tagline: "Emotional intelligence assessment.",
    description: "EQ-assessment surface. Shipped, used for positioning.",
    status: "shipped",
    category: "Assessment",
  },
  {
    slug: "my-hustle-page",
    name: "My Hustle Page",
    tagline: "Nigerian small-business directory.",
    description:
      "Directory-style product for Nigerian businesses. Shipped, used for positioning.",
    status: "shipped",
    category: "Directory",
  },
  {
    slug: "sepia-motion",
    name: "Sepia Motion",
    tagline: "AI kinetic-typography video.",
    description:
      "Generates short kinetic-typography videos from text. Shipped, used for positioning.",
    status: "shipped",
    category: "Creative AI",
  },
  {
    slug: "quantnance",
    name: "Quantnance",
    tagline: "AI investment intelligence.",
    description:
      "Built and pitched at the GDG OAU Hackathon. Shipped, used for positioning.",
    status: "hackathon-win",
    category: "FinTech",
  },
  {
    slug: "prisdil-plus",
    name: "Prisdil+",
    tagline: "Inaugural independent build.",
    description: "Afeez's first independent build under Cereus. Shipped.",
    status: "shipped",
    category: "Foundational",
  },
];

export const featuredProducts = cereusProducts.filter((p) => p.featured);
export const productBySlug = Object.fromEntries(
  cereusProducts.map((p) => [p.slug, p])
) as Record<string, Product>;

export const statusMeta: Record<ProductStatus, { label: string; tone: string }> = {
  live: { label: "Live", tone: "accent" },
  pilot: { label: "Pilot", tone: "accent" },
  "hackathon-win": { label: "Hackathon win", tone: "accent" },
  concept: { label: "Concept", tone: "muted" },
  "in-progress": { label: "In progress", tone: "accent" },
  shipped: { label: "Shipped", tone: "muted" },
};

export const cuas = {
  name: "Cereus University of Applied Sciences (CUAS)",
  status: "Proposal · regulatory pathway drafted",
  summary:
    "A proposed applied-sciences institution in Osun State. Pitch deck, full institutional proposal, and regulatory pathway have been produced.",
  detail:
    "CUAS is the largest institutional bet in the Cereus universe: a proposed applied-sciences university in Osun State. What exists today is the intellectual and paper infrastructure — a pitch deck, a full proposal document, and a mapped regulatory pathway through Nigerian higher-education approval. What comes next is capital, land, and the right founding academic council.",
};

export const migrationService = {
  name: "Base44 → Next.js / Supabase / Clerk migration",
  summary:
    "Cereus offers a specialist service migrating apps off Base44 onto a Next.js + Supabase + Clerk stack — the same stack Cereus itself ships on. Ideal for early-stage teams that outgrew a no-code prototype.",
};

export const ventures = [
  {
    name: "Cereus Edtech · Menleaders 8",
    role: "Co-founder",
    description:
      "The Cereus education arm — programmes and platforms with learners at the centre.",
  },
  {
    name: "Glamlens",
    role: "Co-founder",
    description:
      "Building at the intersection of beauty and technology.",
  },
  {
    name: "VivaLife",
    role: "Co-founder",
    description: "Wellness and lifestyle venture.",
  },
];

export const concepts = [
  {
    name: "Vibertium",
    tagline: "Vibe-coding marketplace.",
    body:
      "A marketplace for AI-native \"vibe-coded\" software — where taste, prompt craft, and shipped artefacts trade as a single unit. Early concept.",
    stage: "Concept",
  },
  {
    name: "Project Beacon",
    tagline: "Web-first FAST / streaming for public-domain and CC video.",
    body:
      "Building toward investor and creator demos. A Free-Ad-Supported-TV surface for public-domain and Creative-Commons video, web-native from day one.",
    stage: "Building toward demo",
  },
  {
    name: "Convo",
    tagline: "Intellectual social network.",
    body:
      "Long-form-first social network built around ideas rather than clips. Concept stage.",
    stage: "Concept",
  },
];

export const currentlyBuilding = [
  {
    name: "AntiBite",
    description:
      "Snakebite prevention / first-aid / response PWA. Entered for the Wellcome Snakebite Innovation Prize.",
    href: "/startup/cereus/antibite",
  },
  {
    name: "Cereus Lens",
    description: "Ongoing iteration on the AI + AR gallery experience.",
    href: "/startup/cereus/cereus-lens",
  },
  {
    name: "Project Beacon",
    description: "Building toward investor and creator demos.",
    href: "/startup/concepts#project-beacon",
  },
];

export const preferredStack = [
  "Next.js (App Router, TypeScript)",
  "Supabase / Neon Postgres",
  "Clerk",
  "Groq (Llama models)",
  "Tailwind CSS",
  "Vercel / Railway",
];

export const founderBio = `Afeez is the founder and technical lead of Cereus Technologies, a venture studio he co-founded with Abe Enoch, where he's shipped over ten products spanning AI, health tech, EdTech, and creative tools — from RadioAct, a patient-first radiology triage app now in pilot with real clinicians, to Cereus Lens, an AI + AR digital gallery experience. He's also a co-founder of Cereus Edtech Menleaders 8 and involved across a small portfolio of other ventures, including Glamlens and VivaLife. He builds fast, ships often, and is drawn to problems at the intersection of AI and everyday African institutions — healthcare, education, and finance among them. Most of what he's built he considers finished and shipped, used for positioning and finding the next opportunity rather than ongoing maintenance; AntiBite, built for the Wellcome Snakebite Innovation Prize, is his current exception, still actively in progress.`;

export const startupStats = [
  { value: "10+", label: "products under Cereus" },
  { value: "1", label: "pilot with clinicians" },
  { value: "1", label: "Wellcome Prize entry" },
  { value: "6", label: "featured builds" },
];
