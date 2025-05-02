
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loan, LoanStatus } from "@/types";
import { formatCurrency, formatPercentage, formatDate, truncateAddress, formatDaysRemaining } from "@/utils/formatting";
import { Badge } from "@/components/ui/badge";

interface LoanCardProps {
  loan: Loan;
  onAction?: () => void;
  actionText?: string;
  showDetails?: boolean;
}

const LoanCard = ({ loan, onAction, actionText, showDetails = false }: LoanCardProps) => {
  // Status badge colors
  const getStatusColor = (status: LoanStatus) => {
    switch (status) {
      case LoanStatus.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case LoanStatus.ACTIVE:
        return "bg-green-100 text-green-800";
      case LoanStatus.REPAID:
        return "bg-blue-100 text-blue-800";
      case LoanStatus.DEFAULTED:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="loan-card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {formatCurrency(loan.amount)} Loan
          </h3>
          <p className="text-sm text-gray-500">
            ID: {loan.id}
          </p>
        </div>
        <Badge className={`${getStatusColor(loan.status)}`}>
          {loan.status}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500">Interest Rate</p>
          <p className="text-lg font-medium">{formatPercentage(loan.interestRate)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Duration</p>
          <p className="text-lg font-medium">{loan.duration} days</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Created</p>
          <p className="text-sm">{formatDate(loan.created)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Borrower</p>
          <p className="text-sm font-mono">{truncateAddress(loan.borrower)}</p>
        </div>
      </div>
      
      {showDetails && loan.status !== LoanStatus.PENDING && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Lender</p>
              <p className="text-sm font-mono">{loan.lender ? truncateAddress(loan.lender) : 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Funded Date</p>
              <p className="text-sm">{loan.funded ? formatDate(loan.funded) : 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Due Date</p>
              <p className="text-sm">{loan.dueDate ? formatDate(loan.dueDate) : 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Repayment</p>
              <p className="text-sm">{loan.repaymentAmount ? formatCurrency(loan.repaymentAmount) : 'N/A'}</p>
            </div>
          </div>
          
          {loan.status === LoanStatus.ACTIVE && loan.dueDate && (
            <div className="mt-4 p-2 bg-blue-50 rounded-md text-blue-700 text-sm">
              {formatDaysRemaining(loan.dueDate)}
            </div>
          )}
        </div>
      )}
      
      {loan.description && (
        <p className="mt-4 text-sm text-gray-600">{loan.description}</p>
      )}
      
      {onAction && actionText && (
        <Button 
          onClick={onAction}
          className="w-full mt-4 bg-gradient-to-r from-defi-purple to-defi-teal hover:from-defi-purple/90 hover:to-defi-teal/90 text-white"
        >
          {actionText}
        </Button>
      )}
    </Card>
  );
};

export default LoanCard;
