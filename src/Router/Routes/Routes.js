import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import Main from "../../layout/Main";
import Checkout from "../../pages/Checkout/Checkout";
// import Dashboard from "../../pages/Dashboard/Dashboard";
import Home from "../../pages/Home/Home/Home";
import ServiceDetail from "../../pages/Home/Service/ServiceDetail";
import Login from "../../pages/Login/Login";
import NotFound from "../../pages/NotFound/NotFound";
import Orders from "../../pages/orders/Orders";
import Signup from "../../pages/SignUp/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Allusers from '../../pages/Dashboard/Allusers'
import AdminRoute from "../AdminRoute/AdminRoute";
import AddService from "../../pages/Dashboard/AddService";
import Allorders from "../../pages/Dashboard/Allorders";
import Abcd from "../../pages/Dashboard/Abcd";
import Manageservices from "../../pages/Dashboard/Manageservices";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/serviceDetail/:id',
                element: <ServiceDetail></ServiceDetail>,
                loader:({params}) => fetch(`http://localhost:5000/service/${params.id}`)
            },
            {
                path: '/checkout/:id',
                element: <PrivateRoute><Checkout></Checkout></PrivateRoute>,
                loader:({params}) => fetch(`http://localhost:5000/service/${params.id}`)
            },
            {
                path: '/orders',
                element: <PrivateRoute><Orders></Orders></PrivateRoute>
            },
            {
                path: '*',
                element: <NotFound></NotFound>
            }
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:[
            {
                path:'/dashboard',
                element:<Abcd></Abcd>
            },
            {
                path:'/dashboard/allusers',
                element:<AdminRoute><Allusers></Allusers></AdminRoute>
            },
            {
                path:'/dashboard/addservice',
                element:<AdminRoute><AddService></AddService></AdminRoute>
            },
            // {
            //     path:'/dashboard/abcd',
            //     element:<Abcd></Abcd>
            // },
            {
                path:'/dashboard/allorder',
                element:<AdminRoute><Allorders></Allorders></AdminRoute>
            },
            {
                path:'/dashboard/manageservices',
                element:<AdminRoute><Manageservices></Manageservices></AdminRoute>
            }
        ]
    }
]);


export default router;