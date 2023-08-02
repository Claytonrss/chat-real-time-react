import React, { createContext, useState } from "react";
import { ContextProviderProps } from "../../types/provider";

type UserType = {
  userName: string;
  socketID: string;
};

type PropsUserContext = {
  state: UserType;
  setState: React.Dispatch<React.SetStateAction<UserType>>;
};

const DEFAULT_VALUE = {
  state: {
    userName: "",
    socketID: "",
  },

  setState: () => {}, //função de inicialização
};

const UserContext = createContext<PropsUserContext>(DEFAULT_VALUE);

const UserContextProvider = ({ children }: ContextProviderProps) => {
  const [state, setState] = useState(DEFAULT_VALUE.state);
  return (
    <UserContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export { UserContextProvider };
export default UserContext;
