import { Category } from '@prisma/client';
import { useState , useEffect} from 'react';
import type { Dispatch, SetStateAction } from 'react';
import Modal from 'react-modal';
import { api } from '~/utils/api';
import { BarLoader } from 'react-spinners';
function MyModal({showModal, setShowModal, content}: {showModal: boolean; setShowModal: Dispatch<SetStateAction<boolean>>;content: string}) {
  const createPost = api.post.createPost.useMutation()
  const [tags, setTags] = useState<string[]>([])
  const [tag,setTag] = useState('')
  const [title,setTitle] = useState('')
  const [subtitle,setSubtitle] = useState('')

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  }


  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      setTags((prevState) => {
        return [...prevState, tag]
      })
      setTag('')
    }
  }
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.currentTarget.value)
  } 

  const onChangeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onChangeSubtitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubtitle(e.currentTarget.value)
  }

  const onRemoveTagHandler = (index: number) => {
    setTags((prevState) => {
      return prevState.slice(0,index).concat(prevState.slice(index+1,prevState.length))
    })
  }


  const onPublishHandler = () => {
    if(title.length > 2){
      createPost.mutate({
        title,
        content,
        category: Category.WEB_DEV,
        tags,
        subtitle
      })
    }
  }

  useEffect(() => {
    if(createPost.isSuccess){
      setShowModal(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[createPost])
  

  return(
    <>
      <Modal
        isOpen={showModal}
        onRequestClose={toggleModal}
        contentLabel="Modal Title"
        className="bg-blue-950 h-[70%] w-[70%] rounded-xl shadow-xl p-10" 
        overlayClassName="bg-gray-500/50 absolute top-0 w-screen h-screen flex justify-center items-center"
        >
        <div className='flex space-y-3 flex-col justify-start items-start'>
            <input className='bg-blue-950 border border-red-50 p-1 pl-2 w-[70%] rounded-xl text-white text-lg font-bold outline-none' placeholder='Add title ' onChange={onChangeTitleHandler} value={title}/>
            <input className='bg-blue-950 border border-red-50 p-1 pl-2 w-[70%] rounded-xl text-white text-lg font-bold outline-none' placeholder='Add subtitle (optional)' onChange={onChangeSubtitleHandler} value={subtitle}/>
        </div> 
        <div className='items-center '>
            <p className='text-white font-semibold mt-3'>{"Add tags (max 5)"}</p>
            <div className='flex space-x-2 bg-blue-900 w-[60%] p-2 rounded-lg shadow-md flex-wrap gap-1'>
                {
                  tags.map((tag,index) => {
                    return <div key={index} className='p-1 bg-blue-600 rounded-lg text-white' onClick={() => onRemoveTagHandler(index)}>
                      {tag}
                    </div>
                  })
                }
                {tags.length < 5 && <input className='bg-blue-950 p-1 pl-2 rounded-xl text-white text-lg font-bold outline-none' placeholder='Add tag (optional)' value={tag} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>}
            </div>
        </div>
        <div className='flex items-center space-x-5'>

        <button onClick={toggleModal} className='text-white mt-5  w-32 py-1 rounded-lg border border-red-50'>Keep it in draft</button>
        {createPost.isLoading ? <BarLoader height={5} width={100} color='green' className='mt-5'/> :<button onClick={onPublishHandler} className={`${title.length < 2 ? "bg-green-500/40" :"bg-green-500/90"} text-white mt-5  w-32 py-1 rounded-lg ml-5`} disabled={title.length < 2}>Publish</button>}
        </div>
      </Modal>
    </>
  );
}

export default MyModal;
// In this example, we're using the react-modal library to handle the creation and rendering of the modal. The Modal component creates a portal for the modal content, and handles the keyboard and focus events automatically. It also provides some additional features like overlay and close button handling. The isOpen prop controls the visibility of the modal, and the onRequestClose prop specifies the function to be called when the user clicks the overlay or close button to dismiss the modal.






