import React from 'react'
import { NavLink as Link } from 'react-router-dom'
import styles from '../styles'

const Nav = () => {
  return (
    <div className={styles.navContainer}>
      <Link to="/" className={styles.navIcon}>
        <svg viewBox="0 0 1024 1024">
          <path
            d="M426 854h-212v-342h-128l426-384 426 384h-128v342h-212v-256h-172v256z"
            className=""
          ></path>
        </svg>
      </Link>
      <Link to="/market-place" className={styles.navIcon}>
        <svg viewBox="0 0 1024 1024" >
          <path
            d="M726 768q34 0 59 26t25 60-25 59-59 25-60-25-26-59 26-60 60-26zM42 86h140l40 84h632q18 0 30 13t12 31q0 2-6 20l-152 276q-24 44-74 44h-318l-38 70-2 6q0 10 10 10h494v86h-512q-34 0-59-26t-25-60q0-20 10-40l58-106-154-324h-86v-84zM298 768q34 0 60 26t26 60-26 59-60 25-59-25-25-59 25-60 59-26z"
            className=""
          ></path>
        </svg>
      </Link>
      <Link>
        <svg viewBox="0 0 1024 1024" className={styles.navIcon}>
          <path
            d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"
            className=""
          ></path>
        </svg>
      </Link>
      
    </div>
  )
}

export default Nav
