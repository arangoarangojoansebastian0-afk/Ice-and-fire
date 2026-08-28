// Tipos para el contenido completo desde content.json
export interface TeamMember {
  name: string;
  photo: string;
  role: string;
  video?: string;
  blurb: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
  order?: number;
  visible?: boolean;
  biography?: string;
  gallery?: string[];
}

export interface ContextTier {
  scope: string;
  text: string;
}

export interface WelcomeData {
  researchQuestion: string;
  contextTiers: ContextTier[];
  team: TeamMember[];
  home?: {
    title: string;
    description: string;
  };
  evidence?: any[];
}

// Tipos para estructura específica de content.json
export interface ContentJson {
  gameLevels: {
    name: string;
    desc: string;
  }[];
  timeline: {
    month: string;
    text: string;
  }[];
  researchQuestion: string;
  contextTiers: ContextTier[];
  sprayHow: string;
  posterImages: never[];
  sprayWhy: string;
  sprayAdvantages: string;
  sprayLimitations: string;
  team: TeamMember[];
  home: {
    title: string;
    description: string;
  };
  evidence?: any[];
}