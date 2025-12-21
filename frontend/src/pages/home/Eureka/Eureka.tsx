import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Eureka.module.css';

import eureka from '../../../assets/erueka/mainposter.webp';

const Eureka: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/eureka');
  };

  return (
    <div className={styles.eurekaContainer}>
      <div className={styles.eurekaContent}>
        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            <img 
              src={eureka}
              alt="Eureka concept - Lightbulb moment with digital elements"
              className={styles.eurekaImage}
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzMzMyI+RXVyZWthIENvbmNlcHQgSW1hZ2U8L3RleHQ+PC9zdmc+';
              }}
            />
            <div className={styles.imageOverlay}></div>
          </div>
        </div>
        <div className={styles.textSection}>
          <h1 className={styles.title}>
            <span className={styles.titleMain}>Eureka</span>
          </h1>
          
          <p className={styles.description}>
            Where Technical Brilliance Meets Cultural Rhythms
          December 26-31, 2025 | SGC RGUKT
          </p>
          
          <button 
            className={styles.ctaButton}
            onClick={handleButtonClick}
            aria-label="Navigate to Eureka page"
          >
            <span className={styles.buttonText}>Explore Eureka</span>
            <span className={styles.buttonIcon}>→</span>
          </button>
        </div>
        
      </div>
      
      <div className={styles.decorativeElements}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
    </div>
  );
};

export default Eureka;