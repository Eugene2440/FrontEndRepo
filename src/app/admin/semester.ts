import { Unit } from "./unit";

export interface Semester {
  semesterId: number;
  semesterNumber: number;
  units: Unit[];
}
