import { useEffect } from "react";
/*  Custom Hook - Run a designated function or callback when the user clicks outside of the referenced component.
    - Run triggered callback
*/
export default function useOnClickOutside(ref, callback) {
    useEffect(() => {
        const listener = event => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            callback(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, callback]);
}
