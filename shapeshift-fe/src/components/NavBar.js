import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, User, Settings, ChevronLeft, ChevronRight, Utensils, 
  Dumbbell, CalendarDays, Trophy, LogOut, ChevronDown } from "lucide-react";

function NavBar(){
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const menuSections = [
    { 
      section: "MAIN",
      items: [
        {name: "Dashboard", icon: <Home size={20} />, href: "#" },
        { name: "Profile", icon: <User size={20} />, href: "#" },
      ],
    },
    {
      section: "TRACKER",
      items: [
        { name: "Meals", icon: <Utensils size={20} />, href: "/meals" },
        { name: "Workouts", icon: <Dumbbell size={20} />, href: "user/1/workouts" },
      ],
    },
    {
      section: "PLANS",
      items: [
        { name: "Training Plan", 
          icon: <CalendarDays size={20} />,
          children: [
            { name: "Existing Plans", href: "/users/1/plans" },
            { name: "Create Workout Plan", href: "/users/1/plans/new" },
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
    {
      section: "SETTINGS",
      items: [
         { name: "Settings", icon: <Settings size={20} />, href: "#" },
      ],
    },
   
    // { name: "Log Out", icon: <LogOut size={20} />, href: "#" }
  ];

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  return(
    <nav className="w-64 bg-gray-900 text-white flex flex-col p-4 h-screen font-sans">
      <h1 className="text-2xl font-bold mb-6">My App</h1>

      {menuSections.map((section) => (
        <div key={section.section} className="mb-6">
          {/* Subheader */}
          <h2 className="text-xs font-semibold text-gray-400 tracking-wider mb-2 px-2">
            {section.section}
          </h2>

          <ul className="flex flex-col gap-2">
            {section.items.map((item) => (
              <li key={item.name}>
                {item.children ? (
                  <>
                    {/* Parent with submenu */}
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-800 transition"
                    >
                      <span className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.name}</span>
                      </span>
                      {openMenu === item.name ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </button>

                    {/* Submenu */}
                    {openMenu === item.name && (
                      <ul className="ml-2 mt-2 flex flex-col gap-1">
                        {item?.children.map((sub) => (
                          <li key={sub.name}>
                            <NavLink
                              to={sub.href}
                              className={({ isActive }) =>
                                `block p-2 rounded-md transition ${
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
                      `flex items-center gap-3 p-2 rounded-lg transition ${
                        isActive
                          ? "bg-gray-700 text-white"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export default NavBar;
