import { Employee, StatusType } from "~/types/employees";
import { EmployeeService } from "./employee.service";

describe("EmployeeService", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getEmployees", () => {
    it("should return employees when the fetch is successful", async () => {
      const mockEmployees: Employee[] = [
        {
          id: 1,
          employeeName: "John Doe",
          cpf: "12345678901",
          email: "john@example.com",
          status: "REVIEW",
          admissionDate: "2021-01-01",
        },
      ];
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockEmployees,
      });

      const result = await EmployeeService.getEmployees("12345678901");

      expect(result).toEqual(mockEmployees);
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/registrations?cpf=12345678901"
      );
    });

    it("should throw an error when the fetch fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: "Not Found",
      });

      await expect(EmployeeService.getEmployees("12345678901")).rejects.toThrow(
        "Erro na requisição: Not Found"
      );
    });

    it("should throw an error when there is a network issue", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

      await expect(EmployeeService.getEmployees("12345678901")).rejects.toThrow(
        "Network Error"
      );
    });
  });

  describe("updateEmployeeStatus", () => {
    it("should update the employee status successfully", async () => {
      const employee: Employee = {
        id: 1,
        employeeName: "John Doe",
        cpf: "12345678901",
        email: "john@example.com",
        status: "REVIEW",
        admissionDate: "2021-01-01",
      };
      const status: StatusType = "APPROVED";
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
      });

      await EmployeeService.updateEmployeeStatus(employee, status);

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/registrations/1",
        expect.objectContaining({
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...employee, status }),
        })
      );
    });

    it("should throw an error when the fetch fails", async () => {
      const employee: Employee = {
        id: 1,
        employeeName: "John Doe",
        cpf: "12345678901",
        email: "john@example.com",
        status: "REVIEW",
        admissionDate: "2021-01-01",
      };
      const status: StatusType = "REVIEW";
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: "Server Error",
      });

      await expect(
        EmployeeService.updateEmployeeStatus(employee, status)
      ).rejects.toThrow("Erro na requisição: Server Error");
    });
  });

  describe("deleteEmployee", () => {
    it("should delete the employee successfully", async () => {
      const employee: Employee = {
        id: 1,
        employeeName: "John Doe",
        cpf: "12345678901",
        email: "john@example.com",
        status: "REVIEW",
        admissionDate: "2021-01-01",
      };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
      });

      await EmployeeService.deleteEmployee(employee);

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/registrations/1",
        {
          method: "DELETE",
        }
      );
    });

    it("should throw an error when the fetch fails", async () => {
      const employee: Employee = {
        id: 1,
        employeeName: "John Doe",
        cpf: "12345678901",
        email: "john@example.com",
        status: "REVIEW",
        admissionDate: "2021-01-01",
      };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: "Not Found",
      });

      await expect(EmployeeService.deleteEmployee(employee)).rejects.toThrow(
        "Erro na requisição: Not Found"
      );
    });
  });

  describe("createEmployee", () => {
    it("should create the employee successfully", async () => {
      const employee: Employee = {
        id: 1,
        employeeName: "John Doe",
        cpf: "12345678901",
        email: "john@example.com",
        status: "REVIEW",
        admissionDate: "2021-01-01",
      };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
      });

      await EmployeeService.createEmployee(employee);

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/registrations",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employee),
        })
      );
    });

    it("should throw an error when the fetch fails", async () => {
      const employee: Employee = {
        id: 1,
        employeeName: "John Doe",
        cpf: "12345678901",
        email: "john@example.com",
        status: "REVIEW",
        admissionDate: "2021-01-01",
      };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: "Bad Request",
      });

      await expect(EmployeeService.createEmployee(employee)).rejects.toThrow(
        "Erro na requisição: Bad Request"
      );
    });
  });

  describe("addEmployee", () => {
    it("should add the employee successfully", async () => {
      const employee: Employee = {
        id: 1,
        employeeName: "John Doe",
        cpf: "12345678901",
        email: "john@example.com",
        status: "REVIEW",
        admissionDate: "2021-01-01",
      };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
      });

      await EmployeeService.addEmployee(employee);

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/registrations",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employee),
        })
      );
    });

    it("should throw an error when the fetch fails", async () => {
      const employee: Employee = {
        id: 1,
        employeeName: "John Doe",
        cpf: "12345678901",
        email: "john@example.com",
        status: "REVIEW",
        admissionDate: "2021-01-01",
      };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: "Unauthorized",
      });

      await expect(EmployeeService.addEmployee(employee)).rejects.toThrow(
        "Erro na requisição: Unauthorized"
      );
    });
  });
});
