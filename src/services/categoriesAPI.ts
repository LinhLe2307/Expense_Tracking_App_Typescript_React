import axios from "axios";
import {CategoriesModel} from "../models/reduxModels"

const getAll = async () => {
    const response = await axios.get("http://localhost:3010/categories");
    return response.data
}

const postAll = (inputCategory:CategoriesModel) => {
    axios.post("http://localhost:3010/categories", inputCategory)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

const putAxios = (id:number, editCategory:CategoriesModel) => {
    axios.put(`http://localhost:3010/categories/${id}`, editCategory)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}


const deleteAxios = (id:number) => {
    axios.delete(`http://localhost:3010/categories/${id}`)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

export default {getAll, postAll, putAxios, deleteAxios}