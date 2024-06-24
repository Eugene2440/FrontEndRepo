import { Unit } from "./unit";
import { Year } from "./year";

export interface Course {
  courseId: number;
  courseName: string;
  years: Year[];
  showUnits?: boolean;
}
