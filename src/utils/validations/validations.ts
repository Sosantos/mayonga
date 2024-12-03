import { Employee } from "~/types/employees";

export const isValidCpf = (cpfString: string): string => {
  const cpf = cpfString.replace(/[^\d]/g, "");

  if (cpf.length !== 11) return "";

  const calcCheckDigit = (cpf: string, fator: number): number => {
    let sum = 0;
    for (let i = 0; i < cpf.length; i++) {
      sum += parseInt(cpf[i]) * fator--;
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstDigit = calcCheckDigit(cpf.substring(0, 9), 10);
  const secondDigit = calcCheckDigit(cpf.substring(0, 9) + firstDigit, 11);

  console.log("cpf: ", cpf);
  return firstDigit === parseInt(cpf[9]) && secondDigit === parseInt(cpf[10])
    ? cpf
    : "";
};

export const isValidEmail = (email: string) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$/i;
  return regex.test(email);
};

export const isValidName = (name: string) => {
  const regex = /^(?!\d)[^\s]*[a-zA-Z].*[a-zA-Z].*\s.*$/;
  return regex.test(name);
};

export const formValidation = (employee: Employee): boolean => {
  console.log("employee:", employee);
  return (
    isValidEmail(employee.email) &&
    isValidName(employee.employeeName) &&
    isValidCpf(employee.cpf) !== ""
  );
};
