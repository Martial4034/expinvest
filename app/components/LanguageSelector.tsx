import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const LanguageSelector: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<string>('en');
  console.log(language)
  useEffect(() => {
    const languageSelected = localStorage.getItem("languageSelected");
    if (!languageSelected) {
      setOpen(true);
    } else {
      setLanguage(languageSelected);
    }
  }, []);

  const handleLanguageSelect = (lang: string) => {
    localStorage.setItem("languageSelected", lang);
    setLanguage(lang);
    setOpen(false);
    window.location.reload();
  };

  return (
    <div style={{
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      padding: '1rem',
      zIndex: 9999
    }}>


      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        maxWidth="xs" 
        fullWidth
        style={{ zIndex: 10000 }}
      >
        <div style={{ 
            backgroundImage: 'url(/Background/Cloud.png)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat', 
            padding: '20px', 
            height: '100%' 
          }}>
          <DialogTitle className="text-center qual-title">Select Language</DialogTitle>
          <DialogContent>
            <div className="flex justify-center space-x-4">
              <button onClick={() => handleLanguageSelect("en")} className="border-none bg-transparent p-0">
                <Image src="/flags/uk.png" alt="English" width={96} height={64} />
              </button>
              <button onClick={() => handleLanguageSelect("fr")} className="border-none bg-transparent p-0">
                <Image src="/flags/fr.png" alt="Français" width={96} height={64} />
              </button>
            </div>
          </DialogContent>
          <DialogActions className="flex justify-center">
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default LanguageSelector;
