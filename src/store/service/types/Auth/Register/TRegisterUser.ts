enum Role {
	admin = 'admin',
	user = 'user',
}

export type TRegisterUser = {
	password: string;
	role: Role;
	email: string;
	name: string;
	surname: string;
	phone: string;
	city: string;
	id: number | null;
	avatar: string | null;
	sells_from: string | null;
};
