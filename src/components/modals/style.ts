import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
export const Wrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10;
	animation: ${fadeIn} 0.3s;
`;
export const Overlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
`;
export const Content = styled.div`
	position: relative;
	border-radius: 0.75rem;
	background: #fff;
	padding: 2.25rem 2.56rem 2.94rem;
`;

