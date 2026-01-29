export interface ExpenseForm {
  title: string;
  category: string;
  currency: string;
  amount: number;
  date: string;
  time: string;
  payments: string;
  transactionID: string;
  vendorName: string;
  location: string;
  tags: string;
  notes: string;
  receipt: boolean;
  saveRecurring: boolean;
  saveExpense: boolean;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface AppState {
  records: ExpenseForm[];
  editIndex: number | null;
}

export type ModalType = "success" | "error" | "confirm";

export interface ModalState {
  show: boolean;
  type: ModalType;
  title: string;
  message: string;
  onConfirm: () => void;
}

export interface RadioOption {
  id: string;
  label: string;
  value: string;
}
