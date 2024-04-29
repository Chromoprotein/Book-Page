import LargeText from "./LargeText";

export default function Icon({img, children}) {
    return (
        <div className="flex lg:w-2/3 gap-4 bg-white rounded-lg m-4 justify-start items-center mx-auto">
            <img src={img} className="w-32 rounded-l-lg " alt="Icon" />
            <LargeText>{children}</LargeText>
        </div>
    );
}