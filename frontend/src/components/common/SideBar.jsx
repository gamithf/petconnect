/* eslint-disable no-unused-vars */
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { apiRequest } from "../../api/api";
import logo from "../../assets/lg.png";
import { useNotification } from "../../context/NotificationContext";

export const SideBar = () => {
  return (
    <div className="flex">
      <Sidebar />
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(false); // State remains the same
  const location = useLocation();
  const [selected, setSelected] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { notify } = useNotification();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiRequest("/users/profile", "GET");
        const data = response.data;
        if (data.status === "success") {
          setUser(data.data);
        } else {
          console.error("Failed to fetch user profile:", data.msg);
          notify(data?.msg || "Failed to fetch user", {
          type: 'error',
          title: 'Failed to fetch user'
        });
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
        notify(data?.msg || "Failed to fetch user", {
          type: 'error',
          title: 'Failed to fetch user'
        });
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const path = location.pathname;
    const match = mainLinks
      .concat(footerLinks)
      .find((link) => path.includes(link.path));
    setSelected(match?.title || "Home");
  }, [location.pathname]);

  const logout = async () => {
    try {
      sessionStorage.removeItem("authToken");
      const response = await apiRequest("/users/logout", "POST", {});
      const data = response.data;
      const token = sessionStorage.getItem("authToken");
      if (!token || data.status === "success") {
        navigate("/login");
      } else if (data.status === "error") {
        notify(data?.msg || "Logout Failed!", {
          type: 'error',
          title: 'Logout Failed'
        });
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <motion.nav
      layout
      // Add these two event handlers
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
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
            {user?.name && (
              <div className="text-sm text-slate-300 px-3 mt-4">
                <div className="font-bold">{user.name}</div>
                <div className="text-xs font-semibold text-slate-400">user</div>

                <button
                  onClick={logout}
                  className="mt-3 w-full px-3 py-2 rounded-lg bg-red-700 text-white text-sm font-medium hover:bg-red-500 text-center transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.nav>
  );
};

// === Define routes directly with path ===
const mainLinks = [
  { title: "Home", icon: FiHome, path: "/home" },
  { title: "AI Vet Analyzer", icon: FiCpu, path: "/ai-services" },
  // { title: "Pet Adoption/Lost", icon: FiHeart, path: "/pet-adoption-lost" },
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
      className={`flex items-center w-full h-10 rounded-md px-2 cursor-pointer transition-colors ${
        selected === title ? "bg-slate-700" : "hover:bg-slate-600"
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
      <img src={logo} alt="PetConnect Logo" className="w-8 h-8" />
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
