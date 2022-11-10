import { nanoid } from 'nanoid';
import React, {useState, useEffect} from 'react';
import { Calendar } from 'react-calendar';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { initializeExpense } from '../../features/expense/expenseSlice';
import { customDate } from '../../functions/reusableFunction';
import SingleCard from '../Card/SingleCard';
import { ExpenseModel } from '../../models/reduxModels';
import 'react-calendar/dist/Calendar.css';

const DailyReport = () => {
    const [value, onChange] = useState(new Date());
    const expenseLists = useAppSelector((state) => state.expense.inputLists);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(initializeExpense());
    }, [dispatch]);

  return (
    <div>
        <Calendar 
            onChange={onChange} 
            value={value} 
            showDoubleView={true}
            
        />
        <h3>{customDate(value)}</h3>
        {
            expenseLists
                .filter((expense:ExpenseModel) => expense.field_date[0].value === customDate(value))
                .map((expense:ExpenseModel) => 
                    <SingleCard 
                        expense={expense} 
                        key={nanoid()} 
                    />
                )
        }
    </div>
  )
}

export default DailyReport