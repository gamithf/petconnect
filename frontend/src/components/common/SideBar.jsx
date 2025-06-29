import React, { useState, useEffect } from "react";
import {
  FiHome,
  FiHeart,
  FiCpu,
  FiUsers,
  FiActivity,
  FiBell,
  FiSettings,
  FiUser,
  FiChevronsRight,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { apiRequest } from "../../api/api";

export const SideBar = () => {
  return (
    <div className="flex">
      <Sidebar />
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const [selected, setSelected] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiRequest("/users/profile", "GET");
        const data = response.data;
        console.log(data);
        if (data.status === 'success') {
          console.log(data.data);
          setUser(data.data);
        } else {
          console.error('Failed to fetch user profile:', data.message);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const path = location.pathname;
    const match = mainLinks.concat(footerLinks).find((link) =>
      path.includes(link.path)
    );
    setSelected(match?.title || "Home");
  }, [location.pathname]);

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 p-2 text-[#feffff]"
      style={{
        backgroundColor: "#17252A",
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1 mt-2">
        {mainLinks.map((link) => (
          <Option
            key={link.title}
            Icon={link.icon}
            title={link.title}
            path={link.path}
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
        ))}
      </div>

      <div className="mt-auto pt-6 border-t border-slate-700 space-y-1">
        {footerLinks.map((link) => (
          <Option
            key={link.title}
            Icon={link.icon}
            title={link.title}
            path={link.path}
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
        ))}
        {open && (
          <div className="text-sm text-slate-300 px-3 mt-4">
            {open && user?.name && (  // Only render if user.name exists
              <div className="text-sm text-slate-300 px-3 mt-4">
                <div className="font-semibold">{user.name}</div>
                <div className="text-xs text-slate-400">Pet Lover</div>
              </div>
            )}
          </div>
        )}
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

// === Define routes directly with path ===
const mainLinks = [
  { title: "Home", icon: FiHome, path: "/" },
  { title: "Pet Adoption/Lost", icon: FiHeart, path: "/pet-adoption" },
  { title: "AI Services", icon: FiCpu, path: "/ai-services" },
  { title: "Community", icon: FiUsers, path: "/community" },
  { title: "Vet Services", icon: FiActivity, path: "/vet-services" },
];

const footerLinks = [
  { title: "Notifications", icon: FiBell, path: "/notifications" },
  { title: "Settings", icon: FiSettings, path: "/settings" },
];

const Option = ({ Icon, title, selected, setSelected, open, path }) => (
  <Link to={path}>
    <motion.button
      layout
      onClick={() => setSelected(title)}
      className={`flex items-center w-full h-10 rounded-md px-2 transition-colors ${selected === title ? "bg-slate-700" : "hover:bg-slate-600"
        }`}
    >
      <div className="w-6 mr-3 text-lg">
        <Icon />
      </div>
      {open && <span className="text-sm font-medium">{title}</span>}
    </motion.button>
  </Link>
);

const TitleSection = ({ open }) => (
  <div className="mb-3">
    <div className="flex items-center gap-2">
      <Logo />
      {open && (
        <motion.div layout>
          <span className="text-sm font-semibold">PetConnect</span>
        </motion.div>
      )}
    </div>
  </div>
);

const Logo = () => (
  <motion.div
    layout
    className="grid size-10 place-content-center rounded-md bg-blue-600"
  >
    <span className="text-white font-bold text-lg">P</span>
  </motion.div>
);

const ToggleClose = ({ open, setOpen }) => (
  <motion.button
    layout
    onClick={() => setOpen((prev) => !prev)}
    className="absolute bottom-0 left-0 right-0 py-2 transition hover:bg-slate-600"
  >
    <div className="flex items-center justify-center text-sm">
      <FiChevronsRight className={`transform ${open ? "rotate-180" : ""}`} />
      {open && <span className="ml-2">Hide</span>}
    </div>
  </motion.button>
);
