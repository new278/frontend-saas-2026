import ImageIcons from "@/src/components/ui/ImageIcons"

const services = [
  { name: "Technology", icon: ImageIcons.IconTechnicalImg },
  { name: "Construction", icon: ImageIcons.IconConstructionImg },
  { name: "Real Estate", icon: ImageIcons.IconRealEstateImg },
  { name: "Commercial & Industrial", icon: ImageIcons.IconCommercialIndustrialImg },
  { name: "Visa & Travel", icon: ImageIcons.IconVisaTravelImg },
  { name: "Education", icon: ImageIcons.IconEducationImg },
  { name: "Careers", icon: ImageIcons.IconCareersImg },
  { name: "Healthcare", icon: ImageIcons.IconHealthcareImg },
  { name: "Market Place", icon: ImageIcons.IconMarketPlaceImg },
  { name: "Business", icon: ImageIcons.IconBusinessImg },
  { name: "Investment", icon: ImageIcons.IconInvestmentImg },
  { name: "Donations", icon: ImageIcons.IconDonationsImg },
]

export default function Services() {
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.name}
                className="flex flex-col items-center gap-3 p-6 rounded-lg hover:bg-gray-50 transition cursor-pointer"
              >
                <div className="w-16 h-16 flex items-center justify-center  text-primary hover:bg-background transition">
                  <Icon size={32} />
                </div>
                <p className="text-sm md:text-base font-semibold text-gray-800 text-center">{service.name}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
