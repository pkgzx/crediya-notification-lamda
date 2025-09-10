import type { LoanRequestStatusChangedEvent } from "../LoanApplicationStatusChangedEvent";

export interface ISendMessagePort {
  sendLoanStatusEmail(loan: LoanRequestStatusChangedEvent): Promise<void>;
}