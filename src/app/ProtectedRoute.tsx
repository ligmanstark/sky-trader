'use client'
import { Navigate, Outlet } from 'react-router-dom';
import { FC } from 'react';

export const ProtectedRoute: FC = () => {
	if (localStorage.getItem('token') === '') {
		return <Navigate to="/login" replace={true} />;
	}
	return <Outlet />;
};
