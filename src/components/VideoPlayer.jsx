'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
    FaPlay,
    FaPause,
    FaExpand,
    FaVolumeHigh,
    FaVolumeXmark,
    FaCirclePlay,
    FaPalette,
    FaUpDownLeftRight,
    FaArrowRightLong,
    FaArrowPointer,
    FaBolt,
    FaPenNib,
    FaStar,
    FaCircleInfo,
    FaXmark
} from 'react-icons/fa6'

export default function VideoPlayer() {
    const sectionRef = useRef(null)
    const playerWrapperRef = useRef(null)
    const videoRef = useRef(null)
    const router = useRouter()
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [playbackRate, setPlaybackRate] = useState(1.0)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const infoRef = useRef(null)

    const isInView = useInView(sectionRef, { amount: 0.1 })

    useEffect(() => {
        if (!isInView && isPlaying) {
            // Prevent auto-pausing when the user is in fullscreen view
            if (document.fullscreenElement) return;

            videoRef.current?.pause()
        }
    }, [isInView, isPlaying])

    useEffect(() => {
        const handleFSChange = () => setIsFullscreen(!!document.fullscreenElement)
        document.addEventListener('fullscreenchange', handleFSChange)
        return () => document.removeEventListener('fullscreenchange', handleFSChange)
    }, [])

    const handleFullscreen = () => {
        if (!playerWrapperRef.current) return
        if (!document.fullscreenElement) {
            playerWrapperRef.current.requestFullscreen()
        } else {
            document.exitFullscreen()
        }
    }

    // Effect to handle duration initialization correctly
    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const updateDuration = () => {
            if (video.duration && !isNaN(video.duration)) {
                setDuration(video.duration)
            }
        }

        // Potential fix for locally cached videos
        if (video.readyState >= 1) {
            updateDuration()
        }

        video.addEventListener('durationchange', updateDuration)
        video.addEventListener('loadedmetadata', updateDuration)

        return () => {
            video.removeEventListener('durationchange', updateDuration)
            video.removeEventListener('loadedmetadata', updateDuration)
        }
    }, [])

    const togglePlay = () => {
        const video = videoRef.current
        if (!video) return
        if (video.paused) video.play()
        else video.pause()
    }

    const toggleMute = () => {
        if (videoRef.current) {
            const newState = !isMuted
            videoRef.current.muted = newState
            setIsMuted(newState)
        }
    }

    const cyclePlaybackRate = () => {
        const rates = [1.0, 1.25, 1.5, 2.0]
        const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length]
        if (videoRef.current) {
            videoRef.current.playbackRate = nextRate
            setPlaybackRate(nextRate)
        }
    }

    return (
        <>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

            {/* <section className='h-[40vh]'>

            </section> */}
            <section id="video-showcase" ref={sectionRef} className="relative min-h-screen w-full overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>

                <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-heading pointer-events-none select-none uppercase z-0 opacity-5">
                    Legacy
                </h1>

                {/* Main static wrapper */}
                <div className="w-full flex flex-col items-center justify-center min-h-screen relative z-10">

                    {/* Embedded Header, perfectly synced with About page styling */}
                    <div className="w-full max-w-6xl mx-auto absolute top-12 md:top-24 px-5 md:px-0 z-30 pointer-events-none">
                        <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap');`}</style>
                        <div className="mb-6 flex flex-col items-start gap-3">
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-xs font-semibold uppercase tracking-widest"
                            >
                                {/* — Masterpiece */}
                            </motion.span>
                            <div className="overflow-hidden">
                                <motion.h1
                                    initial={{ y: '110%' }}
                                    whileInView={{ y: '0%' }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-[10vw] font-black leading-none tracking-tight text-heading md:text-[5vw]"
                                    style={{ fontFamily: "'Syne', sans-serif" }}
                                >
                                    Showreel
                                </motion.h1>
                            </div>
                        </div>
                    </div>

                    {/* Center Flex Container connecting Text and Video */}
                    <div className="w-full max-w-[1360px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 z-20 px-5 md:px-10 mt-20 md:mt-0">

                        {/* --- LEFT SIDE CONTENT --- */}
                        <div className="flex flex-col gap-8 w-full lg:w-[40%] max-w-[500px] z-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 px-3 py-1 bg-card-alt text-paragraph rounded-full w-fit">
                                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">Client Showcase</span>
                                </div>
                                <h2 className="text-5xl font-black tracking-[-0.01em] text-heading leading-[0.9]">
                                    Cinematic <br /> <span className="text-heading">Language.</span>
                                </h2>

                                <p className="text-paragraph text-[13px] font-medium leading-relaxed">
                                    Experience visual storytelling that transcends conventional videography. We blend technical mastery with an artistic soul to create high-end films that provoke thought and inspire emotion for brands that demand the absolute best.
                                </p>
                            </div>

                            {/* VIDEO CAPABILITIES WITH FONT AWESOME */}
                            <div className="flex flex-col gap-6">
                                <h5 className="text-[11px] font-black uppercase tracking-[0.4em] text-subheading">Our Capabilities</h5>

                                <div className="grid grid-cols-1 gap-6">
                                    <div className="flex items-start gap-4 group">
                                        <div className="p-3.5 bg-card-alt rounded-2xl text-subheading group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300 shadow-sm">
                                            <FaCirclePlay size={18} />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-[13px] font-black uppercase text-heading tracking-wider">Visual Storytelling</h4>
                                            <p className="text-[11px] text-subheading font-medium">Crafting narrative-driven reels with cinematic depth.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group">
                                        <div className="p-3.5 bg-card-alt rounded-2xl text-subheading group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300 shadow-sm">
                                            <FaPalette size={18} />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-[13px] font-black uppercase text-heading tracking-wider">Precision Grading</h4>
                                            <p className="text-[11px] text-subheading font-medium">Custom color science tailored to evoke specific moods.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group">
                                        <div className="p-3.5 bg-card-alt rounded-2xl text-subheading group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300 shadow-sm">
                                            <FaUpDownLeftRight size={18} />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-[13px] font-black uppercase text-heading tracking-wider">Dynamic Movement</h4>
                                            <p className="text-[11px] text-subheading font-medium">Fluid motion capture using high-end stabilizing rigs.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => router.push('/pricing')}
                                className="btn-primary w-fit flex items-center gap-4 group px-10 py-5 h-16 text-[11px]  font-extrabold uppercase tracking-widest rounded-full"
                            >
                                See Pricing Plans <FaArrowRightLong size={16} className="group-hover:translate-x-1.5 transition-transform" />
                            </button>
                        </div>

                        {/* --- Main Video Player --- */}
                        <motion.div
                            ref={playerWrapperRef}
                            initial="rest"
                            whileHover="hover"
                            animate={{
                                borderRadius: isFullscreen ? 0 : "30px",
                            }}
                            transition={{ duration: 0.3 }}
                            className="relative h-[70vh] md:h-[70vh] w-full lg:w-[70%] overflow-hidden bg-black shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-card-border group z-20"
                        >
                            <video
                                ref={videoRef}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                onTimeUpdate={() => {
                                    if (videoRef.current) {
                                        const cur = videoRef.current.currentTime
                                        const dur = videoRef.current.duration
                                        setCurrentTime(cur)
                                        if (dur > 0) {
                                            setProgress((cur / dur) * 100)
                                        }
                                    }
                                }}
                                onLoadedMetadata={() => {
                                    if (videoRef.current) {
                                        setDuration(videoRef.current.duration)
                                    }
                                }}
                                onClick={togglePlay}
                                className="w-full h-full object-cover cursor-pointer"
                                playsInline
                                loop
                                src="/videos/vid-1.mp4"
                            />

                            {/* Top MacBook Style Bar */}
                            <div className="absolute top-0 inset-x-0 h-16 bg-linear-to-b from-black/80 to-transparent z-40 flex items-start pt-4 justify-between px-6 pointer-events-none">

                                {/* MacOS dots */}
                                <div className="flex gap-2 items-center w-20 pointer-events-auto">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm border border-black/10"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm border border-black/10"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm border border-black/10"></div>
                                </div>

                                {/* Title */}
                                <div className="absolute left-1/2 -translate-x-1/2 text-center text-white/90 text-[10px] mt-0.5 font-bold line-clamp-1 tracking-[0.2em] uppercase truncate w-[45%] md:w-auto">
                                    Waguri AND Rintaro..
                                </div>

                                {/* Info Button */}
                                <div className="w-20 flex justify-end pointer-events-auto">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setShowInfo(true)
                                        }}
                                        className="text-white/60 hover:text-white transition-colors hover:scale-110"
                                    >
                                        <FaCircleInfo size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Info Panel Overlay */}
                            <AnimatePresence>
                                {showInfo && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 z-50 flex items-start justify-end p-6 pt-16"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setShowInfo(false)
                                        }}
                                    >
                                        <motion.div
                                            ref={infoRef}
                                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                            className="mt-2 max-h-[250px] w-64 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 flex flex-col shadow-2xl overflow-hidden ring-1 ring-white/10"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10 shrink-0">
                                                <h3 className="text-white font-bold text-[10px] tracking-widest uppercase">Video Info</h3>
                                                <button onClick={() => setShowInfo(false)} className="text-white/50 hover:text-white transition-colors">
                                                    <FaXmark size={16} />
                                                </button>
                                            </div>

                                            <div className="space-y-4 flex-1 min-h-0 text-[11px] text-white/70 overflow-y-auto custom-scrollbar pr-2 pb-2 pointer-events-auto">
                                                <div>
                                                    <h4 className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-1">Duration</h4>
                                                    <p className="text-white/90 font-medium tabular-nums text-[13px]">{formatTime(duration)}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-1">Camera</h4>
                                                    <p className="text-white/90 font-medium text-[13px]">ARRI Alexa Mini LF</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-1">Lens</h4>
                                                    <p className="text-white/90 font-medium text-[13px]">Signature Primes 35mm</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-1">Format</h4>
                                                    <p className="text-white/90 font-medium text-[13px]">ProRes 4444 XQ</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-1">Description</h4>
                                                    <p className="leading-relaxed text-[11px] text-white/60">This cinematic sequence captures the essence of legacy—timeless movements translated into deep color science and dynamic lighting. Experience visual storytelling that transcends conventional videography.</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Pill Bar Controls */}
                            <motion.div 
                                variants={{
                                    rest: { opacity: 0, y: 20 },
                                    hover: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, delayChildren: 0.05, ease: "easeOut" } }
                                }}
                                className="absolute bottom-5 w-[95%] max-w-[500px] left-1/2 -translate-x-1/2 z-40 pointer-events-none"
                            >
                                <div className="flex items-center justify-between gap-3 md:gap-4 bg-white/10 backdrop-blur-xl p-4 px-6 rounded-[40px] border border-white/20 shadow-2xl w-full pointer-events-auto">

                                    <motion.div variants={{ rest: { opacity: 0, scale: 0.8 }, hover: { opacity: 1, scale: 1 } }} className="flex items-center gap-2 md:gap-4">
                                        <button onClick={togglePlay} className="text-white border-2 border-white/10 px-2 py-2 rounded-full hover:scale-105 hover:bg-white/10 transition-all active:scale-90 shrink-0">
                                            {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
                                        </button>

                                        <button onClick={cyclePlaybackRate} className="px-2 hover:bg-white/20 rounded-full py-0.5 shrink-0 transition-colors hidden md:block">
                                            <span className="text-[10px] font-black text-white/70 tracking-tighter hover:text-white uppercase leading-none">
                                                {playbackRate}x
                                            </span>
                                        </button>
                                    </motion.div>

                                    <motion.span variants={{ rest: { opacity: 0, y: 5 }, hover: { opacity: 1, y: 0 } }} className="text-[10px] md:text-[12px] font-bold tabular-nums text-white shrink-0 shadow-sm">
                                        {formatTime(currentTime)}
                                    </motion.span>

                                    <motion.div
                                        variants={{ rest: { opacity: 0, scaleX: 0.8 }, hover: { opacity: 1, scaleX: 1 } }}
                                        className="relative flex-1 h-1.5 bg-white/10 rounded-full cursor-pointer flex items-center select-none origin-left"
                                        onClick={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect()
                                            videoRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * duration
                                        }}
                                    >
                                        <motion.div
                                            className="absolute left-0 h-full bg-white rounded-full shadow-[0_0_15px_rgba(0,0,0,0.6)]"
                                            style={{ width: `${progress}%` }}
                                        />
                                        <motion.div
                                            className="absolute w-3 h-3 bg-white rounded-full border border-white shadow-xl"
                                            style={{ left: `calc(${progress}% - 6px)` }}
                                        />
                                    </motion.div>

                                    <motion.span variants={{ rest: { opacity: 0, y: 5 }, hover: { opacity: 1, y: 0 } }} className="text-[10px] md:text-[12px] font-bold tabular-nums text-white/60 shrink-0">
                                        {formatTime(duration)}
                                    </motion.span>

                                    <motion.div variants={{ rest: { opacity: 0, x: 10, scale: 0.9 }, hover: { opacity: 1, x: 0, scale: 1 } }} className="flex items-center gap-2 md:gap-4 border-l border-white/20 pl-2 md:pl-4 shrink-0">
                                        <button onClick={toggleMute} className="text-white/80 hover:text-white transition-colors">
                                            {isMuted ? <FaVolumeXmark size={14} /> : <FaVolumeHigh size={14} />}
                                        </button>
                                        <button onClick={handleFullscreen} className="text-white/80 hover:text-white transition-all hover:scale-110">
                                            <FaExpand size={14} />
                                        </button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>

                    </div> {/* End Center Flex Container */}

                    {/* Visual Decoration */}
                    <div className="absolute top-20 left-10 opacity-5 pointer-events-none -rotate-12 scale-150 z-10">
                        <FaArrowPointer size={50} />
                    </div>

                    <div className="absolute bottom-10 right-10 opacity-5 pointer-events-none rotate-15 scale-150 z-10">
                        <FaPenNib size={50} />
                    </div>
                </div>

                <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 3px; }
            `}</style>
            </section>
        </>
    )
}

function formatTime(seconds) {
    if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
}
