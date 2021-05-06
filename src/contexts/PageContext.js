import { createContext } from "react";

export const PageContext = createContext({
    pageState: {
        loading: false
    },
    setPageState : () => {}
})