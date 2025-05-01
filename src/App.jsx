import React from 'react'
import './index.css'
import Navbar from './sections/Navbar'
import Banner from './sections/Banner'
import Apresentation from './sections/Apresentation'
import Projects from './sections/Projects'
const App = () => {
  return (
    <div>
        <Navbar/>
        <Banner />
        <Apresentation />
        <Projects />
    </div>
  )
}

export default App