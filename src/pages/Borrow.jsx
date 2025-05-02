
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useWallet } from "@/contexts/WalletContext";
import { useState } from "react";
import { toast } from "sonner";
import LoanCard from "@/components/LoanCard";
import { mockLoans } from "@/data/mockData";
import { LoanStatus } from "@/types";

const Borrow = () => {
  const { account, connectWallet } = useWallet();
  const [amount, setAmount] = useState(1000);
  const [interestRate, setInterestRate] = useState(10);
  const [duration, setDuration] = useState(30);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter user's loan requests from mock data
  const userLoans = account 
    ? mockLoans.filter(loan => loan.borrower === account)
    : [];

  // Calculate estimated repayment amount
  const repaymentAmount = amount * (1 + (interestRate / 100));
  const monthlyRepayment = repaymentAmount / (duration / 30);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!account) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    if (amount <= 0) {
      toast.error("Loan amount must be greater than 0");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate loan request
    setTimeout(() => {
      toast.success("Loan request submitted successfully!");
      setIsSubmitting(false);
      // Reset form or redirect
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Request a Loan</h1>
          
          {!account ? (
            <Card className="p-8 text-center bg-white shadow-md">
              <h2 className="text-xl font-medium mb-4">Connect your wallet to request a loan</h2>
              <Button 
                onClick={connectWallet}
                className="bg-gradient-to-r from-defi-purple to-defi-teal hover:from-defi-purple/90 hover:to-defi-teal/90 text-white"
              >
                Connect Wallet
              </Button>
            </Card>
          ) : (
            <>
              <Card className="p-8 bg-white shadow-md mb-8">
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <Label htmlFor="amount">Loan Amount (USDC)</Label>
                    <div className="flex items-center mt-1">
                      <Input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        min={100}
                        max={10000}
                        className="w-full"
                      />
                    </div>
                    <div className="mt-2 flex justify-between text-sm text-gray-500">
                      <span>Min: 100 USDC</span>
                      <span>Max: 10,000 USDC</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                    <div className="mt-2">
                      <Slider
                        defaultValue={[interestRate]}
                        min={5}
                        max={20}
                        step={0.5}
                        onValueChange={(value) => setInterestRate(value[0])}
                      />
                    </div>
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-gray-500">Min: 5%</span>
                      <span className="font-medium">{interestRate}%</span>
                      <span className="text-gray-500">Max: 20%</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <Label htmlFor="duration">Duration (Days)</Label>
                    <div className="mt-2">
                      <Slider
                        defaultValue={[duration]}
                        min={7}
                        max={90}
                        step={1}
                        onValueChange={(value) => setDuration(value[0])}
                      />
                    </div>
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-gray-500">Min: 7 days</span>
                      <span className="font-medium">{duration} days</span>
                      <span className="text-gray-500">Max: 90 days</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      rows={3}
                      placeholder="Explain the purpose of your loan request..."
                    />
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-medium mb-2">Loan Summary</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Amount</p>
                        <p className="font-medium">${amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Interest Rate</p>
                        <p className="font-medium">{interestRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-medium">{duration} days</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Repayment</p>
                        <p className="font-medium">${repaymentAmount.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-defi-purple to-defi-teal hover:from-defi-purple/90 hover:to-defi-teal/90 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Loan Request"}
                  </Button>
                </form>
              </Card>
              
              <h2 className="text-2xl font-bold mb-4">Your Loan Requests</h2>
              
              {userLoans.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userLoans.map(loan => (
                    <LoanCard
                      key={loan.id}
                      loan={loan}
                      showDetails={true}
                    />
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center bg-white shadow-md">
                  <p className="text-gray-500">You don't have any loan requests yet.</p>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Borrow;
