"use client"
import { Button } from '@/src/components/ui/button'
import { Project, SERVICE_CONFIGS, ServiceType, UserType } from '@/src/lib/service-types'
import { LayoutGrid, List } from "lucide-react"
import { useCallback, useState } from 'react'
import { AccessDeniedState } from './access-denied-state'
import { ServiceGridView } from './service-grid-view'
import { ServiceListView } from './service-list-view'

// Demo data - replace with backend
const DEMO_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Full Stack Web Application Development",
    description: "Looking for experienced developers to build a scalable web application with React and Node.js",
    category: "Web Development",
    subcategory: "Full Stack",
    type: "One-time Project",
    skills: ["React", "Node.js", "PostgreSQL", "TypeScript"],
    budget: 5000,
    postedBy: "Tech Startup",
    status: "open",
    createdAt: new Date("2025-01-10"),
  },
  {
    id: "2",
    title: "Mobile App Testing & QA",
    description: "Need comprehensive testing for iOS and Android applications",
    category: "QA & Testing",
    subcategory: "Automation",
    type: "Ongoing Work",
    skills: ["Selenium", "Test Automation", "iOS Testing"],
    budget: 2500,
    postedBy: "App Studio",
    status: "open",
    createdAt: new Date("2025-01-09"),
  },
  {
    id: "3",
    title: "React Frontend Redesign",
    description: "Modernize our existing React application with new UI/UX design",
    category: "Web Development",
    subcategory: "Frontend",
    type: "One-time Project",
    skills: ["React", "Tailwind CSS", "Design Implementation"],
    budget: 3000,
    postedBy: "E-commerce Company",
    status: "open",
    createdAt: new Date("2025-01-08"),
  },
]



const ServiceMainSection = ({ service }: { service: ServiceType | string }) => {
  // `service` may come from a route param (string). Guard against invalid keys.
  const serviceKey = String(service) as ServiceType
  const serviceConfig = SERVICE_CONFIGS[serviceKey]

  const [userType, setUserType] = useState<UserType>("unauthorized") // Replace with actual auth
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState<string>(serviceConfig?.categories?.[0]?.id || "")
  const [selectedType, setSelectedType] = useState<string>("")
  const [projects] = useState<Project[]>(DEMO_PROJECTS)

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory) {
      const categoryName = serviceConfig?.categories?.find((c) => c.id === selectedCategory)?.name
      if (categoryName && p.category !== categoryName) {
        return false
      }
    }
    if (selectedType && p.type !== selectedType) {
      return false
    }
    return true
  })

  const handleCreateProject = useCallback((projectData?: Partial<Project>) => {
    console.log("Create project:", projectData)
    // Navigate to project creation form
  }, [])

  const handleViewDetails = useCallback((projectId: string) => {
    console.log("View project details:", projectId)
  }, [])

  const handleShareProject = useCallback((projectId: string) => {
    console.log("Share project:", projectId)
  }, [])

  const handleApproveProject = useCallback((projectId: string) => {
    console.log("Apply/Approve project:", projectId)
  }, [])

  if (!serviceConfig) {
    // Render a small helpful message rather than throwing — this prevents the whole component from failing to render.
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white border border-border rounded p-6">
            <h2 className="text-lg font-semibold">Service not found</h2>
            <p className="text-sm text-muted-foreground mt-2">No configuration available for &quot;{serviceKey}&quot;. Check the route parameter or use one of: {Object.keys(SERVICE_CONFIGS).join(', ')}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                {serviceConfig.icon} {serviceConfig.name}
              </h1>
              <p className="text-muted-foreground mt-1">{serviceConfig.description}</p>
            </div>

            {/* Auth State Display */}
            <div className="flex items-center gap-2">
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value as UserType)}
                className="px-3 py-2 border border-border rounded text-sm"
              >
                <option value="unauthorized">Unauthorized</option>
                <option value="user">User</option>
                <option value="affiliate">Affiliate</option>
                <option value="business">Business</option>
              </select>
              {userType !== "unauthorized" && userType !== "business" && (
                <Button onClick={() => handleCreateProject()}>+ Create Project</Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full">
        {/* Unauthorized State */}
        {userType === "unauthorized" && (
          <div>
            <AccessDeniedState
              title="Want to Create Projects?"
              description="Sign in or create an account to post projects on our platform"
            />
          </div>
        )}

        {/* Authorized Users */}
        {userType !== "unauthorized" && (
          <>
            {/* View Mode Toggle - Only for non-business users */}
            {userType !== "business" && (
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-muted-foreground">Showing {filteredProjects.length} projects</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={viewMode === "grid" ? "default" : "outline"}
                    onClick={() => setViewMode("grid")}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === "list" ? "default" : "outline"}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Projects Display */}
            {userType === "business" ? (
              // Business view - list layout only, full width
              <ServiceListView
                projects={filteredProjects}
                userType={userType}
                onViewDetails={handleViewDetails}
                onCreateProject={handleCreateProject}
                onShareProject={handleShareProject}
                onApproveProject={handleApproveProject}
              />
            ) : (
              // User/Affiliate/Unauthorized view - grid/list toggle
              viewMode === "grid" ? (
                <ServiceGridView
                  projects={filteredProjects}
                  userType={userType}
                  onViewDetails={handleViewDetails}
                  onCreateProject={handleCreateProject}
                  onShareProject={handleShareProject}
                  onApproveProject={handleApproveProject}
                  showCreateCard={userType === "user"}
                />
              ) : (
                <ServiceListView
                  projects={filteredProjects}
                  userType={userType}
                  onViewDetails={handleViewDetails}
                  onCreateProject={handleCreateProject}
                  onShareProject={handleShareProject}
                  onApproveProject={handleApproveProject}
                />
              )
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ServiceMainSection