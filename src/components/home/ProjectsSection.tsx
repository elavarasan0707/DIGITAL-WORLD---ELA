import React, { useState } from 'react';
import { Sparkles, ArrowRight, ExternalLink, TrendingUp, Layers } from 'lucide-react';
import { PROJECTS_DATA } from '../../data/mockData';
import { ProjectItem } from '../../types';

interface ProjectsSectionProps {
  onSelectProjectForInquiry: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProjectForInquiry }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Websites', 'Marketing', 'Branding', 'AI', 'Automation'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <section 
      id="projects" 
      className="py-24 bg-gradient-to-b from-[#030712] via-[#060c1c] to-[#030712] relative overflow-hidden border-t border-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Proven Track Record</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black text-white leading-tight">
              Featured Case Studies & <br />
              <span className="gold-gradient-text">High-Growth Portfolio</span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`filter-${cat.toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.3)] font-bold scale-105'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`portfolio-card-${project.id}`}
              className="group rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 hover:border-amber-500/50 overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
            >
              {/* Image & Overlay */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-amber-300">
                    {project.category}
                  </span>
                </div>

                {/* Stat Highlight on Image */}
                {project.statNumber && (
                  <div className="absolute bottom-4 right-4 text-right bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl px-3 py-1.5 shadow-lg">
                    <span className="text-base font-black text-amber-400 font-heading block leading-none">
                      {project.statNumber}
                    </span>
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider font-mono">
                      {project.statLabel}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                    Client: {project.client}
                  </span>
                  <h3 className="font-heading text-xl font-extrabold text-white mt-1 group-hover:text-amber-300 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Results target highlight */}
                  <div className="mt-4 p-2.5 rounded-xl bg-slate-950/60 border border-emerald-500/20 text-xs text-emerald-400 flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-400" />
                    <span className="font-medium">{project.results}</span>
                  </div>
                </div>

                {/* Technologies */}
                <div className="mt-5 pt-4 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    id={`inquire-project-${project.id}`}
                    onClick={() => onSelectProjectForInquiry(project)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2 group-hover:border-amber-400"
                  >
                    <span>Request Similar Strategy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
