import { FC } from 'react';
import { Logomini } from '../../assets/img/index';
import { Button } from '../form/Button';
import { Link } from 'react-router-dom';
import * as S from './style';
export const SubHeader: FC = () => {
	return (
		<S.Box>
			<Logomini />
			<Link to={`/`}>
				<Button $color $border>Вернуться на главную</Button>
			</Link>
		</S.Box>
	);
};
