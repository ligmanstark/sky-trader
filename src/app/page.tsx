'use client';

import Application from './Application';
export default function Home() {
	if (typeof window !== 'undefined')
	return (
		<main>
			<Application />
		</main>
	);
}
