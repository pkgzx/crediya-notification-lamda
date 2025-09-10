import type { ISendMessagePort } from "../../domain/model/gateways/ISendMessagePort";
import type { LoanRequestStatusChangedEvent } from "../../domain/model/LoanApplicationStatusChangedEvent";

export class EmailServiceConsole implements ISendMessagePort {
  async sendLoanStatusEmail(
    loan: LoanRequestStatusChangedEvent
  ): Promise<void> {
    // Aquí iría la integración real con AWS SES u otro proveedor
    const subject =
      loan.loanApplication.status === "APPROVED"
        ? "Tu solicitud de préstamo fue aprobada"
        : "Tu solicitud de préstamo fue rechazada";
    const body =
      loan.loanApplication.status === "APPROVED"
        ? `¡Felicidades! Tu préstamo de $${loan.loanApplication.amount} ha sido aprobado.`
        : `Lamentamos informarte que tu solicitud de préstamo de $${loan.loanApplication.amount} fue rechazada.`;
    // Simulación
    console.log(
      `Console Email a ${loan.loanApplication.applicant.email}: ${subject} - ${body}`
    );
  }
}
