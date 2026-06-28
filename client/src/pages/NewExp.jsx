import { useExpenses } from "../hooks/useExpense";

function NewExp() {
  const { data, isPending, error } = useExpenses();
  console.log(data, isPending, error);
  return <div></div>;
}

export default NewExp;
