import {
	configureStore,
	// combineReducers
} from '@reduxjs/toolkit';
import { goodsApi } from './service/goodsService';
import goodsReducer from './slices/goodsSlice';
import userReducer from './slices/userSlice';
import modalReducer from './slices/modalSlice';
import commentsReducer from './slices/commentsSlice';

// const rootReducer = combineReducers({
// 	[goodsApi.reducerPath]:goodsApi.reducer,
// })

// export const store = () => {
// 	return configureStore({
// 		reducer: rootReducer,
// 		middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(goodsApi.middleware)
// 	})
// }

// export type RootState = ReturnType<typeof rootReducer>;
// export type AppStore = ReturnType<typeof store>;
// export type AppDispatch = AppStore['dispatch'];
export const store = configureStore({
	reducer: {
		[goodsApi.reducerPath]: goodsApi.reducer,
		goodsReducer: goodsReducer,
		userReducer: userReducer,
		modalReducer: modalReducer,
		commentsReducer: commentsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(goodsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
