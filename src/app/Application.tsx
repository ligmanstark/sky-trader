'use client';
import { FC } from 'react';
import { GlobalStyles } from '../styled/GlobalStyles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { publicRoutes, privateRoutes } from './routes';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { ProtectedRoute } from './ProtectedRoute';
const Application: FC = () => {
	return (
		<>
			<GlobalStyles />
			<Provider store={store}>
				<BrowserRouter>
					<Routes>
						<Route element={<Layout />}>
							{publicRoutes.map(({ path, component }) => (
								<Route key={path} path={path} element={component} />
							))}
							<Route element={<ProtectedRoute />}>
								{privateRoutes.map(({ path, component }) => (
									<Route key={path} path={path} element={component} />
								))}
							</Route>
						</Route>
					</Routes>
				</BrowserRouter>
			</Provider>
		</>
	);
};

export default Application;
