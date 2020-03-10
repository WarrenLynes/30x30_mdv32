export interface Project {
  id: number;
  title: string;
  details: string;
  importanceLevel: number;
}

export const emptyProject: Project = {
  id: null,
  title: '',
  details: '',
  importanceLevel: 50
};
