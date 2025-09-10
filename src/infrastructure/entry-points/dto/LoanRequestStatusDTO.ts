import type { LoanStatus } from "../../../domain/model/loanApplication";

export interface LoanRequestStatusDTO {
  requestId: string;
  applicantEmail: string;
  status: LoanStatus;
  amount: number;
  updatedAt: string;
  reason?: string;
  applicantName?: string;
  applicantId?: string;
}