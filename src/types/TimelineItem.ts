// Interface simplifiée pour la démo
export interface TimelineItem {
  id: number;
  date: string;
  title: string;
  description: string;
  category: "education" | "experience" | "project";
  details?: string[];
  location?: string;
  technologies?: string[];
  image?: string[];
  link?: string;  
  demoUrl?: string;
  gitUrl?: string;
}