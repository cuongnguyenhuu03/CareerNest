import { Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import Loading from '../components/loading/Loading';
import { path } from '../utils/constant';

const HomePage = lazy(() => import('../pages/homepage/HomePage'));

const AppRoute = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path={path.HOME} >
                    <Route index element={<HomePage />} />
                </Route>

                {/* <Route path="sign-in" element={<SignInPage />} /> */}
                {/* <Route path="sign-up" element={<SignUpPage />} /> */}
                {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Routes>
        </Suspense>
    );
};

export default AppRoute;