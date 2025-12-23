import React, { useState } from 'react';
import styles from './SponsorSection.module.css';
import sponser from '../../../assets/erueka/sponser.webp';
import { FaInstagram, FaYoutube, FaBlog, FaGlobe, FaBullseye } from 'react-icons/fa';

interface SponsorSectionProps {
  sponsorName?: string;
  sponsorType?: string;
  tagline?: string;
  description?: string;
  websiteUrl?: string;
  logoImage?: string;
  eventName?: string;
  socialMedia?: {
    instagram?: string;
    youtube?: string;
    blog?: string;
    [key: string]: string | undefined;
  };
}

const SponsorSection: React.FC<SponsorSectionProps> = ({
  sponsorName = "DREAM COLLEGE PATH",
  sponsorType = "Overseas Sponsor",
  tagline = "Empowering Your College Journey",
  description = "Dream College Path is a comprehensive platform designed to empower high school students on their journey to college. Whether you're aiming for your dream school or exploring various options, we provide the tools and resources to help you navigate the college admissions process with confidence. From discovering the best colleges for your academic and personal goals to preparing standout applications, we've got you covered.",
  websiteUrl = "https://dreamcollegepath.com",
  logoImage = sponser,
  eventName = "EUREKA 2025",
  socialMedia = {
    instagram: "https://instagram.com/dreamcollegepath",
    youtube: "https://youtube.com/@dreamcollegepath",
    blog: "https://dreamcollegepath.com/blog.html"
  }
}) => {
  const [imageError, setImageError] = useState(false);
  
  const handleVisitWebsite = () => {
    window.open(websiteUrl, '_blank', 'noopener,noreferrer');
  };
  
  const handleSocialMediaClick = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };
  
  // Generate fallback logo text safely
  const getFallbackLogoText = () => {
    if (!sponsorName || typeof sponsorName !== 'string') {
      return 'SP';
    }
    
    const words = sponsorName.split(' ');
    if (words.length === 0) return 'SP';
    
    // Take first letter of each word (up to 3 words)
    const initials = words
      .slice(0, 3)
      .map(word => word.charAt(0).toUpperCase())
      .join('');
    
    return initials || 'SP';
  };
  
  // Social media icons configuration with React Icons
  const socialMediaIcons = [
    { 
      key: 'instagram', 
      icon: <FaInstagram />, 
      label: 'Instagram',
      url: socialMedia?.instagram
    },
    { 
      key: 'youtube', 
      icon: <FaYoutube />, 
      label: 'YouTube',
      url: socialMedia?.youtube
    },
    { 
      key: 'blog', 
      icon: <FaBlog />, 
      label: 'Blog',
      url: socialMedia?.blog
    }
  ].filter(item => item.url); // Only show icons with URLs

  return (
    <section className={styles.sponsorSection}>
      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerDecoration}>
            <div className={styles.decorationLine}></div>
            <div className={styles.decorationIcon}>
              ⭐
            </div>
            <div className={styles.decorationLine}></div>
          </div>
          <h2 className={styles.sectionTitle}>Our Overseas Sponsor</h2>
          <p className={styles.sectionSubtitle}>
            Proudly supporting {eventName}
          </p>
        </div>
        
        {/* Main Sponsor Card */}
        <div className={styles.sponsorCard}>
          
          {/* Sponsor Logo Area */}
          <div className={styles.logoArea}>
            <div className={styles.logoContainer}>
              {!imageError && logoImage ? (
                <img 
                  src={logoImage}
                  alt={`${sponsorName} logo`}
                  className={styles.logoImage}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className={styles.logoFallback}>
                  <span className={styles.logoText}>
                    {getFallbackLogoText()}
                  </span>
                </div>
              )}
            </div>
            
            <div className={styles.sponsorTagline}>
              <div className={styles.taglineIcon}>
                <FaBullseye />
              </div>
              <p>{tagline}</p>
            </div>
            
            {/* Social Media Icons */}
            {socialMediaIcons.length > 0 && (
              <div className={styles.socialMediaSection}>
                <div className={styles.socialMediaTitle}>Connect With Us</div>
                <div className={styles.socialMediaIcons}>
                  {socialMediaIcons.map((social) => (
                    <button
                      key={social.key}
                      className={styles.socialMediaButton}
                      onClick={() => handleSocialMediaClick(social.url)}
                      aria-label={`Visit ${sponsorName} ${social.label}`}
                      title={`Visit ${sponsorName} ${social.label}`}
                    >
                      <span className={styles.socialMediaIcon}>{social.icon}</span>
                      <span className={styles.socialMediaLabel}>{social.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sponsor Details */}
          <div className={styles.detailsArea}>
            <div className={styles.sponsorHeader}>
              <h3 className={styles.sponsorName}>{sponsorName}</h3>
              <div className={styles.sponsorTypeBadge}>
                {sponsorType.toUpperCase()}
              </div>
            </div>
            
            <div className={styles.description}>
              <p>{description}</p>
              
              <div className={styles.missionStatement}>
                <div className={styles.missionIcon}>
                  ✨
                </div>
                <p className={styles.missionText}>
                  Helping thousands of students choose the right career path through expert guidance and personalized support.
                </p>
              </div>
            </div>
            
            {/* CTA Section */}
            <div className={styles.ctaSection}>
              <div className={styles.websiteInfo}>
                <div className={styles.websiteLabel}>Official Website</div>
                <a 
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.websiteLink}
                >
                  {websiteUrl.replace('https://', '')}
                </a>
              </div>
              
              <button 
                onClick={handleVisitWebsite}
                className={styles.visitButton}
                aria-label={`Visit ${sponsorName} website`}
              >
                <span>Explore Now</span>
                <FaGlobe className={styles.buttonArrow} />
              </button>
            </div>
            
            <div className={styles.partnershipNote}>
              <div className={styles.partnershipIcon}>
                🤝
              </div>
              <p>
                We are proud to have <strong>{sponsorName}</strong> as our {sponsorType.toLowerCase()} for {eventName}, 
                supporting innovation, learning, and student excellence at RGUKT.
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default SponsorSection;