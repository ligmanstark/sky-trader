'use client'
import { GlobalStyles } from '../../../styled/GlobalStyles';
import ProfilePage from '../../../pages/profile/Profile';
const ProfileMe = () => {
	if (typeof window !== 'undefined')
		return (
			<>
				<GlobalStyles />
				<>
					<ProfilePage />
				</>
			</>
		);
};

export default ProfileMe;
