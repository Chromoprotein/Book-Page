import { FaStar } from "react-icons/fa";
import IconContainer from "./IconContainer";

export default function RatingStars({stars}) {
    const fullStars = Math.floor(stars);

    const fullStarsElements = Array.from({ length: fullStars }, (_, index) => (
        <FaStar key={index} size="28px" />
    ));

    return (
        <span className="p-3 text-teal-700">
            <IconContainer>
                {fullStarsElements}
            </IconContainer>
        </span>
    );
};