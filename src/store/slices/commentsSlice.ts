import { createSlice } from '@reduxjs/toolkit';
import { TCommentsState } from '../service/types/TCommentsState';

const initialState: TCommentsState = {
	data: [],
};

const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {
		setComments(state, action) {
			state.data = action.payload;
		},
		addComments(state, action) {
			state.data.push(action.payload);
		},
	},
});

export const { setComments, addComments } = commentsSlice.actions;
export default commentsSlice.reducer;
