import { X, Github, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';

export default function ProjectModal({ isOpen, onClose, project }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-bg border border-text/10 rounded-3xl shadow-2xl flex flex-col md:flex-row modal-animate-in">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-orange-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Section (Left/Top) */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-black">
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted">
              No image available
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent md:bg-gradient-to-r"></div>
        </div>

        {/* Content Section (Right/Bottom) */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
          <h2 className="text-3xl font-bold text-text mb-2">{project.title}</h2>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech && project.tech.map((t, i) => (
              <span key={i} className="px-3 py-1 text-xs font-medium text-orange-300 bg-orange-500/10 rounded-full border border-orange-500/20">
                {t}
              </span>
            ))}
          </div>

          <div className="prose prose-invert prose-sm max-w-none text-muted mb-8 flex-grow overflow-y-auto pr-2 custom-scrollbar">
            <p>{project.description}</p>
            {/* Here we could add more details if available in the future */}
          </div>

          <div className="flex gap-4 mt-auto pt-6 border-t border-text/10">
            <a 
              href={project.repo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-text/5 hover:bg-text/10 text-text font-semibold transition-colors border border-text/10"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
            {project.demo && (
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors shadow-lg shadow-orange-500/20"
              >
                <ExternalLink className="w-5 h-5" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
