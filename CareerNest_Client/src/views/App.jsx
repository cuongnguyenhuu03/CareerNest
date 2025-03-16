import useAppLogic from '../hooks/useAppLogic'
import AppRoute from '../routes/AppRoute'
import './App.scss'
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';
import { useEffect } from 'react';

function App() {
  const theme = useSelector((state) => state?.theme?.theme);
  const dispatch = useDispatch();

  useAppLogic();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className='w-full relative'>
      <AppRoute />

      <button
        onClick={() => dispatch(toggleTheme())}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 p-2 bg-gray-200 dark:bg-gray-700 rounded-full shadow-lg hover:scale-110 transition"
      >
        {theme === 'light' ? '🌞' : '🌙'}
      </button>

      <ToastContainer position="top-right"
        autoClose={1800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
        theme="light"
        className={'col-6 col-sm-3'}
      />
    </div>
  )
}

export default App
