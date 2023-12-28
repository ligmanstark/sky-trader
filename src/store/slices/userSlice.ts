import { createSlice } from '@reduxjs/toolkit';
import * as T from './types/index';

const initialState: T.TUser = {
	email: '',
	password: '',
	name: '',
	access_token: '',
	refresh_token: '',
	token_type: '',
	avatar: '',
	city: '',
	phone: '',
	surname: '',
	id: 0,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.email = action.payload.email;
			state.password = action.payload.password;
			state.name = action.payload.name;
			state.city = action.payload.city;
			state.avatar = action.payload.avatar;
			state.id = action.payload.id;
			state.surname = action.payload.surname;
			state.phone = action.payload.phone;
		},
		setAccessToken(state, action) {
			state.access_token = action.payload.access_token;
			state.refresh_token = action.payload.refresh_token;
			state.token_type = action.payload.token_type;
		},
	},
});

export const { setUser, setAccessToken } = userSlice.actions;
export default userSlice.reducer;
