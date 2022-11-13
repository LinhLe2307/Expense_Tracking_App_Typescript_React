import ajax from "../ajax";
import { DefaultModel, ExpenseModel, IncomeModel } from "../models/reduxModels";

type SelectedItem = DefaultModel | ExpenseModel | IncomeModel;

const getAll = async (baseURL: string) => {
  const axios = await ajax();
  const response = await axios.get(`${baseURL}`);
  return response.data;
};

const postSingle = async (selectedItem: SelectedItem) => {
  try {
    const axios = await ajax();
    const response = await axios.post("node/", selectedItem);
  } catch (err) {
    console.error(err);
  }
};

const patchAxios = async (id: number, selectedItem: SelectedItem) => {
  try {
    const axios = await ajax();
    const response = await axios.patch(`node/${id}`, selectedItem);
  } catch (err) {
    console.error(err);
  }
};

const deleteAxios = async (id: number) => {
  try {
    const axios = await ajax();
    const response = await axios.delete(`node/${id}`);
  } catch (err) {
    console.error(err);
  }
};

export default { getAll, postSingle, patchAxios, deleteAxios };
