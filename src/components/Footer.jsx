"use client";

import React from "react";
import { FaCamera, FaInstagram, FaXTwitter, FaLinkedinIn, FaDribbble } from "react-icons/fa6";
import { useContent } from "@/hooks/useContent";

export default function Footer() {
    const { site } = useContent();
    const year = new Date().getFullYear();
    const socialIcons = [FaInstagram, FaXTwitter, FaLinkedinIn, FaDribbble];

    return (
        <footer className="bg-surface-muted mx-[10px] mb-[10px] px-8 md:px-16 pt-20 pb-0 flex flex-col mt-20 text-content border border-border-subtle rounded-[2rem] transition-colors">
            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between gap-16 md:gap-8">

                {/* Left Column - Branding */}
                <div className="max-w-xs md:max-w-sm flex flex-col">
                    <div className="flex items-center gap-3 mb-6 relative w-max">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-content transition-colors">
                            {site.branding.heading}
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
                        {site.branding.description}
                    </p>

                    {/* Socials */}
                    <div className="flex items-center gap-4">
                        {site.socials.map((social, idx) => {
                            const Icon = socialIcons[idx] || FaInstagram;
                            return (
                                <a
                                    key={idx}
                                    href={social.url}
                                    className="w-12 h-12 bg-surface rounded-full flex items-center justify-center shadow-sm border border-border-subtle text-content-muted hover:text-content hover:scale-105 hover:shadow-md transition-all duration-300"
                                >
                                    <Icon size={18} strokeWidth={1.5} />
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Right Columns */}
                <div className="flex flex-col sm:flex-row gap-16 md:gap-32 md:pl-20">

                    {/* Column 1: Services */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-content text-[15px] mb-2 tracking-tight">Services</h3>
                        {site.services.map((service, idx) => (
                             <a key={idx} href={service.url} className="font-medium text-text-secondary hover:text-text-primary text-sm transition-colors flex items-center gap-3 w-max group">
                                {idx === 0 && <FaCamera size={14} className="text-text-muted group-hover:text-text-primary transition-colors" />}
                                {service.name}
                                {service.badge && (
                                    <span className="ml-1 px-2.5 py-0.5 bg-accent-light text-accent-brand rounded-full text-[10px] font-bold tracking-wide">
                                        {service.badge}
                                    </span>
                                )}
                            </a>
                        ))}
                    </div>

                    {/* Column 2: Portfolios */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-content text-[15px] mb-2 tracking-tight">Portfolios</h3>
                        {site.portfolios.map((item, idx) => (
                             <a key={idx} href={item.url} className="font-medium text-text-secondary hover:text-text-primary text-sm transition-colors flex items-center gap-3 w-max group">
                                {idx === 0 && <FaCamera size={14} className="text-text-muted group-hover:text-text-primary transition-colors" />}
                                {item.name}
                                {item.badge && (
                                    <span className="ml-2 px-2.5 py-0.5 bg-accent-light border border-accent-border text-accent-brand rounded-full text-[10px] font-bold tracking-wide">
                                        {item.badge}
                                    </span>
                                )}
                            </a>
                        ))}
                    </div>

                    {/* Column 3: Legal & Policy */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-content text-[15px] mb-2 tracking-tight">Privacy & Policy</h3>
                        <a href="#" className="font-medium text-text-secondary hover:text-text-primary text-sm transition-colors">Contact Us</a>
                        <a href="#" className="font-medium text-text-secondary hover:text-text-primary text-sm transition-colors flex items-center w-max">
                            Licensing
                            <span className="ml-2 px-2.5 py-0.5 bg-accent-light text-accent-brand rounded-full text-[10px] font-bold tracking-wide">New</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom bar — stretches to page edge */}
            <div className="w-full mt-16 py-6 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-2 transition-colors">
                <p className="text-text-secondary font-medium text-sm">© {year} {site.copyright}</p>
                <p className="text-text-muted text-xs hidden md:block">{site.tagline}</p>
            </div>
        </footer>
    );
}