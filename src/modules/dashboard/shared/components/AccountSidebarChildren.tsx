import Link from "next/link"
import { usePathname } from "next/navigation"

import { LogOut, Play } from "lucide-react"
import { Button } from "@/src/components/ui/button"

const AccountSidebarChildren = ({ isOpen, onToggle }: { isOpen: boolean, onToggle: () => void }) => {
  const pathname = usePathname()

  const roleBasedRoutes = {
    USER: ["user"],
    Business: ["business"],
    AFFILIATE: ["affiliate"],
  };

  const role = "USER";

  const menuItems = [
    {
      label: "Profile",
      href: `/${roleBasedRoutes[role][0]}/profile`,
    },
    { label: "Wallet",  href: `/${roleBasedRoutes[role][0]}/wallet` },

    {
      label: "Technical",
      href: `/${roleBasedRoutes[role][0]}/technical`,
    },

  ]

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  return (
    <div className={`${isOpen ? 'w-64' : 'w-10'} relative transition-all duration-300 ease-in-out flex flex-col h-full`}>
      <div className="p-4 ">
        <button
          onClick={onToggle}
          className="text-sm px-2 py-1 bg-gray-100 rounded "
        >
          {isOpen ?
            <Play className='absolute right-0 cursor-pointer top-10 rotate-180' /> :
            <Play className='absolute right-0 cursor-pointer top-10' />
          }
        </button>
      </div>
      <div className="p-4 border-b border-sidebar-border -mt-14 flex items-center justify-center">
        <div className={` p-4 text-center ${isOpen ? "block" : "hidden"}`}>
          <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-3" />
          <h3 className="font-semibold">Mr Jack</h3>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item) => (
          <Link key={item?.label}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive(item.href)
                ? `${isOpen && 'bg-primary text-sidebar-primary-foreground'}`
                : `${isOpen && "border bg-background shadow-xs hover:bg-primary hover:text-primary-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"}`
              }`}
          >
            <span className={isOpen ? "block" : "hidden"}>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Sidebar Footer */}
      {
        isOpen && (<div className="border-t border-sidebar-border p-4 space-y-2">
          <Button variant="outline" size="default" className="w-full justify-center items-center" >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className={isOpen ? "block" : "hidden"}>Logout</span>
          </Button>
        </div>)
      }
    </div>
  )
}

export default AccountSidebarChildren