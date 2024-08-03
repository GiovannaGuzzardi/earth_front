"use client"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type AppContextType = {
    login : boolean;
    setLogin : Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType>({
    login : false,
    setLogin : () => {}
});

export  function AppWrapper({children } : {children : React.ReactNode}) {
    let [login, setLogin] = useState<boolean>(false);

    return (
        <AppContext.Provider value={{login, setLogin}}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext(){
    return useContext(AppContext);
};