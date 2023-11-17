import React, {useCallback, useRef} from 'react';
import {useDrag, useDrop, XYCoord} from "react-dnd";
import {constructorSort, deleteItem} from "../../services/slice/constructorSlice";
import cn from "classnames";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import s from '../BurgerConstructor/BurgerConstructor.module.css'
import {IIngredientType} from "../../utils/types";
import {useAppDispatch} from "../../services/hooks";

interface IProps {
    item: IIngredientType
    index: number
}

const BurgerConstructorElement = ({item, index}: IProps) => {

    const dispatch = useAppDispatch()
    const ref = useRef<HTMLLIElement>(null)

    const changeTargetPlace = useCallback((dragIndex: number, hoverIndex: number) => {
        dispatch(constructorSort({dragIndex, hoverIndex}))
    }, [dispatch])

    const [{handlerId}, drop] = useDrop({
        accept: 'SORT_INGREDIENT',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: IProps, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffSet = monitor.getClientOffset()
            const hoverClientY = (clientOffSet as XYCoord).y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            changeTargetPlace(dragIndex, hoverIndex)
            item.index = hoverIndex
        }
    })

    const [{isDragging}, drag] = useDrag({
        type: 'SORT_INGREDIENT',
        item: () => {
            return {item, index}
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    return (
        <li ref={ref} style={{opacity}} className={cn(s.burger__item, 'mb-4 mr-2 ml-4')}>
            <DragIcon type="primary"/>
            <ConstructorElement
                text={item.name}
                thumbnail={item.image}
                price={item.price}
                handleClose={() => dispatch(deleteItem(index))}
            />
        </li>
    );
};

export default BurgerConstructorElement;