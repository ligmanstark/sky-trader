'use client';
import { GlobalStyles } from '../styled/GlobalStyles';
import Main from '../pages/main/Main';
import Application from './Application';
export default function Home() {
	if (typeof window !== 'undefined')
		return (
			<div>
				<GlobalStyles />
				{/* <Application /> */}
				<Main/>
			</div>
		);
}
