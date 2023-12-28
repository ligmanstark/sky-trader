import { useRef } from 'react';
import { Button } from '../Button';
import { InputField } from '../InputField';
import { Input } from '../Input';
 
type TSearch = {
	hasError?: boolean;
	onSubmit: (text: string) => void;
};

export const Search = ({ hasError, onSubmit }: TSearch) => {
	const searchRef = useRef<HTMLInputElement | null>(null);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const text = searchRef.current?.value || '';
		if (text.trim()) {
			onSubmit(text);
			if (searchRef.current) {
				searchRef.current.value = '';
			}
		}
	};
	return (
		<InputField>
			<div
				style={{
					display: 'flex',
					gap: '2rem',
					marginTop: '2rem',
				}}
			>
				<Input
					type="text"
					ref={searchRef}
					id="search"
					name="search bar"
					placeholder="    Поиск по объявлениям"
					style={{
						width: '80%',
						padding: '0',
					}}
				/>
				{hasError && <div>Отсутствуют результаты</div>}
				<Button $color onClick={handleSubmit}>
					Найти
				</Button>
			</div>
		</InputField>
	);
};
