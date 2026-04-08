// Vista de detalle. Muestra el contenido completo de una nota
// y da la opción de editarla o eliminarla.

import { useParams, useNavigate, Link } from 'react-router-dom'
import { useNotes } from '../../hooks/useNotes'
import styles from './NoteDetail.module.css'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function NoteDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getNoteById, deleteNote } = useNotes()
  const note = getNoteById(id)

  if (!note) {
    return (
      <div className={styles.notFound}>
        <p>Nota no encontrada.</p>
        <Link to="/" className={styles.backLink}>← Volver al inicio</Link>
      </div>
    )
  }

  function handleDelete() {
    if (window.confirm('¿Eliminar esta nota?')) {
      deleteNote(id)
      navigate('/')
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.back}>← Volver</Link>
          <div className={styles.actions}>
            <Link to={`/edit/${id}`} className={styles.editBtn}>Editar</Link>
            <button onClick={handleDelete} className={styles.deleteBtn}>Eliminar</button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <article className={styles.article}>
          <span className={styles.tag}>{note.tag}</span>
          <h1 className={styles.title}>{note.title}</h1>
          <p className={styles.date}>
            {formatDate(note.updatedAt || note.createdAt)}
            {note.updatedAt && ' · editado'}
          </p>
          <div className={styles.divider} />
          <p className={styles.content}>{note.content}</p>
        </article>
      </main>
    </div>
  )
}
