// Tarjeta que representa una nota en el listado principal.
// Muestra un resumen y al hacer clic lleva al detalle completo.

import { Link } from 'react-router-dom'
import styles from './NoteCard.module.css'

const TAG_COLORS = {
  General: '#6c757d',
  Personal: '#2d6a4f',
  Tecnología: '#1a5276',
  Trabajo: '#784212',
  Ideas: '#6a1f70',
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function NoteCard({ note }) {
  const color = TAG_COLORS[note.tag] || '#555'
  const preview = note.content.length > 100 ? note.content.slice(0, 100) + '…' : note.content

  return (
    <Link to={`/note/${note.id}`} className={styles.card}>
      <div className={styles.header}>
        <span className={styles.tag} style={{ backgroundColor: color }}>
          {note.tag}
        </span>
        <span className={styles.date}>{formatDate(note.createdAt)}</span>
      </div>
      <h2 className={styles.title}>{note.title}</h2>
      <p className={styles.preview}>{preview}</p>
    </Link>
  )
}
