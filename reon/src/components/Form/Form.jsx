import Button from "../Button/Button"
import Input from "../Input/Input"
import Item from "../Item/Item"
import { useEffect, useState } from "react"
import axios from "axios"




export default function Form(){
    const [id,setId] = useState(0)
    const [items, setItems] = useState([])
    const [titleValue, setTitleValue] = useState('')
    const [descriptionValue, setDescriptionValue] = useState('')
    const [checkInputs, setCheckInputs] = useState(true)
    const [editCheck, setEditCheck] = useState(null)
    const [editTitle, setEditTitle] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [bonusCat, setBonusCat] = useState(false)
    const [urlCat, setUrlCat] = useState('')

    useEffect(()=>{
        let allStatus = items.filter(item => item.status === true)
        if(allStatus.length !== 0 && allStatus.length === items.length){
            setBonusCat(true)
            console.log('Ты все сделал')
            return
        }
        setBonusCat(false)
    }, [items])

    
    async function getCat(){
        const resp = await axios.get(`https://api.thecatapi.com/v1/images/search`)
        const data = resp.data
        setUrlCat(data[0].url)
    }

    function addValue(){
        setId(id+1)
        setItems([...items, {id: id, nameTodo: titleValue, text: descriptionValue, status: false}])
        setDescriptionValue('')
        setTitleValue('')
    }

    function deleteValue(index){
        setItems(items.filter(item => item.id !== index))
    }

    function clearList(){
        setItems([])
        setId(0)
        setDescriptionValue('')
        setTitleValue('')
    }

    function editCurrentTodo(index){
        let newItem = {id: index, nameTodo:editTitle, text: editDescription, status: false}
        let newEditItems = items.filter(item => item.id !== index) 
        newEditItems.splice(index, 0, newItem)
        setItems(newEditItems)
        setEditTitle('')
        setEditDescription('')
        setEditCheck(null)
    }

    function checkStatusTodo(index){
        let findStatus = {id: index, nameTodo: items[index].nameTodo, text: items[index].text, status: !items[index].status}
        let newStatusTodo = items.filter(item => item.id !== index)
        newStatusTodo.splice(index, 0, findStatus)
        setItems(newStatusTodo)
        console.log(items)
    }


    return(
        <>
             {bonusCat ? 
                <div className='flex flex-col m-auto  items-center w-96 mt-10 bg-green-100 rounded-md border-lime-700 border-2'> 
                    <span>Ты все сделал(а), можешь позвать котика!</span>
                    <Button text='Котик' onClick={()=> getCat()}/>
                    <div className='w-42 h-42'>
                       {urlCat !== '' ? <img src={`${urlCat}`} alt="cat"/> : <>Нажми на кнопку</>}
                    </div>
                    <Button text='Вернуться к списку дел' onClick={()=>setBonusCat(false)}/>
                 </div> : 
                <form 
                    className="flex flex-col m-auto w-96 mt-10 bg-green-100 rounded-md border-lime-700 border-2"
                    onSubmit={(e)=>e.preventDefault()}>
                        <span className="font-bold m-auto">Todo List</span>
                        <div className="flex flex-col items-center my-3">
                        <Input
                            placeholder='Title...' 
                            type='text' 
                            onChange={(e)=> setTitleValue(e.target.value)} 
                            value={titleValue}
                            maxlength='30'/>
                        <span>{30 - titleValue.length}</span>
                        <Input 
                            placeholder='Description...' 
                            type='text'  
                            onChange={(e)=> setDescriptionValue(e.target.value)} 
                            value={descriptionValue}
                            maxlength='30'/>
                        <span>{30 - descriptionValue.length}</span>
                            <div className="flex w-full justify-between mt-3">
                                <Button text='Add Item' onClick={()=>{
                                    if(descriptionValue !== '' && titleValue !== ''){
                                        setCheckInputs(false)
                                        addValue()
                                        console.log(checkInputs)
                                    }             
                                }}/>
                                <Button text='Clear List'onClick={()=>clearList()}/>
                            </div>
                        </div>
                {checkInputs && <span className="m-auto uppercase font-bold">Input your todo</span>}
    
                {items.length !== 0 && items.map((item, index)=>{
                    return(
                    <>
                        <div className="flex flex-wrap justify-between items-center m-4  p-2 border-2 border-emerald-500 rounded" key={item.id + index}> 
    
                            {editCheck === index ?
                                <div >
                                    <span className="font-bold">Edit Todo</span>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder='Title...' 
                                            type='text' 
                                            onChange={(e)=> setEditTitle(e.target.value)} 
                                            value={editTitle}
                                            maxlength='25'/>
                                        <Input 
                                            placeholder='Description...' 
                                            type='text'  
                                            onChange={(e)=> setEditDescription(e.target.value)} 
                                            value={editDescription}
                                            maxlength='25'/>
                                    </div>
                                    <Button text='Save Edit' onClick={()=>editDescription.length !== 0 && editTitle.length !== 0 && editCurrentTodo(index)}/>
                                </div>
                            : 
    
                            <div key={item.id}>
    
                                <div className="flex flex-col">
                                    <span className="font-bold" style={{ textDecoration: item.status ? 'line-through' : ''}}>Задание №{item.id}</span>
                                    <div style={{ textDecoration: item.status ? 'line-through' : ''}}>{item.nameTodo}</div>
                                    <div style={{ textDecoration: item.status ? 'line-through' : ''}}>{item.text}</div>
                                </div>
                                <div className="flex justify-between gap-2">
                                    <Button text='Delete Todo' onClick={()=>{
                                       !items[index].status && deleteValue(item.id)
                                    }}/>
                                    <Button text='Edit Todo' onClick={()=>{!items[index].status && setEditCheck(index)}}/>
                                    <Button text='Done' onClick={()=> checkStatusTodo(index)}/>
                                </div>  
    
                            </div>  
    
                            }       
                        </div> 
                    </>
                    )
                })}
                </form>}

        </>
    )
}