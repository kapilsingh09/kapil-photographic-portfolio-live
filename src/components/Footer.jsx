import React from "react";
import { FaCamera, FaInstagram, FaXTwitter, FaLinkedinIn, FaDribbble } from "react-icons/fa6";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-surface-muted mx-[10px] mb-[10px] px-8 md:px-16 pt-20 pb-0 flex flex-col mt-20 text-content border border-border-subtle rounded-[2rem] transition-colors">
            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between gap-16 md:gap-8">

                {/* Left Column - Branding */}
                <div className="max-w-xs md:max-w-sm flex flex-col">
                    <div className="flex items-center gap-3 mb-6 relative w-max">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-content transition-colors">
                            Your vision, our lens.
                        </h2>
                        <div className="absolute -top-3 -right-8 bg-surface border border-border-subtle shadow-sm rounded-xl p-1 flex items-center justify-center transition-colors">
                            <span className="flex items-center gap-0.5 px-1 py-0.5">
                                <span className="w-1 h-1 bg-zinc-400 rounded-full"></span>
                                <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
                                <span className="w-1 h-1 bg-zinc-800 rounded-full"></span>
                            </span>
                        </div>
                    </div>

                    <p className="subtext-muted mb-10">
                        In the realm of visual storytelling, creativity knows no bounds. This eternal marketplace celebrates the timeless nature of photography and cinematic art.
                    </p>

                    {/* Socials */}
                    <div className="flex items-center gap-4">
                        {[FaInstagram, FaXTwitter, FaLinkedinIn, FaDribbble].map((Icon, idx) => (
                            <a
                                key={idx}
                                href="#"
                                className="w-12 h-12 bg-surface rounded-full flex items-center justify-center shadow-sm border border-border-subtle text-content-muted hover:text-content hover:scale-105 hover:shadow-md transition-all duration-300"
                            >
                                <Icon size={18} strokeWidth={1.5} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Right Columns */}
                <div className="flex flex-col sm:flex-row gap-16 md:gap-32 md:pl-20">

                    {/* Column 1: Services */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-content text-[15px] mb-2 tracking-tight">Services</h3>
                        <a href="#" className="font-medium text-zinc-500 hover:text-zinc-900 text-sm transition-colors flex items-center gap-3 w-max group">
                            <FaCamera size={14} className="text-zinc-400 group-hover:text-black transition-colors" />
                            Photography
                            <span className="ml-1 px-2.5 py-0.5 bg-red-400/20 text-red-500 rounded-full text-[10px] font-bold tracking-wide">New</span>
                        </a>
                        <a href="#" className="font-medium text-zinc-500 hover:text-zinc-900 text-sm transition-colors">Videography</a>
                        <a href="#" className="font-medium text-zinc-500 hover:text-zinc-900 text-sm transition-colors">Color Grading</a>
                        <a href="#" className="font-medium text-zinc-500 hover:text-zinc-900 text-sm transition-colors">Drone Aerials</a>
                        <a href="#" className="font-medium text-zinc-500 hover:text-zinc-900 text-sm transition-colors">E-Commerce</a>
                    </div>

                    {/* Column 2: Portfolios */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-content text-[15px] mb-2 tracking-tight">Portfolios</h3>
                        <a href="#" className="font-medium text-zinc-500 hover:text-zinc-900 text-sm transition-colors flex items-center gap-3 w-max group">
                            <FaCamera size={14} className="text-zinc-400 group-hover:text-black transition-colors" />
                            Weddings
                        </a>
                        <a href="#" className="font-medium text-zinc-500 hover:text-zinc-900 text-sm transition-colors flex items-center w-max">
                            Commercial
                            <span className="ml-2 px-2.5 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-full text-[10px] font-bold tracking-wide">Soon</span>
                        </a>
                    </div>

                    {/* Column 3: Legal & Policy */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-content text-[15px] mb-2 tracking-tight">Privacy & Policy</h3>
                        <a href="#" className="font-medium text-zinc-500 hover:text-zinc-900 text-sm transition-colors">Contact Us</a>
                        <a href="#" className="font-medium text-zinc-500 hover:text-zinc-900 text-sm transition-colors flex items-center w-max">
                            Licensing
                            <span className="ml-2 px-2.5 py-0.5 bg-red-400/20 text-red-500 rounded-full text-[10px] font-bold tracking-wide">New</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom bar — stretches to page edge */}
            <div className="w-full mt-16 py-6 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-2 transition-colors">
                <p className="text-zinc-500 font-medium text-sm">© {year} All rights reserved.</p>
                <p className="text-zinc-400 text-xs hidden md:block">Made with ♥ for visual storytellers</p>
            </div>
        </footer>
    );
}