import Footer from '@/src/modules/shared/footer';
import Header from '@/src/modules/shared/header';
import { ReactNode } from 'react'

const layout = ({children}:{
    children:ReactNode;

}) => {
  return (
     <div >
      <Header />
        {children}
        <Footer/>
    </div>
  )
}

export default layout