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
// {
// 	"title": "Кресло",
// 	"description": "старое, но добротное",
// 	"price": 2500.0,
// 	"id": 1,
// 	"images": [
// 		{
// 			"id": 41,
// 			"ad_id": 1,
// 			"url": "ad_images/84581e62-3874-4042-9240-692b170b5821.png"
// 		}
// 	],
// 	"user_id": 1,
// 	"created_on": "2022-12-04T16:41:26.759771",
// 	"user": {
// 		"id": 1,
// 		"name": "Иван",
// 		"email": "user1@example.com",
// 		"city": "Мюнхен",
// 		"avatar": "avatar_images/b39347d3-d0a5-4d8a-be6f-7f3d3088a68d.png",
// 		"sells_from": "2022-12-04",
// 		"phone": "+49 1111111111"
// 	}
// },