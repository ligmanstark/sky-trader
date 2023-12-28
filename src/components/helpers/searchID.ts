import { TGoods } from '../../store/slices/types/TGoods';
const searchID = (data: any, searchName = '') => {
 

	const found = data.filter(
		(e: TGoods) => e.title.toLowerCase().includes(searchName.toLowerCase())
	);

	if (!found) {
		const found = data.filter(
			(e: TGoods) => e.description.toLowerCase().includes(searchName.toLowerCase())
		);
		return found;
	} else return found;

	// if (!found) {
	// 	const found = data.filter(
	// 		(e: TGoods) => e.description.toLowerCase() == searchName.toLowerCase()
	// 	);
	// 	return found;
	// } else return found;
};

export { searchID };
