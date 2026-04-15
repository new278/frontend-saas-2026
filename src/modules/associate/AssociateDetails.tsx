import { Button } from '@/src/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import type { AssociateDemo } from './demoData'

interface Props {
  associate: AssociateDemo
}

const InfoRow = ({ label, value }: { label: string; value?: string | number | null }) => (
  <div className="flex items-start gap-2 text-sm">
    <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">{label}:</span>
    <span className="text-gray-600">{value || '—'}</span>
  </div>
)

const AssociateDetails = ({ associate }: Props) => {
  return (
    <div className="bg-white shadow border rounded-lg overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-6 p-6">
        <div className="w-full lg:w-64 flex flex-col items-center gap-4">
          <div className="relative w-40 h-40 rounded-lg border-2 bg-white overflow-hidden p-3">
            {associate.logo ? (
              <Image src={associate.logo} alt={associate.name} fill className="object-contain p-2" sizes="160px" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">No Logo</div>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="border-b pb-3">
            <h1 className="text-3xl font-bold text-gray-900">{associate.name}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <InfoRow label="Full Name" value={associate.fullName || associate.name} />
            <InfoRow label="Nationality" value={associate.nationality} />
            
            {associate.workType && <InfoRow label="Work Type" value={associate.workType} />}
            
            <InfoRow label="Category" value={associate.category} />
            
            {associate.subcategory && (
              <div className="md:col-span-2">
                <InfoRow label="Subcategory" value={associate.subcategory} />
              </div>
            )}

            {associate.propertyType && (
              <div className="md:col-span-2">
                <InfoRow label="Property Type" value={associate.propertyType} />
              </div>
            )}

            <InfoRow label="Employee" value={associate.employee} />
            <InfoRow label="Service Area" value={associate.serviceArea} />
            <InfoRow label="Establishment" value={associate.establishment} />
            <InfoRow label="Completed Projects" value={associate.completedProjects} />
            
            {associate.officeAddress && (
              <div className="md:col-span-2">
                <InfoRow label="Office Address" value={associate.officeAddress} />
              </div>
            )}

            {associate.aim && <InfoRow label="Aim" value={associate.aim} />}

            <div className="md:col-span-2">
              <InfoRow 
                label="Supported Languages" 
                value={associate.supportedLanguages?.join(', ')} 
              />
            </div>

            {associate.requiredSkills && (
              <div className="md:col-span-2">
                <InfoRow label="Required Skills" value={associate.requiredSkills} />
              </div>
            )}
          </div>

          {associate.description && (
            <div className="pt-4 border-t">
              <h3 className="text-sm font-bold text-gray-800 mb-2">Description Of Services</h3>
              <p className="text-xs text-gray-700 leading-relaxed">
                {associate.description}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-4">
            <Link href="/associate">
              <Button variant="outline">Back to list</Button>
            </Link>
            <Button>Contact</Button>
            <Button variant="outline">View Portfolio</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssociateDetails
