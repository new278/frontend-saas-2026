"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/src/components/ui/button'
import type { AssociateDemo } from '../demoData'

interface Props {
  data: AssociateDemo
}

const AssociateCard: React.FC<Props> = ({ data }) => {
  const statusClass = (status?: string) => {
    const s = (status || '').toLowerCase()
    switch (s) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-primary text-white'
    }
  }

  return (
    <div className="bg-white relative p-4 shadow border rounded-lg hover:shadow-md transition-shadow">
      
      <div className="absolute right-4 top-4 flex flex-col items-center gap-3">
        <div className="w-20 h-20 relative rounded overflow-hidden flex-shrink-0 bg-white p-2 border">
          {data.logo ? (
            <Image src={data.logo} alt={data.name} fill style={{ objectFit: 'contain' }} className="p-1" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">Logo</div>
          )}
        </div>

        <div className="w-full flex justify-center">
          <Button size="sm" className={`${statusClass(data.status)} hover:bg-green-100 hover:text-green-800 px-3 py-1 text-xs`}>
            {data.status}
          </Button>
        </div>
      </div>

      <div className="pr-24">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-slate-900 leading-tight">{data.name}</h3>
          
          <div className="mt-2 space-y-1 text-xs">
            {data.workType && (
              <p className="text-gray-700">
                <span className="font-semibold">Work Type:</span> {data.workType}
              </p>
            )}
            
            <p className="text-gray-700">
              <span className="font-semibold">Category:</span> {data.category}
              {data.subcategory && (
                <>
                  {' '}
                  <span className="text-blue-600 cursor-pointer hover:underline">
                    {data.subcategory.split(',').length} More
                  </span>
                </>
              )}
            </p>

            {data.subcategory && (
              <p className="text-gray-700">
                <span className="font-semibold">Subcategory:</span> {data.subcategory.split(',')[0]}
                {data.subcategory.split(',').length > 1 && (
                  <span className="text-blue-600 cursor-pointer hover:underline ml-1">
                    {data.subcategory.split(',').length - 1} More
                  </span>
                )}
              </p>
            )}

            {data.propertyType && (
              <p className="text-gray-700">
                <span className="font-semibold">Property Type:</span> {data.propertyType.split(',')[0]}
                {data.propertyType.split(',').length > 1 && (
                  <span className="text-blue-600 cursor-pointer hover:underline ml-1">
                    {data.propertyType.split(',').length - 1} More
                  </span>
                )}
              </p>
            )}

            <p className="text-gray-700">
              <span className="font-semibold">Service Area:</span> {data.serviceArea?.split(',')[0]}
              {data.serviceArea && data.serviceArea.split(',').length > 1 && (
                <span className="text-blue-600 cursor-pointer hover:underline ml-1">
                  {data.serviceArea.split(',').length - 1} More
                </span>
              )}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Employee:</span> {data.employee || '01 - 30'}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Completed Projects:</span> {data.completedProjects}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Supported Languages:</span> {data.supportedLanguages?.slice(0, 3).join(', ')}
              {data.supportedLanguages && data.supportedLanguages.length > 3 && (
                <span className="text-blue-600 cursor-pointer hover:underline ml-1">
                  {data.supportedLanguages.length - 3} More
                </span>
              )}
            </p>

            <p className="text-gray-700 flex items-center gap-1">
              <span className="font-semibold">Rank:</span>
              <span className="inline-flex items-center">
                <span className="text-yellow-500 mr-1">🏆</span>
                {data.rank ?? '—'}
              </span>
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Establishment:</span> {data.establishment || '—'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t flex justify-end">
        <Link href={`/associate/${data.id}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default AssociateCard
