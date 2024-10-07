import {useContext} from "react";
import {PopupContext} from "@src/services/popup-holder/context/PopupContext";

export const usePopupContext =  () => useContext(PopupContext);