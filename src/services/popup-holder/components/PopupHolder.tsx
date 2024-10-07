import {usePopupContext} from "@src/services/popup-holder/hooks/usePopupContext";
import styled from "styled-components";

const PopupContainer = styled.div<{$hasPopup: boolean}>`
    width: 100vw;
    height: 100vh;
    z-index: ${p => p.$hasPopup ? 999 : -999};
    top: 0;
    left: 0;
    position: absolute;
    background-color: rgba(120, 119, 119, .2);
`

const PopupPlacer = styled.div`
    position: relative;
    top: 0;
    left: 0;
    display: flex;
    z-index: 999;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

export const PopupHolder = () => {
    const {popups} = usePopupContext()

    return (
        <>
            <PopupContainer $hasPopup={popups.length > 0}>
                <PopupPlacer>
                    {popups[0] || ''}
                </PopupPlacer>
            </PopupContainer>
        </>
    );
};