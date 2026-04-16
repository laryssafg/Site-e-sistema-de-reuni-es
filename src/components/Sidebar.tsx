/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LayoutDashboard, Calendar, PlusCircle, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  onLogout: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'new', label: 'Nova Reunião', icon: PlusCircle },
    { id: 'meetings', label: 'Reuniões', icon: Calendar },
  ];

  return (
    <motion.div 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
      className="bg-primary text-white h-screen flex flex-col shadow-xl relative z-20 w-64 lg:w-auto"
    >
      <div className={`p-6 flex flex-col ${isCollapsed ? 'items-center' : ''}`}>
        <div className={`mb-6 flex ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
          <img 
            src="https://i.imgur.com/rf5Uglq.png" 
            alt="Logo" 
            className="h-8"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-xl font-bold tracking-tight truncate whitespace-nowrap"
              >
                TechNova
              </motion.h1>
            )}
          </AnimatePresence>
          
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-2 rounded-lg hover:bg-white/10 transition-colors hidden lg:block ${isCollapsed ? '' : 'ml-2'}`}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      <nav className="flex-1 mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={isCollapsed ? item.label : ''}
              className={`w-full flex items-center px-6 py-4 transition-colors relative ${
                isActive ? 'bg-white/10 text-white' : 'text-blue-100 hover:bg-white/5'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute left-0 w-1 h-full bg-blue-400"
                />
              )}
              <Icon size={20} className={isCollapsed ? '' : 'mr-3'} />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>

      <div className={`p-6 border-t border-white/10 ${isCollapsed ? 'flex justify-center' : ''}`}>
        <button 
          onClick={onLogout}
          className="flex items-center text-blue-100 hover:text-white transition-colors"
        >
          <LogOut size={20} className={isCollapsed ? '' : 'mr-3'} />
          {!isCollapsed && <span className="font-medium whitespace-nowrap">Sair</span>}
        </button>
      </div>
    </motion.div>
  );
}
