import React from 'react'

function Button (prop) {
  return (
    <button {...prop} style={{ background: '#00ADB5', width: 'fit-content', height: 'fit-content', color: 'white', border: 'none', transition: 'all 200ms' }}>
        {prop.children}
    </button>
  )
}

export default Button
