import { MovieType, PersonType } from "@/types/global";
import Link from "next/link";

async function fetchMovie(id: number): Promise<MovieType> {
	const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
		headers: {
			Authorization: `Bearer ${process.env.TMDB_KEY}`,
		},
	});

	return await res.json();
}

async function fetchCast(id: number): Promise<PersonType[]> {
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${id}/credits`,
		{
			headers: {
				Authorization: `Bearer ${process.env.TMDB_KEY}`,
			},
		}
	);

	const result = await res.json();

	return result.cast;
}

export default async function Movie({
	params,
}: {
	params: Promise<MovieType>;
}) {
	const { id } = await params;
	const movie = await fetchMovie(id);
	const cast = await fetchCast(id);

	const cover = "http://image.tmdb.org/t/p/w1280";
	const profile = "http://image.tmdb.org/t/p/w185";

	return (
		<div>
			<h2 className="mb-4 border-b pb-2 text-lg font-bold">
				{movie.title} ({movie.release_date.split("-")[0]})
			</h2>
			<div>
				<img src={cover + movie.backdrop_path} />
			</div>
			<p className="my-4">{movie.overview}</p>

			<h3 className="mb-4 border-b pb-2 text-lg">Cast</h3>
			<div className="flex gap-4 flex-wrap">
				{cast.map(person => {
					return (
						<div
							key={person.id}
							className="w-[185px] text-center">
							{person.profile_path ? (
								<img src={profile + person.profile_path} />
							) : (
								<div className="h-[280px] bg-gray-300"></div>
							)}

							<Link href={`/person/${person.id}`}>
								<b>{person.name}</b>
							</Link>
							<div className="text-sm text-gray-600">
								{person.character}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
