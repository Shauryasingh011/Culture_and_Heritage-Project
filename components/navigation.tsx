"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  Home,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Search,
  Globe,
  Mountain,
  Waves,
  TreePine,
  Building,
} from "lucide-react"

const allStates = [
  { id: "andhra-pradesh", name: "Andhra Pradesh", region: "South" },
  { id: "arunachal-pradesh", name: "Arunachal Pradesh", region: "Northeast" },
  { id: "assam", name: "Assam", region: "Northeast" },
  { id: "bihar", name: "Bihar", region: "East" },
  { id: "chhattisgarh", name: "Chhattisgarh", region: "Central" },
  { id: "goa", name: "Goa", region: "West" },
  { id: "gujarat", name: "Gujarat", region: "West" },
  { id: "haryana", name: "Haryana", region: "North" },
  { id: "himachal-pradesh", name: "Himachal Pradesh", region: "North" },
  { id: "jharkhand", name: "Jharkhand", region: "East" },
  { id: "karnataka", name: "Karnataka", region: "South" },
  { id: "kerala", name: "Kerala", region: "South" },
  { id: "madhya-pradesh", name: "Madhya Pradesh", region: "Central" },
  { id: "maharashtra", name: "Maharashtra", region: "West" },
  { id: "manipur", name: "Manipur", region: "Northeast" },
  { id: "meghalaya", name: "Meghalaya", region: "Northeast" },
  { id: "mizoram", name: "Mizoram", region: "Northeast" },
  { id: "nagaland", name: "Nagaland", region: "Northeast" },
  { id: "odisha", name: "Odisha", region: "East" },
  { id: "punjab", name: "Punjab", region: "North" },
  { id: "rajasthan", name: "Rajasthan", region: "West" },
  { id: "sikkim", name: "Sikkim", region: "Northeast" },
  { id: "tamil-nadu", name: "Tamil Nadu", region: "South" },
  { id: "telangana", name: "Telangana", region: "South" },
  { id: "tripura", name: "Tripura", region: "Northeast" },
  { id: "uttar-pradesh", name: "Uttar Pradesh", region: "North" },
  { id: "uttarakhand", name: "Uttarakhand", region: "North" },
  { id: "west-bengal", name: "West Bengal", region: "East" },
]

const regions = [
  { name: "North", icon: Mountain, color: "bg-blue-500" },
  { name: "South", icon: Waves, color: "bg-green-500" },
  { name: "East", icon: TreePine, color: "bg-yellow-500" },
  { name: "West", icon: Building, color: "bg-red-500" },
  { name: "Northeast", icon: Mountain, color: "bg-purple-500" },
  { name: "Central", icon: Globe, color: "bg-orange-500" },
]

interface NavigationProps {
  currentStateId?: string
}

export default function Navigation({ currentStateId }: NavigationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const currentStateIndex = currentStateId ? allStates.findIndex((state) => state.id === currentStateId) : -1
  const previousState = currentStateIndex > 0 ? allStates[currentStateIndex - 1] : null
  const nextState = currentStateIndex < allStates.length - 1 ? allStates[currentStateIndex + 1] : null

  const isHomePage = pathname === "/"
  const isStatePage = pathname.startsWith("/states/")

  const getBreadcrumbs = () => {
    if (isHomePage) return []
    if (isStatePage && currentStateId) {
      const state = allStates.find((s) => s.id === currentStateId)
      return [
        { label: "Home", href: "/" },
        { label: "States", href: "/#states-section" },
        { label: state?.name || "State", href: `/states/${currentStateId}` },
      ]
    }
    return []
  }

  const breadcrumbs = getBreadcrumbs()

  return (
    <>
      {/* Main Navigation Header */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => router.push("/")}>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-foreground">Explore India</h1>
                <p className="text-sm text-muted-foreground">Discover 28 States</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <Button
                variant={isHomePage ? "default" : "ghost"}
                size="sm"
                onClick={() => router.push("/")}
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Home
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/#states-section")}
                className="flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Explore States
              </Button>

              {/* Region Quick Access */}
              <div className="flex items-center gap-2">
                {regions.slice(0, 3).map((region) => {
                  const IconComponent = region.icon
                  return (
                    <Button
                      key={region.name}
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 text-xs"
                      onClick={() => router.push(`/#states-section`)}
                    >
                      <IconComponent className="w-3 h-3" />
                      {region.name}
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-6 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="font-bold">Explore India</h2>
                      <p className="text-sm text-muted-foreground">28 States</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      variant={isHomePage ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => {
                        router.push("/")
                        setIsOpen(false)
                      }}
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Home
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        router.push("/#states-section")
                        setIsOpen(false)
                      }}
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Explore States
                    </Button>
                  </div>

                  {/* Regions in Mobile */}
                  <div>
                    <h3 className="font-semibold mb-3">Regions</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {regions.map((region) => {
                        const IconComponent = region.icon
                        return (
                          <Button
                            key={region.name}
                            variant="outline"
                            size="sm"
                            className="justify-start bg-transparent"
                            onClick={() => {
                              router.push(`/#states-section`)
                              setIsOpen(false)
                            }}
                          >
                            <IconComponent className="w-4 h-4 mr-2" />
                            {region.name}
                          </Button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Quick State Access */}
                  <div>
                    <h3 className="font-semibold mb-3">Popular States</h3>
                    <div className="space-y-1">
                      {allStates.slice(0, 6).map((state) => (
                        <Button
                          key={state.id}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => {
                            router.push(`/states/${state.id}`)
                            setIsOpen(false)
                          }}
                        >
                          <MapPin className="w-3 h-3 mr-2" />
                          {state.name}
                          <Badge variant="secondary" className="ml-auto text-xs">
                            {state.region}
                          </Badge>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center gap-2">
                  {index > 0 && <span>/</span>}
                  <button onClick={() => router.push(crumb.href)} className="hover:text-foreground transition-colors">
                    {crumb.label}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* State Navigation (Previous/Next) */}
      {isStatePage && (previousState || nextState) && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
          <div className="flex items-center gap-4 bg-background/95 backdrop-blur-sm border border-border rounded-full px-6 py-3 shadow-lg">
            {previousState && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(`/states/${previousState.id}`)}
                className="flex items-center gap-2 hover:bg-primary/10"
              >
                <ChevronLeft className="w-4 h-4" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Previous</p>
                  <p className="text-sm font-medium">{previousState.name}</p>
                </div>
              </Button>
            )}

            {previousState && nextState && <div className="w-px h-8 bg-border" />}

            {nextState && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(`/states/${nextState.id}`)}
                className="flex items-center gap-2 hover:bg-primary/10"
              >
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Next</p>
                  <p className="text-sm font-medium">{nextState.name}</p>
                </div>
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Spacer for fixed navigation */}
      <div className="h-20" />
    </>
  )
}
