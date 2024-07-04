import { User } from "firebase/auth";
import { createContext, useContext } from "react";
import { IAlert } from "./app/alerts/types";

interface IContext {
  user: User | null;
  userAlerts: IAlert[];
  setUserAlerts: (alert: IAlert[]) => void;
  logout: () => void;
}

const defaultValues = {
  userAlerts: [],
  setUserAlerts: () => {},
  user: null,
  logout: () => {},
};

export const AppContext = createContext<IContext>(defaultValues);
