import React from 'react';
import s from './NotFound.module.css'
import cn from 'classnames';
import {Link} from "react-router-dom";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";


const NotFound = () => {
    return (
        <div className={cn(s.notfound_wrapper)}>
            <h2 className="text text_type_main-large">Страница не найдена</h2>
            <Link to={"/"}>
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                >
                    На главную страницу
                </Button>
            </Link>
        </div>
    );
};

export default NotFound;