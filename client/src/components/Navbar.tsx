import { FC, useId } from "react";
import { NavLink } from "react-router-dom";
import { FaTable, FaToolbox, FaUserFriends } from "react-icons/fa";

import type { Link } from "../types";

const data: Link[] = [
  {
    to: "/services",
    text: "services",
    icon: <FaTable />,
  },
  {
    to: "/clients",
    text: "clients",
    icon: <FaUserFriends />,
  },
  {
    to: "/technicians",
    text: "technicians",
    icon: <FaToolbox />,
  },
];

const Navbar: FC = () => {
  const id = useId();
  return (
    <nav className="flex flex-col items-start space-y-6  border-r-4 border-slate-900 w-72">
      {data.map((link) => (
        <NavLink
          to={link.to}
          key={id + link.text}
          className={({ isActive }) =>
            isActive
              ? "h-8 capitalize border-b-2 w-10/12 flex justify-start items-center gap-8 text-lg text-teal-500 font-semibold"
              : "h-8 capitalize border-b-2 w-10/12 flex justify-start items-center gap-8 text-lg text-"
          }
        >
          {link.icon}
          {link.text}
        </NavLink>
      ))}
    </nav>
  );
};
export default Navbar;
