import s from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import cn from "classnames";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import {useEffect} from "react";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import {useDispatch} from "react-redux";
import {getAllItems} from "../../services/actions/ingredientsAction";
import {showIngredientInfo} from "../../services/actions/ingredientDetailsAction";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {useModal} from "../../hooks/useModal";



function App() {

    const dispatch = useDispatch()
    const {isModalOpen, openModal, closeModal} = useModal();

    useEffect(() => {
        dispatch(getAllItems())
    }, []);

    const ingredientDetailsHandler = (ingredient) => {
        openModal()
        dispatch(showIngredientInfo(ingredient))
    }


    return (
        <div className={s.app}>
            <AppHeader/>
            <section className={cn(s.title)}>
                <h1 className={'text text_type_main-large mt-10'}>Соберите бургер</h1>
            </section>
            <main className={cn(s.main)}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients ingredientDetailsHandler={ingredientDetailsHandler}/>
                    <BurgerConstructor/>
                </DndProvider>
            </main>
            {isModalOpen && <Modal setActive={closeModal}>
                <IngredientDetails/>
            </Modal>}
        </div>
    );
}

export default App;
