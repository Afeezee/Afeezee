export type PubStatus = "published" | "under-review" | "in-preparation" | "submitted";

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
    venue: "Targeting: Human Behavior and Emerging Technologies (Wiley)",
    status: "under-review",
    abstract:
      "A multimodal deep-learning framework built with a Design Science Research method that fuses frequency-domain signals across video, audio, and image modalities to detect deepfakes in real-time social-media contexts. Trained and evaluated on FakeAVCeleb and FaceForensics++.",
    keywords: ["deepfake detection", "multimodal deep learning", "frequency-domain features", "DSR"],
    linkedTo: [
      { label: "UniOsun PhD thesis", href: "/research/phd#uniosun" },
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
      "Digital Transformation in Agriculture: A Systematic Review",
    coAuthors: ["A. A. Olagunju", "co-authors"],
    venue: "Targeting: Journal of Agricultural Informatics",
    status: "under-review",
    abstract:
      "Systematic review of digital transformation interventions in agriculture, mapping technology categories against adoption barriers and smallholder outcomes.",
    keywords: ["digital agriculture", "systematic review", "smallholder"],
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
    linkedTo: [{ label: "OAU PhD", href: "/research/phd#oau" }],
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

export const phdProgrammes = {
  uniosun: {
    institution: "Osun State University (Uniosun)",
    degree: "PhD, Computer Science",
    focus: "Multimodal deep learning for real-time deepfake detection",
    thesis:
      "A Multimodal Deep Learning Framework for Real-Time Detection of Video, Audio, and Image-Based Deepfakes in Social Media Applications",
    methodology:
      "Design Science Research approach. Multimodal frequency-domain detection framework. Datasets: FakeAVCeleb and FaceForensics++.",
    stage: "Coursework and fieldwork in progress; FakeSmash paper drafted and under submission preparation.",
    linked: [{ label: "FakeSmash paper", href: "/research/publications/fakesmash-multimodal-deepfake-detection" }],
  },
  oau: {
    institution: "Obafemi Awolowo University (OAU)",
    degree: "PhD, Software Engineering",
    focus: "Writing-process provenance and academic integrity tooling",
    thesis:
      "Working title in progress — investigating how the way a piece of writing is produced (edit history, keystroke telemetry, revision graphs) can act as evidence of authorship in a large-language-model era.",
    methodology:
      "Field study of OAU postgraduate experience with AI-detection thresholds, coupled with a software engineering artefact for provenance capture and evaluation.",
    stage: "Ethics approval and fieldwork underway; postgraduate survey in preparation.",
    linked: [{ label: "AI-detection survey", href: "/research/publications/turnitin-ai-detection-postgrad-survey" }],
  },
} as const;

export const ongoingIdeas = [
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
  "Finishing doctoral coursework and fieldwork across both PhD programmes, with FakeSmash and the Afreximbank–Edordu submission as recent completed research outputs.";

export const researchBio = `Afeez is a researcher working across AI and applied social-impact problems, currently pursuing two doctoral degrees simultaneously — a PhD in Computer Science at Osun State University (Uniosun), focused on multimodal deep learning for real-time deepfake detection, and a PhD in Software Engineering at Obafemi Awolowo University (OAU), focused on writing-process provenance and academic integrity tooling. Before this, he taught over 20 courses and supervised more than 30 students as Acting Head of the Department of Computer Engineering at Oduduwa University and as a lecturer at The Polytechnic, Ile-Ife. He's open to collaboration, co-authorship, and funded research opportunities.`;
