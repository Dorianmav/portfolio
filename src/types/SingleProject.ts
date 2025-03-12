export interface ProjectHeader {
  title: string;
  publishDate: string;
  tags: string;
}

export interface ProjectImage {
  id: number;
  title: string;
  img: string;
}

export interface CompanyInfo {
  id: number;
  title: string;
  details: string;
}

export interface Technology {
  title: string;
  techs: string[];
}

export interface ProjectDetail {
  id: number;
  details: string;
}

export interface SocialSharing {
  id: number;
  name: string;
  icon: string;
  url: string;
}

export interface ProjectInfo {
  ClientHeading: string;
  CompanyInfo: CompanyInfo[];
  ObjectivesHeading: string;
  ObjectivesDetails: string;
  Technologies: Technology[];
  ProjectDetailsHeading: string;
  ProjectDetails: ProjectDetail[];
  SocialSharingHeading: string;
  SocialSharing: SocialSharing[];
}

export interface RelatedProject {
  title: string;
  Projects: {
    id: number;
    title: string;
    img: string;
  }[];
}

export interface SingleProject {
  id: number;
  ProjectHeader: ProjectHeader;
  ProjectImages: ProjectImage[];
  ProjectInfo: ProjectInfo;
  RelatedProject: RelatedProject;
}
