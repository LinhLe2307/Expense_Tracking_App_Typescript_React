export interface ExpenseModel {
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
    totalIncome: number
}