import Button from "./Button";
import EasyLink from "./EasyLink";

export default function LinkButton({to, name}) {
    return (
        <Button>
            <EasyLink to={to} name={name}/>
        </Button>
    );
}