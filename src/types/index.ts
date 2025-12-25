import type { User, Project, Entry } from '@prisma/client';

export type { User, Project, Entry };

export type EntryWithUser = Entry & {
  user: {
    id: string;
    name: string | null;
    email: string;
  };
};

export type ProjectWithEntries = Project & {
  entries: Entry[];
  _count?: {
    entries: number;
  };
};

export type EntryWithProject = Entry & {
  project: Project | null;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
};
