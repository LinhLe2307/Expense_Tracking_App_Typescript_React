import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { CategoryPriceModel } from "../models/reduxModels";
import categoriesServices from "../services/categoriesAPI";

const categoryTransactions = (
    action: PayloadAction<CategoryPriceModel>, 
    state:RootState["categories"], 
    typeTransaction:string 
    )=> {
    const selectedCategories = action.payload.selectedCategories;

    const inputPrice = +action.payload.inputPrice;
        selectedCategories.forEach(
            category => {
                const findIndex = state.categoriesList.find(categoryItem => categoryItem.categoryTitle.indexOf(category) !== -1); 
                    if(findIndex !== undefined) {
                        let transactions = JSON.parse(JSON.stringify(findIndex));
                        if(typeTransaction === "add") {
                            transactions.categoryTransactions++;
                            transactions.totalCategoryAmount += inputPrice;        
                        } else {
                            transactions.categoryTransactions--;
                            transactions.totalCategoryAmount -= inputPrice; 
                        }
                        categoriesServices.putAxios(transactions.id, transactions);
            }
    })
};

export {categoryTransactions}