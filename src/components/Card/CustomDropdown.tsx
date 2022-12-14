import { AnyAction } from "@reduxjs/toolkit";
import { Dropdown } from "react-bootstrap";
import { useAppDispatch } from "../../app/hooks";
import { handleOpenForm } from "../../features/expense/expenseSlice";
import FormModel from "../Form/FormModel";
interface Action {
  action: {
    payload: number;
    type: string;
  };
}
interface MyProps {
  deleteItem: (itemId: number) => AnyAction;
  handleOpenEditItem: (itemId: number) => AnyAction;
  itemId: number;
}

const CustomDropdown = ({
  deleteItem,
  handleOpenEditItem,
  itemId,
}: MyProps) => {
  const dispatch = useAppDispatch();
  return (
    <>
      {typeof itemId === "number" && (
        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            id="dropdown-basic"
          ></Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                if (window.confirm("Do you want to delete this?")) {
                  dispatch(deleteItem(itemId));
                }
              }}
            >
              Delete
            </Dropdown.Item>

            <Dropdown.Item
              as="button"
              onClick={() => {
                dispatch(handleOpenEditItem(itemId));
                dispatch(handleOpenForm());
              }}
            >
              Edit
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
};

export default CustomDropdown;
