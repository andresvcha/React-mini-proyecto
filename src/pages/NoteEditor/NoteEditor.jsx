// Vista del editor. Sirve tanto para crear una nota nueva como para editar una existente.
// Si la URL trae un ID carga los datos de esa nota, si no presenta el formulario vacío.

import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useNotes } from '../../hooks/useNotes'
import styles from './NoteEditor.module.css'

const TAGS = ['General', 'Personal', 'Tecnología', 'Trabajo', 'Ideas']

export default function NoteEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addNote, updateNote, getNoteById } = useNotes()
  const isEditing = Boolean(id)
  const existing = isEditing ? getNoteById(id) : null

  const [title, setTitle] = useState(existing?.title ?? '')
  const [content, setContent] = useState(existing?.content ?? '')
  const [tag, setTag] = useState(existing?.tag ?? 'General')
  const [error, setError] = useState('')

  useEffect(() => {
    if (isEditing && !existing) navigate('/')
  }, [isEditing, existing, navigate])

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) {
      setError('El título es obligatorio.')
      return
    }
    if (!content.trim()) {
      setError('El contenido es obligatorio.')
      return
    }

    if (isEditing) {
      updateNote(id, { title: title.trim(), content: content.trim(), tag })
      navigate(`/note/${id}`)
    } else {
      const newId = addNote({ title: title.trim(), content: content.trim(), tag })
      navigate(`/note/${newId}`)
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link to={isEditing ? `/note/${id}` : '/'} className={styles.back}>← Cancelar</Link>
          <h1 className={styles.heading}>{isEditing ? 'Editar nota' : 'Nueva nota'}</h1>
        </div>
      </header>

      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {error && <p className={styles.error}>{error}</p>}

          <label className={styles.label} htmlFor="title">Título</label>
          <input
            id="title"
            className={styles.input}
            type="text"
            placeholder="Dale un título a tu nota..."
            value={title}
            onChange={e => { setTitle(e.target.value); setError('') }}
          />

          <label className={styles.label} htmlFor="tag">Categoría</label>
          <select
            id="tag"
            className={styles.select}
            value={tag}
            onChange={e => setTag(e.target.value)}
          >
            {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <label className={styles.label} htmlFor="content">Contenido</label>
          <textarea
            id="content"
            className={styles.textarea}
            placeholder="Escribe aquí tu nota..."
            value={content}
            onChange={e => { setContent(e.target.value); setError('') }}
            rows={12}
          />

          <button type="submit" className={styles.submitBtn}>
            {isEditing ? 'Guardar cambios' : 'Crear nota'}
          </button>
        </form>
      </main>
    </div>
  )
}
