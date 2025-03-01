import { Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import Loading from '../components/loading/Loading';
import { path } from '../utils/constant';
import PrivateRoute from './PrivateRoute';

const HomePage = lazy(() => import('../pages/homepage/HomePage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const RecruitmentPage = lazy(() => import('../pages/recruitment/RecruitmentPage'));
const DefaultLayout = lazy(() => import('../layout/DefaultLayout'));
const EmployerLayout = lazy(() => import('../layout/EmployerLayout'));
const JobLayout = lazy(() => import('../layout/JobLayout'));
const DetailJobPage = lazy(() => import('../pages/job/DetailJobPage'));
const AccountLayout = lazy(() => import('../layout/AccountLayout'));
const ProfilePage = lazy(() => import('../pages/account/ProfilePage'));
const MyJobPage = lazy(() => import('../pages/account/MyJobPage'));
const CVLayout = lazy(() => import('../layout/CVLayout'));
const CVManagementPage = lazy(() => import('../pages/cv/CVManagementPage'));
const CVCreatePage = lazy(() => import('../pages/cv/CVCreatePage'));
const CVDetailPage = lazy(() => import('../pages/cv/CVDetailPage'));

const AppRoute = () => {

    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path={path.HOME} element={<DefaultLayout />}>
                    <Route index element={<HomePage />} />
                </Route>

                <Route path={path.RECRUITMENT} element={<EmployerLayout />} >
                    <Route index element={<RecruitmentPage />} />
                </Route>

                <Route path={path.JOB} element={<JobLayout />} >
                    <Route path={path.DETAIL__JOB} element={< DetailJobPage />} />
                </Route>

                <Route path={path.CV} element={<CVLayout />} >
                    <Route path={path.CV__MANAGE} element={< CVManagementPage />} />
                    <Route path={path.CV__CREATE} element={< CVCreatePage />} />
                    <Route path={path.CV__DETAIL} element={< CVDetailPage />} />
                </Route>

                <Route path={path.ACCOUNT} element={<AccountLayout />} >
                    <Route path={path.ACCOUNT__PROFILE} element={< ProfilePage />} />
                    <Route path={path.ACCOUNT__MY__JOB} element={< MyJobPage />} />
                </Route>

                <Route path={path.REGISTER__CANDIDATE} element={<RegisterPage />} />
                <Route path={path.FORGOT__PASSWORD} element={<ForgotPasswordPage />} />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoute;