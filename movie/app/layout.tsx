import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Button } from "@/components/ui/button";
import { Play, Clapperboard } from "lucide-react";

import type { GenreType } from "@/types/global";
import Link from "next/link";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Next Movie App",
	description: "Powered by TMDB API",
};

async function fetchGenres(): Promise<GenreType[]> {
    const res = await fetch("https://api.themoviedb.org/3/genre/movie/list", {
		headers: {
			Authorization: `Bearer ${process.env.TMDB_KEY}`,
		},
	});

    const data = await res.json();

    return data.genres;
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
    const genres = await fetchGenres();

	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<div className="flex">
					<h1 className="text-2xl font-bold border-b p-4 flex flex-1 items-center gap-2">
						<Clapperboard />
						Next Movie
					</h1>
				</div>
				<div className="flex">
					<div className="w-[200px] pr-4 border-r p-4 flex flex-col gap-1 shrink-0">
						<Button asChild variant="outline" className="justify-start">
							<Link href="/" className="flex gap-2">
								<Play /> All
							</Link>
						</Button>
						{genres.map(genre => {
							return (
								<Button asChild key={genre.id} variant="outline"
									className="justify-start">
									<Link href={`/genre/${genre.name}/${genre.id}`} className="flex gap-2">
										<Play /> {genre.name}
									</Link>
								</Button>
							);
						})}
					</div>
					<div className="p-4">{children}</div>
				</div>
			</body>
		</html>
	);
}
