import s from "./app.module.css";
import {data} from "../../utils/data";
import AppHeader from "../app-header/AppHeader";
import cn from "classnames";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import {useEffect, useState} from "react";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";


function App() {
    const url = 'https://norma.nomoreparties.space/api/ingredients'
    const [ingredients, setIngredients] = useState({data})
    useEffect(() => {
        const serverData = async () => {
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const result = await response.json()
                setIngredients(result)
                console.log(result)
            } catch (error) {
                console.log('Error fetching data:', error)
            }
        }
        serverData()
    }, [])


    return (
        <div className={s.app}>
            <AppHeader/>
            <section className={cn(s.title)}>
                <h1 className={'text text_type_main-large mt-10'}>Соберите бургер</h1>
            </section>
            <main className={cn(s.main)}>
                <BurgerIngredients burgerData={ingredients.data}/>
                <BurgerConstructor burgerData={ingredients.data}/>
            </main>
        </div>
    );
}

export default App;
