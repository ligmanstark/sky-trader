export interface IImages {
	id: number;
	ad_id: number;
	url: string | undefined;
}
interface IUser {
	id: number;
	name: string;
	email: string;
	city: string;
	avatar: string;
	sells_from: string;
	phone: string;
}

export type TGoods = {
	title: string;
	description: string;
	price: number;
	id: number | string | undefined;
	images: IImages[];
	user_id: number;
	created_on: string;
	user: IUser;
};
