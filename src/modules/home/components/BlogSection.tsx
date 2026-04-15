import Image from "next/image";
import React from "react";
import { BlogSectionProps } from "../types/home.type";
import { HOME_BLOGS_CARD_DATA } from "../constants/home.constants";
import Link from "next/link";



export default function BlogSection({
	image = "/technology-team-meeting.jpg",
	title = "Blog official",
	subtitle = "With years of experience in mobile security and spyware detection, our products have helped countless people safeguard their devices.",
	ctaLabel = "Learn more",
	ctaHref = "#",
}: BlogSectionProps) {
	const blogs = HOME_BLOGS_CARD_DATA ?? [];
	const heroDate = blogs[0]?.date ?? "Nov 12, 2024";

	return (
		<section className="py-12 md:py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6">
				<h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-4">
					Blogs are Provided worldwide
				</h2>
				<p className="text-center text-gray-600 mb-16 w-ful md:w-2/3 mx-auto">
					With years of experience in mobile security and upscale detection, our products have helped countless people
					safeguard their devices and find peace of mind.
				</p>

				<div className="grid gap-6 md:gap-8 lg:grid-cols-3 items-start">
					<div className="lg:col-span-2 w-full">
						<div className="relative rounded-lg overflow-hidden shadow-lg group">
							<Image
								src={image}
								alt={title}
								width={1200}
								height={700}
								className="w-full h-72 md:h-[500px] object-cover"
							/>


							<div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end">
								<div className="p-6 md:p-10 text-white w-full">
									<h2 className="text-2xl md:text-3xl font-bold">{title}</h2>

									{/* date badge top-left */}
									<div className="w-30 mt-5 font-bold bg-white/10 text-white text-xs px-3 py-1 rounded-full backdrop-blur">
										{heroDate}
									</div>
									{subtitle && (
										<p className="mt-2 text-sm md:text-base opacity-90 max-w-2xl">
											{subtitle}
										</p>
									)}

									<div className="mt-4">
										<a
											href={"#"}
											className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-95"
										>
											{ctaLabel}
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>

					<aside className="w-full flex flex-col gap-4">
						{blogs.map((b) => (
							<MiniCard
								key={b.id}
								image={b.image}
								title={b.title}
								excerpt={b.excerpt}
								date={b.date}
								ctaLabel={ctaLabel}
								ctaHref={ctaHref}
							/>
						))}
					</aside>
				</div>
			</div>
		</section>
	);
}

function MiniCard({
	image,
	title,
	excerpt,
	date,
	ctaLabel = "Learn more",
	ctaHref = "#",
}: {
	image: string;
	title: string;
	excerpt?: string;
	date?: string;
	ctaLabel?: string;
	ctaHref?: string;
}) {
	return (
		<article className="flex items-stretch gap-4 p-3 md:p-4 rounded-lg border hover:shadow-md bg-base-100 transition">
			<div className="w-28 h-28 relative shrink-0 rounded overflow-hidden">
				<Image src={image} alt={title} fill className="object-cover" sizes="112px" />
			</div>

			<div className="flex-1 flex flex-col justify-between">
				<div>
					<div className="flex items-center justify-between">
						<h3 className="text-sm md:text-base font-semibold text-gray-800">{title}</h3>

					</div>

					<p className="text-xs md:text-sm text-gray-600 line-clamp-2 mt-2">{excerpt}</p>
				</div>

				<div className="mt-3 flex items-center justify-between">
					<Link
						href="#"
						className="text-blue-600 font-medium hover:text-blue-800 transition inline-flex items-center gap-1 line-clamp-1"
					>
						Learn More →
					</Link>
					{date && <div className="text-xs text-gray-500">{date}</div>}
				</div>
			</div>
		</article>
	);
}
