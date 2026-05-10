import { FaCheck } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { IoIosRemoveCircleOutline } from "react-icons/io";

function AED() {
  const handleAdd = () => {};
  const handleEdit = () => {};
  const handleRemove = () => {};

  return (
    <div className="flex items-center justify-center gap-10 h-full text-xl bg-white/40">
      <div
        data-id="add"
        className="icon text-green-600 p-2 outline rounded-md hover:bg-green-600 hover:text-white hover:outline-0 hover:rounded-full hover:outline-green-600 transition-all"
        onClick={handleAdd}
      >
        <FaCheck />
      </div>
      <div
        data-id="edit"
        className="icon text-amber-600 p-2 outline rounded-md hover:bg-amber-600 hover:text-white hover:outline-0 hover:rounded-full hover:outline-amber-600 transition-all"
        onClick={handleEdit}
      >
        <CiEdit />
      </div>
      <div
        data-id="remove"
        className="icon text-red-600 p-2 outline rounded-md hover:bg-red-600 hover:text-white hover:outline-0 hover:rounded-full hover:outline-red-600 transition-all"
        onClick={handleRemove}
      >
        <IoIosRemoveCircleOutline />
      </div>
    </div>
  );
}

export default AED;
