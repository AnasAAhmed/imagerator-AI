'use client'
import { Sheet, SheetContent, SheetTrigger,} from "@/components/ui/sheet"
import { navLinks } from "@/constants"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import SmartLink from "@/components/shared/SmartLink";
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"

const MobNav = () => {
    const pathname = usePathname();
    return (
        <header className="header">
            <SmartLink href={"/"} className="flex items-center gap-2 md:py-2">
                <Image src={"/assets/images/logo-text.svg"} alt="logo"
                    width={180} height={28} />

            </SmartLink>
            <nav className="flex gap-2 ">
                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                    <Sheet>
                        <SheetTrigger>
                            <Image
                                src={"/assets/icons/menu.svg"}
                                alt="menu"
                                width={32}
                                height={32}
                                className="cursor-pointer"
                            />
                        </SheetTrigger>
                        <SheetContent className="sheet-content sm:w-64">
                            <>
                                <Image
                                    src={"/assets/images/logo-text.svg"}
                                    alt="logo"
                                    width={152}
                                    height={23}
                                />
                                <ul className="header-nav-elements">
                                    {navLinks.map((link) => {
                                        const isActive = link.route === pathname
                                        return (
                                            <li key={link.route} className={`sidebar-nav-elements group ${isActive ? 'bg-purple-gradient' : 'text-gray-700'}`}>
                                                <SmartLink prefetch href={link.route} className='sidebar-link cursor-pointer'>
                                                    <Image src={link.icon} alt='logo' width={24} height={24} className={`${isActive && 'brightness-200'}`} />
                                                    {link.label}
                                                </SmartLink>
                                            </li>
                                        )
                                    })}

                                </ul>
                            </>
                        </SheetContent>
                    </Sheet>

                </SignedIn>
                <SignedOut>
                        <Button asChild className='button bg-purple-gradient bg-cover'>
                            <SmartLink href={"/sign-in"}>
                                Login
                            </SmartLink>
                        </Button>
                    </SignedOut>
            </nav>
        </header>
    )
}

export default MobNav
