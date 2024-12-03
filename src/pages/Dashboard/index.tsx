import Columns from "./components/Columns";
import { SearchBar } from "./components/Searchbar";
import * as S from "./styles";
import { createContext, useState } from "react";

export const RegistrationContext = createContext<
  | {
      registrations: any[];
      setRegistrations: React.Dispatch<React.SetStateAction<any[]>>;
      cpf: string;
      setCpf: React.Dispatch<React.SetStateAction<string>>;
      refresh: number;
      setRefresh: React.Dispatch<React.SetStateAction<number>>;
    }
  | undefined
>(undefined);

const DashboardPage = () => {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [cpf, setCpf] = useState<string>("");
  const [refresh, setRefresh] = useState<number>(0);

  return (
    <RegistrationContext.Provider
      value={{
        registrations,
        setRegistrations,
        cpf,
        setCpf,
        refresh,
        setRefresh,
      }}
    >
      <S.Container>
        <SearchBar />
        <Columns />
      </S.Container>
    </RegistrationContext.Provider>
  );
};

export default DashboardPage;
