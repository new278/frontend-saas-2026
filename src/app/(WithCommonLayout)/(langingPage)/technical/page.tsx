"use client"

import { SearchInput } from "@/src/components/form/search-input"
import { Button } from "@/src/components/ui/button"
import { SelectContent, SelectItem, SelectValue } from "@/src/components/ui/select"
import { Sidebar } from "@/src/modules/dashboard/shared/components/sidebar"
import ServiceSidebarChildren from "@/src/modules/services/Components/ServiceSidebarChildren"
import { FilterSidebar } from "@/src/modules/technical/components/filter-sidebar"
import { ProjectGridView } from "@/src/modules/technical/components/project-grid-view"
import { ProjectListView } from "@/src/modules/technical/components/project-list-view"
import { Select, SelectTrigger } from "@radix-ui/react-select"
import { Grid3x3, List } from "lucide-react"
import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Search, Grid3x3, List } from "lucide-react"
// import { ProjectGridView } from "@/components/project-grid-view"
// import { ProjectListView } from "@/components/project-list-view"
// import { FilterSidebar } from "@/components/filter-sidebar"

// User roles: 'unauthorized' | 'normal' | 'affiliate' | 'business'
export default function TechnicalPage() {
  const [userRole, setUserRole] = useState<"unauthorized" | "normal" | "affiliate" | "business">("normal")
  const [layout, setLayout] = useState<"grid" | "list">("grid")
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
   const [sidebarOpen, setSidebarOpen] = useState(true)

  // Determine which layout to show based on user role
  const showGridByDefault = userRole === "unauthorized" || userRole === "normal" || userRole === "affiliate"
  const showListByDefault = userRole === "business"

  // Mock projects data
  const projects = [
    {
      id: 1,
      title:
        "Frontend & Backend Module Stateside: Documents Validation, Inventory, Business Management Module Development",
      category: "Web Development",
      skills: ["Python", "React", "Django"],
      duration: "3 Months 8 Days",
      experience: "5 Years",
      priceRange: "$10,000.00",
      description:
        "I am looking for an experienced full-stack developer (with over 5 years of experience) to build a comprehensive web application focused on documents validation (Govt. PAN, GST and Aadhar/Voter IDDL and Employee IDDL verification).",
    },
    {
      id: 2,
      title:
        "Frontend & Verified Module Stateside: Documents Validation, Inventory, Business Management Module Development",
      category: "Mobile Development",
      skills: ["React Native", "Firebase", "TypeScript"],
      duration: "2 Months 4 Days",
      experience: "3 Years",
      priceRange: "$7,500.00",
      description:
        "Need a skilled mobile developer to create cross-platform application with real-time data synchronization, offline capabilities, and secure document verification features.",
    },
    {
      id: 3,
      title: "Software Testing & Quality Assurance for Enterprise Application",
      category: "QA Testing",
      skills: ["Selenium", "Jest", "Cypress"],
      duration: "1 Month 2 Days",
      experience: "2 Years",
      priceRange: "$3,500.00",
      description:
        "Seeking QA specialist to implement automated testing suite, perform manual testing, and ensure software quality across all platforms for our enterprise management system.",
    },
    {
      id: 4,
      title: "Database Architecture & Performance Optimization for High-Traffic App",
      category: "Backend Development",
      skills: ["PostgreSQL", "MongoDB", "Redis"],
      duration: "6 Weeks",
      experience: "4 Years",
      priceRange: "$8,200.00",
      description:
        "Database expert needed to design scalable architecture, optimize query performance, implement caching strategies, and handle millions of daily transactions efficiently.",
    },
    {
      id: 5,
      title: "UI/UX Design for E-commerce Platform with Advanced Features",
      category: "Design",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      duration: "3 Weeks",
      experience: "3 Years",
      priceRange: "$4,800.00",
      description:
        "Creative designer required to redesign e-commerce platform with focus on conversion optimization, accessibility, user experience, and mobile-first responsive design.",
    },
    {
      id: 6,
      title: "DevOps Pipeline Setup & CI/CD Implementation for Microservices",
      category: "DevOps",
      skills: ["Docker", "Kubernetes", "Jenkins"],
      duration: "4 Weeks",
      experience: "5 Years",
      priceRange: "$11,500.00",
      description:
        "DevOps engineer to establish automated deployment pipeline, infrastructure as code, monitoring solutions, and container orchestration for complex microservices architecture.",
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Filter Sidebar */}
      {/* <FilterSidebar /> */}
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)}>
        <ServiceSidebarChildren isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="border-b bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-card-foreground">Technology</h1>

              {/* Demo: User Role Selector */}
              {/* <Select value={userRole} onValueChange={(value: any) => setUserRole(value)}>
                <SelectTrigger className="w-[180px] bg-secondary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unauthorized">Unauthorized</SelectItem>
                  <SelectItem value="normal">Normal User</SelectItem>
                  <SelectItem value="affiliate">Affiliate User</SelectItem>
                  <SelectItem value="business">Business User</SelectItem>
                </SelectContent>
              </Select> */}
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                {/* <Searcr className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search" className="w-64 pl-9 bg-background" /> */}
                 <SearchInput value={query} onChange={(v) => { setQuery(v); setPage(1); }} placeholder="Search blogs..." />
              </div>

              {/* Layout Toggle */}
              <div className="flex gap-1 rounded-lg border bg-background p-1">
                <Button
                  variant={layout === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLayout("grid")}
                  className="h-8 w-8 p-0"
                >
                  <Grid3x3 className="h-4 w-4 " />
                </Button>
                <Button
                  variant={layout === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLayout("list")}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Button>+ Create Project</Button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        {/* <div className="border-b bg-card px-6 py-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Total results: 1-6 of 393</span>
            <span>Showing 1-6</span>
          </div>
        </div> */}

        {/* Content Area */}
        <div className="p-6">
          {/* For business users, show list view by default, but allow toggle */}
          {/* For other users, show grid by default, but allow toggle */}

          {layout === "grid" ? (
            <ProjectGridView projects={projects} userRole={userRole} />
          ) : (
            <ProjectListView projects={projects} userRole={userRole} />
          )}

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="secondary" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              ...
            </Button>
            <Button variant="outline" size="sm">
              66
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>

          {/* Info Message */}
          {(userRole === "unauthorized" || userRole === "normal" || userRole === "affiliate") && (
            <div className="mt-6 text-center">
              <p className="text-sm text-destructive">
                Unlock more projects that have been reserved for a 3 year elite members are prevented by clicking here.
              </p>
            </div>
          )}

          {userRole === "business" && layout === "grid" && (
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                If person records will only show projects with the highest prices will be shown here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
