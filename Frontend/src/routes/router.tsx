import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
//import Projects from '../pages/Projects/Projects'
//import Games from '../pages/Games/Games'
//import Articles from '../pages/Articles/Articles'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
