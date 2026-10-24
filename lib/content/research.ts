export type PubStatus =
  | "published"
  | "accepted-for-review"
  | "under-review"
  | "in-preparation"
  | "submitted";

export type Publication = {
  slug: string;
  title: string;
  coAuthors: string[];
  venue: string;
  year?: string;
  status: PubStatus;
  abstract: string;
  abstractLong?: string;
  keywords?: string[];
  doi?: string;
  pdfUrl?: string;
  linkedTo?: { label: string; href: string }[];
};

export const publications: Publication[] = [
  {
    slug: "fakesmash-multimodal-deepfake-detection",
    title:
      "FakeSmash: A Multimodal Deep Learning Framework for Real-Time Detection of Video, Audio, and Image-Based Deepfakes in Social Media Applications",
    coAuthors: ["A. A. Olagunju", "et al. (7 co-authors)"],
    venue: "Human Behavior and Emerging Technologies (Wiley)",
    status: "accepted-for-review",
    abstract:
      "A multimodal deep-learning framework built with a Design Science Research method that fuses frequency-domain signals across video, audio, and image modalities to detect deepfakes in real-time social-media contexts. Trained and evaluated on FakeAVCeleb and FaceForensics++.",
    keywords: ["deepfake detection", "multimodal deep learning", "frequency-domain features", "DSR"],
    linkedTo: [
      { label: "PhD thesis", href: "/research/phd" },
    ],
  },
  {
    slug: "speechfair-emotion-recognition-fairness",
    title:
      "SpeechFair: Fairness Auditing of Speech Emotion Recognition Systems Across Demographic Groups",
    coAuthors: ["A. A. Olagunju", "co-authors"],
    venue: "Under review",
    status: "under-review",
    abstract:
      "Empirical fairness audit of speech emotion recognition (SER) models across demographic subgroups, quantifying group-level performance gaps and proposing mitigations.",
    keywords: ["AI fairness", "speech emotion recognition", "audit"],
  },
  {
    slug: "cybercrime-impacts-nigerian-smes",
    title:
      "Impacts of Cybercrime on Small and Medium Enterprises in Nigeria: A Multi-Sector Study",
    coAuthors: ["A. A. Olagunju", "co-authors"],
    venue: "Targeting: African Journal of Information & Communication (AJIC)",
    status: "under-review",
    abstract:
      "Multi-sector study of cybercrime's operational and financial impact on Nigerian SMEs, with policy and practice implications for African digital-economy resilience.",
    keywords: ["cybercrime", "SMEs", "Nigeria", "digital economy"],
  },
  {
    slug: "digital-transformation-agriculture-systematic-review",
    title:
      "A Systematic Review of Digital Transformation in Agriculture: Technologies, Impacts, and Future Pathways",
    coAuthors: ["M. O. Amos", "A. A. Olagunju", "O. Y. Olatunji", "A. D. Tiwalade"],
    venue: "Journal of Agricultural Informatics 17(2)",
    year: "2026",
    status: "published",
    abstract:
      "A PRISMA 2020 review of 125 peer-reviewed studies (2010-2025) across five databases, synthesising how digital technologies are reshaping agricultural systems and where the adoption gap between developed and developing economies sits.",
    abstractLong:
      "Following PRISMA 2020 guidelines, this review identifies 125 peer-reviewed studies published between 2010 and 2025 across five databases and synthesises them thematically. The findings report that IoT-enabled precision irrigation reduces water use by 20-30%, AI-based pest detection cuts pesticide use by 30-40% while raising yields by 10-20%, and blockchain integration raises smallholder incomes by 20-30%. Adoption exceeds 45% of large farms in developed economies but reaches only 12-15% of smallholders in developing countries, held back mainly by cost, infrastructure, and digital literacy. The review argues that inclusive digital transformation requires low-cost technology design, hybrid knowledge systems, stronger policy frameworks, and interdisciplinary research centred on smallholder needs.",
    keywords: ["digital agriculture", "systematic review", "PRISMA", "smallholder", "adoption gap"],
    doi: "10.17700/jai.2026.17.2.811",
  },
  {
    slug: "turnitin-ai-detection-postgrad-survey",
    title:
      "AI-Detection Threshold Reliability at OAU: A Postgraduate Experience Survey of Turnitin AI Scores",
    coAuthors: ["A. A. Olagunju"],
    venue: "In preparation",
    status: "in-preparation",
    abstract:
      "Ethics-approved fieldwork surveying OAU postgraduate students on Turnitin's AI-detection thresholds — false-positive incidence, appeal outcomes, and downstream academic-integrity consequences.",
    keywords: ["academic integrity", "AI detection", "Turnitin", "postgraduate"],
    linkedTo: [{ label: "Ongoing research", href: "/research/ongoing" }],
  },
  {
    slug: "yoruba-diacritic-insertion-ai-tutor",
    title:
      "A Proposal for a Yorùbá Diacritic-Insertion AI Learning System",
    coAuthors: ["A. A. Olagunju"],
    venue: "Proposal · seeking collaborators",
    status: "in-preparation",
    abstract:
      "Design proposal for an AI-assisted learning system that teaches Yorùbá diacritic placement, with a corpus-grounded feedback loop and Nigerian-classroom deployment considerations.",
    keywords: ["Yorùbá NLP", "language learning", "low-resource"],
  },
  {
    slug: "ajo-afcfta-alternative-credit-signal",
    title:
      "From Ajo to AfCFTA: An Alternative Credit Signal for Africa's Informal Economy",
    coAuthors: ["A. A. Olagunju"],
    venue: "Afreximbank–Edordu Research Competition 2026 (submitted)",
    year: "2026",
    status: "submitted",
    abstract:
      "A three-signal alternative credit framework for apprentice-trained youth in Africa's informal economy — combining digitised ajo/esusu contributions, apprenticeship verification, and transaction history to widen access to formal credit.",
    keywords: [
      "digital financial inclusion",
      "informal economy",
      "credit scoring",
      "AfCFTA",
      "ajo",
      "esusu",
    ],
  },
];

export const bySlug = Object.fromEntries(
  publications.map((p) => [p.slug, p])
) as Record<string, Publication>;

export const statusLabel: Record<PubStatus, string> = {
  published: "Published",
  "accepted-for-review": "Accepted for review",
  "under-review": "Under review",
  "in-preparation": "In preparation",
  submitted: "Submitted",
};

export const researchInterests = [
  "deepfake detection",
  "multimodal deep learning",
  "AI fairness",
  "academic integrity tooling",
  "applied AI for social good",
  "digital financial inclusion",
];

export const phdProgramme = {
  degree: "PhD in progress",
  focus: "Multimodal deep learning for real-time deepfake detection",
  thesis:
    "A Multimodal Deep Learning Framework for Real-Time Detection of Video, Audio, and Image-Based Deepfakes in Social Media Applications",
  methodology:
    "Design Science Research approach. Multimodal frequency-domain detection framework. Datasets: FakeAVCeleb and FaceForensics++.",
  stage:
    "Coursework and fieldwork in progress. The FakeSmash paper has been accepted for review.",
  linked: [{ label: "FakeSmash paper", href: "/research/publications/fakesmash-multimodal-deepfake-detection" }],
} as const;

export const ongoingIdeas = [
  {
    title: "Writing-process provenance and academic integrity tooling",
    body:
      "Fieldwork underway. Investigating how the way a piece of writing is produced — edit history, keystroke telemetry, revision graphs — can act as evidence of authorship in a large-language-model era, alongside a postgraduate survey of AI-detection threshold reliability.",
    stage: "Fieldwork underway",
  },
  {
    title: "Mapping Nigeria's terrorism & conflict incidents, 2009–2026",
    body:
      "Not yet started. A structured, source-attributed dataset drawn from Nigerian news archives, designed to be a citable spatial-temporal record for researchers, journalists, and policy actors.",
    stage: "Idea",
  },
];

export const teaching = {
  summary:
    "Prior to the doctoral phase, over 20 courses taught and more than 30 students supervised as Acting Head of the Department of Computer Engineering at Oduduwa University and as a lecturer at The Polytechnic, Ile-Ife.",
  roles: [
    {
      title: "Acting Head, Department of Computer Engineering",
      org: "Oduduwa University, Ipetumodu (OUI)",
      window: "prior appointment",
    },
    {
      title: "Lecturer",
      org: "The Polytechnic, Ile-Ife (TPI)",
      window: "prior appointment",
    },
  ],
};

export const currentlyLine =
  "Doctoral coursework and fieldwork on multimodal deepfake detection, with the FakeSmash paper accepted for review, the agriculture systematic review published, and the Afreximbank–Edordu entry submitted.";

export const researchBio = `Afeez is a researcher working across AI and applied social-impact problems, currently working on a PhD in multimodal deepfake detection — multimodal deep learning for real-time detection of manipulated video, audio, and images. Before this, he taught over 20 courses and supervised more than 30 students as Acting Head of the Department of Computer Engineering at Oduduwa University and as a lecturer at The Polytechnic, Ile-Ife. He's open to collaboration, co-authorship, and funded research opportunities.`;
