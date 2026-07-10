import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, Clock, ChevronRight, Loader2 } from 'lucide-react';
import { fetchCmsBlogs } from '../lib/api';

interface Story {
  id: number;
  title: string;
  image: string;
}

interface BlogsProps {
  onBack: () => void;
  onSelectStory: (story: Story) => void;
}

const CATEGORIES = ['All', 'Travel Hacks', 'Destinations', 'Eco Tourism', 'Celebrations'];

export default function Blogs({ onBack, onSelectStory }: BlogsProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [blogsList, setBlogsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCmsBlogs()
      .then(data => {
        setBlogsList(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch CMS blogs:', err);
        setLoading(false);
      });
  }, []);

  const filteredBlogs = activeCategory === 'All' 
    ? blogsList 
    : blogsList.filter(b => b.category === activeCategory);

  return (
    <div className="bg-zinc-50 min-h-screen pb-24 text-left pt-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 bg-white hover:bg-zinc-100 text-zinc-800 px-4 py-2.5 rounded-full border border-zinc-200 transition-all font-semibold text-sm cursor-pointer shadow-sm mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Title */}
        <div className="space-y-6 mb-12">
          <span className="bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-indigo-100 inline-flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Toliday Blog</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-zinc-900 leading-tight">
            Travel stories, guides, <br />
            and insider <span className="text-indigo-600">travel hacks</span>
          </h1>
        </div>

        {/* Categories list */}
        <div className="flex border-b border-zinc-100 mb-10 overflow-x-auto scrollbar-none gap-6 pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pb-3 text-sm font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                activeCategory === cat ? 'text-indigo-600' : 'text-zinc-400 hover:text-zinc-700'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div 
                  layoutId="activeBlogTabLine"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" 
                />
              )}
            </button>
          ))}
        </div>

        {/* Blogs Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-650" />
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-24 text-zinc-400 font-medium">
            No articles found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, idx) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              onClick={() => onSelectStory(blog)}
              className="bg-white rounded-3xl overflow-hidden border border-zinc-100 shadow-sm hover:shadow-md cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-50">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-indigo-600 border border-indigo-50 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                    {blog.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors text-base leading-snug">
                    {blog.title}
                  </h3>
                </div>
              </div>

              {/* Action */}
              <div className="px-6 pb-6 pt-2 flex items-center gap-1.5 text-xs font-bold text-indigo-600 group-hover:translate-x-1.5 transition-transform">
                <span>Read Story</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
