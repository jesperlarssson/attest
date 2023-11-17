export interface User {
    division: string;
    id: string;
    fullName: string;
    name: string;
    maxApproveAmount: string;
    nextLevel: User | null;
    responsible: string;
    notAvailableFrom: string;
    notAvailableTo: string;
    securityAccess: string;
    approvalFlow: string;
    // ... add other properties you need
  }
  