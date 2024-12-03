import { Employee, StatusType } from "~/types/employees";

const DOMAIN = "http://localhost:3000/registrations"; //colocar num .env

export const EmployeeService = {
  async getEmployees(cpf: string): Promise<Employee[]> {
    try {
      const response = await fetch(`${DOMAIN}?cpf=${cpf}`);

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      const data: Employee[] = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar os funcionários:", error);
      throw error;
    }
  },

  async updateEmployeeStatus(
    employee: Employee,
    status: StatusType
  ): Promise<void> {
    try {
      employee.status = status;
      const response = await fetch(`${DOMAIN}/${employee.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Erro ao atualizar o status do funcionário:", error);
      throw error;
    }
  },

  async deleteEmployee(employee: Employee): Promise<void> {
    try {
      const response = await fetch(`${DOMAIN}/${employee.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Erro ao deletar o funcionário:", error);
      throw error;
    }
  },

  async createEmployee(employee: Employee): Promise<void> {
    try {
      const response = await fetch(DOMAIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Erro ao criar o funcionário:", error);
      throw error;
    }
  },

  async addEmployee(employee: Employee): Promise<void> {
    try {
      const response = await fetch(DOMAIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Erro ao adicionar funcionário:", error);
      throw error;
    }
  },
};
