import { LightLink } from './EasyLink';

// Wide buttons containing a link

export default function LinkButton({to, children, name}) {
    return (
        <button className="bg-teal-800 h-12 rounded-full min-w-64 px-5 mx-auto text-center">
            <LightLink to={to}>
                {children ? children : name}
            </LightLink>
        </button>
    );
}