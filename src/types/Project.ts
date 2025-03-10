export interface ProjectHeader {
  title: string;
  publishDate: string;
  tags: string;
}

export interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  img: string;
  ProjectHeader?: ProjectHeader;
}

export type ProjectCategory = 'Web Application' | 'Mobile Application' | 'UI/UX Design' | 'Branding';
