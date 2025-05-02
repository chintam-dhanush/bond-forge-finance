
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface WalletContextProps {
  account: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
  networkName: string | null;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [networkName, setNetworkName] = useState<string | null>(null);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  };

  // Get the current network name
  const getNetworkName = async () => {
    if (!isMetaMaskInstalled()) return null;
    
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      switch (chainId) {
        case '0x1':
          return 'Ethereum Mainnet';
        case '0x5':
          return 'Goerli Testnet';
        case '0x89':
          return 'Polygon Mainnet';
        case '0x13881':
          return 'Mumbai Testnet';
        default:
          return 'Unknown Network';
      }
    } catch (error) {
      console.error('Error getting network:', error);
      return 'Unknown Network';
    }
  };

  // Connect to MetaMask
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      toast.error("Please install MetaMask to use this application");
      return;
    }

    setIsConnecting(true);

    try {
      // Request accounts access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        const network = await getNetworkName();
        setNetworkName(network);
        toast.success("Wallet connected successfully");
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error("Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
    setNetworkName(null);
    toast.info("Wallet disconnected");
  };

  // Handle account changes
  useEffect(() => {
    if (isMetaMaskInstalled()) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          setAccount(null);
          setNetworkName(null);
        } else if (accounts[0] !== account) {
          // User switched accounts
          setAccount(accounts[0]);
        }
      };

      const handleChainChanged = async () => {
        const network = await getNetworkName();
        setNetworkName(network);
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      // Check if already connected
      window.ethereum.request({ method: 'eth_accounts' })
        .then(handleAccountsChanged)
        .catch(console.error);

      // Clean up event listeners
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [account]);

  return (
    <WalletContext.Provider value={{ account, connectWallet, disconnectWallet, isConnecting, networkName }}>
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use the wallet context
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
