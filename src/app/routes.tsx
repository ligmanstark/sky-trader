import About from '../pages/About';
import Main from '../pages/main/Main';
import NotFound from '../pages/NotFound';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import GoodsCard from '../pages/goodsCard/GoodsCard';
import SellerCard from '../pages/sellerCard/SellerCard';
import Profile from '../pages/profile/Profile';
import {
	ABOUT_ROUTE,
	LOGIN_ROUTE,
	MAIN_ROUTE,
	NOT_FOUND_ROUTE,
	REGISTER_ROUTE,
	GOODS,
	PROFILE_ROUTE,
	PROFILE_ROUTE_ME,
} from '../utils/consts';

export type RouteType = {
	path: string;
	component: JSX.Element;
};

export const publicRoutes: RouteType[] = [
	{ path: MAIN_ROUTE, component: <Main /> },
	{ path: ABOUT_ROUTE, component: <About /> },
	{ path: REGISTER_ROUTE, component: <Register /> },
	{ path: LOGIN_ROUTE, component: <Login /> },

	//...
	{ path: NOT_FOUND_ROUTE, component: <NotFound /> },
];

export const privateRoutes: RouteType[] = [
	{ path: `${GOODS}/:id`, component: <GoodsCard /> },
	{ path: `${PROFILE_ROUTE}/:id`, component: <SellerCard /> },
	{ path: PROFILE_ROUTE_ME, component: <Profile /> },
];
