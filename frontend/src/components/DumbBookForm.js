import Input from "./smallReusables.js/Input";
import DropDownMenu from "./smallReusables.js/DropDownMenu";
import Button from "./smallReusables.js/Button";
import { genreArray } from "../utils/optionArrays";

// Form for both uploading and editing books

export default function DumbForm({formState, formStateHandler, submitFormHandler}) {
    return (
        <form>
            <Input name="title" stateValue={formState.title} func={formStateHandler} />

            <Input name="author" stateValue={formState.author} func={formStateHandler} />

            <DropDownMenu name="genre" arr={genreArray} func={formStateHandler} selectedVal={formState.genre} />

            <Button type="submit" name="Submit" func={submitFormHandler} />
        </form>
    );
}