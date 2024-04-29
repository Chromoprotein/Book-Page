import EasyLink from "./smallReusables/EasyLink";
import bookicon from '.././assets/bookicon.webp';
import reader from '.././assets/reader.webp';
import privacy from '.././assets/privacy.webp';
import checkboxicon from '.././assets/checkboxicon.webp';
import Icon from "./smallReusables/Icon";
import { Link } from "react-router-dom";

export default function LoggedOutFrontPage() {
    return (
        <div>
            <div className="bg-hero-image bg-cover bg-center w-full h-96 flex justify-center">
                <div className="my-auto">
                    <EasyLink to={`register`} name="Sign up"/>
                    <EasyLink to={`login`} name="Log in"/>
                </div>
            </div>

            <div className="bg-white lg:w-2/3 mx-auto pb-10 mt-4">
                <div className="flex flex-col mx-auto justify-center">
                    <Icon img={reader}>Get motivated to read more</Icon>

                    <Icon img={checkboxicon}>Track your progress and your likes/dislikes</Icon>

                    <Icon img={bookicon}>Minimalist, no-frills system</Icon>

                    <Icon img={privacy}>Anti-social-media website without distractions</Icon>

                    <button type="button" className="bg-amber-500 p-4 m-4 rounded-full w-1/3 mx-auto"><EasyLink to={`register`} name="Sign up"/></button>
                </div>
            </div>

        </div>
    );
}