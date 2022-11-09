import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  addNewCategory,
  editCategoryContent,
  initializeCategories,
} from "../../features/categories/categoriesSlice";
import {
  deleteExpenseCategories,
  initializeExpense,
} from "../../features/expense/expenseSlice";
import { customDate } from "../../functions/reusableFunction";
import { DefaultModel } from "../../models/reduxModels";
import FormModel from "../FormModel";
import CategoryDetails from "./CategoryDetails";
import { ExpenseModel } from "../../models/reduxModels";

interface MyProps {
  filterExpenseList: ExpenseModel[];
}

const CategoriesReport = ({ filterExpenseList }: MyProps) => {
  const [value, onChange] = useState(new Date());

  const dispatch = useAppDispatch();
  const openEditCategory = useAppSelector(
    (state) => state.categories.openEditItem
  );
  const expenseId = useAppSelector((state) => state.categories.editId);
  const editCategory = useAppSelector((state) => state.categories.editCategory);

  const [inputCategory, setInputCategory] = useState<DefaultModel>({
    date: customDate(new Date()),
    title: "",
    description: "",
    color: "",
  });

  const handleInputCategory = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputCategory({
      ...inputCategory,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!openEditCategory) {
      dispatch(addNewCategory(inputCategory));
    } else {
      const selectedCategory = filterExpenseList.map((expense) => {
        const newClone = expense.categories.map((category) =>
          editCategory && category === editCategory
            ? inputCategory.title
            : category
        );
        return { ...expense, categories: newClone };
      });

      Promise.all([
        dispatch(deleteExpenseCategories(selectedCategory)),
        dispatch(editCategoryContent(inputCategory)),
      ]);
    }
    setTimeout(() => window.location.reload(), 500);
  };

  return (
    <div>
      <CategoryDetails filterExpenseList={filterExpenseList} />
      <FormModel
        inputExpense={inputCategory}
        expenseId={expenseId}
        submitHandler={submitHandler}
        handleInputExpense={handleInputCategory}
        type="categories"
        baseURL="http://localhost:3010/categories"
      />
    </div>
  );
};

export default CategoriesReport;
