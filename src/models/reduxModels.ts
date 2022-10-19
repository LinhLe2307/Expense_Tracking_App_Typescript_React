export interface ExpenseModel {
    date: string;
    title: string,
    price: number,
    description: string,
    categories: string[],
    color: string,
    id?: number
}

export interface ExpenseArrayModel {
    expenseLists: ExpenseModel[],
    openEditExpense: boolean,
    editId: number
}

export interface ExpenseFormType {
    submitHandler: (e: React.FormEvent<HTMLFormElement>, typeForm:string) => void;
    handleInputExpense: (e: React.ChangeEvent<HTMLInputElement> ) => void;
    typeForm: string
}

export interface IncomeModel {
    typeIncome : string,
    incomeAmount: number,
    id?: number
}
export interface IncomeArrayModel {
    incomeList : IncomeModel[]
}

export interface CategoriesModel {
    categoryTitle: string,
    categoryDescription: string,
    categoryColor: string,
    categoryTransactions?: number,
    totalCategoryAmount?: number,
    id ?: number
}
export interface CategoriesModelArray {
    categoriesList: CategoriesModel[]
}

export interface CategoryPriceModel {
    selectedCategories: string[],
    inputPrice: number
}