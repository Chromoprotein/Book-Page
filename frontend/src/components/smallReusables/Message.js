export default function Message({message, onClose}) {
    return (
        <div className="bg-teal-700 text-white z-40 w-full top-0 left-0 right-0 fixed flex flex-row justify-between p-2">
            <p>{message}</p>
            {onClose && <button onClick={onClose}>X</button>}
        </div>
    );
}