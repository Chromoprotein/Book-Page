import EasyLink from "./smallReusables/EasyLink";
import bookicon from '.././assets/bookicon.webp';
import reader from '.././assets/reader.webp';
import privacy from '.././assets/privacy.webp';
import checkboxicon from '.././assets/checkboxicon.webp';
import Icon from "./smallReusables/Icon";
import LinkButton from './smallReusables/LinkButton';

export default function LoggedOutFrontPage() {
    return (
        <div>
            <div className="bg-hero-image bg-cover bg-center w-full h-96 "> {/*hero image background*/}
                <div className="bg-amber-50 w-full h-full bg-opacity-50 m-0 flex justify-center text-center"> {/*transparent overlay*/}
                    <div className="my-auto w-96">
                        <h1 className="text-4xl font-bold p-5 text-amber-900 font-playfair ">Challenge yourself to read more </h1>
                        <p className="text-xl pb-5 font-merriweather text-teal-800">A distraction-free way to track your reading progress and what books you love</p>
                        <LinkButton to={`register`} name="Create a free account" />
                    </div>
                </div>
            </div>

            <div className="bg-white lg:w-2/3 mx-auto pb-10 mt-4">
                <div className="flex flex-col mx-auto justify-center">
                    <Icon img={reader}>Get motivated to read more</Icon>

                    <Icon img={checkboxicon}>Track your progress and your likes/dislikes</Icon>

                    <Icon img={bookicon}>Minimalist, no-frills system</Icon>

                    <Icon img={privacy}>Anti-social-media website without distractions</Icon>

                    <button type="button" className="bg-amber-500 p-4 m-4 rounded-full w-1/3 mx-auto"><EasyLink to={`register`} name="Create a free account"/></button>
                </div>
            </div>

        </div>
    );
}