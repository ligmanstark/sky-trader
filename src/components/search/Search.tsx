import { useRef, useState, useEffect } from 'react';
import { Button } from '../form/Button';
import { InputField } from '../form/InputField';
import { Input } from '../form/Input';
import * as S from './style';
import { useDispatch } from 'react-redux';
import { setSearchRef } from '../../store/slices/goodsSlice';
type TSearch = {
	hasError?: boolean;
	onSubmit: (text: string) => void;
};

export const Search = ({ hasError, onSubmit }: TSearch) => {
	const dispatch = useDispatch();
	const [search, setSearch]: [string, (search: string) => void] = useState('');

	const searchRef = useRef<HTMLInputElement | null>(null);

	const handleChange = (e: { target: { value: string } }) => {
		setSearch(e.target.value);
	};

	
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const text = searchRef.current?.value || '';
		if (text.trim()) {
			onSubmit(text);
		} else {
			onSubmit('')
		}
	};
	useEffect(() => {
		if (searchRef.current) {
			dispatch(setSearchRef(search));
		}
	}, [handleSubmit]);
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
					onChange={handleChange}
				/>
				{hasError && <S.Error>Отсутствуют результаты</S.Error>}
				<Button $color onClick={handleSubmit}>
					Найти
				</Button>
			</div>
		</InputField>
	);
};
