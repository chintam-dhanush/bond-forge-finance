
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NFTBond } from "@/types";
import { formatCurrency, formatPercentage, formatDate, truncateAddress, formatDaysRemaining } from "@/utils/formatting";
import { Badge } from "@/components/ui/badge";

interface NFTBondCardProps {
  bond: NFTBond;
  onAction?: () => void;
  actionText?: string;
}

const NFTBondCard = ({ bond, onAction, actionText }: NFTBondCardProps) => {
  const isPastDue = new Date() > bond.dueDate;
  
  return (
    <Card className="nft-card overflow-hidden">
      <div className="relative">
        <img src={bond.imageUrl} alt={`NFT Bond ${bond.tokenId}`} className="w-full h-40 object-cover rounded-md mb-4" />
        {bond.isForSale && (
          <Badge className="absolute top-2 right-2 bg-defi-purple text-white">
            For Sale
          </Badge>
        )}
      </div>
      
      <h3 className="text-lg font-medium text-gray-900">
        Bond #{bond.tokenId}
      </h3>
      
      <div className="my-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-xs text-gray-500">Amount</p>
            <p className="font-medium">{formatCurrency(bond.loanAmount)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Interest</p>
            <p className="font-medium">{formatPercentage(bond.interestRate)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Due Date</p>
            <p className="font-medium">{formatDate(bond.dueDate)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Status</p>
            <p className={`font-medium ${isPastDue ? "text-red-600" : "text-green-600"}`}>
              {isPastDue ? "Overdue" : "Active"}
            </p>
          </div>
        </div>
        
        <div className="mt-3 text-xs text-gray-600">
          <p>Borrower: {truncateAddress(bond.borrower)}</p>
          <p>Owner: {truncateAddress(bond.lender)}</p>
        </div>
        
        {bond.isForSale && bond.askPrice && (
          <div className="mt-3 p-2 bg-defi-purple/10 rounded-md">
            <p className="text-xs text-gray-600">Listed Price</p>
            <p className="font-bold text-defi-purple">{formatCurrency(bond.askPrice)}</p>
          </div>
        )}
      </div>
      
      {!isPastDue && (
        <div className="text-xs px-2 py-1 bg-blue-50 rounded-full text-blue-600 mb-4 inline-block">
          {formatDaysRemaining(bond.dueDate)}
        </div>
      )}
      
      {onAction && actionText && (
        <Button 
          onClick={onAction}
          className={`w-full ${bond.isForSale ? "bg-defi-purple hover:bg-defi-purple/90" : "bg-defi-teal hover:bg-defi-teal/90"} text-white`}
        >
          {actionText}
        </Button>
      )}
    </Card>
  );
};

export default NFTBondCard;
