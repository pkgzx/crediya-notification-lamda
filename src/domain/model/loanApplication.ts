import type { Applicant } from "./applicant";

export enum LoanStatus {
    APROVED = "APPROVED",
    REJECTED = "REJECTED",
}

export class LoanApplication {
    constructor(
        public id: string,
        public applicant: Applicant,
        public amount: number,
        public status:  LoanStatus,
        public updatedAt?: Date,
    ) {}
}