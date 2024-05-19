// Body text for light backgrounds
export function BodyText({children}) {
    
    return (
        <p className="text-lg tracking-wide leading-relaxed font-roboto">{children}</p>
    );

}

// Huge title text
export function TitleText({children}) {

    return (
        <h2 className="text-4xl font-bold p-3 tracking-wide leading-normal text-teal-900 font-poppins">{children}</h2>
    );
    
}

// Quotes and subheadings
export function SpecialText({children}) {

    return (
        <h2 className="text-xl font-medium tracking-wide leading-relaxed text-teal-700 m-3 font-roboto">{children}</h2>
    );
    
}