// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Clock, MapPin } from "lucide-react"

interface Project {
  id: number
  title: string
  category: string
  skills: string[]
  duration: string
  experience: string
  priceRange: string
  description: string
}

interface ProjectListViewProps {
  projects: Project[]
  userRole: "unauthorized" | "normal" | "affiliate" | "business"
}

export function ProjectListView({ projects, userRole }: ProjectListViewProps) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card key={project.id} className="border-l-4 border-l-primary/20 hover:border-l-primary transition-colors">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Title and Price Row */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <a href="#" className="text-lg font-semibold text-primary hover:underline leading-relaxed">
                    {project.title}
                  </a>
                </div>
                <div className="text-lg font-bold text-card-foreground whitespace-nowrap">{project.priceRange}</div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.description} Looking for an experienced developer to build comprehensive business management
                modules including document validation (Govt, PAN, GST and Aadhar/Voter ID/DL and Employee ID/DL
                verification). The project requires expertise in both frontend and backend development with strong
                knowledge of secure data handling and API integration...{" "}
                <a href="#" className="text-primary hover:underline">
                  More
                </a>
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs font-normal">
                    {skill}
                  </Badge>
                ))}
                <Badge variant="secondary" className="text-xs font-normal">
                  AWS
                </Badge>
                <Badge variant="secondary" className="text-xs font-normal">
                  API Integration
                </Badge>
              </div>

              {/* Metadata and Action Row */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    Duration: {project.duration}
                  </span>
                  <span>Experience: {project.experience}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    Modified: 3 Months 8 Days
                  </span>
                </div>
                <Button >
                  Update Project
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
