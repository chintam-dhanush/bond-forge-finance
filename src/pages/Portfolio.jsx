
import { Card } from "@/components/ui/card";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { mockBonds } from "@/data/mockData";
import NFTBondCard from "@/components/NFTBondCard";
import { formatCurrency } from "@/utils/formatting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Portfolio = () => {
  const { account, connectWallet } = useWallet();
  
  // Filter bonds owned by the user
  const userBonds = account 
    ? mockBonds.filter(bond => bond.lender === account)
    : [];
    
  // Calculate stats
  const activeBonds = userBonds.filter(bond => !bond.isForSale);
  const listedBonds = userBonds.filter(bond => bond.isForSale);
  const totalValue = userBonds.reduce((sum, bond) => sum + bond.loanAmount * (1 + bond.interestRate/100), 0);
  const totalListed = listedBonds.reduce((sum, bond) => sum + (bond.askPrice || 0), 0);

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">My NFT Bond Portfolio</h1>
          <p className="text-gray-600 mb-8">
            Manage your NFT bonds, view their status, and list them on the marketplace.
          </p>
          
          {!account ? (
            <Card className="p-8 text-center bg-white shadow-md">
              <h2 className="text-xl font-medium mb-4">Connect your wallet to view your portfolio</h2>
              <Button 
                onClick={connectWallet}
                className="bg-gradient-to-r from-defi-purple to-defi-teal hover:from-defi-purple/90 hover:to-defi-teal/90 text-white"
              >
                Connect Wallet
              </Button>
            </Card>
          ) : (
            <>
              {/* Portfolio Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="p-6 bg-white shadow-md">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Total Bonds</h3>
                  <p className="text-3xl font-bold">{userBonds.length}</p>
                </Card>
                
                <Card className="p-6 bg-white shadow-md">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Active Bonds</h3>
                  <p className="text-3xl font-bold">{activeBonds.length}</p>
                </Card>
                
                <Card className="p-6 bg-white shadow-md">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Listed For Sale</h3>
                  <p className="text-3xl font-bold">{listedBonds.length}</p>
                </Card>
                
                <Card className="p-6 bg-white shadow-md">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Total Value</h3>
                  <p className="text-3xl font-bold">{formatCurrency(totalValue)}</p>
                </Card>
              </div>
              
              {/* Bond Tabs */}
              <Tabs defaultValue="all" className="mb-8">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Bonds</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="listed">Listed For Sale</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all">
                  {userBonds.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {userBonds.map(bond => (
                        <NFTBondCard
                          key={bond.tokenId}
                          bond={bond}
                          actionText={bond.isForSale ? "Update Listing" : "List For Sale"}
                          onAction={() => console.log("Manage bond:", bond.tokenId)}
                        />
                      ))}
                    </div>
                  ) : (
                    <Card className="p-8 text-center bg-white shadow-md">
                      <p className="text-gray-500">You don't own any NFT bonds yet.</p>
                      <Button className="mt-4" asChild>
                        <a href="/lend">Browse Loan Requests</a>
                      </Button>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="active">
                  {activeBonds.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {activeBonds.map(bond => (
                        <NFTBondCard
                          key={bond.tokenId}
                          bond={bond}
                          actionText="List For Sale"
                          onAction={() => console.log("List bond for sale:", bond.tokenId)}
                        />
                      ))}
                    </div>
                  ) : (
                    <Card className="p-8 text-center bg-white shadow-md">
                      <p className="text-gray-500">You don't have any active NFT bonds.</p>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="listed">
                  {listedBonds.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {listedBonds.map(bond => (
                        <NFTBondCard
                          key={bond.tokenId}
                          bond={bond}
                          actionText="Update Listing"
                          onAction={() => console.log("Update bond listing:", bond.tokenId)}
                        />
                      ))}
                    </div>
                  ) : (
                    <Card className="p-8 text-center bg-white shadow-md">
                      <p className="text-gray-500">You don't have any NFT bonds listed for sale.</p>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">About NFT Bonds</h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    NFT bonds are ERC-721 tokens that represent your investment in a loan. Each NFT bond contains metadata about the loan terms including:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Loan amount and interest rate</li>
                    <li>Borrower address</li>
                    <li>Loan duration and due date</li>
                    <li>Repayment schedule</li>
                  </ul>
                  <p className="mt-3">
                    As a bond holder, you're entitled to receive repayment of the principal plus interest when the loan matures. You can also sell your bonds on the marketplace if you need liquidity before maturity.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
