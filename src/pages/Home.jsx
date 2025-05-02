
import Hero from "@/components/Hero";
import LoanCard from "@/components/LoanCard";
import NFTBondCard from "@/components/NFTBondCard";
import { Button } from "@/components/ui/button";
import { mockLoans, mockBonds } from "@/data/mockData";
import { LoanStatus } from "@/types";
import { Link } from "react-router-dom";

const Home = () => {
  // Filter some featured loans and bonds for the homepage
  const featuredLoans = mockLoans
    .filter(loan => loan.status === LoanStatus.PENDING)
    .slice(0, 3);
    
  const featuredBonds = mockBonds
    .filter(bond => bond.isForSale)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Platform Stats */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="stats-card text-center">
              <h3 className="text-4xl font-bold text-gray-800 mb-2">$12.5M+</h3>
              <p className="text-gray-600">Total Volume</p>
            </div>
            <div className="stats-card text-center">
              <h3 className="text-4xl font-bold text-gray-800 mb-2">750+</h3>
              <p className="text-gray-600">Active Loans</p>
            </div>
            <div className="stats-card text-center">
              <h3 className="text-4xl font-bold text-gray-800 mb-2">2,500+</h3>
              <p className="text-gray-600">NFT Bonds Minted</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Loans */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-4">Featured Loan Requests</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse through active loan requests from borrowers and start earning interest by funding loans that match your investment criteria.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredLoans.map(loan => (
              <LoanCard
                key={loan.id}
                loan={loan}
                actionText="Fund This Loan"
                onAction={() => console.log("Fund loan:", loan.id)}
              />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link to="/lend">View All Loan Requests</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Featured NFT Bonds */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-4">Featured NFT Bonds</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore NFT bonds available on the secondary market. Purchase bonds to earn interest or sell your existing bonds for liquidity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredBonds.map(bond => (
              <NFTBondCard
                key={bond.tokenId}
                bond={bond}
                actionText={bond.isForSale ? "Purchase Bond" : "View Details"}
                onAction={() => console.log("View bond:", bond.tokenId)}
              />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link to="/marketplace">Browse NFT Bond Marketplace</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* How It Works */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              BondForge connects borrowers with lenders through a decentralized platform using NFT bonds backed by smart contracts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-defi-purple/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-defi-purple">1</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Borrowers Request Loans</h3>
              <p className="text-gray-600">Create a loan request with your preferred terms including amount, duration, and interest rate.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-defi-purple/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-defi-purple">2</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Lenders Fund Loans</h3>
              <p className="text-gray-600">Browse loan requests and fund those that match your investment criteria to receive NFT bonds.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-defi-purple/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-defi-purple">3</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Trade NFT Bonds</h3>
              <p className="text-gray-600">Buy or sell NFT bonds on the secondary market to optimize your portfolio or get liquidity.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-defi-purple/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-defi-purple">4</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Automatic Repayments</h3>
              <p className="text-gray-600">Smart contracts enforce loan terms, ensuring repayments are made on schedule.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
