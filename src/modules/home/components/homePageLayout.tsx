import Services from './services'
import Hero from './hero'
import ServiceHighlights from './ServiceHighlights'
import Matrix from './Matrix'
import BlogSection from './BlogSection'
import MapStats from './MapStats'


const HomePageLayout = () => {
  return (
    <main className="min-h-screen max-w-7xl w-7xl mx-auto">
      <Hero />
      <Services />
      <ServiceHighlights />
      <Matrix/>
      <BlogSection/>
      <MapStats/>
    </main>
  )
}

export default HomePageLayout