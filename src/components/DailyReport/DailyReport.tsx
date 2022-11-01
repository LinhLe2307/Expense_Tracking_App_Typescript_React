import { nanoid } from 'nanoid';
import React, {useState, useEffect} from 'react';
// import { Calendar } from 'react-calendar';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { initializeExpense } from '../../features/expense/expenseSlice';
import { customDate } from '../../functions/reusableFunction';
import SingleCard from '../Card/SingleCard';
import { ExpenseModel } from '../../models/reduxModels';
// import 'react-calendar/dist/Calendar.css';
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "./calendar.css";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const onSelectSlot = (pressedDate) => {
     console.log("pressed Date: ", pressedDate)
  };

const DailyReport = () => {
    const [value, onChange] = useState(new Date());
    const expenseLists = useAppSelector((state) => state.expense.inputLists);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(initializeExpense());
    }, [dispatch]);

  return (
    <div>
        {/* <Calendar 
            onChange={onChange} 
            value={value} 
            // onClickDay={(value, event) => console.log('Clicked month: ', value)} 
            showDoubleView={true}
            
        /> */}
        <Calendar localizer={localizer} selectable={true} startAccessor="start" onSelectSlot={onSelectSlot} endAccessor="end" style={{ height: 500, margin: "50px" }} />

        <h3>{customDate(value)}</h3>
        {
            expenseLists
                .filter((expense:ExpenseModel) => expense.date === customDate(value))
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