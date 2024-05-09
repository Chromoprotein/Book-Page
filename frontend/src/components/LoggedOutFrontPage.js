import bookicon from '.././assets/bookicon.jpg';
import reader from '.././assets/reader.jpg';
import privacy from '.././assets/privacy.jpg';
import checkboxicon from '.././assets/checkboxicon.jpg';
import Icon from "./smallReusables/Icon";
import LinkButton from './smallReusables/LinkButton';
import { TitleText, SpecialText } from './smallReusables/TextComponents';

export default function LoggedOutFrontPage() {

    return (
        <div>

            <div className="bg-hero-image bg-cover bg-center w-full h-96"> {/*hero image background*/}
                <div className="bg-amber-50 w-full h-full bg-opacity-70 m-0 flex justify-start"> {/*transparent overlay*/}
                    <div className="my-auto w-1/3 ml-10">
                        <div className="">
                            <TitleText>Challenge yourself to read more </TitleText>
                            <SpecialText>A distraction-free way to track your reading progress and what books you love</SpecialText>
                            <LinkButton to={`../register`} name="Create a free account" />
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className="p-7 mt-4 text-center w-2/3 mx-auto">
                <TitleText>Why join</TitleText>
                <div className="flex flex-wrap justify-center">
                    <Icon img={reader}>Get motivated to read more</Icon>

                    <Icon img={checkboxicon}>Track your progress and your likes/dislikes</Icon>

                    <Icon img={bookicon}>Minimalist, no-frills system</Icon>

                    <Icon img={privacy}>Anti-social-media website without distractions</Icon>

                    <Icon img={bookicon}>Completely free!</Icon>
                </div>
                <LinkButton to={`../register`} name="Start now" />
            </div>

        </div>
    );
}