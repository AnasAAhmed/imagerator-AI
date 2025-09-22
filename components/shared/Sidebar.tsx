'use client'

import { navLinks } from '@/constants'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import SmartLink from "@/components/shared/SmartLink";
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'

const Sidebar = () => {
    const pathname = usePathname();
    return (
        <aside className='sidebar'>
            <div className="flex size-full flex-col gap-4">
                <SmartLink href={"/"} className='sidebar-logo'>
                    <Image src={"/assets/images/logo-text.svg"} alt='logo' height={28} width={180} />
                </SmartLink>
                <nav className="sidebar-nav">
                    <SignedIn>
                        <ul className="sidebar-nav-elements">
                            {navLinks.slice(0, 6).map((link) => {
                                const isActive = link.route === pathname
                                return (
                                    <li key={link.route} className={`sidebar-nav-elements group ${isActive ? 'bg-purple-gradient text-primary-foreground rounded-xl' : 'text-gray-700'}`}>
                                        <SmartLink href={link.route} className='sidebar-link'>
                                            <Image src={link.icon} alt='logo' width={24} height={24} className={`${isActive && 'brightness-200'}`} />
                                            {link.label}
                                        </SmartLink>
                                    </li>
                                )
                            })}

                        </ul>
                        <ul className="sidebar-nav-elements">
                            {navLinks.slice(6).map((link) => {
                                const isActive = link.route === pathname
                                return (
                                    <li key={link.route} className={`sidebar-nav-elements group ${isActive ? 'bg-purple-gradient text-primary-foreground rounded-xl' : 'text-gray-700'}`}>
                                        <SmartLink prefetch href={link.route} className='sidebar-link'>
                                            <Image src={link.icon} alt='logo' width={24} height={24} className={`${isActive && 'brightness-200'}`} />
                                            {link.label}
                                        </SmartLink>
                                    </li>
                                )
                            })}
                            <li className="flex-start cursor-pointer gaps-2 p-3">
                                <UserButton showName/>
                            </li>
                        </ul>
                    </SignedIn>
                    <SignedOut>
                        <Button asChild className='button bg-purple-gradient bg-cover'>
                            <SmartLink href={"/sign-in"}>
                                Login
                            </SmartLink>
                        </Button>
                    </SignedOut>
                </nav>
            </div>
        </aside >
    )
}

export default Sidebar
