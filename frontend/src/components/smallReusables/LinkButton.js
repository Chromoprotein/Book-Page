import EasyLink from './EasyLink';

// Buttons containing a link, meant for dark backgrounds

export default function LinkButton({to, children, name}) {
    return (
        <button className="bg-teal-800 rounded-full min-w-64 h-12 px-5 mx-auto text-center" type="button">
            <EasyLink to={to}>
                {children ? children : name}
            </EasyLink>
        </button>
    );
}