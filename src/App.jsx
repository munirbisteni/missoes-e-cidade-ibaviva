import React from 'react'
import './index.css'
import Navbar from './sections/Navbar'
import Banner from './sections/Banner'
import Apresentation from './sections/Apresentation'
import ProjetosCarousel from './sections/Projects'
import Missionaries from './sections/Missionaries'
const App = () => {
  return (
    <div>
        <Navbar/>
        <Banner />
        <Apresentation />
        <ProjetosCarousel />
        <Missionaries />
    </div>
  )
}

export default App