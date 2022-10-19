// import { PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../app/store";
// import { CategoryPriceModel } from "../models/reduxModels";
// import categoriesServices from "../services/categoriesAPI";

// const categoryTransactions = (
//     action: PayloadAction<CategoryPriceModel>, 
//     state:RootState["categories"], 
//     typeTransaction:string 
//     )=> {
//     const selectedCategories = action.payload.selectedCategories;

//     const inputPrice = +action.payload.inputPrice;
//         Promise.all(selectedCategories.map(
//             category => {
//                 const findIndex = state.categoriesList.find(categoryItem => categoryItem.categoryTitle.indexOf(category) !== -1); 
//                     if(findIndex !== undefined) {
//                         let transactions = JSON.parse(JSON.stringify(findIndex));
//                         if(typeTransaction === "add") {
//                             transactions.categoryTransactions++;
//                             transactions.totalCategoryAmount += inputPrice;        
//                         } else {
//                             transactions.categoryTransactions--;
//                             transactions.totalCategoryAmount -= inputPrice; 
//                         }
//                         return categoriesServices.putAxios(transactions.id, transactions);
//             }
//     }))
// };

const customDate = (selectedDate: Date) => {
    // When you initialize a class property with a literal such as public foo = { bar: 'a' }, its type becomes { bar: string }, even if you declare it as readonly. TypeScript on purpose doesn't make the type too strict ({ bar: 'a' }).
    let options = { weekday: "long", year: "numeric", month: "long", day: "numeric" } as const;
    let today = new Date();
    return selectedDate.toLocaleDateString("en-EU", options)
}

export { customDate}