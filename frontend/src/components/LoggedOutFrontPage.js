import bookicon from '.././assets/bookicon.webp';
import reader from '.././assets/reader.webp';
import privacy from '.././assets/privacy.webp';
import checkboxicon from '.././assets/checkboxicon.webp';
import Icon from "./smallReusables/Icon";
import LinkButton from './smallReusables/LinkButton';
import { TitleText, SpecialText } from './smallReusables/TextComponents';

export default function LoggedOutFrontPage() {
    return (
        <div>

            <div className="bg-hero-image bg-cover bg-center w-full h-96"> {/*hero image background*/}
                <div className="bg-amber-50 w-full h-full bg-opacity-50 m-0 flex justify-center text-center"> {/*transparent overlay*/}
                    <div className="my-auto w-96">
                        <div className="mb-7">
                            <TitleText>Challenge yourself to read more </TitleText>
                            <SpecialText>A distraction-free way to track your reading progress and what books you love</SpecialText>
                        </div>
                        <LinkButton to={`register`} name="Create a free account" />
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
                <LinkButton to={`register`} name="Start now" />
            </div>

        </div>
    );
}