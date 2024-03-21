import { Button, Icon } from "@ama-pt/agora-design-system";
import { FC } from "react";

const PendingScreen: FC = () => {
  const buttonArgs = {
    children: "Fechar",
    hasIcon: true,
    leadingIcon: "agora-line-x",
    leadingIconHover: "agora-solid-x",
    onClick: () => window.location.reload()
  };

  return (
    <div className="pending-screen">

      <div className="close-button">
        <Button  {...buttonArgs} appearance="link" />
      </div>

      <div className="icon-feedback">
        <Icon name="agora-solid-loader" dimensions="xxl" aria-hidden/>
      </div>
      
      <div className="message">
        <p className="title">Aguarde um momento...</p>
        <p className="subtitle">Estamos a enviar o seu pedido</p>
      </div>
    </div>
  );
};

export default PendingScreen