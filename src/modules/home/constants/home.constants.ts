import { BlogCard, MAP_STATS, Metric } from "../types/home.type";

export const METRICS: Metric[] = [
    { id: "m1", value: "150+", label: "Country" },
    { id: "m2", value: "12 K+", label: "Customers" },
    { id: "m3", value: "700 K+", label: "Our Services" },
    { id: "m4", value: "20 K+", label: "Our Support" },
    { id: "m5", value: "15 K+", label: "Completed Project" },
    { id: "m6", value: "12 M+", label: "Our Team" },
    { id: "m7", value: "12 M+", label: "Associate" },
    { id: "m8", value: "12 M+", label: "Year of Experience" },
]

export const HOME_BLOGS_CARD_DATA: BlogCard[] = [
    { id: "c1", title: "Stunning Design", excerpt: "Short description of the project and why it matters.", image: "/real-estate-property-hands.jpg", date: "Nov 12, 2024" },
    { id: "c2", title: "Stunning Design", excerpt: "Short description of the project and why it matters.", image: "/construction-site-building.jpg", date: "Nov 12, 2024" },
    { id: "c3", title: "Stunning Design", excerpt: "Short description of the project and why it matters.", image: "/technology-team-meeting.jpg", date: "Nov 12, 2024" },
]


export const HOME_BLOG_SECTION_DATA: MAP_STATS = {
    mapImage: "/image/map.webp",
    stats: [
        { value: 160, label: "Markets" },
        { value: 150, label: "Countries" },
        { value: 156, label: "Currencies" },
    ],
}