import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Sparkles, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../../data/mockData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section 
      id="testimonials" 
      className="py-24 bg-[#030712] relative overflow-hidden border-t border-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Executive Endorsements</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-white leading-tight">
            Client Perspectives & <br />
            <span className="gold-gradient-text">Realized Enterprise Outcomes</span>
          </h2>
          <div className="mt-3 inline-block">
            <span className="text-[10px] font-mono uppercase text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
              * Showing verified client representative demo profiles
            </span>
          </div>
        </div>

        {/* Testimonial Showcase Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 sm:p-12 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-amber-500/25 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            
            {/* Big quote glyph */}
            <Quote className="absolute top-6 right-8 w-16 h-16 text-amber-500/10 pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
              {/* Client Avatar */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden p-1 border-2 border-amber-500/40 flex-shrink-0 shadow-lg shadow-black/50">
                <img
                  src={current.profileImage}
                  alt={current.clientName}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Content */}
              <div className="flex-1 text-center sm:text-left">
                {/* 5-Star Rating */}
                <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400 mb-4">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm sm:text-lg text-slate-200 leading-relaxed italic">
                  "{current.testimonial}"
                </p>

                <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-heading text-lg font-extrabold text-white">
                      {current.clientName}
                    </h4>
                    <p className="text-xs text-amber-400 font-medium">
                      {current.role}, <span className="text-slate-300 font-semibold">{current.company}</span>
                    </p>
                  </div>

                  {/* Carousel Controls */}
                  <div className="flex items-center justify-center sm:justify-end gap-2">
                    <button
                      id="prev-testimonial-btn"
                      onClick={prevTestimonial}
                      className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      aria-label="Previous Testimonial"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-xs font-mono text-slate-400 px-2">
                      0{currentIndex + 1} / 0{TESTIMONIALS_DATA.length}
                    </span>
                    <button
                      id="next-testimonial-btn"
                      onClick={nextTestimonial}
                      className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      aria-label="Next Testimonial"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
