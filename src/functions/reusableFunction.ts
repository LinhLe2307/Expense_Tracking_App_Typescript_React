// import { PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../app/store";
// import { CategoryPriceModel } from "../models/reduxModels";
// import categoriesServices from "../services/categoriesAPI";

import { CategoriesModel, ExpenseModel } from "../models/reduxModels";

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
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;
  let today = new Date();
  return selectedDate.toLocaleDateString("en-EU", options);
};

const detailsDiv = (
  categoriesList: CategoriesModel[],
  expenseLists: ExpenseModel[]
) => {
  const categoriesTitles = categoriesList.map(
    (category) => category.title[0].value
  );
  let identity: Record<string, number> = {};
  const transactionList = expenseLists
    .map((expense) => expense.new_expense_categories)
    .map((category) => category)
    .flat(1)
    .reduce((prev, curr) => {
      if (curr) {
        if (curr in prev) {
          prev[curr]++;
        } else {
          prev[curr] = 1;
        }
      }
      return prev;
    }, identity);

  const cloneList = { ...transactionList };
  categoriesTitles.forEach((category) => {
    if (Object.keys(cloneList).indexOf(category) === -1) {
      transactionList[category] = 0;
    }
  });

  return Object.entries(transactionList);
};

const convertIdToLabel = (
  expenseList: ExpenseModel[],
  categoriesList: CategoriesModel[]
) => {
  const newCategories: ([] | [number, string])[] = categoriesList.map(
    (category) =>
      category.nid ? [+category.nid[0].value, category.title[0].value] : []
  );

  const newExpense = expenseList
    .map((expense) => expense.field_expense_categories)
    .map((expense) => expense && expense.map((item) => item.target_id));

  const newExCateList: string[][] = [];

  for (let y = 0; y < newExpense.length; y++) {
    const newSub: string[] = [];
    if (newExpense[y] !== undefined) {
      for (let z = 0; z < newExpense[y].length; z++) {
        for (let x = 0; x < newCategories?.length; x++) {
          if (
            newCategories.length !== 0 &&
            newCategories[x].length !== 0 &&
            +newExpense[y][z] === newCategories[x][0]
          ) {
            newSub.push(newCategories[x][1]!);
          }
        }
      }
    }
    newExCateList.push(newSub);
  }
  // console.log(newExCateList);

  const newClone = [...expenseList];
  const newExpenseList = newClone.map((expense, i) => {
    return { ...expense, new_expense_categories: newExCateList[i] };
  });
  return newExpenseList;
};

export { customDate, detailsDiv, convertIdToLabel };
