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
  type?: {
    target_id: string;
    target_type: string;
  }[];
  field_date: DefaultValue["defaultString"];
  title: DefaultValue["defaultString"];
  field_description: DefaultValue["defaultString"];
  field_color: DefaultValue["defaultString"];
  id?: number;
  nid?: DefaultValue["defaultNumber"];
}

export interface ExpenseModel extends DefaultModel {
  field_amount: DefaultValue["defaultNumber"];
  field_expense_categories: {
    target_id: number;
    target_type: string;
  }[];
  new_expense_categories?: string[];
}
export interface IncomeModel extends DefaultModel {
  field_amount: DefaultValue["defaultNumber"];
}
export interface CategoriesModel extends DefaultModel {
  field_amount?: [
    {
      value: number;
    }
  ];
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
  deleteCategory?: (deleteItem: number) => void;
  selectedCategories?: { target_id: number }[];
  handleInputExpense: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
