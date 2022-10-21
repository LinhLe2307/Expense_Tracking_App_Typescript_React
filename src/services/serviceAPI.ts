import axios from "axios";
import {DefaultModel, ExpenseModel, IncomeModel} from "../models/reduxModels"

type SelectedItem = DefaultModel | ExpenseModel | IncomeModel

const getAll = async (baseURL: string) => {
    const response = await axios.get(`${baseURL}`);
    return response.data
}

const postAll = (baseURL: string, selectedItem: SelectedItem) => {
    axios.post(`${baseURL}`, selectedItem)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

const putAxios = (baseURL: string, id:number, selectedItem: SelectedItem) => {
    axios.put(`${baseURL}/${id}`, selectedItem)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}


const deleteAxios = (baseURL: string, id:number) => {
    axios.delete(`${baseURL}/${id}`)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

export default {getAll, postAll, putAxios, deleteAxios}