import { useState } from "react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { HiMail, HiEye, HiEyeOff } from "react-icons/hi";
import { path } from '../../utils/constant';
import { Link, Navigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { postLogin } from '../../services/userService';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from "../../redux/slices/userSlice";

export function LoginPage({ isOpen = false, setOpenModal = () => { } }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
        errors: {}
    });
    const user = useSelector(state => state?.user?.info);
    const dispatch = useDispatch();


    const mutation = useMutation({
        mutationFn: postLogin,
        onSuccess: async (res) => {
            if (+res?.statusCode === 200) {
                dispatch(updateUserInfo({ ...res?.data }));
                toast.success('Đăng nhập thành công')
                setOpenModal(false);
                mutation.reset();
            } else {
                toast.error(res?.error ?? 'Login failed!');
            }
        },
        onError: (error) => {
            console.error('Error:', error);
            toast.error(error.message || 'Something wrong in Server');
        },
    });

    const [showPassword, setShowPassword] = useState(false);

    const validate = (type, value) => {
        let regex = "";
        if (type === "email")
            regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        else
            regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        return regex.test(value);
    };

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: type === "checkbox" ? checked : value,
            errors: { ...prev.errors, [id]: "" } // Xoá lỗi khi nhập lại
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = {};

        if (!formData.email) {
            errors.email = "Vui lòng nhập email";

        } else if (!validate("email", formData.email)) {
            errors.email = "Email không đúng định dạng";
        }

        if (!formData.password) {
            errors.password = "Vui lòng nhập mật khẩu";
        }
        else if (!validate("password", formData.password)) {
            errors.password = "Mật khẩu phải có ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt.";
        }

        if (Object.keys(errors).length > 0) {
            setFormData((prev) => ({ ...prev, errors }));
            return;
        }

        await mutation.mutateAsync({ username: formData.email, password: formData.password });
    };

    if (user?.id)
        return <Navigate to={'/'} />
    return (
        <Modal show={isOpen} size="md" popup onClose={() => setOpenModal(false)} className="pt-28 md:pt-0">
            <Modal.Header />
            <Modal.Body>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">Đăng nhập dành cho ứng viên</h3>

                    {/* Input Email */}
                    <div>
                        <Label htmlFor="email" value="Email" className="mb-1 block" />
                        <TextInput
                            id="email"
                            icon={HiMail}
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@company.com"
                            color={formData.errors.email ? "failure" : ""}
                            helperText={formData.errors.email && <span className="text-red-600">{formData.errors.email}</span>}
                        />
                    </div>

                    {/* Input Password */}
                    <div>
                        <Label htmlFor="password" value="Mật khẩu" className="mb-1 block" />
                        <div className="relative">
                            <TextInput
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleChange}
                                color={formData.errors.password ? "failure" : ""}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                            </button>
                        </div>
                        <div className="min-h-[1rem] text-sm text-red-600">
                            {formData.errors.password}
                        </div>
                    </div>

                    {/* Remember me & Forgot password */}
                    <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" checked={formData.remember} onChange={handleChange} />
                            <Label htmlFor="remember">Nhớ mật khẩu</Label>
                        </div>
                        <Link to={path.FORGOT__PASSWORD} className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                            Quên mật khẩu?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <div className="w-full">
                        <Button type="submit">Đăng nhập</Button>
                    </div>

                    {/* Register Link */}
                    <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                        Bạn chưa có tài khoản?&nbsp;
                        <Link to={path.REGISTER__CANDIDATE} className="text-cyan-700 hover:underline dark:text-cyan-500">
                            Đăng ký ngay
                        </Link>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}
