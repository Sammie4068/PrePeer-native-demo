import { Database } from './../database.types';

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

export interface Member {
  id: string;
  full_name: string;
  email: string;
  isAdmin: boolean | null;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  created_at: string;
  created_by: string;
  members: Member[];
  totalUsers: number;
  exercises: Tables<'exercises'>[] | any;
  totalExercises: number;
}
