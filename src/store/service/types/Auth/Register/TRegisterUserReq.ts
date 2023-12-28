enum Role {
	admin = 'admin',
	user = 'user',
}

export type TRegisterUserReq = {
	password: string;
	role?: Role;
	email: string;
	name: string;
	surname?: string;
	phone?: string;
	city?: string;
	id?: number | null;
};

// {
//     "password": "string",
//     "role": "string",
//     "email": "user@example.com",
//     "name": "string",
//     "surname": "string",
//     "phone": "string",
//     "city": "string",
//     "id": 0
//   }
