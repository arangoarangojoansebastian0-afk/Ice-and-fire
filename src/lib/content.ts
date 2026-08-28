import contentData from "../data/content.json";

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

export const getContent = (): WelcomeData => {
  return {
    researchQuestion: contentData.researchQuestion,
    contextTiers: contentData.contextTiers,
    team: contentData.team,
    home: contentData.home
  };
};