import { AiOutlineMenuFold } from "react-icons/ai";
import { useAuthStore } from "../store/authStore";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { useMyStore } from "../store/store";

function Navbar() {
  const user = useAuthStore((state) => state.user);
  const setToggle = useMyStore((state) => state.setToggle);
  const toggle = useMyStore((state) => state.toggle);

  return (
    <aside
      className={`absolute inset-0 z-50 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 ${
        !toggle.navbar ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      onClick={() => setToggle("navbar")}
    >
      <div
        className={`w-72 h-full bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between shadow-2xl transition-transform duration-300 ${
          !toggle.navbar ? "-translate-x-full" : "translate-x-0"
        }`}
        onClick={(e) => e.stopPropagation()} 
      >
        <ul className="space-y-4">
          {/* Header Action Row */}
          <li className="flex items-center justify-between pb-4 border-b border-slate-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Navigation</span>
            <button
              type="button"
              className="p-2 text-xl text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              onClick={() => setToggle("navbar")}
            >
              <AiOutlineMenuFold />
            </button>
          </li>

          {/* User Section Selector */}
          <li>
            <button
              type="button"
              className={`w-full flex items-center justify-between p-3 rounded-xl font-medium capitalize text-left transition-all ${
                toggle.user 
                  ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20" 
                  : "text-slate-300 hover:bg-slate-800/60"
              }`}
              onClick={() => setToggle("user")}
            >
              <span className="truncate">{user?.name || "Guest"}</span>
              <span className="text-lg text-slate-400">
                {toggle.user ? <IoIosArrowDown /> : <IoIosArrowForward />}
              </span>
            </button>
          </li>

          {/* Collapsible User Details */}
          {toggle.user && (
            <li className="px-3 py-4 rounded-xl bg-slate-950/40 border border-slate-800/60 space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-0.5">Account Info</span>
                <p className="text-xs text-slate-400">
                  Member since <span className="font-medium text-slate-300">{user?.date || "recently"}</span>
                </p>
              </div>
              
              <button 
                type="button" 
                className="w-full py-2 px-3 text-xs font-medium text-red-400 hover:text-white bg-red-950/20 hover:bg-red-600 border border-red-900/30 hover:border-red-600 rounded-lg transition-all duration-200 cursor-pointer text-center"
              >
                Delete Account
              </button>
            </li>
          )}
        </ul>

        {/* Footer Area */}
        <div className="text-[10px] text-slate-600 text-center pt-4 border-t border-slate-800/40">
          v1.0.0
        </div>
      </div>
    </aside>
  );
}

export default Navbar;
