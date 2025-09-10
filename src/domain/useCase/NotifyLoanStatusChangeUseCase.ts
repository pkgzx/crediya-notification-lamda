import type { ISendMessagePort } from "../model/gateways/ISendMessagePort";
import type { LoanRequestStatusChangedEvent } from "../model/LoanApplicationStatusChangedEvent";

export class NotifyLoanStatusUseCase {
  constructor(private readonly notifyService: ISendMessagePort) {}

  async execute(loan: LoanRequestStatusChangedEvent): Promise<void> {
    await this.notifyService.sendLoanStatusEmail(loan);
  }
}
