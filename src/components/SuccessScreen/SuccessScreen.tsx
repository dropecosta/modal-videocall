import { Button, Icon } from "@ama-pt/agora-design-system";
import { FC } from "react";

const SuccessScreen: FC = () => {
  const buttonArgs = {
    children: "Fechar",
    hasIcon: true,
    leadingIcon: "agora-line-x",
    leadingIconHover: "agora-solid-x",
    onClick: () => window.location.reload()
  };
  
  return (
    <div className="successs-screen">

    <div className="close-button">
      <Button  {...buttonArgs} appearance="link" />
    </div>

    <div className="icon-feedback">
        <Icon name="agora-line-check-circle" dimensions="xxl" aria-hidden/>
      </div>
    <div className="message">
      <p className="title">O seu agendamento foi confirmado.</p>
      <p className="subtitle">Irá receber um e-mail com a data e a hora do agendamento, e as condições para a realização do serviço.</p>
    </div>
    <Button
      className="back-button"
     fullWidth
     hasIcon={true}
     leadingIcon="agora-line-arrow-left-circle"
     leadingIconHover="agora-solid-arrow-left-circle"
     onClick={() => window.location.reload()}
     >
    Voltar a Como realizar o serviço
    </Button>
  </div>
  );
};

export default SuccessScreen