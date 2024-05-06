export default function useGenericKeyDown(handleEnter, navigationKeys = {next: 'ArrowDown', prev: 'ArrowUp'}) {
    return (event) => {
        const items = Array.from(document.querySelectorAll('.selectable-item'));
        const currentIndex = items.indexOf(document.activeElement);
        
        if (event.key === navigationKeys.next) {
            const nextIndex = (currentIndex + 1) % items.length;
            items[nextIndex].focus();
            event.preventDefault();
        } else if (event.key === navigationKeys.prev) {
            const prevIndex = (currentIndex - 1 + items.length) % items.length;
            items[prevIndex].focus();
            event.preventDefault();
        } else if (event.key === 'Enter') {
            // Ensure we have a focused item to select
            if (currentIndex !== -1) {
                handleEnter(items[currentIndex]);
                event.preventDefault();
            }
        }
    }
};