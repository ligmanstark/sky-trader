'use client';
import { GlobalStyles } from '../styled/GlobalStyles';
import Application from './Application';
export default function Home() {
	if (typeof window !== 'undefined')
		return (
			<main>
				<GlobalStyles />
				<Application />
			</main>
		);
}
