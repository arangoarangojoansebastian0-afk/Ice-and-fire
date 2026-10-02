export type SectionType =
  | "Problem"
  | "History"
  | "Journey"
  | "Research"
  | "Antecedents"
  | "Methodology"
  | "Interconnection"
  | "Spray"
  | "Game"
  | "Steam"
  | "Schedule"
  | "Timeline"
  | "Videos"
  | "Gallery"
  | "Team"
  | "Poster"
  | "Contact"
  | "Hero"
  | "Bibliography"
  | "Welcome"
  | "Evidence"
  | "SupportForm";

export type BlockType =
  | "text"
  | "image"
  | "video"
  | "button"
  | "gallery"
  | "embed"
  | "cards"
  | "reusable";

export interface SocialLink {
  platform: "github" | "instagram" | "twitter" | "email" | "tiktok" | "youtube" | "whatsapp" | "facebook";
  url: string;
}

export interface TeamMember {
  name: string;
  role: string;
  photo?: string;
  blurb?: string;
  biography?: string;
  function?: string;
  video?: string;
  gallery?: string[];
  visible?: boolean;
  order?: number;
  socialLinks?: SocialLink[];
}

export interface CmsBlock {
  type?: BlockType;
  title?: string;
  text?: string;
  image?: string;
  alt?: string;
  url?: string;
  description?: string;
  href?: string;
  newTab?: boolean;
  images?: string[];
  height?: number;
  cards?: Array<{
    title?: string;
    text?: string;
    image?: string;
    href?: string;
  }>;
  reusableBlockId?: string;
}

// Tipos del editor de diseño
export type LayoutAlign = "start" | "center" | "end" | "stretch";
export type LayoutWidth = "full" | "half" | "third" | "quarter";

export interface CmsLayout {
  align?: LayoutAlign;
  width?: LayoutWidth;
  offset?: number;
  [key: string]: string | number | boolean | undefined;
}

export interface PageSection {
  id?: string;
  section?: SectionType;
  label?: string;
  visible?: boolean;
  order?: number;
  layout?: CmsLayout;
}

export interface Page {
  name: string;
  slug: string;
  description?: string;
  visible: boolean;
  inMenu: boolean;
  order: number;
  type: "section" | "blocks" | "team" | "external";
  section?: SectionType;
  sections?: PageSection[];
  blocks?: CmsBlock[];
  parent?: string;
  externalUrl?: string;
}
