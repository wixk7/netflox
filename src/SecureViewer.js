import React, { useEffect, useState } from 'react';
import './SecureViewer.css';

const SecureViewer = ({ imageUrl }) => {
  const [isBlurred, setIsBlurred] = useState(false);

  // Activate protection and save state to localStorage
  const activateProtection = () => {
    setIsBlurred(true);
    localStorage.setItem('isBlurred', 'true');
  };

  // Deactivate protection with Ctrl+M
  const deactivateProtection = () => {
    setIsBlurred(false);
    localStorage.setItem('isBlurred', 'false');
  };

  useEffect(() => {
    // Restore state from localStorage
    const savedState = localStorage.getItem('isBlurred');
    if (savedState === 'true') {
      setIsBlurred(true);
    }

    // Handle key press events
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'm') {
        deactivateProtection();
      } else {
        activateProtection();
      }
    };

    // Prevent context menu
    const handleContextMenu = (event) => {
      event.preventDefault();
      activateProtection();
    };

    // Blackout on focus loss
    const handleBlur = () => {
      activateProtection();
    };

    // Event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return (
    <div className="secure-viewer">
      <div className={`overlay ${isBlurred ? 'active' : ''}`}>
        {isBlurred && <p>Content Protected</p>}
      </div>
      <img src={imageUrl} alt="Secure Content" className={`secure-image ${isBlurred ? 'blurred' : ''}`} />
    </div>
  );
};

export default SecureViewer;
