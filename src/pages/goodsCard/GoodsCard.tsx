import { FC } from 'react';
import { Container } from '../../styled/components';
import styled from '@emotion/styled';
import { SubHeader } from '../../components/subHeader/SubHeader';
import { CardComponents } from '../../components/cardComponents/CardComponents';
export const GoodsCard: FC = () => {
	if (typeof window !== 'undefined')
		return (
			<Wrapper>
				<Container>
					<SubHeader />
					<CardComponents />
				</Container>
			</Wrapper>
		);
};

const Wrapper = styled.div``;

export default GoodsCard;
