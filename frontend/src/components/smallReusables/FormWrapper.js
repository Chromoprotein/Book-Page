import { TitleText } from "./TextComponents";
import Button from "./Button";
import Message from "./Message";

export default function FormWrapper({children, title, formIsFilled, handleSubmit, message}) {
    return (
        <form className="flex flex-col justify-center shadow-md border-t-4 border-teal-800 items-center gap-5 bg-white rounded-lg w-full p-10 my-10 h-2/3">
            <TitleText>{title}</TitleText>
            {children}
            <Button type="submit" name={title} optionalDisabledCondition={formIsFilled ? false : true} func={handleSubmit}/>
            {message && <Message message={message} />}
        </form>
    );
}