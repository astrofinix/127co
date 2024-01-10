
export const itemHeaders = [
  "Item_Id",
  "Item_Type",
  "Item_Location",
  "Item_LastUpdated",
  "Item_Status",
  "Supplier_Id",
  "Loaned_To",
];

export const supplierHeaders = [
  "Supplier_Id",
  "Supplier_Name",
  "Supplier_Address",
  "Supplier_ContactNumber",
  "Supplier_ContactEmail",
];

export const itemTransactionHeaders = [
  "Transaction_Id",
  "Transaction_Type",
  "Transaction_Datetime",
  "Transaction_Maker",

  "Item_Id",
  "Supplier_Id",
];

export const requestHeaders: Record<string, Table> = [
  "Request_ID",
  "Employee_ID",
  "Request_Type",
  "Request_Status",
];

export const membershipHeaders = [
  "Member_ID",
  "Request_ID",
  "Member_Status",
  "Member_Position",
  "Member_DateElected",
  "Member_Dividend",
  "Member_MeetAttended",
];

export const cmPayoutHeaders = [
  "CMTransaction_ID",
  "Member_ID",
  "Transaction_Date",
  "Transaction_Time",
  "Amount",
];

export const savingsHeaders = [
  "Savings_ID",
  "Request_ID",
  "Savings_Amount",
  "Savings_InterestRate",
  "Savings_PreviousInterest",
];

export const csTransactionHeaders = [
  "CSTransaction_ID",
  "Savings_ID",
  "Transaction_Type",
  "Transaction_Date",
  "Transaction_Time",
  "Amount",
];

export const loansHeaders = [
  "Loan_ID",
  "Request_ID",
  "Loan_TotalAmount",
  "Loan_AmountPaid",
  "Loan_AmountPayable",
  "Loan_InterestRate",
  "Loan_MonthlyInterest",
  "Loan_CumulativeInterest",
  "Loan_Date",
  "Loan_Time",
  "Loan_Status",
  "Loan_Deadline",
];

export const clTransactionHeaders = [
  "CLTransaction_ID",
  "Loan_ID",
  "Transaction_Type",
  "Transaction_Date",
  "Transaction_Time",
  "Amount",
];
