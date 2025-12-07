// AdvisoryBoard.tsx
import React, { useState, useEffect } from "react";
import "./AdvisoryBoard.css";
import { FaLinkedin, FaEnvelope, FaGlobe } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

// board-member images
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
}

const AdvisoryBoard: React.FC = () => {
  const [activeMember, setActiveMember] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

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
    },
    {
      id: 5,
      name: "Dr. Ch Vasu",
      position: "finance officer",
      department: "Mechanical Engineering",
      image: fo,
      bio: "Industrial designer with 20+ years of experience in automotive engineering. Bridges academia and industry through innovative partnership programs and student internships. Instrumental in securing industry collaborations and research funding.",
      linkedin: "#",
      email: "fo@rguktsklm.ac.in",
      website: "https://rguktsklm.ac.in/the-institute/administration/finance-officer/",
    },
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

  return (
    <div className="advisory-board">
      <div className="animated-bg">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
        <div className="bg-circle circle-4"></div>
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="section-title">
            Meet Our Advisory Board
          </h2>
          <p className="section-subtitle">
            Visionary leaders guiding our institution's future with expertise, innovation, and dedication
          </p>
          <div className="divider"></div>
        </motion.div>

        <div className="board-members-container">
          {/* First row - single member centered */}
          <div className="first-row">
            <motion.div
              key={boardMembers[0].id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`member-card ${
                activeMember === boardMembers[0].id ? "active" : ""
              }`}
              onClick={() => toggleBio(boardMembers[0].id)}
              whileHover={{ y: -10 }}
            >
              <div className="card-inner">
                <div className="card-image-container">
                  <div className="image-wrapper">
                    {!imageErrors[boardMembers[0].id] ? (
                      <img
                        src={boardMembers[0].image}
                        alt={boardMembers[0].name}
                        className="member-image"
                        onError={() => handleImageError(boardMembers[0].id)}
                        loading="lazy"
                      />
                    ) : (
                      <div className="member-image-fallback">
                        {getInitials(boardMembers[0].name)}
                      </div>
                    )}
                    <div className="image-hover-effect"></div>
                  </div>
                  <div className="decorative-shape decorative-shape-1"></div>
                  <div className="decorative-shape decorative-shape-2"></div>
                </div>

                <div className="card-content">
                  <h3 className="member-name">{boardMembers[0].name}</h3>
                  <p className="member-position">{boardMembers[0].position}</p>
                  <p className="member-department">
                    {boardMembers[0].department}
                  </p>

                  <div className="social-links">
                    {boardMembers[0].linkedin && (
                      <a
                        href={boardMembers[0].linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Connect with ${boardMembers[0].name} on LinkedIn`}
                      >
                        <FaLinkedin className="social-icon" />
                      </a>
                    )}
                    {boardMembers[0].email && (
                      <a
                        href={`mailto:${boardMembers[0].email}`}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Email ${boardMembers[0].name}`}
                      >
                        <FaEnvelope className="social-icon" />
                      </a>
                    )}
                    {boardMembers[0].website && (
                      <a
                        href={boardMembers[0].website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Visit ${boardMembers[0].name}'s website`}
                      >
                        <FaGlobe className="social-icon" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {activeMember === boardMembers[0].id && (
                  <motion.div
                    className="expanded-bio"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bio-content">
                      <p>{boardMembers[0].bio}</p>
                      <button
                        className="close-bio"
                        onClick={(e) => {
                          e.stopPropagation();
                          closeBio();
                        }}
                        aria-label="Close biography"
                      >
                        <IoMdClose />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Second row - remaining four members */}
          <div className="second-row">
            {boardMembers.slice(1).map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`member-card ${
                  activeMember === member.id ? "active" : ""
                }`}
                onClick={() => toggleBio(member.id)}
                whileHover={{ y: -10 }}
              >
                <div className="card-inner">
                  <div className="card-image-container">
                    <div className="image-wrapper">
                      {!imageErrors[member.id] ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="member-image"
                          onError={() => handleImageError(member.id)}
                          loading="lazy"
                        />
                      ) : (
                        <div className="member-image-fallback">
                          {getInitials(member.name)}
                        </div>
                      )}
                      <div className="image-hover-effect"></div>
                    </div>
                    <div className="decorative-shape decorative-shape-1"></div>
                    <div className="decorative-shape decorative-shape-2"></div>
                  </div>

                  <div className="card-content">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-position">{member.position}</p>
                    <p className="member-department">{member.department}</p>

                    <div className="social-links">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Connect with ${member.name} on LinkedIn`}
                        >
                          <FaLinkedin className="social-icon" />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Email ${member.name}`}
                        >
                          <FaEnvelope className="social-icon" />
                        </a>
                      )}
                      {member.website && (
                        <a
                          href={member.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Visit ${member.name}'s website`}
                        >
                          <FaGlobe className="social-icon" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {activeMember === member.id && (
                    <motion.div
                      className="expanded-bio"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bio-content">
                        <p>{member.bio}</p>
                        <button
                          className="close-bio"
                          onClick={(e) => {
                            e.stopPropagation();
                            closeBio();
                          }}
                          aria-label="Close biography"
                        >
                          <IoMdClose />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisoryBoard;