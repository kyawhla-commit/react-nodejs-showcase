import Mode from "./Mode";

export default function Header() {
	return (
		<div style={{ display: "flex", alignItems: "center", gap: 20 }}>
			<h1>Title</h1>
			<Mode />
		</div>
	);
}