
import { Card } from "@/components/ui/card";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { mockBonds } from "@/data/mockData";
import NFTBondCard from "@/components/NFTBondCard";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { formatCurrency } from "@/utils/formatting";
import { NFTBond } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Marketplace = () => {
  const { account, connectWallet } = useWallet();
  const [selectedBond, setSelectedBond] = useState<NFTBond | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogAction, setDialogAction] = useState<'buy' | 'sell'>('buy');
  const [sellPrice, setSellPrice] = useState<number>(0);
  
  // Filter for-sale bonds from mock data
  const forSaleBonds = mockBonds.filter(bond => bond.isForSale);
  
  // Handle bond purchase
  const handleBondAction = (bond: NFTBond, action: 'buy' | 'sell') => {
    setSelectedBond(bond);
    setDialogAction(action);
    if (action === 'sell') {
      setSellPrice(bond.loanAmount * 0.9); // Default to 90% of loan amount
    }
    setIsDialogOpen(true);
  };
  
  // Handle confirmation
  const handleConfirm = () => {
    if (!account) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate action
    setTimeout(() => {
      if (dialogAction === 'buy') {
        toast.success("NFT Bond purchased successfully!");
      } else {
        toast.success("NFT Bond listed for sale!");
      }
      setIsLoading(false);
      setIsDialogOpen(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">NFT Bond Marketplace</h1>
          <p className="text-gray-600 mb-8">
            Browse, buy, and sell NFT bonds on the secondary market. Bond holders can liquidate positions before maturity.
          </p>
          
          {!account ? (
            <Card className="p-8 text-center bg-white shadow-md">
              <h2 className="text-xl font-medium mb-4">Connect your wallet to access the marketplace</h2>
              <Button 
                onClick={connectWallet}
                className="bg-gradient-to-r from-defi-purple to-defi-teal hover:from-defi-purple/90 hover:to-defi-teal/90 text-white"
              >
                Connect Wallet
              </Button>
            </Card>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Bonds For Sale</h2>
                
                {forSaleBonds.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {forSaleBonds.map(bond => (
                      <NFTBondCard
                        key={bond.tokenId}
                        bond={bond}
                        actionText="Purchase Bond"
                        onAction={() => handleBondAction(bond, 'buy')}
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 text-center bg-white shadow-md">
                    <p className="text-gray-500">No bonds currently for sale.</p>
                  </Card>
                )}
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">Your NFT Bonds</h2>
                
                {/* Filter bonds owned by the user */}
                {mockBonds.filter(bond => bond.lender === account).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {mockBonds
                      .filter(bond => bond.lender === account)
                      .map(bond => (
                        <NFTBondCard
                          key={bond.tokenId}
                          bond={bond}
                          actionText={bond.isForSale ? "Update Listing" : "Sell Bond"}
                          onAction={() => handleBondAction(bond, 'sell')}
                        />
                      ))}
                  </div>
                ) : (
                  <Card className="p-8 text-center bg-white shadow-md">
                    <p className="text-gray-500">You don't own any NFT bonds yet.</p>
                  </Card>
                )}
              </div>
              
              {/* Buy/Sell Dialog */}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {dialogAction === 'buy' ? 'Purchase NFT Bond' : 'Sell NFT Bond'}
                    </DialogTitle>
                    <DialogDescription>
                      {dialogAction === 'buy' 
                        ? 'Review the bond details before purchasing. Once confirmed, you will become the new owner of this NFT bond.'
                        : 'Set a price to list your NFT bond for sale on the marketplace.'}
                    </DialogDescription>
                  </DialogHeader>
                  
                  {selectedBond && (
                    <div className="py-4">
                      {dialogAction === 'buy' ? (
                        <div className="mb-4 p-4 bg-gray-50 rounded-md">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Bond ID</p>
                              <p className="font-medium">#{selectedBond.tokenId}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Loan Amount</p>
                              <p className="font-medium">{formatCurrency(selectedBond.loanAmount)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Interest Rate</p>
                              <p className="font-medium">{selectedBond.interestRate}%</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Price</p>
                              <p className="font-medium text-defi-purple">{formatCurrency(selectedBond.askPrice || 0)}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="mb-4">
                            <Label htmlFor="price">Listing Price (USDC)</Label>
                            <Input
                              id="price"
                              type="number"
                              value={sellPrice}
                              onChange={(e) => setSellPrice(Number(e.target.value))}
                              min={0}
                              className="mt-1"
                            />
                          </div>
                          
                          <div className="p-4 bg-gray-50 rounded-md">
                            <h3 className="font-medium mb-2">Bond Details</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-gray-500">Original Value</p>
                                <p>{formatCurrency(selectedBond.loanAmount)}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">With Interest</p>
                                <p>{formatCurrency(selectedBond.loanAmount * (1 + selectedBond.interestRate/100))}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-end gap-4 mt-4">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleConfirm} 
                          disabled={isLoading}
                          className="bg-gradient-to-r from-defi-purple to-defi-teal hover:from-defi-purple/90 hover:to-defi-teal/90 text-white"
                        >
                          {isLoading ? "Processing..." : dialogAction === 'buy' ? "Confirm Purchase" : "List For Sale"}
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

export default Marketplace;
