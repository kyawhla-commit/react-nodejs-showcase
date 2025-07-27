import { useRef } from "react";

import {
    Box,
    OutlinedInput,
    IconButton,
} from "@mui/material";

import {
    Add as AddIcon
} from "@mui/icons-material";

export default function Form({ add }) {
    const nameInput = useRef();

    return (
		<form
			onSubmit={e => {
				e.preventDefault();

				add(nameInput.current.value);

				nameInput.current.value = "";
				nameInput.current.focus();
			}}>
			<Box sx={{ display: "flex" }}>
				<OutlinedInput
					inputRef={nameInput}
					sx={{ flexGrow: 1 }}
					endAdornment={
						<IconButton
							variant="contained"
							type="submit">
							<AddIcon />
						</IconButton>
					}
				/>
			</Box>
		</form>
	);
}
