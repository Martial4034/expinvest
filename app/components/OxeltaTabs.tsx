'use client'

import { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import Tab1Content from './tabs/Tab1Content';
import Tab2Content from './tabs/Tab2Content';
import Tab3Content from './tabs/Tab3Content';
import Tab4Content from './tabs/Tab4Content';

export function OxeltaTabs() {
  const [activeTab, setActiveTab] = useState('tab1');

  const tabs = [
    { id: 'tab1', label: 'Onglet 1' },
    { id: 'tab2', label: 'Onglet 2' },
    { id: 'tab3', label: 'Onglet 3' },
    { id: 'tab4', label: 'Onglet 4' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'tab1':
        return <Tab1Content />;
      case 'tab2':
        return <Tab2Content />;
      case 'tab3':
        return <Tab3Content />;
      case 'tab4':
        return <Tab4Content />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl w-full">
      <div className="flex space-x-4 mb-4">
        {tabs.map(tab => (
          <Button
            key={tab.id}
            variant="ghost"
            className={`flex-1 text-center ${activeTab === tab.id ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <Card className="p-4 border-2 border-transparent bg-gradient-to-r from-[#5CDDE5] to-[#0350AF]">
        {renderContent()}
      </Card>
    </div>
  );
}
