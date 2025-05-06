import { Button, Checkbox, Modal, Select } from 'flowbite-react';
import React, { useState } from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";

const levels = ["INTERN", "FRESHER", "JUNIOR", "MIDDLE", "SENIOR"];
const workType = ["Full-time", "Part-time", "Contract"];

// use for Tablet, Mobile
const FilterJobModal = ({ isOpen = false, setOpenModal = () => { }, selectedLevels = [], setSelectedLevels = null, selectedSalary = '', setSelectedSalary = null }) => {

    const [selectedWorkType, setSelectedWorkType] = useState([]);

    const toggleLevel = (level) => {
        setSelectedLevels((prev) =>
            prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
        );
    };

    const toggleWorkType = (level) => {
        setSelectedWorkType((prev) =>
            prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
        );
    };

    const handleResetFilter = () => {
        setSelectedLevels([]);
        setSelectedWorkType([]);
        setSelectedSalary('');
    }


    return (
        <Modal show={isOpen} onClose={() => setOpenModal(false)}>
            <Modal.Header >Bộ lọc</Modal.Header>
            <Modal.Body className='flex flex-col gap-6'>
                <div className='flex flex-col gap-4'>
                    <div className='font-semibold'>{localStorage.getItem('i18nextLng') === 'vi' ? "Cấp bậc" : "Levels"}</div>
                    <div className="flex flex-wrap gap-3">
                        {levels.map((level) => (
                            <label
                                key={level}
                                className={`flex items-center gap-2 px-4 py-2 border rounded-full cursor-pointer transition-all 
                        ${selectedLevels.includes(level)
                                        ? "bg-blue-500 text-white border-blue-500"
                                        : "border-gray-300 text-gray-800 hover:bg-gray-100"
                                    }`}
                                onClick={() => toggleLevel(level)}
                            >
                                <Checkbox
                                    checked={selectedLevels.includes(level)}
                                    onChange={() => toggleLevel(level)}
                                    className="hidden"
                                />
                                {level}
                                <AiOutlinePlus className="w-4 h-4" />
                            </label>
                        ))}
                    </div>
                </div>

                <div className='flex flex-col gap-4'>
                    <div className='font-semibold'>{localStorage.getItem('i18nextLng') === 'vi' ? "Hình thức làm việc" : "Work type"}</div>
                    <div className="flex flex-wrap gap-3">
                        {workType.map((level) => (
                            <label
                                key={level}
                                className={`flex items-center gap-2 px-4 py-2 border rounded-full cursor-pointer transition-all 
                        ${selectedWorkType.includes(level)
                                        ? "bg-blue-500 text-white border-blue-500"
                                        : "border-gray-300 text-gray-800 hover:bg-gray-100"
                                    }`}
                                onClick={() => toggleLevel(level)}
                            >
                                <Checkbox
                                    checked={selectedWorkType.includes(level)}
                                    onChange={() => toggleWorkType(level)}
                                    className="hidden"
                                />
                                {level}
                                <AiOutlinePlus className="w-4 h-4" />
                            </label>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='font-semibold'>{localStorage.getItem('i18nextLng') === 'vi' ? "Mức lương" : "Salary"}</div>
                    <div className="flex gap-3">
                        {/* Mức lương */}
                        <Select
                            className="w-fit rounded-full border-gray-300"
                            value={selectedSalary}
                            onChange={(e) => setSelectedSalary(e.target.value)}
                        >
                            <option value="">{localStorage.getItem('i18nextLng') === 'vi' ? "Tất cả" : "All"}</option>
                            <option value="under-1000-$">Dưới 1000$</option>
                            <option value="1000-1500-$">Từ 1000 - 1500$</option>
                            <option value="1500-2000-$">Từ 1500-2000$</option>
                            <option value="2000-2500-$">Từ 2000-2500$</option>
                            <option value="2500-3000-$">Từ 2500-3000$</option>
                            <option value="over-3000-$">Trên 3000$</option>
                        </Select>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className='flex items-center justify-between'>
                <Button color="gray" onClick={() => setOpenModal(false)}>{localStorage.getItem('i18nextLng') === 'vi' ? "Hủy bỏ" : "Cancel"}</Button>
                <Button onClick={handleResetFilter}>
                    <GrPowerReset size={18} className='mr-1' />
                    {localStorage.getItem('i18nextLng') === 'vi' ? "Làm mới" : "Reset"}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FilterJobModal; 