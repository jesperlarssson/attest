import { TableColumnSpec } from "@/components/Table";

export const  initialTableDataSpec: TableColumnSpec[] = [
    { heading: "Date", type: String, active: true },
    { heading: "Supplier", type: String, active: true },
    { heading: "Inv No", type: String, active: true },
    { heading: "Amount", type: String, active: true },
    { heading: "Authorizer", type: String, active: true },
    // ... other column specs
  ];