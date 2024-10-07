import './reset.css'
import './index.css'
import {createRoot} from "react-dom/client";
import {App} from "@src/App";

const rootElement = document.getElementById('root')

if (!rootElement) {
    throw new Error('Root element is missing')
}

const root = createRoot(rootElement)
root.render(<App/>)
