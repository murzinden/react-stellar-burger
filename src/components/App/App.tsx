import {useEffect} from "react";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {clearIngredientInfo, ingredientsRequest} from "../../services/slice/ingredientsSlice";
import {currentUserRequest} from "../../services/slice/userSlice";
import Layout from "../Layout/Layout";
import Home from "../../pages/Home";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import ForgotPassword from "../../pages/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword";
import Profile from "../../pages/Profile";
import OrderDetails from "../OrderDetails/OrderDetails";
import NotFound from "../../pages/NotFound";
import {useAppDispatch} from "../../services/hooks";
import {resetOrderNumber} from "../../services/slice/orderSlice";
import OrderDetailsInfo from "../OrderDetailsInfo/OrderDetailsInfo";
import Order from "../../pages/Order";


function App() {

    const dispatch = useAppDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(ingredientsRequest())
    }, [])

    useEffect(() => {
        dispatch(currentUserRequest())
    }, [])

    const backgroundLocation = location.state?.background

    const closePopup = (path: string) => {
        if (path.includes('ingredients')) {
            dispatch(clearIngredientInfo())
        }
        if (path.includes('order')) {
            dispatch(resetOrderNumber())
        }
        navigate(backgroundLocation.pathname || "/", {replace: true})
    };


    return (
        <>
            <Routes location={backgroundLocation || location}>
                <Route path="/" element={<Layout/>}>
                    <Route
                        index
                        element={<Home/>}
                    />
                    <Route
                        path="feed"
                        element={<Order/>}
                    />
                    <Route
                        path="login"
                        element={<ProtectedRoute onlyUnAuth>
                            <Login/>
                        </ProtectedRoute>}
                    />
                    <Route
                        path="register"
                        element={<ProtectedRoute onlyUnAuth>
                            <Register/>
                        </ProtectedRoute>}
                    />
                    <Route
                        path="forgot-password"
                        element={<ProtectedRoute onlyUnAuth>
                            <ForgotPassword/>
                        </ProtectedRoute>}
                    />
                    <Route
                        path="reset-password"
                        element={<ProtectedRoute onlyUnAuth>
                            <ResetPassword/>
                        </ProtectedRoute>}
                    />
                    <Route
                        path="profile"
                        element={<ProtectedRoute>
                            <Profile/>
                        </ProtectedRoute>}
                    />
                    <Route
                        path="profile/orders"
                        element={<ProtectedRoute>
                            <Profile/>
                        </ProtectedRoute>}
                    />
                    <Route
                        path="*"
                        element={<NotFound/>}
                    />
                    <Route
                        path="ingredients/:id"
                        element={<IngredientDetails/>}
                    />
                    <Route
                        path="profile/orders/:number"
                        element={<ProtectedRoute><OrderDetailsInfo/></ProtectedRoute>}
                    />
                    <Route
                        path="/feed/:number"
                        element={<OrderDetailsInfo/>}
                    />
                </Route>
            </Routes>
            {backgroundLocation &&
                <Routes>
                    <Route path='/ingredients/:id' element={<Modal closePopup={closePopup}>
                        <IngredientDetails/>
                    </Modal>}/>
                    <Route path='/order' element={<Modal closePopup={closePopup}>
                        <OrderDetails/>
                    </Modal>}/>
                    <Route path='/feed/:number' element={<Modal closePopup={closePopup}>
                        <OrderDetailsInfo/>
                    </Modal>}/>
                    <Route path='/profile/orders/:number' element={<Modal closePopup={closePopup}>
                        <OrderDetailsInfo/>
                    </Modal>}/>
                </Routes>}
        </>
    );
}

export default App;
