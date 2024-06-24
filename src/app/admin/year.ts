import { Semester } from "./semester";

export interface Year {
  yearId: number;
  yearNumber: number;
  semesters: Semester[];
}
