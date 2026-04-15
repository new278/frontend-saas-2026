import Image from "next/image"
import Link from "next/link"

interface ServiceCardProps {
  title: string
  description: string
  image: string
  link: string
  reversed?: boolean
}

export default function ServiceCard({ title, description, image, link, reversed = false }: ServiceCardProps) {
  return (
    <div className={`flex flex-col ${reversed ? "lg:flex-row-reverse items-start" : "lg:flex-row items-start"} gap-6 md:gap-10 items-center`}>
      {/* Image */}
      <div className="w-full lg:w-2/5 flex-shrink-0">
        <Image
          src={image ?? "/file.svg"}
          alt={title}
          className="w-full h-64 md:h-80 object-cover rounded-lg"
          width={260}
          height={320}
        />
      </div>

      {/* Content */}
      <div className="w-full lg:w-3/5">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-700 leading-relaxed mb-4">{description}</p>
        <Link
          href="#"
          className="text-blue-600 font-semibold hover:text-blue-800 transition inline-flex items-center gap-1"
        >
          {link} →
        </Link>
      </div>
    </div>
  )
}
