import { useEffect, useState } from "react";

import { Box, Container, Divider, Alert, Typography } from "@mui/material";

import Item from "./Item";
import Form from "./Form";
import Header from "./Header";
import List from "./List";

import { useQuery, useQueryClient } from "@tanstack/react-query";

const api = "http://localhost:8800/tasks";

async function fetchTodo() {
    const res = await fetch(api);
    return res.json();
}

export default function App() {
	const {
		data: items,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["tasks"],
		queryFn: fetchTodo,
	});

    const queryClient = useQueryClient();

	const add = name => {
		fetch(api, {
            method: 'POST',
            body: JSON.stringify({ name }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => {
            queryClient.invalidateQueries("tasks");
        });
	};

	const del = id => {
        fetch(`${api}/${id}`, { method: 'DELETE' }).then(res => {
            queryClient.invalidateQueries("tasks");
        });
	};

    const toggle = id => {
        fetch(`${api}/${id}/toggle`, { method: "PUT" }).then(res => {
            queryClient.invalidateQueries("tasks");
        });
    }

    const clear = () => {
        setItems(items.filter(item => !item.done));
    }

    if (error) {
		return <div>Somthing went wrong!</div>;
	}

    if(isLoading) {
        return <div>Loading...</div>;
    }

	return (
		<div>
			<Header
				count={items.filter(item => !item.done).length}
				clear={clear}
			/>

			<Container maxWidth="sm">
				<Box sx={{ mt: 4 }}>
					<Form add={add} />
				</Box>

				<List>
					{items
						.filter(item => !item.done)
						.map(item => (
							<Item
								key={item.id}
								item={item}
								del={del}
								toggle={toggle}
							/>
						))}
				</List>

				<Divider />

				<List>
					{items
						.filter(item => item.done)
						.map(item => (
							<Item
								key={item.id}
								item={item}
								del={del}
								toggle={toggle}
							/>
						))}
				</List>
			</Container>
		</div>
	);
}
