import { ISendMessagePort } from "domain/model/gateways/ISendMessagePort";
import { LoanRequestStatusChangedEvent } from "domain/model/LoanApplicationStatusChangedEvent";
import { SNS } from "aws-sdk";

export const sns = new SNS();

export class EmailServiceSNS implements ISendMessagePort {
  async sendLoanStatusEmail(
    loan: LoanRequestStatusChangedEvent
  ): Promise<void> {
    const approved = loan.loanApplication.status === "APPROVED";
    const subject = approved
      ? "Your loan application was approved"
      : "Your loan application was rejected";
    const body = 
      `${approved ? "Congratulations!" : "Application Update"}\n\n` +
      (approved
        ? `Your loan application for $${loan.loanApplication.amount} has been APPROVED!`
        : `We regret to inform you that your loan application for $${loan.loanApplication.amount} was REJECTED.`) +
      `\n\nApplicant: ${loan.loanApplication.applicant.name}` +
      `\nEmail: ${loan.loanApplication.applicant.email}` +
      `\nStatus: ${loan.loanApplication.status}` +
      `\nReason: ${loan.loanApplication.reason || "N/A"}` +
      `\nUpdated at: ${loan.loanApplication.updatedAt?.toLocaleString()}` +
      `\n\nThis is an automated message from CrediYa.`;

    await sns
      .publish({
        Subject: subject,
        Message: body,
        TopicArn: process.env.SNS_TOPIC_ARN!,
        MessageAttributes: {
          email: {
            DataType: "String",
            StringValue: loan.loanApplication.applicant.email,
          },
        },
      })
      .promise();
  }
}
