import classes from './AddFileBtn.module.css'

function AddFileBtn() {
  return (
    <div className={`${classes.addFileBtn} mb-4 mx-4 flex items-center justify-between cursor-pointer text-white hover:opacity-75 focus:ring-4 font-medium rounded-xl text-lg px-5 py-1  transition`}>
      Добавить
      <span className='text-4xl'>+</span>
    </div>
  )
}

export default AddFileBtn
