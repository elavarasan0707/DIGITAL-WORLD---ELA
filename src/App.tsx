import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';

import { HeroSection } from './components/home/HeroSection';
import { ClientAttractSection } from './components/home/ClientAttractSection';
import { ServicesSection } from './components/home/ServicesSection';
import { AboutSection } from './components/home/AboutSection';
import { ProjectsSection } from './components/home/ProjectsSection';
import { DigitalGrowthSection } from './components/home/DigitalGrowthSection';
import { AiCommandCenterSection } from './components/home/AiCommandCenterSection';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { ContactSection } from './components/home/ContactSection';
import { NewsletterSection } from './components/home/NewsletterSection';

import { ConsultationBookingModal } from './components/modals/ConsultationBookingModal';
import { ServiceDetailModal } from './components/modals/ServiceDetailModal';
import { AuthPage } from './components/auth/AuthPage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { BlogView } from './components/blog/BlogView';
import { ServiceItem, ProjectItem } from './types';
import { SERVICES_DATA } from './data/mockData';

const MainApp: React.FC = () => {
  const { user } = useAuth();
  
  // Navigation View State
  const [currentView, setCurrentView] = useState<string>('home');

  // Modals
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState<string | undefined>(undefined);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const openBooking = (serviceName?: string) => {
    setBookingService(serviceName || SERVICES_DATA[0].title);
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setBookingService(undefined);
  };

  const handleStartProject = () => {
    if (currentView !== 'home') setCurrentView('home');
    setTimeout(() => {
      const el = document.getElementById('contact');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleExploreServices = () => {
    if (currentView !== 'home') setCurrentView('home');
    setTimeout(() => {
      const el = document.getElementById('services');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handlePillarSelect = (serviceTitle: string) => {
    const found = SERVICES_DATA.find((s) => s.title.toLowerCase().includes(serviceTitle.toLowerCase()));
    if (found) {
      setSelectedService(found);
    } else {
      openBooking(serviceTitle);
    }
  };

  const handleProjectInquiry = (project: ProjectItem) => {
    openBooking(`${project.name} Case Strategy`);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-amber-400 selection:text-slate-950 font-sans antialiased">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        openBookingModal={() => openBooking()}
      />

      {/* Main Content by View */}
      <main>
        {currentView === 'home' && (
          <>
            {/* 1. Full-Screen Cinematic Hero with 3D Interactive Globe */}
            <HeroSection
              onStartProject={handleStartProject}
              onExploreServices={handleExploreServices}
              onBookConsultation={() => openBooking()}
            />

            {/* 2. Client-Attracting Section (4 interactive cards: Build, Reach, Convert, Grow) */}
            <ClientAttractSection onSelectPillar={handlePillarSelect} />

            {/* 3. 10 Core Services with Modal Inspection */}
            <ServicesSection onSelectService={(service) => setSelectedService(service)} />

            {/* 4. About & 6-Step Lifecycle Section */}
            <AboutSection />

            {/* 5. Projects & Case Studies Showcase with Category Filtering */}
            <ProjectsSection onSelectProjectForInquiry={handleProjectInquiry} />

            {/* 6. Cinematic Digital Growth Funnel & Telemetry Analytics */}
            <DigitalGrowthSection />

            {/* 7. AI Solutions & Autonomous WhatsApp Command Center */}
            <AiCommandCenterSection />

            {/* 8. Client Testimonials & Perspectives */}
            <TestimonialsSection />

            {/* 9. Comprehensive Project Request Contact Form with WhatsApp Direct Sync */}
            <ContactSection onOpenConsultationModal={() => openBooking()} />

            {/* 10. Newsletter Dispatch with Firestore Duplicate Guard */}
            <NewsletterSection />
          </>
        )}

        {currentView === 'blog' && (
          <BlogView onBackToHome={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        )}

        {(currentView === 'auth' || currentView === 'login' || currentView === 'signin') && (
          <AuthPage
            onBackToHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSuccessRedirect={() => {
              setCurrentView('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {(currentView === 'dashboard' || currentView === 'admin') && (
          <DashboardPage
            onBackToHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenBookingModal={() => openBooking()}
          />
        )}
      </main>

      {/* Luxury Multi-Column Footer */}
      <Footer
        setCurrentView={setCurrentView}
        openBookingModal={() => openBooking()}
      />

      {/* Persistent Floating WhatsApp Help & Direct Access */}
      <FloatingWhatsApp />

      {/* Modals */}
      <ConsultationBookingModal
        isOpen={isBookingOpen}
        onClose={closeBooking}
        preselectedService={bookingService}
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookConsultation={(serviceTitle) => openBooking(serviceTitle)}
      />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
