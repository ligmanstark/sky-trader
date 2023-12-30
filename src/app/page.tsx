'use client';
import { GlobalStyles } from '../styled/GlobalStyles';
import { Header } from './Layout/Header/Header';
import { Footer } from './Layout/Footer/Footer';
import Main from '../pages/main/Main';
export default function Home() {
	if (typeof window !== 'undefined')
		return (
			<div>
				<GlobalStyles />
				<>
					<Header />
					<Main />
					<Footer />
				</>
			</div>
		);
}
