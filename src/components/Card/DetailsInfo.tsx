import { useLocation } from "react-router-dom";

const DetailsInfo = () => {
  const location = useLocation();
  const expenseDetails = location.state.expenseDetails;
  return (
    <>
      <p>{expenseDetails.date}</p>
      <div>{expenseDetails.title}</div>
      <p>{expenseDetails.description}</p>
    </>
  );
};

export default DetailsInfo;
