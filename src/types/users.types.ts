export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  status: string;
  [key: string]: any;
}

export interface ModalDataType {
  title: string;
  content: React.ReactNode;
}

export interface ModalConfirmDataType {
  title: string;
  content: string;
  ids: string[];
}
