export type UserType = {
	id: number;
	name: string;
	username: string;
	bio: string | null;
	password: string;
	created: string;
};

export type CommentType = {
	id: number;
	content: string;
	postId: number;
	userId: number;
    user: UserType;
	created: string;
};

export type PostType = {
	id: number;
	body: string;
	userId: number;
	created: string;
	user: UserType;
	comments: CommentType[];
};
