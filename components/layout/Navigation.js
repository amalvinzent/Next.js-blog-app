import Link from 'next/link'
import classes from './Navigation.module.css'
import { setLogout } from '../../middleware//utils'

export default function Navigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>BLOG</div>
      <nav>
        <ul>
          <li>
            <Link href="/blogs">Blogs</Link>
          </li>
          <li>
            <Link href="/add-blog">Add Blog</Link>
          </li>
          <li>
            <button className={classes.log_button} onClick={setLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
