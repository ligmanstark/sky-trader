import { FC } from 'react';
import * as S from './style';
import * as T from './types/index';

export const ModalOverlay: FC<T.Props> = ({ open, children, setOpen }) => {
	return (
		<>
			{open && (
				<S.Wrapper>
					<S.Overlay onClick={() => setOpen(false)} />
					<S.Content>{children}</S.Content>
				</S.Wrapper>
			)}
		</>
	);
};
