import { Unit } from "./unit";

export interface Course {
  courseId: number;
  courseName: string;
  units: Unit[];
  showUnits?: boolean; 
}