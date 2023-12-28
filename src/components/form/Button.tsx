import styled from '@emotion/styled';

interface Props {
	$color?: boolean;
	$border?: boolean;
	$width?: number;
}

export const Button = styled.button<Props>`
	color: ${({ $color }) => ($color ? '#fff' : '#000')};
	background-color: ${({ $color }) => ($color ? '#009EE4' : '#fff')};
	width: ${({ $width }) => ($width ? `${$width}rem` : `17rem`)};
	min-width: 17rem;
	padding: 0.75rem 1rem 1rem;
	font-family: inherit;
	font-size: 1.25rem;
	border-radius: 1rem;
	cursor: pointer;
	border: ${({ $border }) =>
		$border ? '0.0625rem solid #D0CECE' : null};
	&:hover {
		background: ${({ $color }) => ($color ? '#0080C1' : '#009EE4')};
	}
	&:active {
		background: ${({ $color }) => ($color ? '#009EE4' : '##0080C1')};
	}
	&:disabled {
		cursor: not-allowed;
		background-color: #D9D9D9;
	}
`;

export const NoButton = styled.button<Props>`
	color: ${({ $color }) => ($color ? '#fff' : '#000')};
	background-color: ${({ $color }) => ($color ? '#009EE4' : '#fff')};
	width: ${({ $width }) => ($width ? `${$width}rem` : `17rem`)};
	min-width: 17rem;
	padding: 0.75rem 1rem 1rem;
	font-family: inherit;
	font-size: 1.25rem;
	border-radius: 1rem;
	cursor: pointer;
	border: ${({ $border }) =>
		$border ? '0.0625rem solid #D0CECE' : null};
	// &:hover {
	// 	background: ${({ $color }) => ($color ? '#0080C1' : '#009EE4')};
	// }
	&:active {
		background: ${({ $color }) => ($color ? '#009EE4' : '##0080C1')};
	}
	&:disabled {
		cursor: not-allowed;
		background-color: #D9D9D9;
	}
`;
