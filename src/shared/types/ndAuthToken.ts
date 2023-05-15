export interface NDAuthToken {
  exp: number;
  iat: number;
  id: number;
  role: string;
  params: {
    facilityId: number;
  }
  sessionId: string;
  status: string;
  type: string;
  uuid: string;
}
