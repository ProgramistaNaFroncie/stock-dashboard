"use client";

import React, { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "@firebase/auth";
import { auth } from "@/lib/firebase";
import { AppContext } from "@/App.context";

import "@/scss/main.scss";
import { IAlert } from "./app/alerts/types";

interface IProps {
  children: React.ReactNode;
}

const App: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userAlerts, setUserAlerts] = useState<IAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  if (isLoading) {
    return <div data-testid="loading">Loading...</div>;
  }

  return (
    <AppContext.Provider
      value={{
        user,
        logout,
        userAlerts,
        setUserAlerts: (alert: IAlert[]) => {
          setUserAlerts(alert);
        },
      }}
      data-testid="app-context-provider"
    >
      {children}
    </AppContext.Provider>
  );
};

export default App;
