import React from 'react';
// FIX: Import Variants to explicitly type framer-motion variants.
import { motion, Variants } from 'framer-motion';
import type { EducationItem } from '../types';

interface CertificateModalProps {
  item: EducationItem;
  onClose: () => void;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

// FIX: Explicitly type modalVariants with Variants to fix TypeScript error with transition properties.
const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.2 } },
};
const CertificateModal: React.FC<CertificateModalProps> = ({ item, onClose }) => {
  if (!item.certificateUrl) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        className="bg-slate-800/80 border border-white/10 rounded-xl w-full max-w-5xl max-h-[95vh] flex flex-col relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* PDF Preview */}
        <div className="flex-grow">
          <iframe
            src={item.certificateUrl}
            title={`${item.degree} Certificate`}
            className="w-full h-full border-none"
          />
        </div>

        {/* Footer */}
        <div className="p-4 text-center border-t border-white/10 flex-shrink-0">
          <h3 className="font-bold text-xl text-cyan-400">{item.degree}</h3>
          <p className="text-slate-300">{item.institution}</p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-200 hover:text-white transition-colors bg-slate-900/60 rounded-full w-10 h-10 flex items-center justify-center z-10"
        >
          <i className="fas fa-times text-lg"></i>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default CertificateModal;