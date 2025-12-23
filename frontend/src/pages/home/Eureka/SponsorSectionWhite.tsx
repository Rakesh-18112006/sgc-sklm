import React, { useState } from 'react';
import styles from './SponsorSectionWhite.module.css';
import { FaExternalLinkAlt, FaInstagram, FaYoutube, FaGlobe, FaHandshake } from 'react-icons/fa';
import sponser from '../../../assets/erueka/sponser.webp';

interface SponsorSectionWhiteProps {
  sponsorName?: string;
  sponsorType?: string;
  tagline?: string;
  websiteUrl?: string;
  logoImage?: string;
  socialMedia?: {
    instagram?: string;
    youtube?: string;
    [key: string]: string | undefined;
  };
}

const SponsorSectionWhite: React.FC<SponsorSectionWhiteProps> = ({
  sponsorName = "DREAM COLLEGE PATH",
  sponsorType = "Overseas Sponsor",
  tagline = "Empowering Your College Journey",
  websiteUrl = "https://dreamcollegepath.com",
  logoImage = sponser, // Leave empty for fallback
  socialMedia = {
    instagram: "https://instagram.com/dreamcollegepath",
    youtube: "https://youtube.com/@dreamcollegepath"
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
  
  // Generate fallback logo text
  const getFallbackLogoText = () => {
    if (!sponsorName || typeof sponsorName !== 'string') {
      return 'SP';
    }
    
    const words = sponsorName.split(' ');
    if (words.length === 0) return 'SP';
    
    const initials = words
      .slice(0, 2)
      .map(word => word.charAt(0).toUpperCase())
      .join('');
    
    return initials || 'SP';
  };
  
  // Social media icons
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
    }
  ].filter(item => item.url);

  return (
    <section className={styles.sponsorSection}>
      <div className={styles.container}>
        
        {/* Minimal Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Sponsor</h2>
          <p className={styles.sectionSubtitle}>Proudly Supporting Our Event</p>
        </div>
        
        {/* Sponsor Card */}
        <div className={styles.sponsorCard}>
          
          {/* Logo Section */}
          <div className={styles.logoSection}>
            <div className={styles.logoContainer}>
              {logoImage && !imageError ? (
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
            
            <div className={styles.sponsorInfo}>
              <h3 className={styles.sponsorName}>{sponsorName}</h3>
              <div className={styles.sponsorType}>{sponsorType}</div>
              <p className={styles.sponsorTagline}>{tagline}</p>
            </div>
          </div>
          
          {/* Divider */}
          <div className={styles.divider}></div>
          
          {/* Actions Section */}
          <div className={styles.actionsSection}>
            
            {/* Website Link */}
            <div className={styles.websiteSection}>
              <div className={styles.websiteLabel}>
                <FaGlobe className={styles.websiteIcon} />
                Visit Website
              </div>
              <a 
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.websiteLink}
              >
                {websiteUrl.replace('https://', '')}
                <FaExternalLinkAlt className={styles.externalIcon} />
              </a>
            </div>
            
            {/* Social Media */}
            {socialMediaIcons.length > 0 && (
              <div className={styles.socialSection}>
                <div className={styles.socialLabel}>Follow Us</div>
                <div className={styles.socialIcons}>
                  {socialMediaIcons.map((social) => (
                    <button
                      key={social.key}
                      className={styles.socialButton}
                      onClick={() => handleSocialMediaClick(social.url)}
                      aria-label={`Visit ${sponsorName} ${social.label}`}
                      title={`Visit ${sponsorName} ${social.label}`}
                    >
                      {social.icon}
                    </button>
                  ))}
                </div>
              </div>
            )}
            

          </div>
        </div>
        
      </div>
    </section>
  );
};

export default SponsorSectionWhite;