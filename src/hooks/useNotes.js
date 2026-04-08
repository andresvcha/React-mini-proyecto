// Toda la lógica de las notas vive aquí: crear, editar, eliminar y guardar en localStorage.
// Cualquier vista que necesite trabajar con notas simplemente llama a useNotes().

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'mini-blog-notes-v2'

const SEED_NOTES = [
  {
    id: '1',
    title: 'Bienvenido al Mini Blog',
    content: 'Esta es tu primera nota. Puedes leerla, editarla o eliminarla. También puedes crear nuevas notas con el botón de arriba.',
    tag: 'General',
    createdAt: '2026-03-01T09:00:00.000Z',
  },
  {
    id: '2',
    title: 'Ideas para el fin de semana',
    content: 'Visitar el mercado local, leer el libro pendiente, preparar pasta casera y dar un paseo por el parque.',
    tag: 'Personal',
    createdAt: '2026-03-03T14:30:00.000Z',
  },
  {
    id: '3',
    title: 'Recursos de React',
    content: 'Revisar la documentación oficial de React Router v6, practicar hooks personalizados y explorar Zustand como alternativa a Context.',
    tag: 'Tecnología',
    createdAt: '2026-03-05T11:15:00.000Z',
  },
]

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return SEED_NOTES
    return JSON.parse(raw)
  } catch {
    return SEED_NOTES
  }
}

function save(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

export function useNotes() {
  const [notes, setNotes] = useState(load)

  useEffect(() => {
    save(notes)
  }, [notes])

  function addNote(data) {
    const note = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...data,
    }
    setNotes(prev => [note, ...prev])
    return note.id
  }

  function updateNote(id, data) {
    setNotes(prev =>
      prev.map(n => (n.id === id ? { ...n, ...data, updatedAt: new Date().toISOString() } : n))
    )
  }

  function deleteNote(id) {
    setNotes(prev => prev.filter(n => n.id !== id))
  }

  function getNoteById(id) {
    return notes.find(n => n.id === id)
  }

  return { notes, addNote, updateNote, deleteNote, getNoteById }
}
