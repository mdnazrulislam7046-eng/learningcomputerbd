'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { FreeClass } from '@/components/FreeClass';
import { CoursesSection } from '@/components/CoursesSection';
import { Enrollment } from '@/components/Enrollment';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Course, COURSES, FREE_CLASS_FORM_URL } from '@/lib/config';

export default function HomePage() {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(COURSES[0].id);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeroFreeClass = () => {
    window.open(FREE_CLASS_FORM_URL, '_blank', 'noopener,noreferrer');
  };

  const handleHeroEnrollment = () => {
    scrollToSection('courses');
  };

  const handleCourseEnroll = (course: Course) => {
    setSelectedCourseId(course.id);
    scrollToSection('enrollment');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-emerald-500 selection:text-white">
      {/* Responsive Header */}
      <Header
        onOpenFreeClassModal={() => scrollToSection('free-class')}
        onSelectCourseForEnrollment={(id) => {
          setSelectedCourseId(id);
          scrollToSection('enrollment');
        }}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onFreeClassClick={handleHeroFreeClass}
          onEnrollmentClick={handleHeroEnrollment}
        />

        {/* 2. Paid Courses Section */}
        <CoursesSection
          onSelectCourse={handleCourseEnroll}
        />

        {/* 3. Free Class Section */}
        <FreeClass />

        {/* 4. Enrollment Section */}
        <Enrollment
          selectedCourseId={selectedCourseId}
          onSelectCourse={(id) => setSelectedCourseId(id)}
        />

        {/* 5. Support / Contact Section */}
        <Contact />
      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
