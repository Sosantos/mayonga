export type Employee = {
  id?: number;
  admissionDate: string;
  employeeName: string;
  status: StatusType;
  cpf: string;
  email: string;
};

export type StatusType = "APPROVED" | "REVIEW" | "REPROVED";

export type Column = {
  status: StatusType;
  title: string;
};
