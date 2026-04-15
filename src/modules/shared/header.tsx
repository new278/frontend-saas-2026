"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Menu, X} from "lucide-react"
import Image from "next/image"
import NavLink from '@/src/components/ui/NavLink'
import { Button } from "@/src/components/ui/button"
export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()


  const mainNav = [
    { label: "Home", href: "/" },
    { label: "Technical", href: "/technical" },
    { label: "Gallery", href: "/gallery" },
    { label: "Notice", href: "/notice" },
    { label: "Our Team", href: "/our-teams" },
    { label: "Associate", href: "/associate" },
    { label: "Branch", href: "/global-branches" },
    { label: "Blog", href: "/blogs" },
    { label: "Dashboard", href: "/user/profile" },
  ]



  const toHref = (label: string) => {
    // simple slugify for demo links
    const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    return `/${slug}`
  }

  return (
    <header className="bg-base-100 border-b border-gray-200">
      {/* Main Navigation */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
              <NavLink href="/" exact className="flex items-center gap-2">
               <Image src="/newLogo.png" alt="Logo" width={60} height={40} />
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {mainNav.map((item) => (
                <NavLink key={item?.label} href={item?.href} className="text-sm  text-gray-700 hover:text-blue-600 transition">
                  {item?.label}
                </NavLink>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-4">
             <Button onClick={()=>router.push("/account/user/login")}>Login</Button>
              <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Navigation */}
      {/* <div className="bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto flex justify-center items-center px-4 md:px-6">
       
          <div className="hidden lg:flex overflow-x-auto py-3 gap-8">
            {categories.map((cat) => (
              <NavLink key={cat} href={toHref(cat)} className="text-sm text-gray-700 hover:text-blue-600 transition whitespace-nowrap">
                {cat}
              </NavLink>
            ))}
          </div>

          <div className="lg:hidden py-3">
            <div className="grid grid-cols-3 gap-2">
              {categories.slice(0, 6).map((cat) => (
                <NavLink key={cat} href={toHref(cat)} className="text-xs text-gray-700 hover:text-blue-600 transition">
                  {cat}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div> */}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 border-b border-gray-200 py-4">
          <div className="container mx-auto px-4">
            <nav className="space-y-2">
              {mainNav.map((item) => (
                <NavLink key={item?.label} href={toHref(item?.href)} className="block py-2 text-gray-700 hover:text-blue-600 transition">
                  {item?.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
