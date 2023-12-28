enum Role {
	admin = 'admin',
	user = 'user',
}

export type TUpdateUser = {
	id?:number
	role?: Role;
	email?: string;
	name?: string;
	surname?: string;
	phone?: string;
	city?: string;
	sells_from?: string | null;
	avatar?: string | null;
};

//  {   "id": 0,
//     "name": "string",
//     "email": "user@example.com",
//     "city": "string",
//     "avatar": "string",
//     "sells_from": "2023-12-17",
//     "phone": "string",
//     "role": "string",
//     "surname": "string"
//   }
