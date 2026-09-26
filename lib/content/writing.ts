export const writerBio = `Afeezee has been writing for years, with over 200 poems and a growing body of essays covering technology, society, politics, innovation, research, and business. His poetry lives primarily on AllPoetry, and new work — poems and essays alike — goes out first through his newsletter, Nuggets and Notes, before finding a permanent home here. He writes to make sense of things, and he's open to features, commissions, and collaboration.`;

export const writingLinks = {
  allPoetry: "https://allpoetry.com/Afeezee",
  substack: "https://afeezeenotes.substack.com",
  substackHandle: "@afeezeenotes",
};

export const essayTopics = [
  "technology",
  "society",
  "politics",
  "innovation",
  "research",
  "business",
  "solutions",
];

/**
 * Bootstrap poem/essay content lives in the database (see lib/db.ts).
 * When the poems/essays tables are empty, /writing shows an "archive being
 * consolidated" empty state that points to Substack + AllPoetry. Admins can
 * seed content via /admin.
 */
