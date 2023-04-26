import classes from './Blogs.module.css'
import ReactHtmlParser from 'react-html-parser'

export default function Blogs(props) {
  return (
    <ul className={classes.list}>
      {props?.props?.result.length > 0 ? (
        props?.props?.result?.map((prop, i) => (
          <li key={i} className={classes.item}>
            <div className={classes.card}>
              <div className={classes.content}>
                <h3>{prop.title}</h3>
              </div>
              <div className={classes.content}>
                <div> {ReactHtmlParser(prop.content)} </div>
              </div>
              <div className={classes.actions}>
                <button>View Blog</button>
                {props.role == 'ADMIN' ? (
                  <button
                    onClick={() => {
                      props.onHandleDelete(prop._id)
                    }}
                  >
                    Delete
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </li>
        ))
      ) : (
        <div className={classes.no_content}>
          <p>NO BLOGS YET.</p>
        </div>
      )}
    </ul>
  )
}
