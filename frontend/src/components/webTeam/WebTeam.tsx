// WebTeam.tsx
import { FaLinkedin, FaGithub, FaTwitter, FaGlobe } from "react-icons/fa";
import styles from "./WebTeam.module.css";

// Import your team member images
import team1 from "../../assets/webteam/m1.webp";
import team2 from "../../assets/webteam/m2.webp";
import team3 from "../../assets/webteam/m3.webp";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  linkedin: string;
  github?: string;
  twitter?: string;
  website?: string;
  image: string;
  skills: string[];
}

const WebTeam = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "M. Rakesh",
      role: "Fullstack Developer",
      bio: "Specializes in React and TypeScript with 1 year of experience building responsive web applications.",
      linkedin: "https://www.linkedin.com/in/rakesh-mummana-16379931a",
      github: "#",
      twitter: "#",
      website: "#",
      image: team1,
      skills: ["React", "TypeScript", "Node.js", "MongoDB"],
    },
    {
      id: 2,
      name: "P. Raviteja",
      role: "Frontend Developer",
      bio: "Passionate about creating intuitive user experiences with a focus on accessibility and modern design principles.",
      linkedin: "https://www.linkedin.com/in/ravi-teja-pulibanti-28872132b",
      github: "#",
      twitter: "#",
      website: "#",
      image: team2,
      skills: ["React", "Next.js", "Tailwind CSS", "Figma"],
    },
    {
      id: 3,
      name: "Harish Majji",
      role: "Backend Developer",
      bio: "Expert in Node.js and database architecture with a strong emphasis on scalable solutions.",
      linkedin: "https://www.linkedin.com/in/majji-harish-064376325",
      github: "#",
      twitter: "#",
      website: "#",
      image: team3,
      skills: ["Node.js", "Express", "PostgreSQL", "Redis"],
    },
  ];

  return (
    <section className={styles.webTeamSection} id="team">
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <span className={styles.sectionTag}>Our Team</span>
          <h1 className={styles.title}>Meet Our Web Development Team</h1>
          {/* <p className={styles.subtitle}>
            Talented developers crafting exceptional digital experiences with modern technologies and innovative solutions.
          </p> */}
        </div>

        {/* Team Grid */}
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={styles.memberCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Profile Image */}
              <div className={styles.profileImageContainer}>
                <div className={styles.imageWrapper}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className={styles.profileImage}
                    loading="lazy"
                  />
                </div>
                <div className={styles.roleBadge}>{member.role}</div>
              </div>

              {/* Member Info */}
              <div className={styles.memberInfo}>
                <h3 className={styles.memberName}>{member.name}</h3>

                {/* Skills */}
                <div className={styles.skillsContainer}>
                  {member.skills.map((skill, idx) => (
                    <span key={idx} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Bio */}
                <p className={styles.memberBio}>{member.bio}</p>

                {/* Social Links */}
                <div className={styles.socialLinks}>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={`Connect with ${member.name} on LinkedIn`}
                  >
                    <FaLinkedin />
                  </a>
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={`View ${member.name}'s GitHub`}
                    >
                      <FaGithub />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={`Follow ${member.name} on Twitter`}
                    >
                      <FaTwitter />
                    </a>
                  )}
                  {member.website && (
                    <a
                      href={member.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={`Visit ${member.name}'s website`}
                    >
                      <FaGlobe />
                    </a>
                  )}
                </div>

                {/* LinkedIn Button */}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkedinButton}
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Team Stats */}
        {/* <div className={styles.teamStats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{teamMembers.length}</span>
            <span className={styles.statLabel}>Team Members</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>20+</span>
            <span className={styles.statLabel}>Projects</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>10+</span>
            <span className={styles.statLabel}>Technologies</span>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default WebTeam;
