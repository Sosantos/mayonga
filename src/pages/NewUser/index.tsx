import TextField from "~/components/TextField";
import * as S from "./styles";
import Button from "~/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import Loading from "~/components/Loading";
import { useContext, useRef, useState } from "react";
import { Employee } from "~/types/employees";
import { EmployeeService } from "~/services/employee/employee.service";
import { RegistrationContext } from "../Dashboard";
import { formValidation } from "~/utils/validations/validations";

const NewUserPage = () => {
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputCpfRef = useRef<HTMLInputElement>(null);
  const inputAdmissionDateRef = useRef<HTMLInputElement>(null);

  const history = useHistory();
  const goToHome = () => {
    history.push(routes.dashboard);
  };
  const [isLoading, setIsLoading] = useState(false);
  const handleAddNewuser = () => {
    setIsLoading(true);
    const newEmployee: Employee = {
      employeeName: inputNameRef.current?.value || "",
      email: inputEmailRef.current?.value || "",
      cpf: inputCpfRef.current?.value.replace(/[^\d]/g, "") || "",
      admissionDate: inputAdmissionDateRef.current?.value || "",
      status: "REVIEW",
    };

    const isFormValid = formValidation(newEmployee);

    if (isFormValid) {
      addEmployee(newEmployee);
    }

    setIsLoading(false);
  };

  return (
    <S.Container>
      <Loading isLoading={isLoading} />
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="Voltar para a página inicial">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField
          placeholder="Nome"
          id="nameTextField"
          ref={inputNameRef}
          label="Nome"
          aria-labelledby="nameTextField"
        />
        <TextField
          placeholder="Email"
          id="emailTextField"
          ref={inputEmailRef}
          label="Email"
          type="email"
          aria-labelledby="emailTextField"
        />
        <TextField
          placeholder="CPF"
          id="cpfTextField"
          ref={inputCpfRef}
          mask="999.999.999-99"
          label="CPF"
          aria-labelledby="cpfTextField"
        />
        <TextField
          label="Data de admissão"
          id="admissionDateTextField"
          ref={inputAdmissionDateRef}
          type="date"
          aria-labelledby="admissionDateTextField"
        />
        <Button onClick={handleAddNewuser} aria-label="Cadastrar novo usuário">Cadastrar</Button>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;

function addEmployee(newEmployee: Employee) {
  const { refresh, setRefresh } = useContext(RegistrationContext)!;
  return async () => {
    try {
      await EmployeeService.addEmployee(newEmployee);
      setRefresh(refresh + 1);
    } catch (error) {
      console.error("Erro ao adicionar funcionário:", error);
    }
  };
}

