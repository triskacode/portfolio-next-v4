export interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  link: string;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
}
