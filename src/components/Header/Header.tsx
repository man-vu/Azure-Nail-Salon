import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, LogIn, LogOut, Sun, Moon } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import "./Header.css";
import { headerContent } from "@/data/content";
import { useTheme } from "@/contexts/ThemeContext";
import logo192 from '@/assets/icons/logo192.png';
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) =>
      dropdownRef.current && !dropdownRef.current.contains(e.target as Node) && setActiveDropdown(null);
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (d: string) => setActiveDropdown(activeDropdown === d ? null : d);

  return (
    <motion.header
      className="header"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="header-container">
        <Link to="/" className="logo">
          <img src={logo192} alt="Logo" className="logo-img" loading="lazy" />
          {headerContent.logoText}
        </Link>
        <nav className="desktop-nav">
          {headerContent.menuItems.map((item, i) => (
            <div key={i} className="nav-item" ref={item.dropdown ? dropdownRef : null}>
              {item.dropdown ? (
                <>
                  <button className="nav-link" onClick={() => toggleDropdown(item.title)}>
                    {item.title}<ChevronDown className="icon-chevron" />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === item.title && (
                      <motion.div
                        className="dropdown"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.22 }}
                      >
                        {item.items?.map((drop, j) =>
                          <Link key={j} to={drop.url} className="dropdown-item">{drop.name}</Link>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link to={item.url || "#"} className="nav-link">{item.title}</Link>
              )}
            </div>
          ))}
        </nav>
        <div className="auth-links">
          {user ? (
            <button onClick={logout} className="nav-link">
              <LogOut size={18} className="icon-gap" /> Logout
            </button>
          ) : (
            <Link to="/login" className="nav-link">
              <LogIn size={18} className="icon-gap" /> Login
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          <div className="book-button-desktop">
            <Link to="/booking"><Button className="book-button">{headerContent.bookNowButton}</Button></Link>
          </div>
        </div>
        <button className="mobile-menu-button" onClick={() => setIsMenuOpen(v => !v)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {headerContent.menuItems.map((item, i) => (
              <div key={i}>
                {item.dropdown ? (
                  <>
                    <button className="mobile-nav-link" onClick={() => toggleDropdown(item.title)}>
                      {item.title}
                      <ChevronDown className={cn("icon-chevron", activeDropdown === item.title && "rotate")} />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === item.title &&
                        <motion.div
                          className="mobile-dropdown"
                          initial={{ opacity: 0, y: -12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.18 }}
                        >
                          {item.items?.map((drop, j) =>
                            <Link key={j} to={drop.url} className="mobile-dropdown-item" onClick={() => setIsMenuOpen(false)}>{drop.name}</Link>
                          )}
                        </motion.div>
                      }
                    </AnimatePresence>
                  </>
                ) : (
                  <Link to={item.url || "#"} className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>{item.title}</Link>
                )}
              </div>
            ))}
            {user ? (
              <button className="mobile-nav-link" onClick={() => { logout(); setIsMenuOpen(false); }}>
                Logout
              </button>
            ) : (
              <Link to="/login" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
            )}
            <div className="mobile-book-button">
              <Link to="/booking"><Button className="book-button">{headerContent.bookNowButton}</Button></Link>
              <Button
                variant="ghost"
                size="icon"
                className="theme-toggle ml-2"
                onClick={() => { toggleTheme(); }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
