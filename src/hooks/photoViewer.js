"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, Maximize, Minimize, Download } from 'lucide-react';

/**
 * Hook to manage the state of the Photo Viewer.
 * Returns the state and methods to open and close the viewer.
 */
export function usePhotoViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const openViewer = useCallback((imgSrc) => {
    setCurrentImage(imgSrc);
    setIsOpen(true);
  }, []);

  const closeViewer = useCallback(() => {
    setIsOpen(false);
    // Wait for the exit animation before clearing the image source
    setTimeout(() => setCurrentImage(null), 300);
  }, []);

  return { isOpen, currentImage, openViewer, closeViewer };
}

/**
 * PhotoViewer Component
 * Place this component in your layout or page, and pass the state from usePhotoViewer.
 * 
 * Example usage:
 * const { isOpen, currentImage, openViewer, closeViewer } = usePhotoViewer();
 * 
 * <img src="photo.jpg" onClick={() => openViewer("photo.jpg")} />
 * <PhotoViewer isOpen={isOpen} currentImage={currentImage} onClose={closeViewer} />
 */
export function PhotoViewer({ isOpen, currentImage, onClose }) {
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const modalRef = useRef(null);

  // Reset scale when image changes or viewer closes
  useEffect(() => {
    if (!isOpen) {
      setScale(1);
    }
  }, [isOpen]);

  // Lock/unlock body scroll — ONLY depends on isOpen so it doesn't re-run on other state changes
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // Handle keyboard shortcuts (Escape to close) — separate so scroll lock isn't affected
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          handleFullscreen();
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen, onClose]);

  // Intercept wheel events natively to zoom image AND stop Locomotive Scroll from moving the page
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !isOpen) return;

    const handleNativeWheel = (e) => {
      e.preventDefault(); // Stop native scrolling
      e.stopPropagation(); // Stop event from bubbling to window (where Locomotive/Lenis listens)
      
      // Only zoom if scrolling over the modal window
      if (modalRef.current && modalRef.current.contains(e.target)) {
        if (e.deltaY < 0) {
          setScale((prev) => Math.min(prev + 0.05, 4));
        } else {
          setScale((prev) => Math.max(prev - 0.05, 0.5));
        }
      }
    };

    const preventTouch = (e) => {
      // Allow multi-touch pinch to zoom (if needed) but prevent normal scrolling
      if (e.touches.length < 2) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Use passive: false so we can preventDefault
    el.addEventListener('wheel', handleNativeWheel, { passive: false });
    el.addEventListener('touchmove', preventTouch, { passive: false });

    return () => {
      el.removeEventListener('wheel', handleNativeWheel);
      el.removeEventListener('touchmove', preventTouch);
    };
  }, [isOpen]);

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setScale((prev) => Math.min(prev + 0.5, 4)); // Max scale 4x
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setScale((prev) => Math.max(prev - 0.5, 0.5)); // Min scale 0.5x
  };

  const handleFullscreen = async (e) => {
    if (e) e.stopPropagation();
    try {
      if (!document.fullscreenElement) {
        if (containerRef.current?.requestFullscreen) {
          await containerRef.current.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
          setIsFullscreen(false);
        }
      }
    } catch (err) {
      console.error("Error attempting to enable fullscreen:", err);
    }
  };

  // Listen to fullscreen changes outside of the button (e.g. Esc key by browser)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleDownload = (e) => {
    e.stopPropagation();
    if (!currentImage) return;
    
    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = currentImage;
    link.download = currentImage.split('/').pop() || 'downloaded-image';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          ref={containerRef}
          data-lenis-prevent="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] cursor-default flex items-center justify-center bg-black/40 backdrop-blur-sm p-2 sm:p-8"
        >
          <div 
            ref={modalRef}
            className={`relative w-full h-full bg-black/60 backdrop-blur-2xl overflow-hidden flex flex-col shadow-2xl transition-all duration-300 ${
              isFullscreen 
                ? 'max-w-full max-h-full rounded-none border-none' 
                : 'max-w-[95vw] max-h-[90vh] md:max-w-[80vw] md:max-h-[80vh] rounded-2xl md:rounded-3xl border border-white/10'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
          {/* Top toolbar */}
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent">
            <div className="text-white/70 text-sm font-medium px-4">
              Photo Viewer
            </div>
            <div className="flex items-center gap-2 sm:gap-4 pr-2">
              <button 
                onClick={handleZoomOut}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                title="Zoom Out"
              >
                <ZoomOut size={20} />
              </button>
              <button 
                onClick={handleZoomIn}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                title="Zoom In"
              >
                <ZoomIn size={20} />
              </button>
              <button 
                onClick={handleFullscreen}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
              <button 
                onClick={handleDownload}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                title="Download"
              >
                <Download size={20} />
              </button>
              <div className="w-px h-6 bg-white/20 mx-2"></div>
              <button 
                onClick={onClose}
                className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                title="Close (Esc)"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Image container with drag and zoom */}
          <div 
            className="relative w-full h-full flex items-center justify-center overflow-hidden p-4 sm:p-12"
            onClick={(e) => e.stopPropagation()} // Prevent clicking image container from closing
          >
            <motion.img
              src={currentImage}
              alt="Fullscreen Viewer"
              drag
              dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }}
              dragElastic={0.2}
              animate={{ scale }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="max-w-full max-h-full object-contain cursor-grab active:cursor-grabbing drop-shadow-2xl select-none"
              onDoubleClick={() => setScale(scale === 1 ? 2 : 1)} // Double click to zoom in/out
              draggable={false}
            />
          </div>
          
          {/* Bottom instructions (hide on small screens) */}
          <div className="hidden sm:flex absolute bottom-8 left-0 right-0 justify-center pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-black/60 text-white/70 text-xs px-5 py-2.5 rounded-full backdrop-blur-md shadow-lg"
            >
              Scroll to zoom • Drag to pan • Double-click to reset
            </motion.div>
          </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}