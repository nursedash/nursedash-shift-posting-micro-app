type GetMeUser = {
  getMeUser: {
    id: string;
    name: string;
  };
};

type GetShiftTemplateByFacilityIdVariables = {
  facilityId: string;
};

type Content = {
  unit: Unit;
  positions: Position[];
  bonusAmount: number;
  qualifications: Qualification[];
  startTime: string;
  endTime: string;
  opennings: Openings[];
  description: string;
  clockInInstruction: string;
  clockOutInstruction: string;
};

type ShiftTemplateModel = {
  facilityId: string;
  name: string;
  content: Content;
  unitId: string;
  positionIds: string[];
};

type CreateShiftTemplateVariables = {shiftTemplateInput: ShiftTemplateModel};

type CreateShiftTemplateData = ShiftTemplateModel & {
  id: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  deletedAt: string;
  deletedBy: string;
};

export {
  GetShiftTemplateByFacilityIdData,
  GetShiftTemplateByFacilityIdVariables,
  CreateShiftTemplateVariables,
  CreateShiftTemplateData,
};
