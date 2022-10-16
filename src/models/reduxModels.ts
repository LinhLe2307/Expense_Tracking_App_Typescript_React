export interface ExpenseModel {
    title: string,
    price: number,
    color: string,
    id?: number
}

export interface ExpenseArrayModel {
    expenseLists: ExpenseModel[],
    openAddExpense: boolean,
    openEditExpense: boolean
}

export interface ExpenseFormType {
    submitHandler: (e: React.FormEvent<HTMLFormElement>, typeForm:string) => void;
    handleInputExpense: (e: React.ChangeEvent<HTMLInputElement> ) => void;
    typeForm: string
}