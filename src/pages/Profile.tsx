import React, {FC, useCallback, useEffect} from 'react';
import s from './Pages.module.css'
import cn from "classnames";
import {NavLink, useMatch} from "react-router-dom";
import {logoutUserRequest} from "../services/slice/userSlice";
import {useAppDispatch} from "../services/hooks";
import ProfileFormEdit from "../components/ProfileEdit/ProfileEdit";
import OrderCardsContainer from "../components/OrderCardsContainer/OrderCardsContainer";
import {wsConnect, wsDisconnect} from "../services/reducers/web-socket/actions";
import {getAccessToken} from "../utils/token";
import {WS_URL} from "../utils/api";

const Profile: FC = () => {

    const queryTokenArr = getAccessToken()?.split(' ')
    let queryToken: string | null = null
    if (queryTokenArr) {
        queryToken = queryTokenArr[1]
    }
    const dispatch = useAppDispatch()

    const handleLogout = useCallback(() => {
        dispatch(logoutUserRequest())
    }, [])

    useEffect(() => {
        dispatch(wsConnect(`${WS_URL}?token=${queryToken}`))
        return () => {
            dispatch(wsDisconnect())
        }
    }, []);

    const setClassName = ({isActive}: { isActive: boolean }) => {
        return cn(s.profile_listEl, {[s.link_active]: isActive}, 'text text_type_main-medium')
    }

    const isProfileOrders = useMatch("/profile/orders")
    const isProfile = useMatch("/profile")

    return (
        <div className={cn(s.profile_wrapper)}>
            <nav className={cn(s.profile_list)}>
                <NavLink to={'/profile'} end className={setClassName}>
                    Профиль
                </NavLink>
                <NavLink to={'/profile/orders'} className={setClassName}>
                    История заказов
                </NavLink>
                <NavLink to={'/'} onClick={handleLogout} className={setClassName}>
                    Выход
                </NavLink>
                <p className="text text_type_main-default text_color_inactive mt-15">
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav>
            {isProfile ? <ProfileFormEdit/> : <OrderCardsContainer/>}
        </div>
    );
};

export default Profile;