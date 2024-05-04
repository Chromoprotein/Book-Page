import EasyLink from "./smallReusables/EasyLink";
import giticon from '.././assets/github-mark-white.png';

export default function Footer() {
    return (
        <div className="bg-teal-700 h-20 px-10 gap-3 flex justify-end items-center mt-10">
            <EasyLink to="https://github.com/Chromoprotein">
                <img src={giticon} alt="Github" className="w-10" />
            </EasyLink>
        </div>
    );
}