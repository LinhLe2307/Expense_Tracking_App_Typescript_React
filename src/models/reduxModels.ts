export interface DefaultModel {
  date: string;
  title: [
    {
      value: string;
    }
  ];
  field_description: string;
  color: string;
  id?: number;
}

export interface ExpenseModel extends DefaultModel {
  field_amount: number;
  categories: string[];
}
export interface IncomeModel extends DefaultModel {
  field_amount: number;
}
export interface CategoriesModel extends DefaultModel {
  field_amount?: number;
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
  baseURL: string;
}
