import React, { useState } from 'react';
import { Sparkles, Calendar, Clock, ArrowRight, ArrowLeft, X, Share2, Tag } from 'lucide-react';
import { BLOG_DATA } from '../../data/mockData';
import { BlogPost } from '../../types';

interface BlogViewProps {
  onBackToHome: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onBackToHome }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-8 border-b border-slate-800 mb-12">
          <button
            id="blog-back-home-btn"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Market Intelligence & Case Studies</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-heading text-4xl sm:text-6xl font-black text-white leading-tight">
            Digital Growth <br />
            <span className="gold-gradient-text">Intelligence Dispatch</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Deep-dive operational teardowns, algorithmic breakdowns, and technology frameworks engineered by ELA Digital World.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_DATA.map((post) => (
            <article
              key={post.id}
              id={`blog-card-${post.id}`}
              className="group rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/50 overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-amber-300">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-400">By {post.author}</span>
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <span>Read Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Full Article Reader Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-3xl bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-10 my-8 shadow-2xl text-slate-100">
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 text-xs font-mono text-amber-400 mb-2">
                <span>{selectedPost.category}</span>
                <span>•</span>
                <span>{selectedPost.date}</span>
                <span>•</span>
                <span>{selectedPost.readTime}</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl font-black text-white leading-tight">
                {selectedPost.title}
              </h2>

              <p className="text-xs text-slate-400 mt-1 mb-6">
                Authored by {selectedPost.author} • ELA Digital World Research Team
              </p>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-6">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                <p className="font-semibold text-white">
                  {selectedPost.excerpt}
                </p>
                <p>
                  As digital markets mature in 2026, the delta between average agency results and exponential market leadership comes down to 3 core vectors: high-velocity creative testing, zero-friction conversion pipelines (notably automated WhatsApp infrastructure), and ruthless predictive attribution.
                </p>
                <p>
                  By deploying autonomous machine-learning models to analyze creative fatigue and shifting ad spend dynamically, enterprise brands avoid the standard 40% ad waste inherent in manual campaign operations. When paired with instant WhatsApp conversational agents answering qualified prospects within 400 milliseconds, conversion rates routinely multiply by 300% to 500%.
                </p>
                <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/20 my-6">
                  <h4 className="text-xs font-bold text-amber-400 uppercase font-mono mb-1">Key Takeaway</h4>
                  <p className="text-xs text-slate-300">
                    Never send traffic to a static contact form when you can provide instant qualification on WhatsApp and automated calendar synchronization.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">Official WhatsApp: +91 86676 18925</span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-5 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
