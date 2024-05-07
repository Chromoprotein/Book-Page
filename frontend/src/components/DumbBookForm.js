import Input from "./smallReusables/Input";
import DropDownMenu from "./smallReusables/DropDownMenu";
import Button from "./smallReusables/Button";
import { genreArray } from "../utils/optionArrays";
import { TitleText } from "./smallReusables/TextComponents";

// Form for both uploading and editing books

export default function DumbForm({formState, formStateHandler, submitFormHandler, title}) {

    const formIsFilled = Object.keys(formState).every(key => {  
        const value = formState[key];
        return value !== null && value !== undefined && value !== '';
    });

    return (
            <form className="flex flex-col justify-center shadow-md border-t-4 border-teal-800 items-center gap-5 bg-white rounded-lg w-full p-10 my-10 h-2/3">
                <TitleText>{title}</TitleText>
                <Input name="title" placeholder="Title" stateValue={formState.title} func={formStateHandler} />

                <Input name="author" placeholder="Author" stateValue={formState.author} func={formStateHandler} />
                
                <DropDownMenu name="genre" arr={genreArray} func={formStateHandler} selectedVal={formState.genre} />

                <Button type="submit" name="Submit" optionalDisabledCondition={formIsFilled ? false : true} func={submitFormHandler} />

            </form>
    );
}