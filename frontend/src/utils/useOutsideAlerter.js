import { useEffect } from "react";

export default function useOutsideAlerter(ref, isOpen, setIsOpen) {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        // Only add the listener if the component is open
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, ref, setIsOpen]); // Ensure the effect runs only if isOpen changes or the ref changes

}
