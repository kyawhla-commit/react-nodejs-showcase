export async function GET(
	request: Request,
	context: { params: { id: string } }
) {
	const { id } = context.params;

	const res = await fetch(`https://api.themoviedb.org/3/person/${id}`, {
		headers: {
			Authorization: `Bearer ${process.env.TMDB_KEY}`,
		},
	});

	const data = await res.json();

	return Response.json(data);
}
