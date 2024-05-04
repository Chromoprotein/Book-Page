import LargeText from "./LargeText";

export default function Icon({img, children}) {
    return (
        <div className="grid grid-rows-2 lg:w-64 lg:min-h-64 gap-4 rounded-lg p-5 justify-center justify-items-center mx-auto text-center">
            {img && <img src={img} className="w-32 rounded-l-lg" alt="Icon" />}
            <LargeText>{children}</LargeText>
        </div>
    );
}