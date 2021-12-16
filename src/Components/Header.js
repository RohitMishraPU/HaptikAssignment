import React from 'react'

function Header({search, filter}) {
    return (
        <div className='header'>
          <strong> Friends List  </strong>
          <input
          onChange={(e) => filter(e.target.value)}
          className='searchBar'
          value={search}
          placeholder="Search ..."
        />
        </div>
    )
}

export default Header
