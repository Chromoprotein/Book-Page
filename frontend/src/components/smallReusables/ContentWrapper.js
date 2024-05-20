export default function ContentWrapper({children}) {
    return (
        <div className="w-full px-2 md:px-0 md:w-2/3 mx-auto min-h-screen pt-10">
            {children}
        </div>
    );
}