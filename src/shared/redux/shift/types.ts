export interface Shift {
  id: number;
  name: string;
  unit: number;
  type: string;
  startTime: string;
  endTime: string;
  breakDuration: number;
  qualifications: string[];
  description: string;
}

export interface NewShift {
  unit: number | string | null;
  name: string | null;
  type: string;
  breakDuration: number;
  startDateTime: string | null;
  endDateTime: string | null;
  qualifications: string[];
  description: string;
}