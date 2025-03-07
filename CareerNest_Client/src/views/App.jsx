import useAppLogic from '../hooks/useAppLogic'
import AppRoute from '../routes/AppRoute'
import './App.scss'
import { ToastContainer } from 'react-toastify'

function App() {

  useAppLogic();

  return (
    <>
      <AppRoute />

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
    </>
  )
}

export default App
