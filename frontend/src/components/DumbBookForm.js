import Input from "./smallReusables/Input";
import DropDownMenu from "./smallReusables/DropDownMenu";
import Button from "./smallReusables/Button";
import { genreArray } from "../utils/optionArrays";

// Form for both uploading and editing books

export default function DumbForm({formState, formStateHandler, submitFormHandler}) {

    const formIsFilled = Object.keys(formState).every(key => {  
        const value = formState[key];
        return value !== null && value !== undefined && value !== '';
    });

    return (
        <form>
            <Input name="title" stateValue={formState.title} func={formStateHandler} />

            <Input name="author" stateValue={formState.author} func={formStateHandler} />

            <DropDownMenu name="genre" arr={genreArray} func={formStateHandler} selectedVal={formState.genre} />

            <Button type="submit" name="Submit" optionalDisabledCondition={formIsFilled ? false : true} func={submitFormHandler} />

        </form>
    );
}