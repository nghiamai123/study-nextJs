'use client'
import { createContext, useContext, useState } from "react";

export const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
}

const AppContext = createContext({
  sessionToken: "",
  setSessionToken: (setSessionToken: string) => {}
});

export default function AppProvider({ children, initialSessionToken = ''}:{ 
    children: React.ReactNode,
    initialSessionToken?: string
}) {
    const [sessionToken, setSessionToken] = useState(initialSessionToken);
  return (
    <AppContext.Provider value={{ sessionToken: "", setSessionToken}}>
      {children}
    </AppContext.Provider>
  );
}
