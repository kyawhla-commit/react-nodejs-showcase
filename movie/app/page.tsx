type MovieType = {
	id: number;
	title: string;
	backdrop_path: string;
	overview: string;
	poster_path: string;
	release_date: string;
};

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

    const poster = "http://image.tmdb.org/t/p/w185";

	return (
		<div>
			<h2 className="text-lg font-bold mb-4 pb-2 border-b">Trending this week</h2>
			<div className="flex gap-2 flex-wrap">
				{trending.map(movie => {
					return (
						<div key={movie.id} className="flex flex-col gap-1 text-center w-[185px] mb-4">
							<img src={poster + movie.poster_path} />
							<b className="text-wrap">{movie.title}</b>
						</div>
					);
				})}
			</div>
		</div>
	);
}
