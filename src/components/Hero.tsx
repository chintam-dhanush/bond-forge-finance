
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { Link } from "react-router-dom";

const Hero = () => {
  const { account, connectWallet } = useWallet();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-white pt-24 pb-16">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf680,#0d948880)] opacity-5"></div>
        {/* Grid pattern background */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: "radial-gradient(#8b5cf620 1px, transparent 1px)", 
          backgroundSize: "30px 30px" 
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-defi-purple to-defi-teal bg-clip-text text-transparent">
            Decentralized Lending with NFT Bonds
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto">
            BondForge connects borrowers with lenders through secure, tradable NFT bonds backed by smart contracts.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {!account ? (
              <Button 
                onClick={connectWallet} 
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-defi-purple to-defi-teal hover:from-defi-purple/90 hover:to-defi-teal/90 text-white text-lg"
              >
                Connect Wallet
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="w-full sm:w-auto bg-defi-purple hover:bg-defi-purple/90 text-white text-lg">
                  <Link to="/borrow">Get a Loan</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-defi-teal text-defi-teal hover:bg-defi-teal/10 text-lg">
                  <Link to="/lend">Fund a Loan</Link>
                </Button>
              </>
            )}
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-defi-purple">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Borrow Funds</h3>
              <p className="text-gray-600 text-center">Create a loan request specifying amount, duration, and interest rate.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-defi-teal">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Fund Loans</h3>
              <p className="text-gray-600 text-center">Browse loan requests and fund those that match your investment criteria.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Trade Bonds</h3>
              <p className="text-gray-600 text-center">Buy and sell NFT bonds on the secondary market to optimize your returns.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
