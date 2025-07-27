import { useContext } from "react";

import { ModeContext } from "./ModeProvider";

export default function Mode() {
    const { mode, setMode } = useContext(ModeContext);

	return (
		<button
			onClick={() => {
                if(mode === "dark") setMode("light");
                else setMode("dark");
            }}>
			Mode
		</button>
	);
}