import * as T from './index';

export type TGoodsState = {
	data: T.TGoods[];
	searchRef?: string;
	searchData?: T.TGoods[];
	currentState: T.TGoods[];
	idCurrentState: number;
	status?: 'idle' | 'loading' | 'succeeded' | 'failed';
	error?: string | undefined;
};
