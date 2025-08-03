import { useState, useEffect, useMemo } from "react";

function bigFn() {
    console.log("big-fn");
    return "big-fn";
}

export default function App() {
    const [count, setCount] = useState(0);

    const value = useMemo(() => {
        return bigFn();
    }, []);

    return <div>Hello React ({count}) - <button onClick={() => setCount(count + 1)}>Button</button></div>
}
