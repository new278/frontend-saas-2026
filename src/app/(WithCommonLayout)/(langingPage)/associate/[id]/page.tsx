import AssociateDetails from '@/src/modules/associate/AssociateDetails'
import associatesDemo from '@/src/modules/associate/demoData'
import { notFound } from 'next/navigation'

const AssociateDetailsPage = async ({ params }: { params: { id: string } } ) => {

    const { id } = await params;
  const associate = associatesDemo.find(item => item.id === id)

  if (!associate) {
    notFound()
  }

  return (
    <main className="min-h-screen px-5 max-w-7xl w-7xl mx-auto py-12 md:py-20">
      <AssociateDetails associate={associate} />
    </main>
  )
}

export default AssociateDetailsPage
