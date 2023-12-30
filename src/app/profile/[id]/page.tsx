'use client';
import { GlobalStyles } from '../../../styled/GlobalStyles';
import SellerCard from '../../../pages/sellerCard/SellerCard';
type Props = {
	params: {
		id: string;
	};
};
const Profile = ({ params: { id } }: Props) => {
	if (typeof window !== 'undefined')
		return (
			<>
				<GlobalStyles />
				<>
					<SellerCard />
				</>
			</>
		);
};

export default Profile;
