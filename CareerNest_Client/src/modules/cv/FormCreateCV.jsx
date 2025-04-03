import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import withErrorBoundary from "../../hoc/withErrorBoundary";
import { useSelector } from 'react-redux';
import { postCreateOnlineCV } from "../../services/resumeService";
import { Datepicker, Spinner } from "flowbite-react";
import { useSkills } from "../../hooks/useSkills";
import { ProFormSelect } from "@ant-design/pro-components";

const FormCreateCV = () => {
    const containerRef = useRef(null);
    const user = useSelector(state => state?.user?.info);
    const formRef = useRef({
        title: "",
        fullName: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: null,
        address: "",
        skills: [],
        summary: "",
        languages: "",
        educations: "",
        certifications: "",

        // workExperience:
        companyName: "", location: "", startDate: "", endDate: "", description: ""
    });
    const { res: resSkills, isLoading: isLoadingSkills } = useSkills();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user?.dateOfBirth)
            formRef.current.dateOfBirth = new Date(user.dateOfBirth)
        if (user?.address)
            formRef.current.address = user.address;
        if (user?.phoneNumber)
            formRef.current.phoneNumber = user.phoneNumber;
        if (user?.email)
            formRef.current.email = user.email;
        if (user?.firstName || user?.lastName)
            formRef.current.fullName = `${user.lastName} ${user.firstName}`;

    }, [user]);

    const buildSkillsSelect = (skillsArray) => {
        return skillsArray?.length > 0 ? skillsArray.map(({ id, name }) => ({ id, name })) : [];
    };

    const transformData = (data) => data?.length > 0 ? data?.map(({ id, name }) => ({ label: name, value: id, desc: name })) : [];

    const transformIds = (ids) => ids?.map(id => ({ id }));

    const handleOnChange = (field, value) => {
        formRef.current[field] = value;
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
        if (containerRef?.current)
            containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        setIsLoading(true);
        const formData = {
            ...formRef.current,
            skills: transformIds(formRef.current.skills),

        };
        console.log(formData)
        return;
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
        <div className="relative" ref={containerRef}>
            {/* Overlay + Loading */}
            {isLoading && (
                <div className="absolute rounded-sm inset-0 h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-10">
                    <Spinner size="xl" color="white" />
                </div>
            )}

            <div className="mb-5 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                {/* Input Fields */}
                <div className="col-span-2 sm:col-span-1">
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Tên hồ sơ
                    </label>
                    <input
                        type="text"
                        className="outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                        onChange={(e) => handleOnChange("title", e.target.value)}
                    />
                </div>

                <div className="col-span-2 sm:col-span-1">
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Email
                    </label>
                    <input
                        readOnly
                        type="text"
                        className="outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                        defaultValue={user?.email ?? ''}
                    />
                </div>

                <div className="col-span-2 sm:col-span-1">
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Họ và tên
                    </label>
                    <input
                        readOnly
                        type="text"
                        className="outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                        defaultValue={user?.firstName && user?.lastName ? `${user.lastName} ${user.firstName}` : ''}
                    />
                </div>

                <div className="col-span-2 sm:col-span-1">
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Số điện thoại
                    </label>
                    <input
                        readOnly
                        type="text"
                        className="outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                        defaultValue={user?.phoneNumber ?? ''}
                    />
                </div>

                <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="birthDay_info_modal" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Ngày sinh </label>
                    <Datepicker
                        key={user?.dateOfBirth}
                        value={user?.dateOfBirth}
                        language="vi"
                        placeholder="Chọn ngày sinh"
                        disabled
                    />
                </div>

                <div className="col-span-2 sm:col-span-1">
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Địa chỉ </label>
                    <input
                        type='text'
                        defaultValue={user?.address ?? ''}
                        rows={3}
                        readOnly
                        className="block w-full outline-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Enter here your address" />
                </div>

                {/* Select Fields */}
                <div className="col-span-2 sm:col-span-1">
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Kỹ năng </label>
                    <ProFormSelect
                        rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                        placeholder="Chọn chuyên môn"
                        options={transformData(buildSkillsSelect(resSkills?.data))} // Mảng chuyên môn gốc
                        mode="multiple"
                        fieldProps={{
                            optionRender: (option) => (
                                <div className='text-blue-500'>
                                    {option.data.desc}
                                </div>
                            ),
                            style: { width: '100%' },
                            onChange: (value) => handleOnChange("skills", value), // Lưu dữ liệu vào formRef
                        }}

                    />

                </div>


                {/* ReactQuill Fields */}
                {[
                    { label: "Giới thiệu", field: "summary" },
                    { label: "Ngoại ngữ", field: "languages" },
                    { label: "Học vấn", field: "educations" },
                    { label: "Chứng chỉ đạt được", field: "certifications" },
                ].map(({ label, field }) => (
                    <div key={field} className="col-span-2 mb-8">
                        <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white">
                            {label}
                        </label>
                        <ReactQuill
                            className="h-[400px]"
                            theme="snow"
                            onChange={(value) => handleOnChange(field, value)}
                        />
                    </div>
                ))}

                {/* Kinh nghiệm làm việc */}
                <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white col-span-2">
                    Kinh nghiệm làm việc
                </label>

                {/* Input fields cho "Kinh nghiệm làm việc" */}

                <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Tên công ty</label>
                    <input
                        placeholder="Nhập tên công ty làm việc"
                        type="text"
                        className="outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                        onChange={(e) => handleOnChange("companyName", e.target.value)}
                    />
                </div>

                <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
                    <input
                        type="text"
                        className="outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                        onChange={(e) => handleOnChange("location", e.target.value)}
                    />
                </div>


                <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Ngày bắt đầu</label>
                    <input
                        type="date"
                        className="outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                        onChange={(e) => handleOnChange("startDate", new Date(e.target.value))}
                    />
                </div>

                <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Ngày kết thúc</label>
                    <input
                        type="date"
                        className="outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                        onChange={(e) => handleOnChange("endDate", new Date(e.target.value))}
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Mô tả công việc</label>
                    <ReactQuill
                        theme="snow"
                        className="h-[200px]"
                        onChange={(value) => handleOnChange("workExperience", [...formRef.current.workExperience, { jobDescription: value }])}
                    />
                </div>

            </div>

            {/* Buttons */}
            <div className="text-right border-t border-gray-200 pt-4 dark:border-gray-700 md:pt-5 mt-14">
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
        </div>
    );
};

export default withErrorBoundary(FormCreateCV);
