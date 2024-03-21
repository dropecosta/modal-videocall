import { useState } from "react";
import ScheduleVideoCall from "./components/ScheduleVideoCall";
import { Button, useModalContext } from "@ama-pt/agora-design-system";
import "./App.css";
import "@ama-pt/agora-design-system/dist/index.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const { show, hide } = useModalContext();

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <ScheduleVideoCall
          darkMode={false}
          isOpen={isModalOpen}
          hide={closeModalHandler}
        />
      )}

      {!isModalOpen && (
        <div className="root">
          <Button type="button" onClick={openModalHandler}>
            Open Modal Dialog
          </Button>
        </div>
      )}
    </>
  );
}

export default App;
