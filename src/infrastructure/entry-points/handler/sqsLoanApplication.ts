import type { SQSEvent, SQSHandler } from "aws-lambda";
import { NotifyLoanStatusUseCase } from "../../../domain/useCase/NotifyLoanStatusChangeUseCase";
import { LoanRequestStatusChangedEvent } from "../../../domain/model/LoanApplicationStatusChangedEvent";
import type { LoanRequestStatusDTO } from "../dto/LoanRequestStatusDTO";
import { LoanApplication } from "../../../domain/model/loanApplication";
import { Applicant } from "../../../domain/model/applicant";
import { EmailServiceSNS } from "infrastructure/adapter/EmailServiceSNSAdapter";

export const handler: SQSHandler = async (event: SQSEvent) => {
  const emailService = new EmailServiceSNS();
  const notifyLoanStatusUseCase = new NotifyLoanStatusUseCase(emailService);

  for (const record of event.Records) {
    const data: LoanRequestStatusDTO = JSON.parse(record.body);
    const loanRequest = new LoanRequestStatusChangedEvent(
      new LoanApplication(
        data.requestId,
        new Applicant(data.applicantName ?? "", data.applicantEmail),
        Number(data.amount),
        data.status,
        new Date(data.updatedAt)
      )
    );

    await notifyLoanStatusUseCase.execute(loanRequest);
  }
};
