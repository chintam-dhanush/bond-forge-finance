
import { Card } from "@/components/ui/card";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { mockLoans } from "@/data/mockData";
import LoanCard from "@/components/LoanCard";
import { LoanStatus } from "@/types";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { formatCurrency } from "@/utils/formatting";

const Lend = () => {
  const { account, connectWallet } = useWallet();
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Filter pending loans from mock data
  const pendingLoans = mockLoans.filter(loan => loan.status === LoanStatus.PENDING);
  
  // Handle loan funding
  const handleFundLoan = (loanId) => {
    setSelectedLoan(loanId);
    setIsDialogOpen(true);
  };
  
  // Handle confirmation
  const handleConfirmFunding = () => {
    if (!account) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate loan funding
    setTimeout(() => {
      toast.success("Loan funded successfully! NFT bond has been minted to your wallet.");
      setIsLoading(false);
      setIsDialogOpen(false);
      // In a real app, we would update the loan status and mint an NFT
    }, 2000);
  };

  // Get the selected loan details
  const selectedLoanDetails = pendingLoans.find(loan => loan.id === selectedLoan);

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Fund Loans</h1>
          <p className="text-gray-600 mb-8">
            Browse and fund loan requests. When you fund a loan, you'll receive an NFT bond representing your investment.
          </p>
          
          {!account ? (
            <Card className="p-8 text-center bg-white shadow-md">
              <h2 className="text-xl font-medium mb-4">Connect your wallet to start lending</h2>
              <Button 
                onClick={connectWallet}
                className="bg-gradient-to-r from-defi-purple to-defi-teal hover:from-defi-purple/90 hover:to-defi-teal/90 text-white"
              >
                Connect Wallet
              </Button>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingLoans.map(loan => (
                  <LoanCard
                    key={loan.id}
                    loan={loan}
                    actionText="Fund This Loan"
                    onAction={() => handleFundLoan(loan.id)}
                  />
                ))}
              </div>
              
              {/* Funding Confirmation Dialog */}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Fund This Loan</DialogTitle>
                    <DialogDescription>
                      Review the loan details before funding. Once confirmed, funds will be transferred to the borrower and you'll receive an NFT bond.
                    </DialogDescription>
                  </DialogHeader>
                  
                  {selectedLoanDetails && (
                    <div className="py-4">
                      <div className="mb-4 p-4 bg-gray-50 rounded-md">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Amount</p>
                            <p className="font-medium">{formatCurrency(selectedLoanDetails.amount)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Interest Rate</p>
                            <p className="font-medium">{selectedLoanDetails.interestRate}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Duration</p>
                            <p className="font-medium">{selectedLoanDetails.duration} days</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Est. Return</p>
                            <p className="font-medium">{formatCurrency(selectedLoanDetails.amount * selectedLoanDetails.interestRate / 100)}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-4 mt-4">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleConfirmFunding} 
                          disabled={isLoading}
                          className="bg-gradient-to-r from-defi-purple to-defi-teal hover:from-defi-purple/90 hover:to-defi-teal/90 text-white"
                        >
                          {isLoading ? "Processing..." : "Confirm & Fund"}
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lend;
