import React, { createContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Admin from "./views/Admin";

import Thankyou from "./views/Thankyou";
import Welcome from "./views/Welcome";
import { AnimatePresence, motion } from "framer-motion";

// @ts-ignore
export const MyContext = createContext({
    userinfo: {
        email: "",
        first_name: "",
        last_name: "",
        birth_date: "",
        zip_code: "",
    },
    setUserinfo: (design) => {},
});
export const thankyouimage = require("./assets/thankyou.png");
function App() {
    const [userinfo, setUserinfo] = React.useState({
        email: "",
        first_name: "",
        last_name: "",
        birth_date: "",
        zip_code: "",
    });

    return (
        <MyContext.Provider
            value={{
                userinfo,
                setUserinfo,
            }}
        >
            <AnimatePresence mode="wait">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Welcome />} />

                        {/* <Route
                            path="/confirm"
                            element={
                                <motion.div
                                    key="confirm"
                                    initial={{ x: "100vw" }}
                                    animate={{ x: 0 }}
                                    exit={{ x: "-100vw" }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Confirm />
                                </motion.div>
                            }
                        /> */}

                        <Route
                            path="/thankyou"
                            element={
                                <motion.div
                                    key="thankyou"
                                    initial={{ x: "100vw" }}
                                    animate={{ x: 0 }}
                                    exit={{ x: "-100vw" }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Thankyou />
                                </motion.div>
                            }
                        />
                        {/* Questions route beginning */}

                        <Route path="/admin" element={<Admin />} />
                    </Routes>
                </BrowserRouter>
            </AnimatePresence>
        </MyContext.Provider>
    );
}

export default App;
