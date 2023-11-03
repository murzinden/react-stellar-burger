import React from 'react';
import s from "../components/App/App.module.css";
import cn from "classnames";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";


const Home = () => {
    return (
        <div className={s.app}>
            <div className={cn(s.title)}>
                <h1 className={'text text_type_main-large mt-10'}>Соберите бургер</h1>
            </div>
            <main className={cn(s.main)}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </DndProvider>
            </main>
        </div>
    );
};

export default Home;