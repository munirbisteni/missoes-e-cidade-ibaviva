import React from 'react'
import './index.css'
import Navbar from './sections/Navbar'
import Banner from './sections/Banner'
import Apresentation from './sections/Apresentation'
import ProjetosCarousel from './sections/Projects'
const App = () => {
  return (
    <div>
        <Navbar/>
        <Banner />
        <Apresentation />
        <ProjetosCarousel />
    </div>
  )
}

export default App