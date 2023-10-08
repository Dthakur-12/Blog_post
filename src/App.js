import React from 'react'
import { Routes } from 'react-router-dom'
import Header from './Components/Header'
import RoutesFile from './Components/RoutesFile'

const App = () => {
  return (
    <div className='fluid-container'>
    <Header/>
    <div className='container'>
    <RoutesFile/>
    </div>

    </div>
  )
}

export default App