export interface ScheduleVideoCallProps {
    darkMode: boolean;
    isOpen: boolean;
    hide: () => void;
  }
  
  export interface FormData {
    name: string;
    email: string;
    phone: string;
    country: string;
    idioma: string;
    data: string;
    time: string;
    terms: boolean;
  }