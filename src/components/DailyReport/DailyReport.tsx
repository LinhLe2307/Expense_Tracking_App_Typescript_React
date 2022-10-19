import { nanoid } from 'nanoid';
import React, {useState, useEffect} from 'react';
import { Calendar } from 'react-calendar';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { initializeExpense } from '../../features/expense/expenseSlice';
import { customDate } from '../../functions/reusableFunction';
import SingleCard from '../Card/SingleCard';


const DailyReport = () => {
    const [value, onChange] = useState(new Date());
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const expenseLists = useAppSelector((state) => state.expense.inputLists);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(initializeExpense());
    }, [dispatch]);

  return (
    <div>
        <Calendar onChange={onChange} value={value} />
        <h3>{customDate(value)}</h3>
        {
            expenseLists
                .filter(expense => expense.date === customDate(value))
                .map(expense => 
                    <SingleCard 
                        expense={expense} 
                        key={nanoid()} 
                        handleShow={handleShow}
                    />
                )
        }
    </div>
  )
}

export default DailyReport