import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { useContext, useEffect, useState } from "react";
import { EmployeeService } from "~/services/employee/employee.service";
import { Column } from "~/types/employees";
import { RegistrationContext } from "~/pages/Dashboard";
import Loading from "~/components/Loading";

const Collumns = () => {
  const allColumns: Column[] = [
    { status: "REVIEW", title: "Pronto para revisar" },
    { status: "APPROVED", title: "Aprovado" },
    { status: "REPROVED", title: "Reprovado" },
  ];

  const { registrations, setRegistrations, cpf, refresh } =
    useContext(RegistrationContext)!;
    const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getRegistrations() {
      setIsLoading(true);
      const data = await EmployeeService.getEmployees(cpf);
      setRegistrations(data);
      setIsLoading(false);
    }
    getRegistrations();
  }, [cpf, refresh]);

  return (
    <S.Container>
      <Loading isLoading={isLoading} />
      {allColumns.map((collum) => {
        return (
          <S.Column status={collum.status} key={collum.title}>
            <>
              <S.TitleColumn status={collum.status}>
                {collum.title}
              </S.TitleColumn>
              <S.CollumContent>
                {registrations?.map((registration) => {
                  return (
                    registration.status === collum.status && (
                      <RegistrationCard
                        data={registration}
                        key={registration.id}
                      />
                    )
                  );
                })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Collumns;
