import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { CategoriesModel, CategoriesModelArray } from "../models/reduxModels";
import categoriesServices from "../services/categoriesAPI";

interface MyProps {
    action: PayloadAction<string[]>;
    state: RootState["categories"];
    typeTransaction: string
}

export const categoryTransactions = (
    action: PayloadAction<string[]>, 
    state:RootState["categories"], 
    typeTransaction:string 
    )=> {
    const inputTransactions = action.payload;
        inputTransactions.forEach(
            category => {
                const findIndex = state.categoriesList.find(categoryItem => categoryItem.categoryTitle.indexOf(category) !== -1); 
                    if(findIndex !== undefined) {
                        let transactions = JSON.parse(JSON.stringify(findIndex));
                        if(typeTransaction === "add") {
                            transactions.categoryTransactions++;        
                        } else {
                            transactions.categoryTransactions--; 
                        }
                        categoriesServices.putAxios(transactions.id, transactions);
            }
    })
}