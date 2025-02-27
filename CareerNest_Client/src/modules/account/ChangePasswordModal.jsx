import { useState } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { HiEye, HiEyeOff } from "react-icons/hi";

export function ChangePasswordModal({ isOpen = false, setOpenModal = () => { } }) {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        errors: {}
    });
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validate = (value) => {
        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
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

    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = {};

        if (!formData.currentPassword) {
            errors.currentPassword = "Vui lòng nhập mật khẩu cũ";
        } else if (!validate(formData.currentPassword)) {
            errors.currentPassword = "Mật khẩu phải có ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt.";
        }

        if (!formData.newPassword) {
            errors.newPassword = "Vui lòng nhập mật khẩu mới";
        } else if (!validate(formData.newPassword)) {
            errors.newPassword = "Mật khẩu phải có ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt.";
        }

        if (!formData.confirmPassword) {
            errors.confirmPassword = "Vui lòng nhập lại";
        } else if (!validate(formData.newPassword)) {
            errors.newPassword = "Mật khẩu phải có ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt.";
        }
        else if (formData.newPassword !== formData.confirmPassword) {
            errors.confirmPassword = "Mật khẩu xác nhận không trùng khớp.";
        }

        if (Object.keys(errors).length > 0) {
            setFormData((prev) => ({ ...prev, errors }));
            return;
        }

        console.log({
            currentPass: formData.currentPassword, newPass: formData.newPassword
        });
    };

    return (
        <Modal show={isOpen} size="md" popup onClose={() => setOpenModal(false)} className="mt-[60px] md:mt-0">
            <Modal.Header />
            <Modal.Body>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">Đổi mật khẩu</h3>

                    {/* Input current Password */}
                    <div>
                        <Label htmlFor="currentPassword" value="Mật khẩu cũ*:" className="mb-1 block" />
                        <div className="relative">
                            <TextInput
                                id="currentPassword"
                                type={showCurrentPassword ? "text" : "password"}
                                value={formData.currentPassword}
                                onChange={handleChange}
                                color={formData.errors.currentPassword ? "failure" : ""}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                onClick={() => setShowCurrentPassword((prev) => !prev)}
                            >
                                {showCurrentPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                            </button>
                        </div>
                        <div className="min-h-[1rem] text-sm text-red-600">
                            {formData.errors.currentPassword}
                        </div>
                    </div>

                    {/* Input new Password */}
                    <div>
                        <Label htmlFor="newPassword" value="Mật khẩu mới*:" className="mb-1 block" />
                        <div className="relative">
                            <TextInput
                                id="newPassword"
                                type={showNewPassword ? "text" : "password"}
                                value={formData.newPassword}
                                onChange={handleChange}
                                color={formData.errors.newPassword ? "failure" : ""}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                onClick={() => setShowNewPassword((prev) => !prev)}
                            >
                                {showNewPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                            </button>
                        </div>
                        <div className="min-h-[1rem] text-sm text-red-600">
                            {formData.errors.newPassword}
                        </div>
                    </div>

                    {/* Input confirm Password */}
                    <div>
                        <Label htmlFor="confirmPassword" value="Nhập lại mật khẩu*:" className="mb-1 block" />
                        <div className="relative">
                            <TextInput
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                color={formData.errors.confirmPassword ? "failure" : ""}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                            >
                                {showConfirmPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                            </button>
                        </div>
                        <div className="min-h-[1rem] text-sm text-red-600">
                            {formData.errors.confirmPassword}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="w-full flex justify-center">
                        <Button type="submit">Lưu thay đổi</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}
