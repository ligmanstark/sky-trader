import styled from '@emotion/styled';
import { $mainFontColor } from '../../styled/variables';

interface Props {
	$after?: boolean;
	$border?: boolean;
	$heigth?: boolean;
}
export const Input = styled.input<Props>`
	width: 100%;
	padding: 0 0 0.5rem;
	border: none;
	border-bottom: 0.0625rem solid #d0cece;
	color: ${$mainFontColor};
	font-variant-numeric: lining-nums proportional-nums;
	font-size: 1.125rem;
	font-style: normal;
	font-weight: 400;
	line-height: 1.5rem;
	letter-spacing: -0.00313rem;
	background-color: transparent;
	transition: border-color 0.3s;
	border: ${({ $border }) => ($border ? 'none' : '')};

	&::placeholder {
		color: #d0cece;
		transition: color 0.3s;
	}
	&:focus {
		border-bottom: 0.0625rem solid ${$mainFontColor};
		&::placeholder {
			color: transparent;
			border: ${({ $border }) => ($border ? 'none' : '#009ee4')};
		}
	}
	&:active {
		border: ${({ $border }) => ($border ? 'none' : '#009ee4')};
	}
`;
export const InputPlaceBlack = styled(Input)`
	&::placeholder {
		color: #009ee4;
		transition: color 0.3s;
	}
`;
