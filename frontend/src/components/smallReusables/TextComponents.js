// Body text for light backgrounds
export function BodyText({children}) {
    
    return (
        <p className="text-lg tracking-wide font-medium leading-relaxed font-merriweather m-5">{children}</p>
    );

}

// Huge title text
export function TitleText({children}) {

    return (
        <h2 className="text-4xl font-bold p-5 tracking-wide leading-normal text-amber-900 font-playfair text-center">{children}</h2>
    );
    
}

// Quotes and subheadings
export function SpecialText({children}) {

    return (
        <h2 className="text-xl font-medium tracking-wide leading-relaxed text-teal-800 font-merriweather">{children}</h2>
    );
    
}