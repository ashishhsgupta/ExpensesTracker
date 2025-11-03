import React from 'react'
import { FaUserCheck } from 'react-icons/fa'
import { AiOutlineDashboard } from 'react-icons/ai'
import { BsCardChecklist, BsCardList, BsCassette } from 'react-icons/bs'
import { MdOutlineSavings } from 'react-icons/md'
import '../CustomPage/Menulist.css'
import { useLocation, useNavigate } from 'react-router-dom'

const Menulist = () => {
  const Navigate = useNavigate()
  const location = useLocation()

  const handleClick = path => {
    Navigate(path)
  }

  const MenuList = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: (
        <AiOutlineDashboard className='fs-3 me-2' style={{ width: '25px' }} />
      ),
      path: '/dashboard'
    },
    {
      key: 'transactions',
      label: 'Add Transactions',
      icon: <BsCardChecklist className='fs-3 me-2' style={{ width: '25px' }} />,
      path: '/transactions'
    },
    {
      key: 'getTransaction',
      label: 'View Transactions',
      icon: <BsCassette className='fs-3 me-2' style={{ width: '25px' }} />,
      path: '/viewTransaction'
    },
    {
      key: 'reports',
      label: 'Report',
      icon: <BsCardList className='fs-3 me-2' style={{ width: '25px' }} />,
      path: '/reports'
    },
    {
      key: 'savings',
      label: 'Savings',
      icon: (
        <MdOutlineSavings className='fs-3 me-2' style={{ width: '25px' }} />
      ),
      path: '/savings'
    }
  ]

  return (
    <div className='dashboard-container pb-4 w-25'>
      <div className='dashboard-list'>
        {MenuList.map(item => (
          <div
            key={item.key}
            onClick={() => handleClick(item.path)}
            className={`ul-list ${
              location.pathname === item.path ? 'activeMenu' : ''
            }`}
          >
            <span className='fs-3 me-2' style={{ width: '25px' }}>
              {item.icon}
            </span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Menulist
