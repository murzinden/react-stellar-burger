import {BurgerIcon, Logo, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import s from './AppHeader.module.css'
import cn from 'classnames'

const AppHeader = () => {
    return (
        <header className={cn(s.header)}>
            <nav className={cn(s.nav)}>
                <div className={cn(s.link__wrapper)}>
                    <a
                        href="#"
                        className={cn(s.link, s.link_active, 'text text_type_main-default pt-4 pr-5 pb-4')}
                    >
                        <BurgerIcon type={"primary"}/>
                        <span>Конструктор</span>
                    </a>
                    <a
                        href="#"
                        className={cn(s.link, 'text text_type_main-default pt-4 pb-4')}
                    >
                        <ListIcon type={"secondary"}/>
                        <span>Лента заказов</span>
                    </a>

                </div>
                <div className={cn(s.header__logo)}>
                    <Logo/>
                </div>
                <div className={cn(s.header__link_right)}>
                    <a
                        href="#"
                        className={cn(s.link, 'text text_type_main-default pt-4 pb-4')}
                    >
                        <ProfileIcon type={"secondary"}/>
                        <span>Личный кабинет</span>
                    </a>
                </div>
            </nav>
        </header>
    );
};

export default AppHeader;