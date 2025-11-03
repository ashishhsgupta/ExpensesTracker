import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Menulist from '../CustomPage/Menulist'

const API_BASE = 'http://localhost:4002/expanse/api/v1'

const ViewTransaction = () => {
  const [transactions, setTransactions] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({
    type: '',
    amount: '',
    category: '',
    date: '',
    description: ''
  })

  const [searchType, setSearchType] = useState('')
  const [searchCategory, setSearchCategory] = useState('')
  const [searchDate, setSearchDate] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 10

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${API_BASE}/getTransactions`)
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.transactions || []
      setTransactions(data)
      setFilteredTransactions(data)
    } catch (err) {
      console.error('Error fetching transactions:', err)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this transaction?'))
      return
    try {
      const res = await axios.delete(`${API_BASE}/deleteTransaction/${id}`)
      if (res.status === 200 || res.status === 204) {
        alert('Transaction deleted successfully!')
        fetchTransactions()
      } else {
        alert('Failed to delete transaction!')
      }
    } catch (err) {
      console.error('Error deleting transaction:', err)
      alert('Something went wrong while deleting.')
    }
  }

  const handleEdit = txn => {
    setEditingId(txn.id)
    setEditData({
      type: txn.type,
      amount: txn.amount,
      category: txn.category,
      date: txn.date?.split('T')[0],
      description: txn.description
    })
  }

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${API_BASE}/updateTransaction/${editingId}`,
        editData,
        { headers: { 'Content-Type': 'application/json' } }
      )
      if (res.status === 200 || res.status === 201) {
        alert('Transaction updated successfully!')
        setEditingId(null)
        fetchTransactions()
      } else {
        alert('Failed to update transaction!')
      }
    } catch (err) {
      console.error('Error updating transaction:', err)
      alert('Something went wrong while updating.')
    }
  }

  useEffect(() => {
    let filtered = transactions.filter(txn => {
      const matchType = searchType
        ? txn.type.toLowerCase().includes(searchType.toLowerCase())
        : true
      const matchCategory = searchCategory
        ? txn.category.toLowerCase().includes(searchCategory.toLowerCase())
        : true
      const matchDate = searchDate
        ? txn.date?.split('T')[0] === searchDate
        : true
      return matchType && matchCategory && matchDate
    })
    setFilteredTransactions(filtered)
    setCurrentPage(1)
  }, [searchType, searchCategory, searchDate, transactions])

  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = filteredTransactions.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  )
  const totalPages = Math.ceil(filteredTransactions.length / recordsPerPage)

  return (
    <div className='d-flex'>
      <div className='dashboard-container'>
        <Menulist />
      </div>

      <div className='w-75 p-2 ms-5'>
        <h4 className='mb-4'>View Transactions</h4>

        <div className='border rounded p-3'>
          <div className='row mb-4'>
            <div className='col-md-3'>
              <select
                className='form-select'
                value={searchType}
                onChange={e => setSearchType(e.target.value)}
              >
                <option value=''>Filter by Type</option>
                <option value='income'>Income</option>
                <option value='expanse'>Expanse</option>
              </select>
            </div>
            <div className='col-md-3'>
              <input
                type='text'
                className='form-control'
                placeholder='Search by Category'
                value={searchCategory}
                onChange={e => setSearchCategory(e.target.value)}
              />
            </div>
            <div className='col-md-3'>
              <input
                type='date'
                className='form-control'
                value={searchDate}
                onChange={e => setSearchDate(e.target.value)}
              />
            </div>
            <div className='col-md-3'>
              <button
                className='btn btn-secondary w-100'
                onClick={() => {
                  setSearchType('')
                  setSearchCategory('')
                  setSearchDate('')
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>

          <table className='table table-bordered table-hover'>
            <thead className='bg-light'>
              <tr>
                <th className=''>Sr. No.</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Description</th>
                <th style={{ width: '150px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.length === 0 ? (
                <tr>
                  <td colSpan='7' className='text-center text-muted'>
                    No transactions found.
                  </td>
                </tr>
              ) : (
                currentRecords.map((txn, index) => (
                  <tr key={txn.id}>
                    {editingId === txn.id ? (
                      <>
                        <td>{indexOfFirstRecord + index + 1}</td>
                        <td>
                          <select
                            value={editData.type}
                            onChange={e =>
                              setEditData({ ...editData, type: e.target.value })
                            }
                            className='form-select'
                          >
                            <option value='income'>Income</option>
                            <option value='expanse'>Expanse</option>
                            <option value='tractive'>Tractive</option>
                          </select>
                        </td>
                        <td>
                          <input
                            type='number'
                            className='form-control'
                            value={editData.amount}
                            onChange={e =>
                              setEditData({
                                ...editData,
                                amount: e.target.value
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type='text'
                            className='form-control'
                            value={editData.category}
                            onChange={e =>
                              setEditData({
                                ...editData,
                                category: e.target.value
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type='date'
                            className='form-control'
                            value={editData.date}
                            onChange={e =>
                              setEditData({ ...editData, date: e.target.value })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type='text'
                            className='form-control'
                            value={editData.description}
                            onChange={e =>
                              setEditData({
                                ...editData,
                                description: e.target.value
                              })
                            }
                          />
                        </td>
                        <td>
                          <button
                            className='btn btn-success btn-sm me-2'
                            onClick={handleUpdate}
                          >
                            Save
                          </button>
                          <button
                            className='btn btn-secondary btn-sm'
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{indexOfFirstRecord + index + 1}</td>
                        <td>{txn.type}</td>
                        <td>{txn.amount}</td>
                        <td>{txn.category}</td>
                        <td>{txn.date?.split('T')[0]}</td>
                        <td>{txn.description}</td>
                        <td>
                          <button
                            className='btn btn-primary btn-sm me-2'
                            onClick={() => handleEdit(txn)}
                          >
                            Edit
                          </button>
                          <button
                            className='btn btn-danger btn-sm'
                            onClick={() => handleDelete(txn.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className='d-flex justify-content-between align-items-center mt-3'>
          <p className='mb-0'>
            Showing {indexOfFirstRecord + 1}–
            {Math.min(indexOfLastRecord, filteredTransactions.length)} of{' '}
            {filteredTransactions.length}
          </p>
          <div>
            <button
              className='btn btn-outline-primary btn-sm me-2'
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              className='btn btn-outline-primary btn-sm ms-2'
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewTransaction
