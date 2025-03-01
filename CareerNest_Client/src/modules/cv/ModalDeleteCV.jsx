import React from 'react';
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from 'react-toastify';

const ModalDeleteCV = ({ openModal = false, setOpenModal = () => { }, cvId = '' }) => {

    return (
        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Bạn có chắc muốn xóa Hồ sơ {cvId}?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={() => { toast.success('Xóa thành công'); setOpenModal(false) }}>
                            Đồng ý
                        </Button>
                        <Button color="gray" onClick={() => setOpenModal(false)}>
                            Hủy
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModalDeleteCV;