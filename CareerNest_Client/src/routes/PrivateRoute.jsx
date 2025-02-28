import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { Button, Result } from 'antd';
import { path } from '../utils/constant';

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = useSelector(state => state?.user?.info);

    if (location.pathname === path.ACCOUNT || location.pathname === path.CV || location.pathname === path.JOB)
        return children;

    if (_.isEmpty(userInfo) && !userInfo?._id) {
        return (
            <Result
                status="403"
                title="Không thể xác thực người dùng"
                subTitle={'Bạn cần đăng nhập trước khi vào đường link !'}
                extra={<Button type="primary" onClick={() => navigate('/')}>Quay về trang chủ</Button>}
            />
        )
    }
    else {
        if (location.pathname.startsWith('/system')) {
            if (userInfo?.isAdmin)
                return children;
            else {
                return (
                    <Result
                        status="403"
                        title="Không thể truy cập tài nguyên"
                        subTitle={'Bạn không được cấp quyền truy cập tài nguyên này !'}
                        extra={<Button type="primary" onClick={() => navigate('/')}>Quay về trang chủ</Button>}
                    />
                )
            }
        }
        else
            return <>{children}</>;
    }
}

export default PrivateRoute;