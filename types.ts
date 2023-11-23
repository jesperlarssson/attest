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

interface InvoiceHeader {
  cono: string;
  fileType: "MATE_H";
  date: string; // This could be a string in ISO format or a Date object, depending on your preference.
  supplierId: string;
  invoiceId: string;
  status: string;
  nextAttestantId: string;
  comment: string;
  createdBy: string; // UserID or username of the person who created the record
  createdAt: string; // Timestamp when the record was created
  modifiedBy?: string; // UserID or username of the person who last modified the record
  modifiedAt?: string; // Timestamp when the record was last modified
  // Other attributes for future use
}

interface InvoiceEvent {
  cono: string;
  fileType: "MATE_E";
  // ... other properties specific to the event
  createdBy: string; // UserID or username of the person who created the event
  createdAt: string; // Timestamp when the event was created
  modifiedBy?: string; // UserID or username of the person who last modified the event
  modifiedAt?: string; // Timestamp when the event was last modified
  // Other event-specific attributes
}

export type InvoiceData = InvoiceHeader | InvoiceEvent;

export interface SupplierInvoiceM3 {
  YEA4: string;
  JRNO: string;
  JSNO: string;
  TRCD: string;
  SPYN: string;
  SUNO: string;
  SINO: string;
  INYR: string;
  VSER: string;
  VONO: string;
  IVTP: string;
  TDSC: string;
  APCD: string;
  IVBL: string;
  BLBY: string;
  BLDT: string;
  APRV: string;
  SUCL: string;
  BKID: string;
  CUCD: string;
  CRTP: string;
  ARAT: string;
  CUAM: string;
  DCAM: string;
  VTAM: string;
  IVDT: string;
  DUDT: string;
  ACDT: string;
  TECD: string;
  PYTP: string;
  PYME: string;
  TEPY: string;
  RECO: string;
  REDE: string;
  SLOP: string;
  PYST: string;
  PYRS: string;
  ARCD: string;
  ENME: string;
  TXID: string;
  TDCD: string;
  RGDT: string;
  RGTM: string;
  LMDT: string;
  CHNO: string;
  CHID: string;
  DEDA: string;
  LMTS: string;
  IVCL: string;
  ACAM: string;
  PCUA: string;
  PAMT: string;
  OCUA: string;
  OAMT: string;
  TBCU: string;
  TBAM: string;
  TXCU: string;
  TXAM: string;
  CDCU: string;
  LOCD: string;
  CDAM: string;
  PAIN: string;
  WRCU: string;
  WRAM: string;
  ROCU: string;
  ROAM: string;
  TDS1: string;
  F1PK01: string;
  F1PK02: string;
  F1PK03: string;
  F1A030: string;
}
