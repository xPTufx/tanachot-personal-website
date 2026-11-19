/**
 * All editable content of the website lives here.
 * Change a value in this file and the UI updates — no markup editing needed.
 */

/** Live URL of the deployed site (used for canonical / Open Graph tags). */
export const siteUrl = "https://tanachot-top.vercel.app";

export interface SkillGroup {
  title: string;
  items: string[];
  singular: string;
  plural: string;
}

export interface Contact {
  name: string;
  /** A single icon used in both themes. */
  iconImg?: string;
  /** Separate icons so the logo can flip between light and dark mode. */
  iconLight?: string;
  iconDark?: string;
  url: string;
}

/**
 * Replaces the regular spaces of a phrase with non-breaking spaces, so the
 * browser keeps it on one line instead of splitting a name mid-phrase
 * (e.g. "King Mongkut's" / "Institute of Technology Ladkrabang (KMITL)").
 * If a protected phrase still cannot fit (very narrow screens), the CSS
 * `overflow-wrap` / `hyphens` rules in global.css break it gracefully.
 */
export const nb = (value: string) => value.replace(/ /g, "\u00A0");

/** Reusable proper nouns, protected once and used in several places. */
const PROGRAM = nb("Applied Statistics and Data Analytics");
/**
 * The institute name is protected as two chunks joined by a normal space:
 * it stays on one line whenever it fits, and if the screen is too narrow it
 * wraps after "Technology" instead of breaking mid-name or mid-word.
 */
const kmitlName = (suffix: string) =>
  `${nb("King Mongkut's Institute of Technology")} ${nb(suffix)}`;

const KMITL = kmitlName("Ladkrabang (KMITL)");

export const role = `${nb("Applied Statistics & Data Analytics")} Student ${nb("@KMITL")}`;

export const highlights = [nb("A Tech Enthusiast."), "Building small projects to practice."];

export const aboutParagraphs = [
  `Hello, I'm ${nb("Tanachot Jekchatree (Top)")}`,
  `I am a ${nb("1st-year")} ${PROGRAM} student at ${KMITL}.`,
  `I am currently strengthening my foundations in mathematics, statistics, and Python while developing projects to deepen my understanding of ${nb("data-driven problem-solving")}.`,
  `I am open to learning opportunities, technical collaborations, and future internship opportunities in ${nb("Data Science and Machine Learning")}.`,
];

export const education = {
  logo: "https://www.eng.kmitl.ac.th/wp-content/uploads/2024/06/About-4-B.png",
  school: kmitlName("Ladkrabang"),
  degree: `${nb("B.Sc.")} in ${PROGRAM}`,
  period: nb("June 2026 - March 2030"),
  detail: `Concentrations : ${nb("Statistical Modeling")}, ${nb("Data Mining")}, ${nb("Data Science")}, and ${nb("Artificial Intelligence")}`,
};

/** Every group becomes one block on the home page. */
export const skillGroups: SkillGroup[] = [
  {
    title: nb("Programming Languages"),
    items: ["Python"],
    singular: "Language",
    plural: "Languages",
  },
  {
    title: nb("Data Science & AI"),
    items: [
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      nb("Scikit-Learn"),
      "PyTorch",
    ],
    singular: "Library",
    plural: "Libraries",
  },
  {
    title: nb("Spoken Languages"),
    items: [nb("Thai (Native)"), nb("English (CEFR B2)")],
    singular: "Language",
    plural: "Languages",
  },
];

/** Footer contact icons (shown on every page). */
export const contacts: Contact[] = [
  {
    name: "LinkedIn",
    iconImg:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/960px-LinkedIn_icon.svg.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    url: "https://www.linkedin.com/in/tanachot-jekchatree-03210a443/",
  },
  {
    name: "GitHub",
    iconLight:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/960px-GitHub_Invertocat_Logo.svg.png?utm_source=io.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    iconDark:
      "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-white-icon.png",
    url: "https://github.com/xPTufx",
  },
  {
    name: "Gmail",
    iconImg:
      "https://upload.wikimedia.org/wikipedia/commons/8/8f/Gmail_icon_%282026%29.svg?utm_source=th.wikipedia.org&utm_campaign=index&utm_content=original",
    url: "mailto:topjekchatree@gmail.com",
  },
  {
    name: "Instagram",
    iconImg: "https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg",
    url: "https://www.instagram.com/xptufx/",
  },
  {
    name: "Facebook",
    iconImg: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
    url: "https://www.facebook.com/Dark.LightXD",
  },
];
