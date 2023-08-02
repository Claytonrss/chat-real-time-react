import React from "react";
import { ContextProviderProps } from "../types/provider";
import { UserContextProvider } from "./user/context";

const GlobalContext = ({ children }: ContextProviderProps) => {
  return (
    <>
      <UserContextProvider>{children}</UserContextProvider>;
    </>
  );
};

export default GlobalContext;
