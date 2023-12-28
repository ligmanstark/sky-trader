enum Role {
	admin = 'admin',
	user = 'user',
}

export type TUpdateUserReq = {
	role?: Role;
	email?: string;
	name?: string;
	surname?: string;
	phone?: string;
	city?: string;
};

// {
//     "role": "string",
//     "email": "user@example.com",
//     "name": "string",
//     "surname": "string",
//     "phone": "string",
//     "city": "string"
//   }
