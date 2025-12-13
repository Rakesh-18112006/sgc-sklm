import React, { useState, useEffect } from "react";
import "./AdvisoryBoard.css";
import { FaLinkedin, FaEnvelope, FaGlobe, FaArrowRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

// Import images - adjust paths as needed
import director from "../../assets/advisoryBoardimgs/director.webp";
import ao from "../../assets/advisoryBoardimgs/ao.webp";
import chairman from "../../assets/advisoryBoardimgs/chairman.webp";
import dean from "../../assets/advisoryBoardimgs/dean.webp";
import fo from "../../assets/advisoryBoardimgs/fo.webp";

interface BoardMember {
  id: number;
  name: string;
  position: string;
  department: string;
  image: string;
  bio: string;
  linkedin?: string;
  email?: string;
  website?: string;
  accentColor: string;
  isFeatured?: boolean;
}

const AdvisoryBoard: React.FC = () => {
  const [activeMember, setActiveMember] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const boardMembers: BoardMember[] = [
    {
      id: 1,
      name: "Prof. K. V. G. D. Balaji",
      position: "Director",
      department: "University Leadership",
      image: director,
      bio: "Distinguished professor with 25 years of academic leadership experience. Spearheading our strategic initiatives and global partnerships. Authored several influential papers on educational reform. Committed to fostering innovation and excellence in higher education through transformative leadership and strategic vision.",
      linkedin: "#",
      email: "director.sklm@rgukt.in",
      website: "https://rguktsklm.ac.in/the-institute/administration/director/",
      accentColor: "#3B82F6",
      isFeatured: true
    },
    {
      id: 2,
      name: "Dr. Ravi Gedela",
      position: "Dean of Student Welfare",
      department: "Computer Science",
      image: chairman,
      bio: "PhD in Computer Engineering with 15 years of industry experience. Specializes in AI research and has led multiple successful tech startups. Currently heading the AI ethics committee. Passionate about mentoring students and bridging the gap between academia and industry.",
      linkedin: "#",
      email: "dsw@rguktsklm.ac.in",
      website: "https://rguktsklm.ac.in/the-institute/administration/dean-of-student-welfare",
      accentColor: "#8B5CF6"
    },
    {
      id: 3,
      name: "Mr. Rama Krishna Muni",
      position: "Administrative Officer",
      department: "Business Administration",
      image: ao,
      bio: "Former CEO of TechCorp with expertise in business strategy and innovation management. Advisor to Fortune 500 companies and government think tanks on digital transformation. Brings extensive corporate experience to academic administration.",
      linkedin: "#",
      email: "ao@rguktsklm.ac.in",
      website: "https://rguktsklm.ac.in/the-institute/administration/administrative-officer/",
      accentColor: "#10B981"
    },
    {
      id: 4,
      name: "Dr. Sivarama Krishna Merugu",
      position: "Dean Of Academics",
      department: "Electrical Engineering",
      image: dean,
      bio: "Published researcher in renewable energy systems with multiple patent awards. Leads the university's green energy initiative and international research collaborations. Recognized globally for contributions to sustainable energy solutions.",
      linkedin: "#",
      email: "da@rguktsklm.ac.in",
      website: "https://rguktsklm.ac.in/the-institute/administration/dean-of-academics/",
      accentColor: "#F59E0B"
    },
    {
      id: 5,
      name: "Dr. Ch Vasu",
      position: "Finance Officer",
      department: "Mechanical Engineering",
      image: fo,
      bio: "Industrial designer with 20+ years of experience in automotive engineering. Bridges academia and industry through innovative partnership programs and student internships. Instrumental in securing industry collaborations and research funding.",
      linkedin: "#",
      email: "fo@rguktsklm.ac.in",
      website: "https://rguktsklm.ac.in/the-institute/administration/finance-officer/",
      accentColor: "#EC4899"
    }
  ];

  const toggleBio = (id: number) => {
    if (isMobile) {
      setActiveMember(activeMember === id ? null : id);
    } else {
      setActiveMember(id);
    }
  };

  const closeBio = () => {
    setActiveMember(null);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getGradient = (color: string) => {
    return `linear-gradient(135deg, ${color}40, ${color}20)`;
  };

  const featuredMember = boardMembers.find(m => m.isFeatured);
  const otherMembers = boardMembers.filter(m => !m.isFeatured);

  return (
    <div className="advisory-board">
      {/* Animated background elements */}
      <div className="animated-bg">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
        <div className="bg-circle circle-4"></div>
      </div>

      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <div className="section-title-wrapper">
            <span className="section-subtitle">Our Leadership</span>
            <h2 className="section-title">
              Advisory <span className="highlight">Board</span>
            </h2>
          </div>
          <p className="section-description">
            Visionary leaders guiding our institution's future with expertise, innovation, and dedication
          </p>
          <div className="header-divider">
            <div className="divider-line"></div>
            <div className="divider-dot"></div>
            <div className="divider-line"></div>
          </div>
        </motion.div>

        {/* Desktop Layout: Featured Member First, Others in Grid */}
        <div className="desktop-layout">
          {/* Featured Member Card (Centered on Desktop) */}
          {featuredMember && (
            <div className="featured-member-container">
              <motion.div
                key={featuredMember.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`member-card featured-card ${activeMember === featuredMember.id ? "active" : ""}`}
                onMouseEnter={() => setHoveredMember(featuredMember.id)}
                onMouseLeave={() => setHoveredMember(null)}
                onClick={() => toggleBio(featuredMember.id)}
                whileHover={{ y: -5 }}
              >
                <div 
                  className="card-glow"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${featuredMember.accentColor}30, transparent 70%)`,
                    opacity: hoveredMember === featuredMember.id ? 0.6 : 0
                  }}
                ></div>

                <div className="card-content">
                  {/* Image Container */}
                  <div className="image-container">
                    <div 
                      className="image-wrapper"
                      style={{
                        borderColor: featuredMember.accentColor
                      }}
                    >
                      {!imageErrors[featuredMember.id] ? (
                        <img
                          src={featuredMember.image}
                          alt={featuredMember.name}
                          className="member-image"
                          onError={() => handleImageError(featuredMember.id)}
                          loading="lazy"
                        />
                      ) : (
                        <div 
                          className="member-image-fallback"
                          style={{ background: getGradient(featuredMember.accentColor) }}
                        >
                          <span className="fallback-initials">{getInitials(featuredMember.name)}</span>
                        </div>
                      )}
                      
                      {/* Image Overlay */}
                      <div className="image-overlay">
                        <div className="view-profile">
                          <FaArrowRight />
                        </div>
                      </div>
                    </div>

                    {/* Accent Decoration */}
                    <div 
                      className="accent-decoration"
                      style={{ background: featuredMember.accentColor }}
                    ></div>
                  </div>

                  {/* Member Info */}
                  <div className="member-info">
                    <div className="member-header">
                      <h3 className="member-name">{featuredMember.name}</h3>
                      <div 
                        className="position-badge"
                        style={{ 
                          background: featuredMember.accentColor
                        }}
                      >
                        {featuredMember.position}
                      </div>
                    </div>
                    
                    <p className="member-department">{featuredMember.department}</p>
                  </div>

                  {/* Social Links */}
                  <div className="social-container">
                    <div className="social-links">
                      {featuredMember.linkedin && (
                        <a
                          href={featuredMember.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Connect with ${featuredMember.name} on LinkedIn`}
                          className="social-link"
                          style={{ color: featuredMember.accentColor }}
                        >
                          <FaLinkedin />
                        </a>
                      )}
                      {featuredMember.email && (
                        <a
                          href={`mailto:${featuredMember.email}`}
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Email ${featuredMember.name}`}
                          className="social-link"
                          style={{ color: featuredMember.accentColor }}
                        >
                          <FaEnvelope />
                        </a>
                      )}
                      {featuredMember.website && (
                        <a
                          href={featuredMember.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Visit ${featuredMember.name}'s website`}
                          className="social-link"
                          style={{ color: featuredMember.accentColor }}
                        >
                          <FaGlobe />
                        </a>
                      )}
                    </div>
                    
                    <button 
                      className="view-bio-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBio(featuredMember.id);
                      }}
                      style={{ 
                        background: featuredMember.accentColor
                      }}
                    >
                      View Full Bio
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Other Members Grid (4 cards in one row on desktop) */}
          <div className="other-members-grid">
            {otherMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`member-card ${activeMember === member.id ? "active" : ""}`}
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
                onClick={() => toggleBio(member.id)}
                whileHover={{ y: -5 }}
              >
                <div 
                  className="card-glow"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${member.accentColor}30, transparent 70%)`,
                    opacity: hoveredMember === member.id ? 0.6 : 0
                  }}
                ></div>

                <div className="card-content">
                  {/* Image Container */}
                  <div className="image-container">
                    <div 
                      className="image-wrapper"
                      style={{
                        borderColor: member.accentColor
                      }}
                    >
                      {!imageErrors[member.id] ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="member-image"
                          onError={() => handleImageError(member.id)}
                          loading="lazy"
                        />
                      ) : (
                        <div 
                          className="member-image-fallback"
                          style={{ background: getGradient(member.accentColor) }}
                        >
                          <span className="fallback-initials">{getInitials(member.name)}</span>
                        </div>
                      )}
                      
                      {/* Image Overlay */}
                      <div className="image-overlay">
                        <div className="view-profile">
                          <FaArrowRight />
                        </div>
                      </div>
                    </div>

                    {/* Accent Decoration */}
                    <div 
                      className="accent-decoration"
                      style={{ background: member.accentColor }}
                    ></div>
                  </div>

                  {/* Member Info */}
                  <div className="member-info">
                    <div className="member-header">
                      <h3 className="member-name">{member.name}</h3>
                      <div 
                        className="position-badge"
                        style={{ background: member.accentColor }}
                      >
                        {member.position}
                      </div>
                    </div>
                    
                    <p className="member-department">{member.department}</p>

                  </div>

                  {/* Social Links */}
                  <div className="social-container">
                    <div className="social-links">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Connect with ${member.name} on LinkedIn`}
                          className="social-link"
                          style={{ color: member.accentColor }}
                        >
                          <FaLinkedin />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Email ${member.name}`}
                          className="social-link"
                          style={{ color: member.accentColor }}
                        >
                          <FaEnvelope />
                        </a>
                      )}
                      {member.website && (
                        <a
                          href={member.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Visit ${member.name}'s website`}
                          className="social-link"
                          style={{ color: member.accentColor }}
                        >
                          <FaGlobe />
                        </a>
                      )}
                    </div>
                    
                    <button 
                      className="view-bio-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBio(member.id);
                      }}
                      style={{ background: member.accentColor }}
                    >
                      View Bio
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Layout: All cards in one grid */}
        <div className="mobile-layout">
          <div className="mobile-members-grid">
            {boardMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`member-card ${activeMember === member.id ? "active" : ""}`}
                onClick={() => toggleBio(member.id)}
                whileHover={{ y: -3 }}
              >
                <div className="card-content">
                  {/* Image Container */}
                  <div className="image-container">
                    <div 
                      className="image-wrapper"
                      style={{
                        borderColor: member.accentColor
                      }}
                    >
                      {!imageErrors[member.id] ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="member-image"
                          onError={() => handleImageError(member.id)}
                          loading="lazy"
                        />
                      ) : (
                        <div 
                          className="member-image-fallback"
                          style={{ background: getGradient(member.accentColor) }}
                        >
                          <span className="fallback-initials">{getInitials(member.name)}</span>
                        </div>
                      )}
                      
                      {/* Image Overlay */}
                      <div className="image-overlay">
                        <div className="view-profile">
                          <FaArrowRight />
                        </div>
                      </div>
                    </div>

                    {/* Accent Decoration */}
                    <div 
                      className="accent-decoration"
                      style={{ background: member.accentColor }}
                    ></div>
                  </div>

                  {/* Member Info */}
                  <div className="member-info">
                    <div className="member-header">
                      <h3 className="member-name">{member.name}</h3>
                      <div 
                        className="position-badge"
                        style={{ background: member.accentColor }}
                      >
                        {member.position}
                      </div>
                    </div>
                    
                    <p className="member-department">{member.department}</p>
                  </div>

                  {/* Social Links */}
                  <div className="social-container">
                    <div className="social-links">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Connect with ${member.name} on LinkedIn`}
                          className="social-link"
                          style={{ color: member.accentColor }}
                        >
                          <FaLinkedin />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Email ${member.name}`}
                          className="social-link"
                          style={{ color: member.accentColor }}
                        >
                          <FaEnvelope />
                        </a>
                      )}
                      {member.website && (
                        <a
                          href={member.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Visit ${member.name}'s website`}
                          className="social-link"
                          style={{ color: member.accentColor }}
                        >
                          <FaGlobe />
                        </a>
                      )}
                    </div>
                    
                    <button 
                      className="view-bio-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBio(member.id);
                      }}
                      style={{ background: member.accentColor }}
                    >
                      View Bio
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Expanded Bio Modal */}
        <AnimatePresence>
          {activeMember && (
            <motion.div
              className="bio-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeBio}
            >
              <motion.div
                className="bio-modal"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {activeMember && (() => {
                  const member = boardMembers.find(m => m.id === activeMember);
                  if (!member) return null;
                  
                  return (
                    <>
                      <div className="modal-header">
                        <div className="modal-image">
                          {!imageErrors[member.id] ? (
                            <img
                              src={member.image}
                              alt={member.name}
                              className="modal-member-image"
                            />
                          ) : (
                            <div 
                              className="modal-image-fallback"
                              style={{ background: getGradient(member.accentColor) }}
                            >
                              <span className="modal-fallback-initials">{getInitials(member.name)}</span>
                            </div>
                          )}
                        </div>
                        <div className="modal-info">
                          <h3 className="modal-name">{member.name}</h3>
                          <div 
                            className="modal-position"
                            style={{ color: member.accentColor }}
                          >
                            {member.position}
                          </div>
                          <div className="modal-department">{member.department}</div>
                        </div>
                        <button 
                          className="modal-close"
                          onClick={closeBio}
                          aria-label="Close"
                        >
                          <IoMdClose />
                        </button>
                      </div>

                      <div className="modal-content">
                        <div className="bio-section">
                          <h4 className="section-title">Biography</h4>
                          <p className="bio-text">{member.bio}</p>
                        </div>

                        <div className="contact-section">
                          <h4 className="section-title">Contact</h4>
                          <div className="contact-links">
                            {member.email && (
                              <a 
                                href={`mailto:${member.email}`}
                                className="contact-link"
                                style={{ '--accent': member.accentColor } as React.CSSProperties}
                              >
                                <FaEnvelope />
                                <span>{member.email}</span>
                              </a>
                            )}
                            {member.website && (
                              <a 
                                href={member.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-link"
                                style={{ '--accent': member.accentColor } as React.CSSProperties}
                              >
                                <FaGlobe />
                                <span>Official Website</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdvisoryBoard;