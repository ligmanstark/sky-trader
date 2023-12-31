import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as T from './types/index';

const initialState: T.TGoodsState = {
	data: [],
	searchData: [],
	searchRef: '',
	//@ts-ignore
	currentState: [],
	idCurrentState: 0,
	imageState: [],
};

const goodsSlice = createSlice({
	name: 'goods',
	initialState,
	reducers: {
		setGoods(state, action) {
			state.data = action.payload;
		},
		setSearchRef(state, action: PayloadAction<string>) {
			console.log(action.payload);
			state.searchRef = action.payload;
		},
		setSearchGood(state, action) {
			if (state.searchRef !== '') {
				state.searchData = action.payload;
			} else {
				state.searchData = [];
			}
		},
		setCurrentStateDate(state, action) {
			state.currentState = action.payload;
		},
		setCurrentIDStateDate(state, action) {
			state.idCurrentState = action.payload;
		},
		AddGoods(state, action) {
			state.data.push(action.payload);
		},
		setImg(state, action) {
			state.imageState.push(action.payload);
		},
	},
});
export const {
	setGoods,
	setSearchRef,
	setSearchGood,
	setCurrentStateDate,
	setCurrentIDStateDate,
	AddGoods,
	setImg,
} = goodsSlice.actions;

export default goodsSlice.reducer;
