import { getDB } from '../config/database.js'


export const addTransaction = async (req, res) => {
  try {
    const { type, amount, description, category, date } = req.body

    if (!type || !amount || !category || !date || !description) {
      return res.status(400).json({ message: 'All fields are required!' })
    }

    const db = getDB()
    const query = `
      INSERT INTO transactions (type, amount, category, date, description)
      VALUES (?, ?, ?, ?, ?)
    `
    const [result] = await db.execute(query, [type, amount, category, date, description])

    res.status(201).json({
      success: true,
      message: 'Transaction added successfully!',
      transactionId: result.insertId
    })
  } catch (err) {
    console.error('Error adding transaction:', err)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message
    })
  }
}

export const getTransactions = async (req, res) => {
  try {
    const db = getDB()
    const [rows] = await db.execute(`SELECT * FROM transactions ORDER BY date DESC`)
    res.json(rows)
  } catch (err) {
    console.error('Error while fetching transactions:', err)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}


export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params
    const { type, amount, category, date, description } = req.body

    const db = getDB()
    const [result] = await db.execute(
      `UPDATE transactions SET type=?, amount=?, category=?, date=?, description=? WHERE id=?`,
      [type, amount, category, date, description, id]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Transaction not found!' })
    }

    res.json({ success: true, message: 'Transaction updated successfully!' })
  } catch (err) {
    console.error('Error while updating transaction:', err)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params
    const db = getDB()
    const [result] = await db.execute(`DELETE FROM transactions WHERE id=?`, [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Transaction not found!' })
    }

    res.json({ success: true, message: 'Transaction deleted successfully!' })
  } catch (err) {
    console.error('Error while deleting transaction:', err)
    res.status(500).json({ success: false, message: 'Internal server error.' })
  }
}
