'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import Tab1Content from './tabs/Tab1Content';
import Tab2Content from './tabs/Tab2Content';
import Tab4Content from './tabs/Tab4Content';

export function OxeltaTabs() {
  const [activeTab, setActiveTab] = useState('tab1');

  const tabs = [
    { id: 'tab1', label: 'OXLT' },
    { id: 'tab4', label: 'Games' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'tab1':
        return <Tab1Content />;
      case 'tab4':
        return <Tab4Content />;
      default:
        return null;
    }
  };

  return (
    <div className="w-[100vw] md:w-[70%] md:h-auto -ml-[env(safe-area-inset-left)] md:ml-0 min-w-[75vw] mobile-landscape:w-screen mobile-landscape:h-screen">
      <Card className="w-full h-full bg-[#1968b0] rounded-none md:rounded-[5rem] mobile-landscape:rounded-none border-0">
        <div className="flex h-[8vh] md:h-20 mobile-landscape:h-[10vh]">
          {tabs.map((tab, index) => (
            <Button
              key={tab.id}
              variant="ghost"
              className={`flex-grow relative text-base md:text-4xl font-bold transition-all duration-300 h-full border-0
                          ${index === 0 ? 'rounded-tl-2xl md:rounded-tl-[5rem] mobile-landscape:rounded-none' : ''}
                          ${index === tabs.length - 1 ? 'rounded-tr-2xl md:rounded-tr-[5rem] mobile-landscape:rounded-none' : ''}
                          ${activeTab === tab.id 
                            ? 'bg-[#1968b0] text-white' 
                            : 'bg-[#1968b0]/70 text-white/80 hover:bg-[#1968b0]/80'}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        
        <div className="relative overflow-hidden h-[92vh] md:h-auto mobile-landscape:h-[90vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              className="p-2 md:p-8 mobile-landscape:p-0 h-full md:min-h-[415px]"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
}