import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, User, ChartNoAxesCombined, ChevronRight, Utensils, 
  Dumbbell, CalendarDays, Trophy, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

function NavBar(){
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const { user, logout } = useAuth();

  const menuSections = [
    { 
      section: "MAIN",
      items: [
        {name: "Dashboard", icon: <Home size={20} />, href: "/dashboard" },
        {name: "Profile", icon: <User size={20} />, href: "/profile" },
        {name: "Analytics", icon: <ChartNoAxesCombined size={20} />, href: "/analytics" }
      ],
    },
    {
      section: "TRACKER",
      items: [
        { name: "Meals", icon: <Utensils size={20} />, href: "/meals" },
        { name: "Workouts", icon: <Dumbbell size={20} />, href: "/workouts" },
      ],
    },
    {
      section: "PLANS",
      items: [
        { name: "Training Plan", 
          icon: <CalendarDays size={20} />,
          children: [
            { name: "Existing Plans", href: "/plans" },
            { name: "Create Workout Plan", href: "/plans/new" },
            { name: "Generate AI Plan", href: "/generate-workout" },
          ],
        },
      ],
    },
    {
      section: "CHALLENGES",
      items: [
         { name: "Challenges", icon: <Trophy size={20} />, href: "/challenges" },
      ],
    },
  ];

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  const handleLogout = async () => {
    await logout();
  };

  return(
    <nav className="w-64 bg-neutral-card p-6 flex flex-col"> 
      <h1 className="text-2xl font-bold mb-6">ShapeShift</h1>

      {menuSections.map((section) => (
        <div key={section.section} className="mb-4">
          {/* Subheader */}
          <h2 className="text-xs font-semibold text-gray-400 tracking-wider mb-2 px-2 text-left border-b border-neutral-hover pb-1">
            {section.section}
          </h2>

          <ul className="flex flex-col gap-1 pl-2">
            {section.items.map((item) => (
              <li key={item.name}>
                {item.children ? (
                  <>
                    {/* Parent with submenu */}
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className="text-sm flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-800 transition"
                    >
                      <span className="flex items-center gap-3">
                        {item.icon}
                        <span className="font-sans">{item.name}</span>
                      </span>
                      {openMenu === item.name ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </button>

                    {/* Submenu */}
                    {openMenu === item.name && (
                      <ul className="ml-4 flex flex-col text-left">
                        {item?.children.map((sub) => (
                          <li key={sub.name}>
                            <NavLink
                              to={sub.href}
                              className={({ isActive }) =>
                                `block p-2 rounded-md transition  text-sm ${
                                  isActive
                                    ? "bg-gray-700 text-white"
                                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                }`
                              }
                            >
                              {sub.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 rounded-lg transition text-sm ${
                        isActive
                          ? "bg-gray-700 text-white"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`
                    }
                  >
                    {item.icon}
                    <span className="font-sans">{item.name}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <NavLink
        onClick={()=> handleLogout()}
        className=
          "flex items-center gap-2 p-2 rounded-lg transition mt-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
      >
        <LogOut size={20} />
        <span className="font-sans">Log Out</span>
      </NavLink>
    </nav>
  )
}

export default NavBar;
