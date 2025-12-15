
import { useState, useEffect } from 'react';
import { 
  FaHome, 
  FaGraduationCap, 
  FaInfoCircle, 
  FaNewspaper, 
  FaEnvelope, 
  FaBars, 
  FaTimes, 
  FaChevronDown, 
  FaChalkboardTeacher, 
  
} from 'react-icons/fa';
import { MdNewLabel } from 'react-icons/md';
import './Navbar.css';
import sgc from '../../assets/sgc.webp'
import { icons } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
   const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (dropdown : any ) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };
  /*  ---------------------------------------------------
        Fetch marquee messages from backend
       --------------------------------------------------- */
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://sgc-sklm-01.onrender.com/api/marquee/all");
        const data = await res.json();

        if (Array.isArray(data.marquee)) {
          setMessages(data.marquee.map((item: any) => item.message));
        } else {
          console.error("Invalid API response:", data);
        }
      } catch (err) {
        console.error("Error loading marquee:", err);
      }
    };

    fetchData();
  }, []);

  

  const navLinks = [
    { name: 'Home', icon: <FaHome />, path: '/', dropdown: null },
    { 
        name: 'Advisory & Executive Board',
        icon: <FaChalkboardTeacher />,
        path: '#',
        dropdown: [
          { name: 'Advisory Board', icon: <FaGraduationCap />, path: '/advisory-board' },
          { name: 'Executive Board', icon: <FaGraduationCap />, path: '/executive-board' },
          { name: 'Members', icon: <FaGraduationCap />, path: '/members' },
          { name: 'Web Team', icon: <FaGraduationCap />, path: '/web-team' },
        ]

    },
    { name: 'About', icon: <FaInfoCircle />, path: '/about', dropdown: null },
    {name:'Eureka',icon:<MdNewLabel />,path:'/eureka',dropdown:null},
    { name: 'News & Events', icon: <FaNewspaper />, path: '/events', dropdown: null },
      { name: 'Clubs', icon: <FaEnvelope />, path: '/clubs', dropdown: null },
      
      {
        name: 'Reports', icon : <FaNewspaper /> , path: '#', dropdown: [
              { name: 'AY 2022-23', icon: null, path: '#' },
              { name: 'AY 2023-24', icon: null, path: '#' },
              { name: 'AY 2024-25', icon: null, path: '#' }
        ]
      }
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          {/* Logo Section */}
          <div className="navbar-logo">
            <img
              src="/rgukt_logo.png"
              alt="College Logo"
              className="college-logo"
            />
           <img 
               src={sgc} 
                alt="Organization Logo"
                className="h-7 w-auto" 
            />
            <h1 className="heading">Student Gymnastic Center</h1>
          </div>

          {/* Desktop Navigation */}
          <ul className="nav-links">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className={activeDropdown === link.name ? "active" : ""}
                onMouseEnter={() => link.dropdown && toggleDropdown(link.name)}
                onMouseLeave={() => link.dropdown && toggleDropdown(null)}
              >
                <a href={link.path}>
                  {link.icon} {link.name}
                  {link.dropdown && <FaChevronDown className="dropdown-icon" />}
                </a>

                {link.dropdown && (
                  <div
                    className={`dropdown-content ${
                      activeDropdown === link.name ? "show" : ""
                    }`}
                  >
                    {link.dropdown.map((item, i) => (
                      <a key={i} href={item.path}>
                        {item.icon} {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <button className="hamburger" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>
      <div className="news-ticker">
        <div className="ticker-content">
          <span className="font-semibold">Latest Updates: </span>

          {messages.length === 0 ? (
            <span>No updates available</span>
          ) : (
            messages.map((msg, index) => (
              <span key={index}>
                {msg} {index !== messages.length - 1 && " | "}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
        <ul className="mobile-links">
          {navLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.path}
                onClick={() => {
                  if (link.dropdown) {
                    toggleDropdown(link.name);
                  } else {
                    setIsMobileMenuOpen(false);
                  }
                }}
              >
                {link.icon} {link.name}
                {link.dropdown && (
                  <FaChevronDown
                    className={`dropdown-icon ${
                      activeDropdown === link.name ? "rotate" : ""
                    }`}
                  />
                )}
              </a>

              {link.dropdown && (
                <div
                  className={`mobile-dropdown ${
                    activeDropdown === link.name ? "show" : ""
                  }`}
                >
                  {link.dropdown.map((item, i) => (
                    <a
                      key={i}
                      href={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon} {item.name}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* <Headline /> */}
    </>
  );
};

export default Navbar;