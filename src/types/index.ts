
export enum LoanStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  REPAID = "REPAID",
  DEFAULTED = "DEFAULTED"
}

export interface Loan {
  id: string;
  borrower: string;
  amount: number;
  interestRate: number;
  duration: number; // in days
  status: LoanStatus;
  created: Date;
  funded?: Date;
  tokenId?: string;
  lender?: string;
  dueDate?: Date;
  repaymentAmount?: number;
  description?: string;
}

export interface NFTBond {
  tokenId: string;
  loanId: string;
  lender: string;
  imageUrl: string;
  loanAmount: number;
  interestRate: number;
  dueDate: Date;
  borrower: string;
  isForSale?: boolean;
  askPrice?: number;
}

export interface UserProfile {
  address: string;
  borrowedLoans: Loan[];
  lentLoans: Loan[];
  totalBorrowed: number;
  totalLent: number;
  reputation: number; // 0-100
}
