// Vista principal. Muestra todas las notas y permite filtrarlas
// por categoría o buscarlas por texto en tiempo real.

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNotes } from '../../hooks/useNotes'
import NoteCard from '../../components/NoteCard/NoteCard'
import styles from './Home.module.css'

const TAGS = ['Todas', 'General', 'Personal', 'Tecnología', 'Trabajo', 'Ideas']

export default function Home() {
  const { notes } = useNotes()
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('Todas')

  const filtered = notes.filter(note => {
    const matchTag = activeTag === 'Todas' || note.tag === activeTag
    const matchSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
    return matchTag && matchSearch
  })

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.logo}>📝 Mis Notas</h1>
          <Link to="/new" className={styles.newBtn}>+ Nueva nota</Link>
        </div>
      </header>

      <main className={styles.main}>
        <input
          className={styles.search}
          type="text"
          placeholder="Buscar notas..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className={styles.tags}>
          {TAGS.map(tag => (
            <button
              key={tag}
              className={`${styles.tagBtn} ${activeTag === tag ? styles.tagActive : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className={styles.empty}>No se encontraron notas.</p>
        ) : (
          <div className={styles.grid}>
            {filtered.map(note => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
