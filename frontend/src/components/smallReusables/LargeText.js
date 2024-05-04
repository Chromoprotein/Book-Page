// Large body text for light backgrounds

export default function LargeText({children}) {
    return (
        <p className="text-xl tracking-wide text-teal-800 font-merriweather">{children}</p>
    );
}