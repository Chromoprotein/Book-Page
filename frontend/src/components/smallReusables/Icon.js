import { SpecialText } from "./TextComponents";

export default function Icon({img, children}) {
    return (
        <div className="grid grid-rows-2 lg:w-64 lg:min-h-64 gap-4 p-5 justify-center justify-items-center text-center">
            {img && <img src={img} className="w-32" alt="Icon" />}
            <SpecialText>{children}</SpecialText>
        </div>
    );
}