export interface AssociateDemo {
  id: string
  name: string
  fullName?: string
  nationality?: string
  logo?: string
  category: string
  subcategory?: string
  propertyType?: string
  workType?: string
  services?: string[]
  serviceArea?: string
  employee?: string
  completedProjects?: number
  supportedLanguages?: string[]
  rank?: string
  establishment?: string
  officeAddress?: string
  aim?: string
  requiredSkills?: string
  description?: string
  status?: 'Active' | 'Inactive'
}

const categories = [
  'Technical',
  'Construction',
  'Real Estate',
  'Import & Export',
  'Visa & Travel',
  'Courses',
  'Jobs',
  'Healthcare',
  'Shopping',
  'Donate',
]

export const associatesDemo: AssociateDemo[] = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i + 1),
  name: 'Tarzan',
  fullName: 'Mr. Jack',
  nationality: 'Japan',
  logo: '/newLogo.png',
  category: categories[i % categories.length],
  subcategory: categories[i % categories.length] === 'Real Estate' ? 'Property Buyer, Property Sales, Property Rental' : 'Residential, Commercial, Industrial, Agricultural',
  propertyType: categories[i % categories.length] === 'Real Estate' ? 'Houses, Flats, Apartments, Townhouses' : undefined,
  workType: categories[i % categories.length] === 'Technical' ? 'New Build, Renovation, Repair, Maintenance, Installation' : categories[i % categories.length] === 'Construction' ? 'New Build, Renovation, Repair, Maintenance, Installation' : categories[i % categories.length] === 'Import & Export' ? 'Import, Export, Manufacturing, Domestic Sales' : undefined,
  services: ['Software Development', 'Web Design & UI/UX', 'Mobile App Development'],
  serviceArea: 'Toronto, Quebec, Nova Scotia, New Brunswick, Canada',
  employee: '01 - 30',
  completedProjects: 26524,
  supportedLanguages: ['English', 'Hindi', 'Portuguese', 'Russian', 'Japanese'],
  rank: `C${i % 6 + 1}`,
  establishment: '14 Years, 12 Months',
  officeAddress: 'Nadd Al Hamar, Dubai, United Arab Emirates',
  aim: '54:15c',
  requiredSkills: 'JavaScript | Website Design | Graphic Design | CSS | HTML | JavaScript | Website Design | Graphic Design',
  description: 'The Netherlands Is Known As The Country With The Highest Density Of Cyclists In The World. The Approximately 17 Million Inhabitants Own Over 18 Million Bicycles And Approximately 25% Of All Commutes Are Done By Bicycle (1). While Cycling In The Netherlands Is Safer Than In Most Other Countries, Cycling Is Not Without Risks. In Addition To Being Used Nationally And Internationally As Well, Cycling Has Many Advantages Like The Improvement Of Health And Being Environmentally Friendly. One Disadvantage Is That Cyclist Is Vulnerable In Traffic (2). In The Netherlands, Approximately 70000 Patients Are Treated Annually In An Emergency Department (ED) After A Bicycle Injury. Of These Patients, Almost 10,000 Are Admitted To A Hospital And Approximately Two Hundred Patients Die As A Result Of Their Injuries (1). Therefore, Many Efforts Are Made To Prevent Bicycle Related Injuries, Including Special Safety Programs For Cyclists And Creating A Safer Infrastructure (2-5). Many Efforts Are Made To Prevent Injuries Amongst Cyclists, Including Special Safety Programs For Cyclists And Creating A Safer Infrastructure (2-5).',
  status: 'Active',
}))

export default associatesDemo
