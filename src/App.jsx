// Define qué vista se muestra según la URL en la que esté el usuario.

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import NoteDetail from './pages/NoteDetail/NoteDetail'
import NoteEditor from './pages/NoteEditor/NoteEditor'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/note/:id" element={<NoteDetail />} />
      <Route path="/new" element={<NoteEditor />} />
      <Route path="/edit/:id" element={<NoteEditor />} />
    </Routes>
  )
}
