import React, { useState } from 'react'
import Menulist from '../CustomPage/Menulist'
import '../Pages/Transaction.css'
import axios from 'axios'

const Transaction = () => {
  const [formData, setFormData] = useState({
    type: '',
    amount: '',
    category: '',
    date: '',
    description: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const [formError, setFormError] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()
    const validationError = {}

    if (!formData.type?.trim()) {
      validationError.type = 'Selete type'
    }
    if (!formData.amount?.trim()) {
      validationError.amount = 'Enter amount'
    }
    if (!formData.category?.trim()) {
      validationError.category = 'Enter caretory'
    }
    if (!formData.date?.trim()) {
      validationError.date = 'Select date from calender'
    }
    if (!formData.description?.trim()) {
      validationError.description = 'Type description'
    }
    setFormError(validationError)
    if (Object.keys(validationError).length === 0) {
      try {
        const response = await axios.post(
          'http://localhost:4002/expanse/api/v1/addTransaction',
          formData
        )

        console.log('formData:', response.data)

        if (response.status === 201) {
          alert('Transaction added successfully!')

          setFormData({
            type: '',
            amount: '',
            category: '',
            date: '',
            description: ''
          })
        }
      } catch (error) {
        console.error('Error', error)
        alert('Something went wrong')
      }
    }
  }

  return (
    <div className='d-flex'>
      <div className='dashboard-container'>
        <Menulist />
      </div>

      <div className='transaction-page w-75'>
        <h4 className=''>Add Transaction</h4>
        <form onSubmit={handleSubmit} className='border rounded p-4 bg-light'>
          <div className='row'>
            <div className='col-4'>
              <label className='form-label'>
                <strong>Select type</strong>
                <strong className='text-danger'> *</strong>
              </label>
              <select
                name='type'
                value={formData.type}
                onChange={handleChange}
                className='form-select'
              >
                <option value=''>Select Type</option>
                <option value='income'>income</option>
                <option value='expanse'>expanse</option>
              </select>
              {formError.type && (
                <span className='text-danger'>{formError.type}</span>
              )}
            </div>
            <div className='col-4'>
              <label className='form-label'>
                <strong>Enter amount</strong>
                <strong className='text-danger'> *</strong>
              </label>
              <input
                value={formData.amount}
                onChange={handleChange}
                name='amount'
                type='number'
                placeholder='Amount'
                className='form-control'
                required
              />
              {formError.amount && (
                <span className='text-danger'>{formError.amount}</span>
              )}
            </div>
            <div className='col-4'>
              <label className='form-label'>
                <strong>Enter category</strong>
                <strong className='text-danger'> *</strong>
              </label>
              <input
                value={formData.category}
                onChange={handleChange}
                type='text'
                name='category'
                placeholder='Category'
                className='form-control'
                required
              />
              {formError.category && (
                <span className='text-danger'>{formError.category}</span>
              )}
            </div>
          </div>

          <div className='row pt-4'>
            <div className='col-4'>
              <label className='form-label'>
                <strong>Select date</strong>
                <strong className='text-danger'> *</strong>
              </label>
              <input
                value={formData.date}
                onChange={handleChange}
                type='date'
                name='date'
                placeholder='date'
                className='form-control'
                required
              />
              {formError.month && (
                <span className='text-danger'>{formError.month}</span>
              )}
            </div>
            <div className='col-4'>
              <label className='form-label'>
                <strong>Description</strong>
                <strong className='text-danger'> *</strong>
              </label>
              <textarea
                type='text'
                value={formData.description}
                onChange={handleChange}
                name='description'
                placeholder='Description'
                className='form-control'
              />
              {formError.description && (
                <span className='text-danger'>{formError.description}</span>
              )}
            </div>

            <div className='col-4 pt-4 text-end'>
              <button type='submit' className='btn btn-success'>
                Add Transaction
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Transaction
