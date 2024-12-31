export type Worker = {
  id: string;
  userID: string;
  title: string;
  firstName: string;
  lastName: string;
  location: string;
  skills: string[];
  description: string;
};

export type Job = {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary?: number;
  datePosted: Date;
  createdBy: string;
};
