import Link from "next/link"
import { Button } from "./ui/button"

// import { siteConfig } from "@/config/site"
// import { CommandMenu } from "@/components/command-menu"
// import { Icons } from "@/components/icons"
// import { MainNav } from "@/components/main-nav"
// import { MobileNav } from "@/components/mobile-nav"
// import { ModeSwitcher } from "@/components/mode-switcher"
// import { Button } from "@/registry/new-york/ui/button"
import { Palette } from "lucide-react";
import LikeButton from "./like-button";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";


export function SiteHeader() {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-12 sm:px-4">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center justify-between my-0 mx-auto">
          <MainNav />
          <MobileNav />
          <div className="flex flex-1 w-2 items-center gap-2 justify-end">
            {/* <div className="w-full flex-1 md:w-auto md:flex-none">
              <h1 className="text-lg">Next Poetry</h1>
            </div> */}
            <nav className="flex items-center gap-2 justify-end mr-3">
              <Button variant="ghost" size="icon">
                <Link
                  href={"/random"}
                  target="_blank"
                  rel="noreferrer"
                >
                <Palette />
                  <span className="sr-only">Edit theme</span>
                </Link>
              </Button>
              <Button variant="outline">
                <Link
                  href={"/login"}
                  target="_blank"
                  rel="noreferrer"
                >
                Log in
                  <span className="sr-only">Log in</span>
                </Link>
              </Button>
              
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}