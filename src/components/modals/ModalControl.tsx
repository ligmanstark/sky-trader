import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalOverlay } from './ModalOverlay';
import { RootState } from '../../store/store';
import { openModal, closeModal } from '../../store/slices/modalSlice';
import * as T from './types/index';

export const ModalControl: FC<T.TModalControllProps> = ({
	modal,
	children,
	id,
}) => {
	const currentModal = useSelector(
		(state: RootState) => state.modalReducer.currentModal
	);
	const dispatch = useDispatch();
	const isOpen = currentModal === id;
	return (
		<>
			<div
				style={{ cursor: 'pointer', width: 'fit-content' }}
				onClick={() => dispatch(openModal(id))}
			>
				{children}
			</div>
			{
				<ModalOverlay setOpen={() => dispatch(closeModal())} open={isOpen}>
					{modal}
				</ModalOverlay>
			}
		</>
	);
};
