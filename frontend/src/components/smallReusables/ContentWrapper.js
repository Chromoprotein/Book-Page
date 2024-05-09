export default function ContentWrapper({children}) {
    return (
        <div className="w-2/3 mx-auto min-h-screen pt-10">
            {children}
        </div>
    );
}