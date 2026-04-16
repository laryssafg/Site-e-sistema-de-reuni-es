/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate 
} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MeetingForm from './components/MeetingForm';
import CalendarView from './components/CalendarView';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';
import { Meeting } from './types';
import { MeetingService } from './services/MeetingService';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, User, Search } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | undefined>(undefined);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem('technova_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchMeetings();
    }
  }, [isAuthenticated]);

  const handleLogin = (email: string, pass: string) => {
    if (email === 'laryssa.ferreira@technovasystems.com.br' && pass === '19122002Laah') {
      setIsAuthenticated(true);
      localStorage.setItem('technova_auth', 'true');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('technova_auth');
    setActiveTab('dashboard');
    window.location.href = '/';
  };

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      const data = await MeetingService.getAll();
      setMeetings(data);
    } catch (error) {
      console.error('Error fetching meetings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMeeting = async (data: any) => {
    try {
      if (editingMeeting) {
        await MeetingService.update(editingMeeting.id, data);
      } else {
        await MeetingService.create(data);
      }
      await fetchMeetings();
      setActiveTab('meetings');
      setEditingMeeting(undefined);
    } catch (error) {
      console.error('Error saving meeting:', error);
      alert('Erro ao salvar reunião. Verifique os campos.');
    }
  };

  const handleEdit = (meeting: Meeting) => {
    setEditingMeeting(meeting);
    setActiveTab('new');
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deseja realmente excluir esta reunião?')) {
      try {
        await MeetingService.delete(id);
        await fetchMeetings();
      } catch (error) {
        console.error('Error deleting meeting:', error);
      }
    }
  };

  const renderContent = () => {
    if (loading) return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard meetings={meetings} />;
      case 'new':
        return (
          <MeetingForm 
            initialData={editingMeeting}
            meetings={meetings}
            onSave={handleSaveMeeting} 
            onCancel={() => {
              setActiveTab('meetings');
              setEditingMeeting(undefined);
            }} 
          />
        );
      case 'meetings':
        return (
          <CalendarView 
            meetings={meetings} 
            onAddMeeting={() => {
              setEditingMeeting(undefined);
              setActiveTab('new');
            }}
            onEditMeeting={handleEdit}
            onDeleteMeeting={handleDelete}
          />
        );
      default:
        return <Dashboard meetings={meetings} />;
    }
  };

  const InternalApp = () => {
    if (!isAuthenticated) {
      return <LoginPage onLogin={handleLogin} />;
    }

    return (
      <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
        {/* Overlay for mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            />
          )}
        </AnimatePresence>

        <div className={`fixed inset-y-0 left-0 z-40 lg:relative lg:translate-x-0 transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={(tab) => {
              setActiveTab(tab);
              if (tab !== 'new') setEditingMeeting(undefined);
              setIsMobileMenuOpen(false); // Close menu on mobile after selection
            }} 
            isCollapsed={isSidebarCollapsed}
            setIsCollapsed={setIsSidebarCollapsed}
            onLogout={handleLogout}
          />
        </div>

        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 shrink-0">
            <div className="flex items-center text-gray-400 min-w-0">
               <button 
                 onClick={() => setIsMobileMenuOpen(true)}
                 className="p-2 mr-1 text-gray-600 lg:hidden hover:bg-gray-100 rounded-lg transition-colors shrink-0"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
               </button>
               <span className="text-[10px] lg:text-sm font-medium mr-1 hidden sm:inline truncate">TechNova Systems</span>
               <span className="mx-1 hidden sm:inline">/</span>
               <span className="text-xs lg:text-sm font-bold text-gray-800 capitalize truncate">{activeTab}</span>
            </div>

            <div className="flex items-center space-x-3 lg:space-x-6">
              <div className="relative hidden xl:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Pesquisar..." 
                  className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-48 focus:w-64 transition-all"
                />
              </div>
              
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell size={20} />
                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full border-2 border-white" />
              </button>

              <div className="flex items-center space-x-2 lg:space-x-3 lg:border-l lg:border-gray-100 lg:pl-6">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-gray-800">Administrador</p>
                  <p className="text-[10px] text-gray-500">Acesso Interno</p>
                </div>
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-lg lg:rounded-xl flex items-center justify-center text-blue-600 text-xs lg:text-sm font-bold border-2 border-white shadow-sm">
                  AD
                </div>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app/*" element={<InternalApp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

