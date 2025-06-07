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
    imageslist: [],
});

function App() {
    const [userinfo, setUserinfo] = React.useState({
        email: "",
        first_name: "",
        last_name: "",
        birth_date: "",
        zip_code: "",
    });
    const imageslist = [
        {
            thankyou: "/images/thankyou.png",
        },
    ];

    useEffect(() => {
        // Preload all images so they're cached in the browser
        const preloadImages = async () => {
            const imagePromises = Object.values(imageslist[0]).map(
                (imagePath) => {
                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.src = imagePath;
                        img.onload = () => resolve(img);
                        img.onerror = reject;
                    });
                }
            );

            try {
                await Promise.all(imagePromises);

                console.log("All images preloaded successfully");
            } catch (error) {
                console.error("Error preloading images:", error);
            }
        };

        preloadImages();
    }, []);

    return (
        <MyContext.Provider
            value={{
                userinfo,
                setUserinfo,
                imageslist,
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
