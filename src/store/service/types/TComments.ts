type TAuthor = {
    id: number,
    email: string,
    city: string,
    avatar: string,
    sells_from: string,
    phone: string,
    name:string
}

export type TComments = {
    id: number,
    text: string,
    created_on: string,
    author:TAuthor
}

// {
//     "id": 12,
//     "text": "Да, может :)",
//     "created_on": "2023-01-10T17:01:20.757111",
//     "author": {
//       "id": 1,
//       "name": "Иван",
//       "email": "user1@example.com",
//       "city": "Мюнхен",
//       "avatar": "avatar_images/b39347d3-d0a5-4d8a-be6f-7f3d3088a68d.png",
//       "sells_from": "2022-12-04",
//       "phone": "+49 1111111111"
//     }
//   }