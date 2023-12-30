'use client'
import { GlobalStyles } from '../../styled/GlobalStyles';
import LoginPage from '../../pages/auth/Login';
const Login = () => {
	if (typeof window !== 'undefined')
		return (
			<>
				<GlobalStyles />
				<>
					<LoginPage />
				</>
			</>
		);
};

export default Login;
