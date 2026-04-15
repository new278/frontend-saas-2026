import { getNotice } from '@/src/server/NoticeService'

import NoticeTable from './NoticeTable'
import React from 'react'

const NoticeLayout = async () => {
  const data = await getNotice();
  const notice = data.data
  return (
    <NoticeTable initialData={notice} />
  )
}

export default NoticeLayout