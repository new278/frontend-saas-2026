import ServiceCard from "./service-card"

function ServiceHighlights() {
  const serviceDetails = [
    {
      title: "Digital Innovation",
      description:
        "We deliver innovative digital solutions that empower businesses to grow, compete, and succeed in an increasingly connected world. Our services include modern website development, custom software applications, and intelligent AI-powered tools designed to simplify everyday operations. We help organizations improve productivity, automate business processes, and create smarter digital experiences for their customers. Our technology solutions are built with a focus on quality, security, scalability, and long-term business growth. By combining creativity, innovation, and advanced technology, we help businesses transform their ideas into meaningful digital opportunities..",
      image: "/technology-team-meeting.jpg",
      link: "Read More...",
    },
    {
      title: "Infrastructure Solutions",
      description:
        "We connect customers with reliable construction, engineering, and infrastructure service providers to support projects of different sizes. Our platform helps customers explore residential construction, commercial developments, architectural planning, and engineering solutions. We make it easier to discover qualified professionals, coordinate project requirements, and manage essential project information. By improving communication, transparency, and service coordination, we aim to create a smoother experience for customers and businesses. Our goal is to support quality construction, sustainable development, and long-term value through trusted professional connections.",
      image: "/construction-site-building.jpg",
      link: "Read More...",
    },
    {
      title: "Property & Living",
      description:
        "We help customers explore property opportunities and connect with property owners, buyers, sellers, and real estate service providers. Our platform supports the discovery of residential and commercial properties, rental opportunities, and property-related professional services. We make it easier to find relevant options, communicate with service providers, and manage property inquiries in one convenient place. With a focus on transparency, accessibility, and reliable connections, we aim to simplify the property discovery process. Our goal is to make real estate services more convenient and accessible for individuals, families, investors, and businesses.",
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

