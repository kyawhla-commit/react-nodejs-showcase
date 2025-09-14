export type MovieType = {
	id: number;
	title: string;
	backdrop_path: string;
	overview: string;
	poster_path: string;
	release_date: string;
};

export type PersonType = {
    id: number;
    name: string;
    profile_path: string;
    character: string;
}

export type GenreType = {
    id: number;
    name: string;
}
