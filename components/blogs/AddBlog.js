import { useRef, useState } from 'react'
import classes from './AddBlog.module.css'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading</p>
})

export default function AddBlog(props) {
  const [data, setData] = useState({
    title: '',
    content: ''
  })

  const [errors, setErrors] = useState(false)

  function onSubmit(e) {
    e.preventDefault()
    if (!data.title || !data.content) {
      setErrors(true)
      return
    } else {
      props.onAddBlog(data)
    }
  }

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false
    }
  }
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video'
  ]

  return (
    <div className={classes.main}>
      <div className={classes.card}>
        <form className={classes.form} onSubmit={onSubmit}>
          <div className={classes.control}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="content">Content</label>
            <QuillNoSSRWrapper
              theme="snow"
              modules={modules}
              formats={formats}
              value={data.content}
              onChange={(e) => setData({ ...data, content: e })}
            />
          </div>
          {errors && (
            <p style={{ color: '#e64848', fontSize: '14px' }}>
              Please fill in title and content
            </p>
          )}
          <div className={classes.actions}>
            <button>Add Meetup</button>
          </div>
        </form>
      </div>
    </div>
  )
}
