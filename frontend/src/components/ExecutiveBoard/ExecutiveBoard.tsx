import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import "./ExecutiveBoard.css";

//members images
import chairman from "../../assets/advisoryBoardimgs/chairman.webp";
import vc1 from "../../assets/advisoryBoardimgs/vc1.webp";
import vc2 from "../../assets/advisoryBoardimgs/vc2.webp";
import vc3 from "../../assets/advisoryBoardimgs/vc3.webp";
import president from "../../assets/executiveimgs/president.webp";
import pucVp1 from "../../assets/executiveimgs/pucVp1.webp";
import pucvp2 from "../../assets/executiveimgs/pucvp2.webp";
import civilvp from "../../assets/executiveimgs/civilvp.webp";
import eeeVp from "../../assets/executiveimgs/eeeVp.webp";
import pr from "../../assets/executiveimgs/pr.webp";
import apr1 from "../../assets/executiveimgs/apr1.webp";
import sm from "../../assets/executiveimgs/sm.webp";
import asm1 from "../../assets/executiveimgs/asm1.webp";
import asm2 from "../../assets/executiveimgs/asm2.webp";
import wom from "../../assets/webteam/m2.webp";
import awom from "../../assets/webteam/m3.webp";

interface BoardMember {
  id: number;
  name: string;
  position: string;
  image: string;
  department?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

const ExecutiveBoard: React.FC = () => {
  const boardMembers: BoardMember[] = [
    {
      id: 1,
      name: "Mr. Ravi Gedela",
      position: "Chairman",
      image: chairman,
      social: {
        linkedin: "https://www.linkedin.com/in/ravi-gedela",
      },
    },
    {
      id: 2,
      name: "Mr. P.Kutti",
      position: "Vice Chairman",
      image: vc1,
      department: "IT",
      social: {
        linkedin: "https://www.linkedin.com/in/p-kutti-123456789/",
      },
    },
    {
      id: 3,
      name: "Mrs. R.Deepa",
      position: "Vice Chairman",
      image: vc2,
      department: "IT",
      social: {
        linkedin: "https://www.linkedin.com/in/r-deepa-123456789/",
      },
    },
    {
      id: 4,
      name: "Mr. T.Narashimaappadu",
      position: "Vice Chairman",
      image: vc3,
      department: "CSE",
      social: {
        linkedin: "https://www.linkedin.com/in/t-narashimaappadu-123456789/",
      },
    },
    {
      id: 5,
      name: "K. Guna Sri",
      position: "President",
      image: president,
      department: "CSE",
      social: {
        linkedin:
          "https://www.linkedin.com/in/kimidi-gunasri-38151931a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    },
    {
      id: 6,
      name: "K. Jai Sheel",
      position: "Vice President (CSE)",
      image:
        "https://thumbs.dreamstime.com/b/person-line-icon-outline-vector-sign-linear-style-pictogram-isolated-white-user-account-member-symbol-logo-illustration-88294009.jpg",
      department: "CSE",
      social: {
        linkedin:
          "https://www.linkedin.com/in/jaisheel-karlapudi-b5a558325?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    },
    {
      id: 7,
      name: "K. Pavan Kumar",
      position: "Vice President (ECE)",
      image:
        "https://thumbs.dreamstime.com/b/person-line-icon-outline-vector-sign-linear-style-pictogram-isolated-white-user-account-member-symbol-logo-illustration-88294009.jpg",
      department: "ECE",
      social: {
        linkedin: "https://www.linkedin.com/in/kyvpkr/",
      },
    },
    {
      id: 8,
      name: "Vyshnavi",
      position: "Vice President (CIVIL)",
      image: civilvp,
      department: "CIVIL",
      social: {
        linkedin:
          "https://www.linkedin.com/in/vyeshnavi-kandapu-5a3033322?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    },
    {
      id: 9,
      name: "G. Rakesh",
      position: "Vice President (MECH)",
      image:
        "https://thumbs.dreamstime.com/b/person-line-icon-outline-vector-sign-linear-style-pictogram-isolated-white-user-account-member-symbol-logo-illustration-88294009.jpg",
      department: "MECH",
      social: {
        linkedin: "https://www.linkedin.com/in/g-rakesh-123456789/",
      },
    },
    {
      id: 10,
      name: "G. Nishanth Reddy",
      position: "Vice President (EEE)",
      image: eeeVp,
      department: "EEE",
      social: {
        linkedin:
          "https://www.linkedin.com/in/nishanth-reddy-1174a735b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    },
    {
      id: 11,
      name: "K. Smily Grace",
      position: "Vice President (PUC)",
      image: pucvp2,
      department: "CSE",
      social: {
        linkedin:
          "https://www.linkedin.com/in/smily-grace-kommala-1b6552325?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    },
    {
      id: 12,
      name: "D. Sandhya",
      position: "Vice President (PUC)",
      image: pucVp1,
      department: "ECE",
      social: {
        linkedin:
          "https://www.linkedin.com/in/sandhya-desetti-b04686297?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    },
    {
      id: 13,
      name: "Y. Srinivas",
      position: "Public Relations Manager",
      image: pr,
      department: "ECE",
      social: {
        linkedin:
          "https://www.linkedin.com/in/srinivas262?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    },
    {
      id: 14,
      name: "P. Gangadhar",
      position: "Associate Public Relations Manager",
      image: apr1,
      department: "CSE",
      social: {
        linkedin:
          "https://www.linkedin.com/in/gangadhar-pamisetty-3ba74131b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    },
    {
      id: 15,
      name: "N. Govardhan",
      position: "Associate Public Realtions Manager",
      image:
        "https://thumbs.dreamstime.com/b/person-line-icon-outline-vector-sign-linear-style-pictogram-isolated-white-user-account-member-symbol-logo-illustration-88294009.jpg",
      department: "ECE",
      social: {
        linkedin:
          "https://www.linkedin.com/in/neelanti-govardhan-5548aa320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    },
    {
      id: 16,
      name: "K. Gayathri",
      position: "Social Media Manager",
      image: sm,
      department: "ECE",
      social: {
        linkedin:
          "https://www.linkedin.com/in/gayathri-killada-6461b4267?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    },
    {
      id: 17,
      name: "P. Gireesh Satya",
      position: "Associate Social Media Manager",
      image: asm2,
      department: "EEE",
      social: {
        linkedin:
          "https://www.linkedin.com/in/gireesh-satya-170358370?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    },
    {
      id: 18,
      name: "Ch. Jeevan Sai",
      position: "Associate Social Media Manager",
      image: asm1,
      department: "CSE",
      social: {
        linkedin:
          "https://www.linkedin.com/in/chukka-jeevan-sai-530400335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    },
    {
      id: 19,
      name: "Harish",
      position: "Associate Web Operations Manager",
      image: awom,
      department: "CSE",
      social: {
        linkedin: "https://www.linkedin.com/in/harish-123456789/",
      },
    },
    {
      id: 20,
      name: "Raviteja",
      position: "Web operations Manager",
      image: wom,
      department: "CSE",
      social: {
        linkedin: "https://www.linkedin.com/in/raviteja-123456789/",
      },
    },
  ];

  const FloatingElements = () => (
    <>
      <motion.div
        className="floating-element floating-circle"
        initial={{ x: -100, y: -50 }}
        animate={{
          x: [0, 100, 0, -100, 0],
          y: [0, -50, 0, 50, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="floating-element floating-triangle"
        initial={{ x: 100, y: 100 }}
        animate={{
          x: [0, -80, 0, 80, 0],
          y: [0, 60, 0, -60, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="floating-element floating-square"
        initial={{ x: -150, y: 150 }}
        animate={{
          x: [0, 120, 0, -120, 0],
          y: [0, -80, 0, 80, 0],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />
    </>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      y: -10,
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
      transition: {
        duration: 0.3,
      },
    },
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      y: -3,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.9,
    },
  };

  const getCardClass = (position: string) => {
    switch (position.toLowerCase()) {
      case "chairman":
        return "card-chairman";
      case "vice chairman":
        return "card-vice-chairman";
      case "president":
        return "card-president";
      default:
        return "card-member";
    }
  };

  // Separate members by position
  const chairmanMember = boardMembers.find((m) => m.position === "Chairman");
  const viceChairmen = boardMembers.filter(
    (m) => m.position === "Vice Chairman"
  );
  const presidentMember = boardMembers.find((m) => m.position === "President");

  // All other members (excluding chairman, vice chairmen, and president)
  const otherMembers = boardMembers.filter(
    (m) =>
      m.position !== "Chairman" &&
      m.position !== "Vice Chairman" &&
      m.position !== "President"
  );

  const renderMemberCard = (member: BoardMember) => (
    <motion.div
      key={member.id}
      className={`board-card ${getCardClass(member.position)} ${
        member.position === "Chairman"
          ? "chairman-card"
          : member.position === "President"
          ? "president-card"
          : member.position === "Vice Chairman"
          ? "vice-chairman-card"
          : ""
      }`}
      variants={cardVariants}
      whileHover="hover"
    >
      <div className="card-image-container">
        <img
          src={member.image || "https://via.placeholder.com/150"}
          alt={member.name}
          className="card-image"
        />
      </div>
      <div className="card-content">
        <h3 className="card-name">{member.name}</h3>
        <p className="card-position">{member.position}</p>
        {member.department && (
          <p className="card-department">{member.department}</p>
        )}

        {member.social && (
          <div className="social-icons">
            {member.social.linkedin && (
              <motion.a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaLinkedin className="social-icon linkedin" />
              </motion.a>
            )}
            {member.social.twitter && (
              <motion.a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaTwitter className="social-icon twitter" />
              </motion.a>
            )}
            {member.social.facebook && (
              <motion.a
                href={member.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaFacebook className="social-icon facebook" />
              </motion.a>
            )}
            {member.social.instagram && (
              <motion.a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaInstagram className="social-icon instagram" />
              </motion.a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="executive-board">
      <FloatingElements />
      <div className="board-header ">
        <h1 className="board-title">Executive Board</h1>
        <p className="board-subtitle">
          Leadership that drives our vision forward
        </p>
      </div>

      <motion.div
        className="board-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* First row - Chairman */}
        {chairmanMember && (
          <div className="chairman-row-container">
            {renderMemberCard(chairmanMember)}
          </div>
        )}

        {/* Second row - Vice Chairmen in a row */}
        {viceChairmen.length > 0 && (
          <div className="vice-chairmen-row-container">
            {viceChairmen.map((member) => renderMemberCard(member))}
          </div>
        )}

        {/* Third row - President */}
        {presidentMember && (
          <div className="president-row-container">
            {renderMemberCard(presidentMember)}
          </div>
        )}

        {/* Remaining members in 3-column layout */}
        <div className="regular-rows-container">
          {otherMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className={`board-card ${getCardClass(member.position)}`}
              variants={cardVariants}
              whileHover="hover"
              custom={index}
            >
              <div className="card-image-container">
                <img
                  src={member.image || "https://via.placeholder.com/150"}
                  alt={member.name}
                  className="card-image"
                />
              </div>
              <div className="card-content">
                <h3 className="card-name">{member.name}</h3>
                <p className="card-position">{member.position}</p>
                {member.department && (
                  <p className="card-department">{member.department}</p>
                )}

                {member.social && (
                  <div className="social-icons">
                    {member.social.linkedin && (
                      <motion.a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={iconVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <FaLinkedin className="social-icon linkedin" />
                      </motion.a>
                    )}
                    {member.social.twitter && (
                      <motion.a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={iconVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <FaTwitter className="social-icon twitter" />
                      </motion.a>
                    )}
                    {member.social.facebook && (
                      <motion.a
                        href={member.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={iconVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <FaFacebook className="social-icon facebook" />
                      </motion.a>
                    )}
                    {member.social.instagram && (
                      <motion.a
                        href={member.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={iconVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <FaInstagram className="social-icon instagram" />
                      </motion.a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ExecutiveBoard;
