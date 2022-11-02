import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";
import { Card, Dropdown } from "react-bootstrap";
import { Calendar } from 'react-calendar';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { initializeCategories } from "../../features/categories/categoriesSlice";
import { initializeExpense } from "../../features/expense/expenseSlice";
import { detailsDiv } from "../../functions/reusableFunction";
import { ExpenseModel } from "../../models/reduxModels";
import SingleCard from "../Card/SingleCard";
import CategoriesReport from "../CategoriesReport/CategoriesReport";

const MonthlyReport = () => {
    const [value, onChange] = useState(new Date());
    const [isClicking, setIsClicking] = useState(false);
    const [spendingBudget, setSpendingBudget] = useState(0)
    const dispatch = useAppDispatch()
    const [monthlyExpense, setMonthlyExpense] =  useState<ExpenseModel[]>([])
    
    const expenseLists = useAppSelector((state) => state.expense.inputLists);
    const categoriesList = useAppSelector(state => state.categories.inputLists);

    const handleClick = (value:Date, event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        // console.log('Clicked month: ', value)
        const selectedMonth = month[value.getMonth()] ;
        const newList = expenseLists.filter(expense => expense.date.includes(selectedMonth))
        const budget = newList.reduce((prev, curr) => prev + (+curr.amount), 0)
        setMonthlyExpense(newList)
        setSpendingBudget(budget)
        setIsClicking(true)
    }

    useEffect(()=> {
        dispatch(initializeExpense());
        dispatch(initializeCategories());
    }, [dispatch])

    return (
    <div>
        <Calendar 
            onChange={onChange} 
            value={value} 
            onClickMonth={(value, event)=>handleClick(value, event)} 
            view="year"
            
        />
        {
            isClicking 
            ?
                <>
                    <h3>Spending Budget: €{spendingBudget}</h3>
                    <CategoriesReport 
                        filterExpenseList={monthlyExpense}
                    />
                </>
            : 
                <>
                    <h3>All</h3>
                    <CategoriesReport 
                    filterExpenseList={expenseLists}
                    />
                </>
        }
    </div>
  )
}

export default MonthlyReport