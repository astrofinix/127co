export interface Supplier {
  id: number;
  name: string;
  address: string;
  contactNumber: string;
  email: string;
}

export interface Item {
  id: number;
  employeeId: number;
  type: string;
  status: string;
  lastUpdated: string;
  supplierId: number;
  location: string;
}

export interface Transaction {
  id: number;
  propertyId: number;
  type: string;
  datetime: string;
}

export interface Request {
  id: string;
  employeeId: number;
  type: string;
  status: string;
}

export interface Membership {
  id: string;
  requestId: string;
  status: string;
  position: string;
  dateElected: string;
  dividend: number;
  meetAttended: string;
}

export interface CM_Payout {
  id: number;
  memberId: string;
  date: string;
  time: string;
  amount: number;
}

export interface SavingsAccounts {
  id: string;
  requestId: string;
  amount: number;
  interestRate: number;
  previousInterest: number;
}

export interface CS_Transaction {
  id: number;
  savingsId: string;
  type: string;
  date: string;
  time: string;
  amount: number;
}

export interface LoanRecords {
  id: string;
  requestId: string;
  totalAmount: number;
  amountPaid: number;
  amountPayable: number;
  interestRate: number;
  monthlyInterest: number;
  cumulativeInterest: number;
  date: string;
  time: string;
  status: string;
  deadline: string;
}

export interface CL_Transaction {
  id: number;
  loanId: string;
  type: string;
  date: string;
  time: string;
  amount: number;
}
