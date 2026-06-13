/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BackToTop from './components/BackToTop';
import MortgageCalculator from './components/MortgageCalculator';

import HomeView from './views/HomeView';
import ProjectsView from './views/ProjectsView';
import ProjectDetailView from './views/ProjectDetailView';
import AboutView from './views/AboutView';
import MaintenanceView from './views/MaintenanceView';
import ContactView from './views/ContactView';

import { Project } from './types';
import { projectsData, testimonialsData, partnersData } from './data';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calculator } from 'lucide-react';

export default function App() {
  // Routing states
  const [currentView, setCurrentView] = useState<'home' | 'projects' | 'about' | 'maintenance' | 'contact' | 'project-detail'>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [redirectSearchParams, setRedirectSearchParams] = useState<any>(null);

  // Widget States
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // Auto-scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [currentView, selectedProjectId]);

  // Handle high-continuity route propagation
  const handleNavigate = (view: any, projectId: string | null = null, searchParams: any = null) => {
    if (searchParams) {
      setRedirectSearchParams(searchParams);
    } else {
      setRedirectSearchParams(null);
    }

    if (projectId) {
      setSelectedProjectId(projectId);
    }
    
    setCurrentView(view);
  };

  // Find active project for detail view
  const activeDetailProject = projectsData.find((p) => p.id === selectedProjectId) || projectsData[0];

  return (
    <div id="afaq-realestate-app" className="flex flex-col min-h-screen relative antialiased selection:bg-brand-accent selection:text-brand-dark overflow-x-hidden">
      
      {/* 1. Header Sticky component */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        allProjects={projectsData}
      />

      {/* 2. Primary Route Dynamic Swapper with gorgeous fluid transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentView}-${selectedProjectId}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {currentView === 'home' && (
              <HomeView
                projects={projectsData}
                testimonials={testimonialsData}
                partners={partnersData}
                onNavigate={handleNavigate}
              />
            )}

            {currentView === 'projects' && (
              <ProjectsView
                projects={projectsData}
                onNavigate={handleNavigate}
                initialFilters={redirectSearchParams}
              />
            )}

            {currentView === 'project-detail' && (
              <ProjectDetailView
                project={activeDetailProject}
                onNavigate={(v) => handleNavigate(v)}
              />
            )}

            {currentView === 'about' && <AboutView />}

            {currentView === 'maintenance' && <MaintenanceView projects={projectsData} />}

            {currentView === 'contact' && <ContactView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Global Sticky Footer */}
      <Footer onNavigate={(v) => handleNavigate(v as any)} />

      {/* 4. Interactive Floating widgets */}
      {/* Back to top circular widget */}
      <BackToTop />

      {/* Floating Smart WhatsApp message trigger */}
      <WhatsAppButton 
        currentProjectName={currentView === 'project-detail' ? activeDetailProject.title : undefined}
      />

      {/* 5. Portal MODALS overlays */}
      
      {/* Comparison matrix curtain Removed */}

      {/* Modular Mortgage Calculator panel overlay modal */}
      {isCalculatorOpen && (
        <div id="calculator-curtain-overlay" className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setIsCalculatorOpen(false)}
              className="absolute top-4 left-4 p-1.5 hover:bg-slate-100 rounded-full text-slate-500 font-bold z-10 transition-colors"
            >
              X
            </button>
            <MortgageCalculator 
              initialPrice={currentView === 'project-detail' ? activeDetailProject.price : undefined} 
              projectName={currentView === 'project-detail' ? activeDetailProject.title : undefined}
              onClose={() => setIsCalculatorOpen(false)} 
            />
          </div>
        </div>
      )}

    </div>
  );
}
