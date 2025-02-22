import React, { useState } from "react";
import Landing from "./components/landing.jsx";
import Reports from "./components/reports.jsx";

const App = () => {
    const [step, setStep] = useState(1);
    return (
        <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
            {step == 1 && <Landing step={step} setStep={setStep} />}
            {step == 2 && <Reports setStep={setStep} />}
        </div>
    );
};

export default App;