import ServiceCard from "./service-card"

function ServiceHighlights() {
  const serviceDetails = [
    {
      title: "Technology",
      description:
        "With years of experience in mobile security and upscale detection, our products have helped manufacturers offer a complete range of technology services to help make-marking websites run smoothly.",
      image: "/technology-team-meeting.jpg",
      link: "Read More...",
    },
    {
      title: "Construction",
      description:
        "We help construction companies build a strong online presence and reach more clients. Our services include creating professional websites that highlight your projects, services, and achievements. We also handle the entire architecture.",
      image: "/construction-site-building.jpg",
      link: "Read More...",
    },
    {
      title: "Real Estate",
      description:
        "We offer specialized real estate marketing services designed to help property businesses connect with buyers, sellers, and investors more effectively. Our team creates custom solutions, user-friendly websites that let you connect with property owners.",
      image: "/real-estate-property-hands.jpg",
      link: "Read More...",
    },
  ]

  return (
    <section className="py-12 md:py-20 ">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Services are Provided worldwide
        </h2>
        <p className="text-center text-gray-600 mb-16 w-ful md:w-2/3 mx-auto">
          With years of experience in mobile security and upscale detection, our products have helped countless people
          safeguard their devices and find peace of mind.
        </p>

        <div className="space-y-16">
          {serviceDetails.map((service, index) => (
            <ServiceCard key={index} {...service} reversed={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceHighlights

