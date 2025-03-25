import React, { useRef, useState } from "react";
import { Button, Upload, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils/getBase64";
import ReactQuill from "react-quill";
import withErrorBoundary from "../../hoc/withErrorBoundary";
import { useSelector } from 'react-redux';
import { postCreateOnlineCV } from "../../services/resumeService";

const FormCreateCV = () => {
    const user = useSelector(state => state?.user?.info);
    const formRef = useRef({
        title: "",
        summary: "",
        porfolio: "",
        languages: "",
        educations: "",
        certifications: "",
        level: "",
        major: "",
        jobType: "",
        experience: "",
        skills: "",
    });

    const [avatar, setAvatar] = useState("");

    const handleOnChange = (field, value) => {
        formRef.current[field] = value;
    };

    const handleOnchangeAvatar = async ({ fileList }) => {
        if (fileList?.length <= 0) return;
        const file = fileList[0];
        if (!file?.url && !file?.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file?.preview);
    };

    const apiCreateOnlineCV = async (data) => {
        try {
            let res = await postCreateOnlineCV(data);
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async () => {
        const formData = { ...formRef.current, avatar };
        let data = {
            user: {
                id: user?.id
            },
            title: formData.title,
            summary: formData.summary,
            phone: "0377586305",
            languages: formData.languages,
            fullName: user.lastName + " " + user?.firstName,
            email: user?.email,
            educations: formData.educations,
            address: "Dang Lo street, Tan Binh dist, Ho Chi Minh city",
        }
        console.log("Submitted Data:", data);
        await apiCreateOnlineCV(data)
        // TODO: Gửi formData lên API hoặc xử lý dữ liệu
    };

    return (
        <>
            <div className="mb-5 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                {/* Avatar */}
                <div className="col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Ảnh đại diện
                    </label>
                    <div className="flex items-center gap-x-6 xs:gap-x-10">
                        <Upload onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                        </Upload>
                        {avatar && (
                            <Image
                                src={avatar}
                                style={{
                                    height: "90px",
                                    width: "90px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    border: "1px solid gray",
                                }}
                                alt="avatar"
                            />
                        )}
                    </div>
                </div>

                {/* Input Fields */}
                {[
                    { label: "Tên hồ sơ", field: "title" },
                    { label: "Portfolio", field: "porfolio" },
                ].map(({ label, field }) => (
                    <div key={field} className="col-span-2 sm:col-span-1">
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                            {label}
                        </label>
                        <input
                            type="text"
                            className="outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                            onChange={(e) => handleOnChange(field, e.target.value)}
                        />
                    </div>
                ))}

                {/* Select Fields */}
                {[
                    { label: "Cấp bậc", field: "level" },
                    { label: "Chuyên ngành", field: "major" },
                    { label: "Loại công việc", field: "jobType" },
                ].map(({ label, field }) => (
                    <div key={field} className="col-span-2 sm:col-span-1">
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                            {label}
                        </label>
                        <select
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                            onChange={(e) => handleOnChange(field, e.target.value)}
                        >
                            <option value="">Chọn</option>
                            <option value="HCM">Hồ Chí Minh</option>
                            <option value="HN">Hà Nội</option>
                            <option value="DN">Đà Nẵng</option>
                        </select>
                    </div>
                ))}

                {/* ReactQuill Fields */}
                {[
                    { label: "Giới thiệu", field: "summary" },
                    { label: "Ngoại ngữ", field: "languages" },
                    { label: "Học vấn", field: "educations" },
                    { label: "Kinh nghiệm", field: "experience" },
                    { label: "Kỹ năng", field: "skills" },
                    { label: "Giải thưởng đạt được", field: "awards" },
                ].map(({ label, field }) => (
                    <div key={field} className="col-span-2 mb-8">
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                            {label}
                        </label>
                        <ReactQuill
                            className="h-[400px]"
                            theme="snow"
                            onChange={(value) => handleOnChange(field, value)}
                        />
                    </div>
                ))}
            </div>

            {/* Buttons */}
            <div className="text-right border-t border-gray-200 pt-4 dark:border-gray-700 md:pt-5">
                <button
                    type="submit"
                    className="me-2 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800"
                    onClick={handleSubmit}
                >
                    Tạo CV
                </button>
                <button
                    type="button"
                    className="me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100"
                >
                    Hủy
                </button>
            </div>
        </>
    );
};

export default withErrorBoundary(FormCreateCV);
