export interface Table {
  headers: string[],
  primaryKey: string,
  department: string,
};

const Tables: Record<string, Table> = {
  Item: {
    headers: [
      "Item_Id",
      "Item_Type",
      "Item_Location",
      "Item_LastUpdated",
      "Item_Status",
      "Supplier_Id",
      "Loaned_To",
    ],
    department: "supplies",
    primaryKey: "Item_Id",
  },
  Supplier: {
    headers: [
      "Supplier_Id",
      "Supplier_Name",
      "Supplier_Address",
      "Supplier_ContactNumber",
      "Supplier_ContactEmail",
    ],
    department: "supplies",
    primaryKey: "Supplier_Id",
  },

  Item_Transaction: {
    headers: [
      "Transaction_Id",
      "Transaction_Type",
      "Transaction_Datetime",
      "Transaction_Maker",

      "Item_Id",
      "Supplier_Id",
    ],
    department: "supplies",
    primaryKey: "Transaction_Id",
  }
}

export default Tables;
