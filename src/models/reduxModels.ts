export interface DefaultModel {
    title: string,
    description: string,
    color: string,
    id?: number
}

export interface ExpenseModel extends DefaultModel {
    date: string;
    price: number,
    categories: string[],
}
export interface IncomeModel extends DefaultModel {
    amount: number, 
}
export interface ExpenseArrayModel<T> {
    inputLists: T[],
    openEditItem: boolean,
    editId: number
}

export interface ExpenseFormType {
    submitHandler: (e: React.FormEvent<HTMLFormElement>, typeForm:string) => void;
    handleInputExpense: (e: React.ChangeEvent<HTMLInputElement> ) => void;
    typeForm: string
}