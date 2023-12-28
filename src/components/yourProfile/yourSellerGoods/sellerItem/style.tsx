import styled from '@emotion/styled';

export const Wrapper = styled.div`
	cursor: pointer;
	outline: none;
	text-decoration: none;
	color: black;
	di
`;

export const Image = styled.img`
	max-width: 14rem;
	max-height: 14rem;
	min-width: 14rem;
	min-height: 14rem;
`;

export const CardInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	max-width: 16rem;
	max-height: 10rem;
	min-width: 16rem;
	min-height: 4rem;
`;

export const Description = styled.div`
	display: block;
	width: 250px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	font-size: 1.5rem;
`;

export const Title = styled.div`
	color: #009ee4;
	font-size: 1.5rem;
`;

export const UserInfo = styled.div`
	font-size: 1rem;
`;
