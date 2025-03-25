import React from 'react'

import classes from './Logo.module.css';

import logoLink from '../../../assets/logo_cloudy.svg'

function Logo({className}) {
  return (
    <img 
    className={className}
        alt='Logo'
        src={logoLink}
    />
  )
}

export default Logo