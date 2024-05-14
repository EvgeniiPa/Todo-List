import { useState } from "react"

export default function Button({text, onClick}){
    const [mauseOver, setMauseOver] = useState(false)

    return(
        <button 
            style={{backgroundColor: mauseOver ? 'green' :'rgb(74 222 128)'}}
            className="flex justify-center items-center  h-8  uppercase rounded font-bold text-xs" 
            onMouseOver={()=>setMauseOver(!mauseOver)}
            onMouseLeave={()=> setMauseOver(!mauseOver)}
            onClick={()=>onClick()}
            >
                {text}
            </button>
    )
}