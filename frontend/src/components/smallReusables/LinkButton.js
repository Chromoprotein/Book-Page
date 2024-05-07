import { LightLink } from './EasyLink';

// Wide buttons containing a link

export default function LinkButton({to, children, name}) {
    return (
        <button className="bg-gradient-to-r from-teal-800 to-teal-600 h-12 rounded-full w-64 px-5 m-3 text-center font-roboto">
            <LightLink to={to}>
                {children ? children : name}
            </LightLink>
        </button>
    );
}