interface DefaultValue {
  defaultString: [
    {
      value: string;
    }
  ];
  defaultNumber: [
    {
      value: number;
    }
  ];
}
export interface DefaultModel {
  field_date: DefaultValue["defaultString"];
  title: DefaultValue["defaultString"];
  field_description: DefaultValue["defaultString"];
  //   color: string;
  id?: number;
  nid?: DefaultValue["defaultNumber"];
}

export interface ExpenseModel extends DefaultModel {
  type?: {
    target_id: string;
    target_type: string;
  }[];
  field_amount: DefaultValue["defaultNumber"];
  // field_expense_categories: string[] | [];

  field_expense_categories: {
    target_id: number;
  }[];
  new_expense_categories?: string[];
}
export interface IncomeModel extends DefaultModel {
  field_amount: DefaultValue["defaultNumber"];
}
export interface CategoriesModel extends DefaultModel {
  field_amount?: [
    {
      value?: number;
    }
  ];
  // nid?: DefaultValue["defaultNumber"];
}
export interface ExpenseArrayModel<T> {
  inputLists: T[];
  openEditItem: boolean;
  editId: number;
  show: boolean;
  editCategory?: string;
}

export interface CategoryExpense {
  handleSelectedCategories?: (category: DefaultModel) => void;
  deleteCategory?: (deleteItem: string) => void;
  selectedCategories?: string[];
}

export interface FormTypeModels extends CategoryExpense {
  inputExpense: DefaultModel | ExpenseModel | IncomeModel;
  items?: DefaultModel[] | ExpenseModel[] | IncomeModel[];
  expenseId: number;
  submitHandler: (
    e: React.FormEvent<HTMLFormElement>,
    typeForm?: string
  ) => void;
  handleInputExpense: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
