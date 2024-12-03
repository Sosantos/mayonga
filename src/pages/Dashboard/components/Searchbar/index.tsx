import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { useContext, useRef } from "react";
import { RegistrationContext } from "../..";
import { isValidCpf } from "~/utils/validations/validations";
import Loading from "~/components/Loading";

export const SearchBar = () => {
  const history = useHistory();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };
  const { setCpf, refresh, setRefresh } = useContext(RegistrationContext)!;
  const inputCpfRef = useRef<HTMLInputElement>(null);

  const handleCpfSearch = () => {
    const cpf = inputCpfRef.current?.value || "";
    const cpfValid = isValidCpf(cpf);
    setCpf(cpfValid);
  };

  const handleRefetch = () =>{
    setRefresh(refresh + 1);
  }

  return (
    <S.Container>
      <Loading isLoading={false} />
      <TextField
        placeholder="Digite um CPF válido"
        onBlur={handleCpfSearch}
        id="cpfTextField"
        ref={inputCpfRef}
        mask='999.999.999.99'
      />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={handleRefetch}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
