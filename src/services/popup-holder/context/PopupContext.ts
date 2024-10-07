import {createContext, ReactNode} from "react";

interface IPopupContext {
    popups: Array<ReactNode>
    shiftPopup: () => void
    pushPopup: (popup: ReactNode) => void
}

const PopupContext = createContext<IPopupContext>({
    popups: [],
    shiftPopup: () => {},
    pushPopup: () => {}
});

export { PopupContext, IPopupContext }
