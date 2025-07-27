import { useContext } from "react";

import Header from "./Header";
import { ModeContext } from "./ModeProvider";

export default function App() {
    const { mode } = useContext(ModeContext);

	return (
		<div
			style={{
				height: 2000,
				background: mode == "dark" ? "black" : "white",
				color: mode == "dark" ? "white" : "black",
			}}>
			<Header />
		</div>
	);
}
