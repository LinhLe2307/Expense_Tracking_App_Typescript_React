import ajax from "../ajax";
import { DefaultModel, ExpenseModel, IncomeModel } from "../models/reduxModels";

type SelectedItem = DefaultModel | ExpenseModel | IncomeModel;

const getAll = async (baseURL: string) => {
  const axios = await ajax();
  const response = await axios.get(`${baseURL}`);
  return response.data;
};

const postSingle = async (baseURL: string, selectedItem: SelectedItem) => {
  try {
    const axios = await ajax();
    const response = await axios.post(`node/`, selectedItem);
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

const putAxios = async (
  baseURL: string,
  id: number,
  selectedItem: SelectedItem
) => {
  try {
    const axios = await ajax();
    const response = await axios.put(`${baseURL}/${id}`, selectedItem);
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

const deleteAxios = async (baseURL: string, id: number) => {
  try {
    const axios = await ajax();
    const response = await axios.delete(`${baseURL}/${id}`);
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

const postAll = async (baseURL: string, selectedItem: ExpenseModel[]) => {
  try {
    const axios = await ajax();
    const response = await axios.post(`${baseURL}`, selectedItem);
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

export default { getAll, postSingle, postAll, putAxios, deleteAxios };
