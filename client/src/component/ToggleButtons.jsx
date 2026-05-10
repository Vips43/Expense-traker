import { Button } from "flowbite-react";

// 1. Define the class strings for your custom colors
const buttonTheme = {
  color: {
    exp: "bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900",
    earn: "bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-900",
  },
};

export function ToggleButtons({ setToggle }) {
  return (
    <div className="w-full flex items-center justify-between">
      {/* 2. Pass the custom theme object to each button */}
      <Button 
        theme={buttonTheme} 
        color="exp" 
        type="button" 
        onClick={() => setToggle("expense")}
      >
        Add Expenses
      </Button>
      
      <Button 
        theme={buttonTheme} 
        color="earn" 
        type="button" 
        onClick={() => setToggle("earning")}
      >
        Add Earning
      </Button>
    </div>
  );
}
