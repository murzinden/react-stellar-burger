import {useEffect} from "react";
import {useDispatch} from "react-redux";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {ingredientsRequest} from "../../services/slice/ingredientsSlice";
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


function App() {

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(ingredientsRequest())
    }, [])

    useEffect(() => {
        dispatch(currentUserRequest())
    }, [])

    const backgroundLocation = location.state?.background

    const closePopup = () => {
        navigate(backgroundLocation.pathname || '/', {replace: true})
    }


    return (
        <>
            <Routes location={backgroundLocation || location}>
                <Route path="/" element={<Layout/>}>
                    <Route
                        index
                        element={<Home/>}
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
                        path="order"
                        element={<OrderDetails/>}
                    />
                    <Route
                        path="*"
                        element={<NotFound/>}
                    />
                    <Route
                        path="ingredients/:id"
                        element={<IngredientDetails/>}
                    />
                </Route>
            </Routes>
            {backgroundLocation && <Routes>
                <Route path='/ingredients/:id' element={<Modal closePopup={closePopup}>
                    <IngredientDetails />
                </Modal>}/>
                <Route path='/order' element={<Modal closePopup={closePopup}>
                    <OrderDetails />
                </Modal>}/>
            </Routes>}
        </>
    );
}

export default App;
