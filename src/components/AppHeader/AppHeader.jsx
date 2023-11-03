import {BurgerIcon, Logo, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import s from './AppHeader.module.css'
import cn from 'classnames'
import {NavLink, useMatch} from "react-router-dom";

const AppHeader = () => {
    const isConstructor = useMatch('/')
    const isLine = useMatch('/line')
    const isProfile = useMatch('/profile')
    const setClassName = ({isActive}) => {
        return cn(s.link, {[s.link_active]: isActive}, 'text text_type_main-default pt-4 pr-5 pb-4')
    }

    return (
        <header className={cn(s.header)}>
            <nav className={cn(s.nav)}>
                <div className={cn(s.link__wrapper)}>
                    <NavLink
                        to={"/"}
                        className={setClassName}
                    >
                        <BurgerIcon type={isConstructor ? "primary" : "secondary"}/>
                        <span>Конструктор</span>
                    </NavLink>
                    <NavLink
                        to={"/line"}
                        className={setClassName}
                    >
                        <ListIcon type={isLine ? "primary" : "secondary"}/>
                        <span>Лента заказов</span>
                    </NavLink>
                </div>
                <NavLink to={'/'} className={cn(s.header__logo)}>
                    <div >
                        <Logo/>
                    </div>
                </NavLink>
                <div className={cn(s.header__link_right)}>
                    <NavLink
                        to={"/profile"}
                        className={setClassName}
                    >
                        <ProfileIcon type={isProfile ? "primary" : "secondary"}/>
                        <span>Личный кабинет</span>
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default AppHeader;