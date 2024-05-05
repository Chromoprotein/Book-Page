import { LightLink } from "./smallReusables/EasyLink";

export default function Footer() {
    return (
        <div className="bg-teal-700 h-20 px-10 gap-3 flex justify-center items-center mt-10">
            <LightLink to="about">About</LightLink>
            <LightLink to="https://github.com/Chromoprotein">Github</LightLink>
            <LightLink to="more">More websites</LightLink>
        </div>
    );
}