import { Dayjs } from 'dayjs';

interface CreateOverviewShiftVariables {
  breakTime: number;
  description: string;
  end_time: string;
  qualifications: string[];
  start_time: string;
  type: string;
  unit: number;
}

interface CreateOverviewShiftData {
  createOverviewShift: Shift;
}

interface CancelOverviewShiftVariables {
  id: number;
}

interface CancelOverviewShiftData {
  id: number;
  status: string;
}

interface CancelOverviewShiftResponse {
  cancelShift: CancelOverviewShiftData;
}

interface Shift {
  id: number;
  breakTime: number;
  description: string;
  facility_id: number;
  end_time: string;
  start_time: string;
  applicantCount: number;
  assigned_nurse_id: number;
  cancelledAt: string;
  deletedAt: string;
  net_pay: number;
  prevStatus: string | null;
  qualifications: string[];
  rate: number;
  role: string;
  status: string;
  type: string;
  unit: number;
  unitDescription: string;
  updatedAt: string;
}

interface NewShift {
  unit: number;
  name: string;
  type: string;
  breakDuration: number;
  startDateTime: Dayjs;
  endDateTime: Dayjs;
  qualifications: string[];
  description: string;
}

export type {
  CreateOverviewShiftVariables,
  CreateOverviewShiftData,
  CancelOverviewShiftResponse,
  CancelOverviewShiftVariables,
  CancelOverviewShiftData,
  Shift,
  NewShift
};
