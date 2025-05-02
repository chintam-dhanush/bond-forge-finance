
import { Card } from "@/components/ui/card";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { mockUserProfile, mockLoans, mockBonds } from "@/data/mockData";
import LoanCard from "@/components/LoanCard";
import NFTBondCard from "@/components/NFTBondCard";
import { formatCurrency } from "@/utils/formatting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoanStatus } from "@/types";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const { account, connectWallet } = useWallet();
  
  // Dashboard stats
  const stats = {
    totalInvested: 12500,
    totalEarnings: 1350,
    activeLoans: 3,
    activeBonds: 2,
    portfolioBalance: 13850
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {!account ? (
          <Card className="p-8 text-center bg-white shadow-md max-w-lg mx-auto">
            <h2 className="text-xl font-medium mb-4">Connect your wallet to view your dashboard</h2>
            <Button 
              onClick={connectWallet}
              className="bg-gradient-to-r from-defi-purple to-defi-teal hover:from-defi-purple/90 hover:to-defi-teal/90 text-white"
            >
              Connect Wallet
            </Button>
          </Card>
        ) : (
          <>
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-gray-600">Manage your loans and investments</p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-4">
                <Button asChild variant="outline">
                  <a href="/borrow">Request Loan</a>
                </Button>
                <Button asChild className="bg-defi-purple hover:bg-defi-purple/90 text-white">
                  <a href="/lend">Fund Loans</a>
                </Button>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 bg-white shadow-md">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Portfolio Balance</h3>
                <p className="text-3xl font-bold">{formatCurrency(stats.portfolioBalance)}</p>
                <div className="mt-2 text-sm text-green-600">+10.8% this month</div>
              </Card>
              
              <Card className="p-6 bg-white shadow-md">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Active Investments</h3>
                <p className="text-3xl font-bold">{stats.activeLoans + stats.activeBonds}</p>
                <div className="mt-2 text-sm text-gray-600">
                  {stats.activeLoans} loans, {stats.activeBonds} bonds
                </div>
              </Card>
              
              <Card className="p-6 bg-white shadow-md">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Earnings</h3>
                <p className="text-3xl font-bold">{formatCurrency(stats.totalEarnings)}</p>
                <div className="mt-2 text-sm text-green-600">+{(stats.totalEarnings / stats.totalInvested * 100).toFixed(2)}% return</div>
              </Card>
              
              <Card className="p-6 bg-white shadow-md">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Reputation Score</h3>
                <p className="text-3xl font-bold">{mockUserProfile.reputation}/100</p>
                <div className="mt-2">
                  <Progress value={mockUserProfile.reputation} className="h-2" />
                </div>
              </Card>
            </div>
            
            {/* Tabs */}
            <Tabs defaultValue="borrower" className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="borrower">Borrower Activity</TabsTrigger>
                <TabsTrigger value="lender">Lender Activity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="borrower">
                <Card className="p-6 bg-white shadow-md">
                  <h2 className="text-xl font-bold mb-4">Your Loan Requests</h2>
                  
                  {mockUserProfile.borrowedLoans.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {mockUserProfile.borrowedLoans.map(loan => (
                        <LoanCard
                          key={loan.id}
                          loan={loan}
                          showDetails={true}
                          actionText={loan.status === LoanStatus.ACTIVE ? "Make Repayment" : undefined}
                          onAction={loan.status === LoanStatus.ACTIVE ? () => console.log("Repay loan:", loan.id) : undefined}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-6">You don't have any loan requests yet.</p>
                  )}
                  
                  <div className="mt-6 flex justify-center">
                    <Button asChild variant="outline">
                      <a href="/borrow">Request New Loan</a>
                    </Button>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="lender">
                <div className="space-y-8">
                  <Card className="p-6 bg-white shadow-md">
                    <h2 className="text-xl font-bold mb-4">Your Investments</h2>
                    
                    {mockUserProfile.lentLoans.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mockUserProfile.lentLoans.map(loan => (
                          <LoanCard
                            key={loan.id}
                            loan={loan}
                            showDetails={true}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-6">You haven't funded any loans yet.</p>
                    )}
                    
                    <div className="mt-6 flex justify-center">
                      <Button asChild variant="outline">
                        <a href="/lend">Browse Loan Requests</a>
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="p-6 bg-white shadow-md">
                    <h2 className="text-xl font-bold mb-4">Your NFT Bonds</h2>
                    
                    {mockBonds.filter(bond => bond.lender === account).length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockBonds
                          .filter(bond => bond.lender === account)
                          .map(bond => (
                            <NFTBondCard
                              key={bond.tokenId}
                              bond={bond}
                              actionText={bond.isForSale ? "Update Listing" : "Sell Bond"}
                              onAction={() => console.log("Manage bond:", bond.tokenId)}
                            />
                          ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-6">You don't own any NFT bonds yet.</p>
                    )}
                    
                    <div className="mt-6 flex justify-center">
                      <Button asChild variant="outline">
                        <a href="/marketplace">Browse Marketplace</a>
                      </Button>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
