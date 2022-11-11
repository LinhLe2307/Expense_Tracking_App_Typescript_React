import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  addNewCategory,
  editCategoryContent
} from "../../features/categories/categoriesSlice";
import {
  // deleteExpenseCategories,
  initializeExpense,
} from "../../features/expense/expenseSlice";
import { customDate } from "../../functions/reusableFunction";
import { DefaultModel } from "../../models/reduxModels";
import FormModel from "../Form/FormModel";
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
    type: [
      {
        target_id: "categories",
        target_type: "node_type",
      },
    ],
    field_date: [
      {
        value: "2022-11-10T23:22:02+00:00",
      },
    ],
    title: [
      {
        value: "",
      },
    ],
    field_description: [
      {
        value: "",
      },
    ],
    field_color: [
      {
        value: "",
      },
    ],
  });

  const handleInputCategory = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputCategory({
      ...inputCategory,
      [e.target.name]: [
        {
          value: e.target.value,
        },
      ],
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!openEditCategory) {
      dispatch(addNewCategory(inputCategory));
    } else {
      dispatch(editCategoryContent(inputCategory));
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
      />
    </div>
  );
};

export default CategoriesReport;
