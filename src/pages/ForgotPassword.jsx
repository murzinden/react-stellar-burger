import React, {useEffect, useState} from 'react';
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import s from "./Pages.module.css";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {forgotPasswordRequest} from "../services/slice/userSlice";

const ForgotPassword = () => {
    const [valueEmail, setValueEmail] = useState('')
    const dispatch = useDispatch()
    const isPasswordForgot = useSelector(state => state.userSlice.passwordForgot)
    const navigate = useNavigate()
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    const onChange = (e) => {
        setValueEmail(e.target.value)
    }

    const sendEmail = (e) => {
        e.preventDefault()
        const isEmailValid = emailPattern.test(valueEmail)
        if (isEmailValid) {
            dispatch(forgotPasswordRequest(valueEmail))
        }
    }

    useEffect(() => {
        if (isPasswordForgot)
            navigate('/reset-password')
    }, [isPasswordForgot]);

    return (
        <form className={cn(s.form_wrapper)} onSubmit={sendEmail}>
            <h2 className="text text_type_main-medium">Восстановление пароля</h2>
            <EmailInput
                value={valueEmail}
                onChange={onChange}
                name={'email'}
                placeholder="Укажите e-mail"
                isIcon={false}
                extraClass="mt-6"
            />
            <Button
                htmlType="submit"
                type="primary"
                size="large"
                extraClass="mt-6 mb-20"
            >
                Восстановить
            </Button>
            <div className={cn(s.login_redirect)}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                <Link to={"/login"}>
                    <Button
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        extraClass='pl-2'
                        style={{paddingTop: 0, paddingBottom: 0, paddingRight: 0}}
                    >
                        Войти
                    </Button>
                </Link>
            </div>
        </form>
    );
};

export default ForgotPassword;