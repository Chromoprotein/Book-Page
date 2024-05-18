import { LightLink } from './EasyLink';

// Wide buttons containing a link

export default function LinkButton({to, children, name}) {
    return (
        <button className="bg-gradient-to-r from-teal-800 to-teal-600 rounded-full w-48 px-5 text-center flex justify-center items-center p-1 font-bold tracking-wide font-playfair h-12">
            <LightLink to={to}>
                {children ? children : name}
            </LightLink>
        </button>
    );
}