import React from 'react';
interface InputProps {
    id: string;
    onChange: any;
    value: string;
    label: string;
    type?: string;
}
const Input : React.FC<InputProps> = ({
    id, 
    onChange,
    value,
    label,
    type,
}) => {
    return (
        <div className="relative">
            <input
                onChange={onChange}
                type={type}
                value={value}
                id={id}
                className="border-2 
                    rounded-2xl p-2 pt-2
                    block text-md appearance-none
                    focus:outline-none
                    focus:right-0
                    peer placeholder-transparent"
                placeholder=" "
            />
            <label
                className="absolute
                text-md text-zinc-500 duration-150
                top-0
                transform
                scale-50
                z-10 
                origin-[0]
                left-2
                peer-placeholder-shown:scale-90
                peer-placeholder-shown:top-2
                peer-focus:scale-50
                peer-focus:-translate-y-2
                peer-focus:translate-x-1
                "
                htmlFor={id}>
                {id}
            </label>
        </div>
    )

}

export default Input