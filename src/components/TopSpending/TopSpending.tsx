import React, { useEffect } from 'react'
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
            {detailsDiv(categoriesList, expenseLists).map((list, i) => {
                return list[1]
            }).sort((a, b) => b-a)}
        </div>
    )
}


export default TopSpending