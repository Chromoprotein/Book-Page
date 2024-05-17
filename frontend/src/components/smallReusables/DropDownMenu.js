import { useState, useRef } from "react";
import Button from "./Button";
import useGenericKeyDown from "../../utils/useGenericKeyDown";
import useOutsideAlerter from "../../utils/useOutsideAlerter";
import { BodyText } from "./TextComponents";
import FormButton from "./FormButton";
import { IoIosArrowDown } from "react-icons/io";
import IconContainer from "./IconContainer";

export default function DropDownMenu({ name, arr, selectedVal, func, alert }) {

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Click outside the menu closes the menu
  // If the click target is not contained within dropdownRef.current, it's outside the menu
  useOutsideAlerter(dropdownRef, isOpen, setIsOpen);

  // Accessibility
  // (selectedItem) => { ... } is a callback function (handleEnter) which is excuted by pressing enter
  const handleKeyDown = useGenericKeyDown((selectedItem) => {
    const option = selectedItem.getAttribute('data-option-value'); 
    const name = selectedItem.getAttribute('data-name');
    const simulatedEvent = {
      target: { name: name, value: option },
    };
    func(simulatedEvent);
    setIsOpen(false);
  }, { next: 'ArrowDown', prev: 'ArrowUp' });

  return (
    <>
      <FormButton type="button" name={name} func={toggleDropdown} alert={alert}>{selectedVal ? selectedVal : <IconContainer>Please select <IoIosArrowDown /></IconContainer>}</FormButton>
      
      <div className="relative w-full" ref={dropdownRef}>

        {isOpen && (
          <ul 
            tabIndex="0" 
            role="listbox" 
            className="fixed md:absolute inset-0 z-50 md:z-10 bg-white md:rounded-md shadow-lg w-screen md:w-full h-fit md:h-48 overflow-y-scroll">

            {arr.map((option, index) => {
              // Simulate an event object
              const simulatedEvent = {
                  target: {name: name, value: option,}
              };
              return <li
                key={index} 
                // for screen readers
                role="option" 
                aria-selected={option === selectedVal ? "true" : "false"}
                tabIndex="0" 
                data-option-value={option}
                data-name={name}
                // Other stuff
                className={`selectable-item bg-slate-100 hover:bg-teal-500 hover:text-white md:first:hover:rounded-t md:first:rounded-t md:last:hover:rounded-b md:last:rounded-b px-4 py-2 h-20 md:h-12 flex justify-center items-center md:w-full ${selectedVal === option && "bg-teal-500"}`} 
                onClick={() => {
                    func(simulatedEvent);
                    setIsOpen(false);
                }}
                onKeyDown={handleKeyDown}>
                  {option}
                </li>
            })}
            
          </ul>
        )}

      </div>
    </>
  );
}