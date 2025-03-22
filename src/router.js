import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import Aboutus from "./components/Aboutus";
import MedicineList from "./components/AddedList";
import AddMed from "./components/AddedMedicine";
import Signup from "./components/auth/register";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import PrivateRoute from "./components/PrivateRoute"; 




const router = createBrowserRouter([
    { path: '/', element: <App /> },
    {
      path: 'home',
      element: <PrivateRoute element={Home} /> 
    },
    { path: '/aboutus', element:<Aboutus /> },
    { path: '/signup',element: <Signup /> },
    { path: '/login', element: <Login /> },
    { path: '/logout',element: <Logout />},
    {
      path: 'list',
      element: <PrivateRoute element={MedicineList} /> 
    },
    {
      path: 'add',
      element: <PrivateRoute element={AddMed} /> 
    },
    ])

    export default router;