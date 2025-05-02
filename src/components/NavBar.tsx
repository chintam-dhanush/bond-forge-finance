
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { truncateAddress } from "@/utils/formatting";
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Wallet } from "lucide-react";

const NavBar = () => {
  const { account, connectWallet, disconnectWallet, isConnecting, networkName } = useWallet();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Add scroll event listener
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 10);
    });
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Link to="/" className="text-2xl font-bold text-defi-purple flex items-center">
            <span className="bg-gradient-to-r from-defi-purple to-defi-teal bg-clip-text text-transparent">
              BondForge
            </span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-gray-700 hover:text-defi-purple font-medium">
              Home
            </Link>
            <Link to="/borrow" className="text-gray-700 hover:text-defi-purple font-medium">
              Borrow
            </Link>
            <Link to="/lend" className="text-gray-700 hover:text-defi-purple font-medium">
              Lend
            </Link>
            <Link to="/marketplace" className="text-gray-700 hover:text-defi-purple font-medium">
              Marketplace
            </Link>
          </div>
          
          {account ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Wallet className="h-4 w-4 mr-2" />
                  <span>{truncateAddress(account)}</span>
                  {networkName && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      {networkName}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to="/dashboard" className="w-full">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/portfolio" className="w-full">My Bonds</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={disconnectWallet}>
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              onClick={connectWallet} 
              disabled={isConnecting}
              className="bg-gradient-to-r from-defi-purple to-defi-teal hover:from-defi-purple/90 hover:to-defi-teal/90 text-white"
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
