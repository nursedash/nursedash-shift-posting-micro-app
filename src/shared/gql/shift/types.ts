import { Dayjs } from 'dayjs';

export enum ShiftStatus {
  CANCELLED = 'cancelled',
  CONFIRMED = 'confirmed',
  PENDING_REVIEW = 'pending review',
  OPENED = 'opened',
  COMPLETED = 'completed',
  PENDING_CLOCK = 'pending clock'
}

export enum ShiftSessionStatus {
  NEW = 'New',
  EDITED = 'Edited'
}

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
  status: ShiftStatus;
}

interface CancelOverviewShiftResponse {
  cancelShift: CancelOverviewShiftData;
}

interface UpdateOverviewShiftResponse {
  updateOverviewShift: Shift;
}

interface GetAllCompletedShiftsResponse {
  allCompletedShifts: Shift[];
}

interface CompletedShiftFilter {
  unit?: number;
  role?: string;
}

interface GetAllCompletedShiftsVariables {
  page: number;
  perPage: number;
  sortField: string;
  sortOrder: string;
  filter: CompletedShiftFilter;
}
interface ShiftInfoForCopyOrEdit {
  id: number;
  isEdit: boolean;
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
  status: ShiftStatus;
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

 interface NewShiftPayload {
  id?: number;
  unit: number;
  name: string;
  type: string;
  breakDuration: number;
  startDateTime: string;
  endDateTime: string;
  qualifications: string[];
  description: string;
}

export type {
  CreateOverviewShiftVariables,
  CreateOverviewShiftData,
  CancelOverviewShiftResponse,
  CancelOverviewShiftVariables,
  CancelOverviewShiftData,
  GetAllCompletedShiftsResponse,
  GetAllCompletedShiftsVariables,
  UpdateOverviewShiftResponse,
  Shift,
  NewShift,
  NewShiftPayload,
  ShiftInfoForCopyOrEdit,
};
