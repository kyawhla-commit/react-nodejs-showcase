import { createContext, useContext } from "react";

const MyContext = createContext();

function Main() {
    return <MyContext.Provider value="my-value">
        <Page />
    </MyContext.Provider>
}

function Page() {
    const value = useContext(MyContext);

    return <div>Page = {value}</div>
}
