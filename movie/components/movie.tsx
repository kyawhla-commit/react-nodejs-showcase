import type { MovieType } from "@/types/global";
import Link from "next/link";

const poster = "http://image.tmdb.org/t/p/w185";

export default function Movie({ movie }: { movie: MovieType }) {
	return (
		<div
			key={movie.id}
			className="flex flex-col gap-1 text-center w-[185px] mb-4">
			<Link href={`/movie/${movie.id}`}>
				<img src={poster + movie.poster_path} className="hover:scale-105 transition-all" />
			</Link>
			<b className="text-wrap">{movie.title}</b>
			<span className="text-gray-600 text-xs">
				{movie.release_date.split("-")[0]}
			</span>
		</div>
	);
}
