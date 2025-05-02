
import { Loan, LoanStatus, NFTBond, UserProfile } from "../types";

// Helper function to generate wallet addresses
const generateAddress = () => {
  const chars = "0123456789abcdef";
  let address = "0x";
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
};

// Generate random date within range
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Generate mock loans
export const mockLoans: Loan[] = Array(10)
  .fill(null)
  .map((_, index) => {
    const amount = Math.floor(Math.random() * 5 + 1) * 1000; // 1000-5000
    const interestRate = Math.floor(Math.random() * 10 + 5); // 5%-15%
    const duration = Math.floor(Math.random() * 30 + 30); // 30-60 days
    const borrower = generateAddress();
    const created = randomDate(
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      new Date()
    );
    
    // Randomly assign status
    const statuses = [LoanStatus.PENDING, LoanStatus.ACTIVE, LoanStatus.REPAID];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    const loan: Loan = {
      id: `loan-${index + 1}`,
      borrower,
      amount,
      interestRate,
      duration,
      status,
      created,
      description: `Loan request for ${amount} USDC for ${duration} days at ${interestRate}% interest`,
    };
    
    // Add funded info for active and repaid loans
    if (status !== LoanStatus.PENDING) {
      loan.lender = generateAddress();
      loan.funded = new Date(created.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 days after created
      loan.tokenId = `token-${index + 1}`;
      loan.dueDate = new Date(loan.funded.getTime() + duration * 24 * 60 * 60 * 1000);
      loan.repaymentAmount = amount * (1 + interestRate / 100);
    }
    
    return loan;
  });

// Generate mock NFT bonds
export const mockBonds: NFTBond[] = mockLoans
  .filter((loan) => loan.status !== LoanStatus.PENDING && loan.tokenId)
  .map((loan) => ({
    tokenId: loan.tokenId!,
    loanId: loan.id,
    lender: loan.lender!,
    imageUrl: `https://picsum.photos/seed/${loan.id}/300/300`,
    loanAmount: loan.amount,
    interestRate: loan.interestRate,
    dueDate: loan.dueDate!,
    borrower: loan.borrower,
    isForSale: Math.random() > 0.7, // 30% chance of being for sale
    askPrice: Math.random() > 0.7 ? loan.repaymentAmount! * 0.9 : undefined, // 90% of repayment amount
  }));

// Generate mock user profile
export const mockUserProfile: UserProfile = {
  address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  borrowedLoans: mockLoans.filter((_, i) => i < 3),
  lentLoans: mockLoans.filter((_, i) => i >= 3 && i < 6),
  totalBorrowed: 7500,
  totalLent: 12000,
  reputation: 85,
};
