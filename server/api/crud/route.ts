import { defineEventHandler, readBody, getQuery } from 'h3'
import pool from '../../database/config'  

export default defineEventHandler(async (event) => {
  const method = event.method

  // ==================== GET ====================
  if (method === 'GET') {
    const query = getQuery(event)

    // GET by ID
    if (query.id) {
      const [rows] = await pool.query(
        'SELECT * FROM mockup_projects WHERE id = ?',
        [query.id]
      )
      return { status: 200, data: (rows as any[])[0] ?? null }
    }

    // GET ALL
    const [rows] = await pool.query(
      'SELECT id, name, thumbnail, created_at, updated_at FROM mockup_projects ORDER BY updated_at DESC'
    )
    return { status: 200, data: rows }
  }

  // ==================== POST ====================
  if (method === 'POST') {
    const body = await readBody(event)
    const { name, layout_json, thumbnail } = body

    if (!name || !layout_json) {
      return { status: 400, message: 'name dan layout_json wajib diisi' }
    }

    const [result] = await pool.query(
      'INSERT INTO mockup_projects (name, layout_json, thumbnail) VALUES (?, ?, ?)',
      [name, JSON.stringify(layout_json), thumbnail ?? null]
    )

    return {
      status: 201,
      message: 'Project berhasil disimpan',
      id: (result as any).insertId
    }
  }

  // ==================== PUT ====================
  if (method === 'PUT') {
    const body = await readBody(event)
    const { id, name, layout_json, thumbnail } = body

    if (!id) {
      return { status: 400, message: 'id wajib diisi' }
    }

    await pool.query(
      'UPDATE mockup_projects SET name = ?, layout_json = ?, thumbnail = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, JSON.stringify(layout_json), thumbnail ?? null, id]
    )

    return { status: 200, message: 'Project berhasil diupdate' }
  }

  // ==================== DELETE ====================
  if (method === 'DELETE') {
    const query = getQuery(event)

    if (!query.id) {
      return { status: 400, message: 'id wajib diisi' }
    }

    await pool.query(
      'DELETE FROM mockup_projects WHERE id = ?',
      [query.id]
    )

    return { status: 200, message: 'Project berhasil dihapus' }
  }

  return { status: 405, message: 'Method not allowed' }
})