import { useState } from "react";
//import Hello from "./Components/Hello.jsx";
import ChatApp from "./Components/ChatApp.jsx";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            
            <ChatApp />
        </>
    );
}

export default App;
