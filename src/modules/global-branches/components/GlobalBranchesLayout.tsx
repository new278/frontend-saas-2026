import React from 'react'
import BranchList from './BranchList'
import { getBranches } from '@/src/server/BranchService';

const GlobalBranchesLayout = async () => {
    const data = await getBranches();
    const branches = data.data


  return (
      <BranchList initialData={branches} />
  )
}

export default GlobalBranchesLayout