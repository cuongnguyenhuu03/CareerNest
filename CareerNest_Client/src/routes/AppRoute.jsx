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
const DetailRecruitmentPage = lazy(() => import('../pages/recruitment/DetailRecruitmentPage'));
const DefaultLayout = lazy(() => import('../layout/DefaultLayout'));
const EmployerLayout = lazy(() => import('../layout/EmployerLayout'));
const JobLayout = lazy(() => import('../layout/JobLayout'));
const ChatLayout = lazy(() => import('../layout/ChatLayout'));
const BlogLayout = lazy(() => import('../layout/BlogLayout'));
const FindJobLayout = lazy(() => import('../layout/FindJobLayout'));
const AuthLayout = lazy(() => import('../layout/AuthLayout'));
const AdminLayout = lazy(() => import('../layout/AdminLayout'));
const DetailJobPage = lazy(() => import('../pages/job/DetailJobPage'));
const FindJobPage = lazy(() => import('../pages/job/FindJobPage'));
const ChatPage = lazy(() => import('../pages/chat/ChatPage'));
const AccountLayout = lazy(() => import('../layout/AccountLayout'));
const OverviewPage = lazy(() => import('../pages/account/OverviewPage'));
const JobViaEmail = lazy(() => import('../pages/account/JobViaEmail'));
const ProfilePage = lazy(() => import('../pages/account/ProfilePage'));
const MyJobPage = lazy(() => import('../pages/account/MyJobPage'));
const BlogPage = lazy(() => import('../pages/blog/BlogPage'));
const CVLayout = lazy(() => import('../layout/CVLayout'));
const CVManagementPage = lazy(() => import('../pages/cv/CVManagementPage'));
const CVCreatePage = lazy(() => import('../pages/cv/CVCreatePage'));
const CVDetailPage = lazy(() => import('../pages/cv/CVDetailPage'));
const LoginRecruitmentPage = lazy(() => import('../pages/recruitment/LoginRecruitmentPage'));
const LoginAdminPage = lazy(() => import('../pages/system/LoginAdminPage'));
const DashboardPage = lazy(() => import('../pages/system/DashboardPage'));
const CompanyPage = lazy(() => import('../pages/system/CompanyPage'));
const RolePage = lazy(() => import('../pages/system/RolePage'));
const UserPage = lazy(() => import('../pages/system/UserPage'));

const AppRoute = () => {

    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path={path.HOME} element={<DefaultLayout />}>
                    <Route index element={<HomePage />} />
                </Route>

                <Route path={path.RECRUITMENT} element={<EmployerLayout />} >
                    <Route index element={<RecruitmentPage />} />
                    <Route path={path.RECRUITMENT__DETAIL} element={< DetailRecruitmentPage />} />
                </Route>

                <Route path={path.JOB} element={<JobLayout />} >
                    <Route path={path.DETAIL__JOB} element={< DetailJobPage />} />
                </Route>

                <Route path={path.CHAT} element={<PrivateRoute><ChatLayout /></PrivateRoute>} >
                    <Route path={path.DETAIL__CHAT} element={< ChatPage />} />
                </Route>

                <Route path={path.BLOG} element={<BlogLayout />} >
                    <Route index element={<BlogPage />} />
                </Route>

                <Route path={path.FIND__JOB} element={<FindJobLayout />}>
                    <Route path=":city?/:keyword?" element={<FindJobPage />} />
                </Route>

                <Route path={path.CV} element={<PrivateRoute><CVLayout /></PrivateRoute>} >
                    <Route path={path.CV__MANAGE} element={< CVManagementPage />} />
                    <Route path={path.CV__CREATE} element={< CVCreatePage />} />
                    <Route path={path.CV__DETAIL} element={< CVDetailPage />} />
                </Route>

                <Route path={path.ACCOUNT} element={<PrivateRoute><AccountLayout /></PrivateRoute>} >
                    <Route path={path.ACCOUNT__OVERVIEW} element={< OverviewPage />} />
                    <Route path={path.ACCOUNT__PROFILE} element={< ProfilePage />} />
                    <Route path={path.ACCOUNT__MY__JOB} element={< MyJobPage />} />
                    <Route path={path.ACCOUNT__GET__JOB__VIA__MAIL} element={< JobViaEmail />} />
                </Route>

                <Route path={path.SYSTEM} element={<PrivateRoute><AdminLayout /></PrivateRoute>} >
                    <Route path={path.SYSTEM__DASHBOARD} element={< DashboardPage />} />
                    <Route path={path.SYSTEM__COMPANY} element={< CompanyPage />} />
                    <Route path={path.SYSTEM__ROLE} element={< RolePage />} />
                    <Route path={path.SYSTEM__USER} element={< UserPage />} />
                </Route>

                <Route path={path.REGISTER__CANDIDATE} element={<AuthLayout><RegisterPage /></AuthLayout>} />
                <Route path={`${path.RECRUITMENT}/${path.RECRUITMENT__LOGIN}`} element={<AuthLayout>< LoginRecruitmentPage /></AuthLayout>} />
                <Route path={`${path.SYSTEM}/${path.SYSTEM__LOGIN}`} element={<AuthLayout>< LoginAdminPage /></AuthLayout>} />
                <Route path={path.FORGOT__PASSWORD} element={<AuthLayout><ForgotPasswordPage /></AuthLayout>} />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoute;