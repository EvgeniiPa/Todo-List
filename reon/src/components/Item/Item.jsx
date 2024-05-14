import Button from "../Button/Button"

export default function Item({id, text, nameTodo, deleteFn}){
    return(
            <div className="flex justify-between items-center m-4  p-2 border-2 border-emerald-500 rounded"> 
                <div className="flex flex-col">
                    <span className="font-bold">Задание №{id}</span>
                    <div>{text}</div>
                    <div>{nameTodo}</div>
                </div>
                <div className="flex flex-col gap-2">
                <Button text='Delete Item' onClick={()=>{
                    deleteFn(id)
                }}/>
                 <Button text='Create Item' onClick={()=>{
                            return(
                                <>
                                </>
                            )
                        }}/>
                </div>
            </div>
    )
}