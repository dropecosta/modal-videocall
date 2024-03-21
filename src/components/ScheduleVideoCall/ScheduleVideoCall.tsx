import { ChangeEvent, FC, FormEvent, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  InputDate,
  InputPhone,
  InputText,
  InputPhoneRef,
  InputDateProps,
} from "@ama-pt/agora-design-system";
import { ScheduleVideoCallProps, FormData } from "../../types/types";
import PendingScreen from "../PendingScreen";
import SuccessScreen from "../SuccessScreen";
import ErrorScreen from "../ErrorScreen";

enum Screen {
  Form,
  Pending,
  Success,
  Error,
}

const ScheduleVideoCall: FC<ScheduleVideoCallProps> = ({ hide }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    country: '',
    idioma: '',
    data: '',
    time: '',
    terms: false,
  });
  const [phoneValue, setPhoneValue] = useState<string>('');
  const [screen, setScreen] = useState<Screen>(Screen.Form);
  const phoneRef = useRef<InputPhoneRef | null>(null);

  const handlePhoneChange = ((args: InputPhoneRef) => {
    const phoneValue = args.code + args.input.value;
    setPhoneValue(args.input.value);
    if (phoneRef.current !== null) {
      setFormData(prevFormData => ({
        ...prevFormData,
        phone: phoneValue,
      }));
    }
  });

  const handleDateChange = (date: Date) => {
    const event = {
      target: {
        name: 'data',
        value: date
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    handleChange(event);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value, type } = event.target as HTMLInputElement;
    const newValue = type === 'checkbox' ? (event.target as HTMLInputElement).checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(formData);

    setFormData({
      name: '',
      email: '',
      phone: '',
      country: '',
      idioma: '',
      data: '',
      time: '',
      terms: false,
    });
    setPhoneValue('');

    setScreen(Screen.Pending);

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(true);
          //reject(new Error("Simulated API call failure"));
        }, 2000);
      });
      setScreen(Screen.Success);
    } catch (error) {
      setScreen(Screen.Error);
    }
  };

  const buttonArgs = {
    children: "Fechar",
    hasIcon: true,
    leadingIcon: "agora-line-x",
    leadingIconHover: "agora-solid-x",
    onClick: () => hide(),
  };

  const inputDateArgs: InputDateProps = {
    label: "Data",
    className: "date-picker",
    name: "data",
    value: formData.data,
    calendarIconAriaLabel: "Icone calendário",
    previousYearAriaLabel: "Ano anterior",
    previousMonthAriaLabel: "Mês anterior",
    nextMonthAriaLabel: "Próximo mês",
    nextYearAriaLabel: "Próximo ano",
    selectedDayAriaLabel: "Dia selecionado",
    todayDayAriaLabel: "Hoje",
    todayLabel: "Hoje",
    cancelLabel: "Cancelar",
    okLabel: "OK",
    onChange: handleDateChange,
  };

  if (screen === Screen.Pending) {
    return <PendingScreen />;
  }

  if (screen === Screen.Success) {
    return <SuccessScreen />;
  }

  if (screen === Screen.Error) {
    return <ErrorScreen />;
  }

  return (
    <div className="modal-container">
      <div className="button-close">
        <Button {...buttonArgs} appearance="link" />
      </div>

      <div className="modal-body">
        <div className="modal-header">
          <p className="modal-description">
            Agende o apoio por Videochamada para realização deste seviço:
          </p>
          <h1 className="modal-title">Alterar a morada no Cartão de Cidadão</h1>
        </div>
        <form className="video-call-form" onSubmit={handleSubmit}>
          <InputText
            label="Nome"
            placeholder="Nome"
            className="form-input"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputText
            label="E-mail"
            placeholder="E-mail"
            type="email"
            className="form-input"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputPhone
            label="Telefone"
            className="form-input--half"
            defaultCode="351"
            name="phone"
            value={phoneValue}
            ref={phoneRef}
            onChange={handlePhoneChange}
          />

          <div className="form-line">
            <InputText
              label="País"
              placeholder="País"
              className="form-input--half"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
            <InputText
              label="Idioma"
              placeholder="Idioma"
              className="form-input--half"
              name="idioma"
              value={formData.idioma}
              onChange={handleChange}
            />
          </div>

          <div className="form-line">
            <InputDate {...inputDateArgs} />
            <InputText
              label="Hora"
              placeholder="Hora"
              className="form-input--half"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
          <div className="terms">
            <Checkbox
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />
            <label htmlFor="terms">
              Li e aceito os termos e condições do atendimento por videochamada.
            </label>
          </div>

          <div className="form-actions">
            <Button appearance="link">Cancelar</Button>
            <Button
              className="button-submit"
              disabled={!formData.terms} 
              type="submit"
              hasIcon={true}
              leadingIcon="agora-line-arrow-right-circle"
              leadingIconHover="agora-solid-arrow-right-circle"
            >
              Agendar
            </Button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default ScheduleVideoCall
