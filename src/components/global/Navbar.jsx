import React, { useState } from "react";
import logo from "../../../public/the-cheat-school-2.png";
import { NavLink, useNavigate } from "react-router-dom";
import Hamburger from "hamburger-react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, ChevronDown, ChevronUp } from "lucide-react";

const Navbar = ({ isChatOpen, setIsChatOpen }) => {
  const [isOpen, setOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const activeClassName = "text-primary font-bold";
  const inactiveClassName = "text-black dark:text-white duration-300 hover:text-red-500 dark:hover:text-red-500";
  const navigate = useNavigate();

  const navItems = [
  { to: "/", label: "HOME" },
  { to: "blogs", label: "BLOGS" },
  { to: "events", label: "EVENTS" },
  { to: "/contact-us", label: "CONTACT US" }];


  const coursesItems = [
  { to: "/civil-engineering", label: "Civil Engineering" },
  { to: "/ai-engineering", label: "AI Engineering" },
  { to: "/french-nclc-7", label: "French (NCLC 7)" }];


  const handleCourseClick = (to) => {
    navigate(to);
    setIsCoursesOpen(false);
    setOpen(false);
  };

  return (
    <div className="top-0 left-0 z-50 m-2 fixed w-[calc(100%-16px)] shadow-xl dark:bg-white/2 bg-white/30 backdrop-blur-lg rounded-xl">
      <div className="container p-0.5">
        <div className="flex items-center justify-between">
          <img src={logo} alt="logo" className="object-contain h-[80px] ml-4" />

          {}
          <div className="hidden md:flex items-center space-x-10 mr-6">
            <ul className="flex flex-row font-bold text-2xl space-x-10 font-primary cursor-pointer">

              {}
              <li>
                <NavLink
                  className={({ isActive }) =>
                  isActive ? activeClassName : inactiveClassName
                  }
                  to="/">
                  
                 HOME
                </NavLink>
              </li>

              {}
              <li
                className="relative"
                onMouseEnter={() => setIsCoursesOpen(true)}
                onMouseLeave={() => setIsCoursesOpen(false)}>
                
                <button className={`flex items-center gap-1 ${inactiveClassName}`}>
                  COURSES
                  {isCoursesOpen ?
                  <ChevronUp className="w-4 h-4" /> :

                  <ChevronDown className="w-4 h-4" />
                  }
                </button>

                <AnimatePresence>
                  {isCoursesOpen &&
                  <motion.div
                    className="absolute top-full left-0 mt-2 w-48 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}>
                    
                      <div className="py-2">
                        {coursesItems.map((course) =>
                      <button
                        key={course.to}
                        onClick={() => handleCourseClick(course.to)}
                        className="w-full text-left px-4 py-2 text-lg font-semibold text-black hover:bg-red-50 hover:text-red-500 transition-colors duration-300">
                        
                            {course.label}
                          </button>
                      )}
                      </div>
                    </motion.div>
                  }
                </AnimatePresence>
              </li>

              {}
              {navItems.slice(1).map((item) =>
              <li key={item.to}>  
                  <NavLink
                  className={({ isActive }) =>
                  isActive ? activeClassName : inactiveClassName
                  }
                  to={item.to}>
                  
                    {item.label}
                  </NavLink>
                </li>
              )}
            </ul>
            {}
          </div>

          {}
          <div className="flex items-center space-x-4 md:hidden">
            {





            }
            {} 
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </div>
        </div>

        {}
        <AnimatePresence>
          {isOpen &&
          <motion.div
            className="md:hidden rounded-2xl fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
            
              <motion.div
              className="absolute rounded-2xl inset-0"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} />
            

              <motion.nav
              className="relative z-50 bg-white/90 backdrop-blur-sm rounded-2xl w-full top-21 p-8 flex flex-col items-center"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}>
              
                <ul className="flex flex-col font-primary text-xl items-center gap-6 w-full max-w-sm">

                  {}
                  <motion.li
                  className="w-full"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}>
                  
                    <NavLink
                    to="/"
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                    `${
                    isActive ? activeClassName : inactiveClassName} block w-full text-center text-lg font-semibold`

                    }>
                    
                      HOME
                    </NavLink>
                  </motion.li>

                  {}
                  <motion.li
                  className="w-full"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}>
                  
                    <div className="text-center">
                      <button
                      onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                      className={`${inactiveClassName} flex items-center justify-center gap-1 w-full text-lg font-semibold`}>
                      
                        COURSES
                        {isCoursesOpen ?
                      <ChevronUp className="w-4 h-4" /> :

                      <ChevronDown className="w-4 h-4" />
                      }
                      </button>

                      <AnimatePresence>
                        {isCoursesOpen &&
                      <motion.div
                        className="mt-2 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}>
                        
                            <div className="py-2">
                              {coursesItems.map((course, index) =>
                          <motion.button
                            key={course.to}
                            onClick={() => handleCourseClick(course.to)}
                            className="w-full text-center px-4 py-2 text-lg font-semibold text-black hover:bg-red-50 hover:text-red-500 transition-colors duration-300"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}>
                            
                                  {course.label}
                                </motion.button>
                          )}
                            </div>
                          </motion.div>
                      }
                      </AnimatePresence>
                    </div>
                  </motion.li>

                  {}
                  {navItems.slice(1).map((item, i) =>
                <motion.li
                  key={item.to}
                  className="w-full"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: (i + 1) * 0.1 }}>
                  
                      <NavLink
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                    `${
                    isActive ? activeClassName : inactiveClassName} block w-full text-center text-lg font-semibold`

                    }>
                    
                        {item.label}
                      </NavLink>
                    </motion.li>
                )}
                </ul>
              </motion.nav>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>);

};

export default Navbar;