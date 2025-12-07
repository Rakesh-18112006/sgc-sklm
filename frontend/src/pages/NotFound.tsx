import styles from './NotFound.module.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.errorCode}>
                    <span className={styles.number}>4</span>
                    <span className={styles.number}>0</span>
                    <span className={styles.number}>4</span>
                </div>
                
                <h1 className={styles.title}>Page Not Found</h1>
                
                <p className={styles.description}>
                    Oops! The page you're looking for seems to have wandered off into the digital void.
                    It might have been moved, deleted, or perhaps never existed.
                </p>
                
                <div className={styles.actions}>
                    <Link to="/" className={styles.homeButton}>
                        <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Back to Home
                    </Link>
                    
                    <button 
                        className={styles.reloadButton}
                        onClick={() => window.location.reload()}
                    >
                        <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Reload Page
                    </button>
                </div>
                
                <div className={styles.searchContainer}>
                    <p className={styles.searchHint}>Or try searching for what you need:</p>
                    <div className={styles.searchBox}>
                        <input 
                            type="text" 
                            placeholder="Search..."
                            className={styles.searchInput}
                        />
                        <button className={styles.searchButton}>
                            <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            
            <div className={styles.decoration}>
                <div className={styles.orbit}>
                    <div className={styles.planet}></div>
                </div>
                <div className={styles.star}></div>
                <div className={styles.star} style={{top: '30%', left: '20%', animationDelay: '1s'}}></div>
                <div className={styles.star} style={{top: '60%', left: '80%', animationDelay: '2s'}}></div>
            </div>
        </div>
    );
};

export default NotFound;