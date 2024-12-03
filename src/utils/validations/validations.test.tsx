import { isValidCpf, isValidEmail, isValidName } from "./validations";


describe("validations", () => {
  describe("isValidCpf", () => {
    it("should return the CPF when it's valid", () => {
      expect(isValidCpf("123.456.789-09")).toBe("12345678909");
    });

    it("should return an empty string when CPF has less than 11 digits", () => {
      expect(isValidCpf("123.456")).toBe("");
    });

    it("should return an empty string when CPF has invalid check digits", () => {
      expect(isValidCpf("123.456.789-00")).toBe("");
    });
  });
  describe("isValidEmail", () => {
    it("should return true for a valid email", () => {
      expect(isValidEmail("example@test.com")).toBe(true);
    });

    it("should return false for an invalid email without @", () => {
      expect(isValidEmail("exampletest.com")).toBe(false);
    });

    it("should return false for an invalid email without domain", () => {
      expect(isValidEmail("example@")).toBe(false);
    });

    it("should return false for an invalid email with special characters", () => {
      expect(isValidEmail("example!@test.com")).toBe(false);
    });
  });
  describe("isValidName", () => {
    it("should return true for a valid name", () => {
      expect(isValidName("John Doe")).toBe(true);
    });

    it("should return false for a name with only numbers", () => {
      expect(isValidName("12345")).toBe(false);
    });

    it("should return false for a name with special characters", () => {
      expect(isValidName("John@Doe")).toBe(false);
    });

    it("should return false for a name with insufficient letters", () => {
      expect(isValidName("A B")).toBe(false);
    });
  });

});
