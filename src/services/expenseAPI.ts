import axios from "axios";
import {ExpenseModel} from "../models/reduxModels"

const getAll = async () => {
    const response = await axios.get("http://localhost:3010/notes");
    return response.data
}

const postAll = (inputExpense:ExpenseModel) => {
    axios.post("http://localhost:3010/notes", inputExpense)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

const putExpense = (id:number, editExpense:ExpenseModel) => {
    axios.put(`http://localhost:3010/notes/${id}`, editExpense)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

export default {getAll, postAll, putExpense}