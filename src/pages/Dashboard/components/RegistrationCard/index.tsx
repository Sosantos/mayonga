import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { Employee, StatusType } from "~/types/employees";
import { EmployeeService } from "~/services/employee/employee.service";
import { useContext, useState } from "react";
import { RegistrationContext } from "../..";
import Loading from "~/components/Loading";

type Props = {
  data: any;
};

const RegistrationCard = (props: Props) => {
  const { refresh, setRefresh } = useContext(RegistrationContext)!;
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = (employee: Employee, status: StatusType) => {
    return async () => {
      setIsLoading(true);
      try {
        await EmployeeService.updateEmployeeStatus(employee, status);
        setRefresh(refresh + 1);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Erro ao alterar status do funcionário:", error);
      }
    };
  };

  const handleDelete = async (employee: Employee) => {
    try {
      setIsLoading(true);
      await EmployeeService.deleteEmployee(employee);
      setRefresh(refresh + 1);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao deletar funcionário:", error);
      setIsLoading(false);
    }
  };

  return (
    <S.Card>
      <Loading isLoading={isLoading} />
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{props.data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{props.data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{props.data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {props.data.status === "REVIEW" ? (
          <>
            <ButtonSmall
              bgcolor="rgb(255, 145, 154)"
              onClick={handleStatusChange(props.data, "REPROVED")}
            >
              Reprovar
            </ButtonSmall>
            <ButtonSmall
              bgcolor="rgb(155, 229, 155)"
              onClick={handleStatusChange(props.data, "APPROVED")}
            >
              Aprovar
            </ButtonSmall>
          </>
        ) : (
          <ButtonSmall
            bgcolor="#ff8858"
            onClick={handleStatusChange(props.data, "REVIEW")}
          >
            Revisar novamente
          </ButtonSmall>
        )}
        <HiOutlineTrash onClick={() => handleDelete(props.data)} />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
