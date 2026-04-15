// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"

import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/src/components/ui/card"

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

interface ProjectGridViewProps {
  projects: Project[]
  userRole: "unauthorized" | "normal" | "affiliate" | "business"
}

export function ProjectGridView({ projects, userRole }: ProjectGridViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card key={project.id} className="flex flex-col">
          <CardHeader className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-base leading-tight text-card-foreground">{project.title}</h3>
            </div>
            <Badge  className="w-fit text-xs">
              {project.category}
            </Badge>
          </CardHeader>

          <CardContent className="flex-1 space-y-3">
            <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>

            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                {project.skills.map((skill) => (
                  <Badge key={skill} className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Duration: {project.duration}</span>
                <span>Exp: {project.experience}</span>
              </div>

              <div className="text-sm font-semibold text-primary">{project.priceRange}</div>
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Update Project</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
