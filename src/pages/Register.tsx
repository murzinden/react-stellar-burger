import React, {useEffect, useState} from 'react';
import s from './Pages.module.css'
import cn from "classnames";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {registerUserRequest} from "../services/slice/userSlice";
import {useAppDispatch, useAppSelector} from "../services/hooks";
import {IInputRegisterUpdate} from "../services/types";

const Register = () => {
    const dispatch = useAppDispatch()
    const userData = useAppSelector(state => state.userSlice)
    const [user, setUser] = useState<IInputRegisterUpdate>({name: '', email: '', password: ''})
    const navigate = useNavigate()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const {name, password, email} = user
        if (!name || !password || !email)
            return
        dispatch(registerUserRequest({name, password, email}))
    }

    useEffect(() => {
        if (userData.isUserLoaded) {
            navigate('/')
        }
    }, [userData]);

    return (
        <form className={cn(s.form_wrapper)} onSubmit={handleSubmit}>
            <h2 className="text text_type_main-medium">Регистрация</h2>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onChange}
                value={user.name || ''}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mt-6"
            />
            <EmailInput
                value={user.email || ''}
                onChange={onChange}
                name={'email'}
                placeholder="E-mail"
                isIcon={false}
                extraClass="mt-6"
            />
            <PasswordInput
                value={user.password || ''}
                onChange={onChange}
                name={'password'}
                placeholder="Пароль"
                extraClass="mt-6"
            />
            <Button
                htmlType="submit"
                type="primary"
                size="large"
                extraClass="mt-6 mb-20"
            >
                Зарегистрироваться
            </Button>
            <div className={cn(s.login_redirect, 'mb-4')}>
                <p className="text text_type_main-default text_color_inactive">
                    Уже зарегистрированы?
                </p>
                <Link to={"/login"}>
                    <Button
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        extraClass="pl-2"
                        style={{paddingTop: 0, paddingBottom: 0, paddingRight: 0}}
                    >
                        Войти
                    </Button>
                </Link>
            </div>
        </form>
    );
};

export default Register;