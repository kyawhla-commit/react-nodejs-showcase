import { useState, createContext } from "react";

export const ModeContext = createContext(); 

export default function ModeProvider({ children }) {
    const [mode, setMode] = useState("dark");

    return <ModeContext.Provider value={{ mode, setMode }}>
        {children}
    </ModeContext.Provider>
}
