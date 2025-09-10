import type { LoanApplication } from "./loanApplication";


export class LoanRequestStatusChangedEvent {
    constructor(
        public loanApplication: LoanApplication,
    ){}

}