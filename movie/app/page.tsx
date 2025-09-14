import Movie from "@/components/movie";
import type { MovieType } from "@/types/global";

async function fetchPopular(): Promise<MovieType[]> {
	const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
		headers: {
			Authorization: `Bearer ${process.env.TMDB_KEY}`,
		},
	});

	const data = await res.json();

	return data.results;
}

async function fetchTrending(): Promise<MovieType[]> {
	const res = await fetch("https://api.themoviedb.org/3/trending/movie/week", {
        headers: {
            "Authorization": `Bearer ${process.env.TMDB_KEY}`
        }
    });

    const data = await res.json();

    return data.results;
}

export default async function Home() {
    const trending = await fetchTrending();
    const popular = await fetchPopular();

	return (
		<div>
			<h2 className="text-lg font-bold mb-4 pb-2 border-b">
				Trending this week
			</h2>
			<div className="flex gap-2 flex-wrap">
				{trending.map(movie => {
					return (
						<Movie
							key={movie.id}
							movie={movie}
						/>
					);
				})}
			</div>

			<h2 className="text-lg font-bold my-4 pb-2 border-b">
				Popular
			</h2>
			<div className="flex gap-2 flex-wrap">
				{popular.map(movie => {
					return (
						<Movie
							key={movie.id}
							movie={movie}
						/>
					);
				})}
			</div>
		</div>
	);
}
