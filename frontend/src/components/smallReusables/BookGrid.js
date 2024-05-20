export default function BookGrid({children}) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 auto-rows-fr justify-center w-full justify-items-center">
            {children}
        </div>
    );
}