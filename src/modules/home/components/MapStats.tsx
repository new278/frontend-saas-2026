import Image from "next/image";
import React from "react";
import { HOME_BLOG_SECTION_DATA } from "../constants/home.constants";


export default function MapStats() {
	return (
		<section className="py-12 md:py-20">
			<div className="container mx-auto px-4 md:px-6">
				<h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-4">
					Blogs are Provided worldwide
				</h2>
				<p className="text-center text-gray-600 mb-16 w-ful md:w-2/3 mx-auto">
					With years of experience in mobile security and upscale detection, our products have helped countless people
					safeguard their devices and find peace of mind.
				</p>
				<div className="rounded-lg overflow-hidden shadow-sm">
					<div className="w-full h-64 md:h-[420px] relative">
						<Image src={HOME_BLOG_SECTION_DATA?.mapImage as string} alt="map" fill className="object-cover" />
					</div>
				</div>

				<div className="-mt-2 flex justify-center">
					<div className="bg-primary/90 text-white rounded-xl px-6 py-4 flex gap-8 items-center shadow-lg -translate-y-8">
						{HOME_BLOG_SECTION_DATA?.stats?.map((s, idx) => (
							<div key={idx} className="text-center">
								<div className="text-2xl font-bold">{s.value}</div>
								<div className="text-xs opacity-90">{s.label}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
