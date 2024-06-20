import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CloseIcon from "@mui/icons-material/Close";
import WhatshotIcon from "@mui/icons-material/Whatshot";

import logo from "../assets/logo.png";


const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const Menuitem = [
    {
      name: "Home",
      icon: <HomeIcon />,
      url: "/",
      url2: "/Books",
    },
    // {
    //   name: "Trending",
    //   icon: <WhatshotIcon />,
    //   url: "/trending",
    // },
  ];
  return (
    <main className="fixed">
      <section
        className={`flex-col ${
          showSidebar ? "w-[200px]" : "w-[100px] "
        }  relative shadow-lg h-screen border-r-2 border-[#edede9]  flex justify-between `}
      >
        <div className="mt-14">
          <img className="w-20 mx-auto"
          src={logo} alt="logo" />
          <h1 className="font-courgette text-center text-2xl "> </h1>
          <div className="flex flex-col justify-center  mt-32 ">
            {Menuitem.map((item, index) => (
              <div key={index}>
                <Link
                  to={item.url || "/"}
                  className={`active flex items-center ${
                    showSidebar ? "" : "justify-center rounded-full "
                  }  mt-14 p-4`}
                >
                  <span className={`${showSidebar ? "ml-7 mr-2" : ""}`}>
                    {item.icon}
                  </span>
                  {showSidebar && item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="sm:block hidden absolute bottom-5 left-5 p-2 bg-[#edede9] rounded-full items-center hover:text-[#e86252]"
          >
            {showSidebar ? <CloseIcon fontSize="medium" /> : <MenuOpenIcon />}
            {/* <span className="ml-4 text-[20px]">{showSidebar?'Close':''}</span> */}
          </button>
        </div>
      </section>
    </main>
  );
};

export default Sidebar;
