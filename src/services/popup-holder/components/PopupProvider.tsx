import {IPopupContext, PopupContext} from "./../context/PopupContext"
import {ReactNode, useState} from "react";

type Props = {
    children: ReactNode;
}

export const PopupProvider = (p: Props) => {
    const [popups, setPopups] =
        useState<IPopupContext['popups']>([])

    //добавление попапа в очередь
    const pushPopup:IPopupContext['pushPopup'] = (popup) => {
        setPopups(prev => [...prev, popup])
    }

    //удаление закрытого попапа из очереди
    const shiftPopup:IPopupContext['shiftPopup'] = () => {
        setPopups(prev => prev.slice(1))
    }

    return (
        <>
            <PopupContext.Provider value={{
                popups,
                pushPopup,
                shiftPopup,
            }}>
                {p.children}
            </PopupContext.Provider>
        </>
    );
};