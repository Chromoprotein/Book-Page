export default function IconContainer({children}) {
    return (
        <span className="flex justify-start items-center gap-1 p-1">
            {children}
        </span>
    );
}