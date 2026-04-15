import ServicePage from '@/src/modules/services/Components/ServicePage';
import React from 'react'

const Page = async ({ params }: { params: Promise<{ service: string }> }) => {
    const { service } = await params;
  return (
    <ServicePage service={service} />
  )
}

export default Page