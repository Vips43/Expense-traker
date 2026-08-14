const options = ["Food", "Bills", "Entertainment", "Transport", "Other"];

function Filter({ setValue, value, setCurrentPage }) {
  const handleChange = async (e) => {
    const val = e.target.value;
    if (val === "NA") return;
    setValue(val);
    setCurrentPage(1);
  };

  return (
    <div className="flex items-center gap-5 ml-auto">
      <div className="flex items-center gap-2 text-sm">
        <input
          type="radio"
          name="mode"
          value="all"
          checked={value === "all"}
          id="all"
          onChange={handleChange}
        />
        <label htmlFor="all">All</label>
        <input
          type="radio"
          name="mode"
          id="offline"
          checked={value === "offline"}
          value="offline"
          onChange={handleChange}
        />
        <label htmlFor="offline">Offline</label>
        <input
          type="radio"
          name="mode"
          id="online"
          checked={value === "online"}
          value="online"
          onChange={handleChange}
        />
        <label htmlFor="online">Online</label>
      </div>
      <div className="relative text-sm w-42">
        {/* <!-- Select Container --> */}
        <div className="relative">
          <select
            id="payment-method"
            name="payment_method"
            className="appearance-none w-full bg-gray-600 rounded-lg px-4 py-1.5 font-medium outline-none ring-0 transition-all duration-200 cursor-pointer hover:border-gray-400 focus:border-none focus:ring-none text-white"
            onChange={handleChange}
          >
            <option value="NA" defaultValue={"NA"}>
              Payment Method
            </option>
            {options.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>

          {/* <!-- Custom Dropdown Arrow SVG Icon --> */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://w3.org"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
