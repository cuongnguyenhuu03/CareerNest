import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { headerMenu } from "../../utils/menu";
import { Button } from "flowbite-react";
import { LoginPage } from "../../pages/auth/LoginPage";
import { path } from "../../utils/constant";
import DropdownAccount from "../../modules/account/DropdownAccount";
import { useSelector } from "react-redux";

const Header = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [openModalLogin, setOpenModalLogin] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();
    const user = useSelector(state => state?.user?.info);

    // Xử lý khi click ra ngoài dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleOpenLogin = () => {
        if (location.pathname !== path.RECRUITMENT)
            setOpenModalLogin(true);
        else {
            navigate(`${path.RECRUITMENT}/${path.RECRUITMENT__LOGIN}`);
        }
    }

    return (
        <>
            <header>
                <nav className="w-full z-40 fixed top-0 bg-white shadow-md border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <Link to={'/'} className="flex items-center">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">CareerNest</span>
                        </Link>
                        <div className="flex items-center lg:order-2 gap-3 sm:gap-5">
                            {!user?.id ?
                                <>
                                    <Button color="light" onClick={handleOpenLogin}>Đăng nhập</Button>
                                    {!location.pathname.includes(path.RECRUITMENT) &&
                                        <Button color="blue" className="uppercase hidden sm:inline-flex"
                                            onClick={() => navigate(path.RECRUITMENT)}
                                        >
                                            Nhà tuyển dụng
                                        </Button>
                                    }
                                </>
                                :
                                <DropdownAccount />
                            }
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                aria-expanded={isOpen}
                            >
                                {isOpen ?
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    :
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                }
                            </button>
                        </div>
                        {location.pathname !== path.RECRUITMENT &&
                            <div className={`${isOpen ? "block" : "hidden"} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`} id="mobile-menu-2">
                                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                    {headerMenu?.length > 0 && headerMenu.map(item => (
                                        <li key={item.path} className="relative">
                                            {item.path === '/resume' ? (
                                                <div ref={dropdownRef} className="relative">
                                                    <button
                                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                        className="ct-header-dropdown ct-hover-transition flex items-center"
                                                    >
                                                        {item.text}
                                                        <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L10 13.414l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                    {isDropdownOpen &&
                                                        <ul className="z-50 absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg dark:bg-gray-700">
                                                            <li>
                                                                <Link to={`${path.CV}/${path.CV__MANAGE}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white">
                                                                    Quản lý CV
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link to={`${path.CV}/${path.CV__CREATE}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white">
                                                                    Tạo CV
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    }
                                                </div>
                                            ) :
                                                <NavLink
                                                    to={item.path}
                                                    className={({ isActive }) => `ct-header-dropdown ct-hover-transition 
                                                    ${(item.path === path.RECRUITMENT) && 'sm:hidden block'}
                                             ${isActive && 'text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white'}`
                                                    }
                                                >
                                                    {item.text}
                                                </NavLink>
                                            }
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        }
                    </div>
                </nav>
            </header>
            {openModalLogin && <LoginPage isOpen={openModalLogin} setOpenModal={setOpenModalLogin} />}
        </>

    );
};

export default Header;
