export default function Input({type, placeholder, onChange, value, maxlength}){
    return(
        <input className="w-3/6 m-auto bg-green-200 outline-green-400 rounded p-1 my-1"
            type={type}
            placeholder={placeholder} 
            onChange={onChange} 
            value={value} 
            maxLength={maxlength}
        />
    )
}