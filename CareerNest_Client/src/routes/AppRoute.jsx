import { Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import Loading from '../components/loading/Loading';
import { path } from '../utils/constant';
import DefaultLayout from '../layout/DefaultLayout';

const HomePage = lazy(() => import('../pages/homepage/HomePage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

const AppRoute = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path={path.HOME} element={<DefaultLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path='resume' element={< > Profile... </>} />
                </Route>

                <Route path={path.LOGIN__RECRUITMENT} element={< > Nhà tuyển dụng</>} />
                <Route path={path.REGISTER__CANDIDATE} element={<RegisterPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoute;