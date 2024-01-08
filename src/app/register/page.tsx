'use client'
import { GlobalStyles } from '../../styled/GlobalStyles';
import RegisterPage from '../../pages/auth/Register';
const Register = () => {
	if (typeof window !== 'undefined')
		return (
			<>
				<GlobalStyles />
				<>
					<RegisterPage />
				</>
			</>
		);
};

export default Register;
