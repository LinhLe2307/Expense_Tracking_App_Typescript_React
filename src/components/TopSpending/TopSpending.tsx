import React, { useEffect } from 'react'
import { Figure } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {detailsDiv} from "../../functions/reusableFunction"

const TopSpending = () => {
    const dispatch = useAppDispatch();
    const categoriesList = useAppSelector(state => state.categories.inputLists);

    const expenseLists = useAppSelector((state) => state.expense.inputLists); 

    const categoriesTitles = categoriesList.map(category => category.title);

    return (
        <div>
            <h4>Top Spending</h4>
            {
                detailsDiv(categoriesList, expenseLists)
                .map((list, i) => {
                    if(typeof list[1] === "number" && typeof list[0] === "string") {
                        return [list[1], list[0]]
                    } else {
                        return []
                    }
                })
                .sort((a,b) => {
                    if(typeof a[0] === "number" && typeof b[0] === "number") {
                        return (b[0] - a[0])
                    } else {
                        return 0
                    }
                }).map((category, i) => <Figure key={i}>
                    <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src="holder.js/171x180"
                    />
                    <Figure.Caption>
                        {category[1]}
                    </Figure.Caption>
                    </Figure>
                )
            }
        </div>
    )
}


export default TopSpending