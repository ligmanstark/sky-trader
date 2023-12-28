import { css, Global } from '@emotion/react';
import { FC } from 'react';
import { calcFluidFontSize, fontFace } from './mixins';

import emotionReset from 'emotion-reset';
import {
	$desktopWidth,
	$mainBackgroundColor,
	$mainFont,
	$mainFontColor,
	$mainFontSize,
	$phoneWidth,
	$tableWidth,
} from './variables';
import { SCREEN_LG, SCREEN_MD, SCREEN_SM } from '../utils/consts';

export const GlobalStyles: FC = () => (
	<Global
		styles={css`
			${emotionReset}

			html {
				font-family: ${$mainFont};
				font-size: ${$mainFontSize};
				scroll-behavior: smooth;
				@media screen and (max-width: ${$desktopWidth}) {
					font-size: ${calcFluidFontSize(
						11.0223,
						21.3333,
						SCREEN_MD,
						SCREEN_LG
					)};
					display: grid;
					grid-template-rows: auto 1fr auto;
					min-height: 100vh;
					--error-color: #f74646;
					background-color: #f5f5f5;
				}
				@media screen and (max-width: ${$tableWidth}) {
					font-size: ${calcFluidFontSize(
						9.9999,
						20.6666,
						SCREEN_SM,
						SCREEN_MD
					)};
				}
				@media screen and (max-width: ${$phoneWidth}) {
					font-size: ${calcFluidFontSize(11.9465, 20.48, 280, SCREEN_SM)};
				}
			}

			body {
				position: relative;
				background: ${$mainBackgroundColor};
				color: ${$mainFontColor};
				display: grid;
				grid-template-rows: auto 1fr auto;
				min-height: 100vh;
				--error-color: #f74646;
				background-color: #f5f5f5;
			}

			#root {
				display: grid;
				grid-template-rows: auto 1fr auto;
				min-height: 100vh;
				--error-color: #f74646;
				background-color: #f5f5f5;
			}
		`}
	/>
);
