import React, { useEffect, useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import styled from "styled-components";
import { Switch, styled as muiStyled } from "@mui/material";
import validator from "validator";
import axios from "axios";
interface Props {}

// increae height width of switch
const CustomSwitch = muiStyled(Switch)(({ theme }) => ({
    width: 80,
    height: 50,
    padding: 8,
    "& .MuiSwitch-switchBase": {
        margin: 4,
        padding: 0,
        transform: "translateX(3px)",
        "&.Mui-checked": {
            color: "#E91E63",
            transform: "translateX(30px)",
            "& + .MuiSwitch-track": {
                backgroundColor: "#E91E63",
                opacity: 0.5,
            },
        },
    },
    "& .MuiSwitch-thumb": {
        width: 42,
        height: 42,
    },
    "& .MuiSwitch-track": {
        backgroundColor: "#ccc",
        opacity: 1,
        borderRadius: 25,
    },
}));

const Welcome: React.FC<Props> = () => {
    const navigate = useNavigate();
    const { userinfo, setUserinfo } = useContext(MyContext);
    const [checked, setChecked] = useState(false);
    const [isinvalid, setIsinvalid] = useState({
        email: false,
        first_name: false,
        last_name: false,
        birth_date: false,
        zip_code: false,
    });

    const handleNext = () => {
        const isValidEmail = validator.isEmail(userinfo.email);
        const isValidDate = validator.isDate(userinfo.birth_date, {
            format: "MM/DD/YYYY",
            strictMode: true,
        });
        console.log(isValidEmail, isValidDate);
        setIsinvalid({
            ...isinvalid,
            first_name: !userinfo.first_name,
            last_name: !userinfo.last_name,
            zip_code: !userinfo.zip_code,
            email: !isValidEmail,
            birth_date: !isValidDate,
        });

        if (
            !isValidEmail ||
            !isValidDate ||
            !userinfo.first_name ||
            !userinfo.last_name ||
            !userinfo.zip_code ||
            checked === false
        ) {
            return;
        } else {
            axios
                .post(`${process.env.REACT_APP_API_URL}/api/saveespolon`, {
                    email: userinfo.email,
                    first_name: userinfo.first_name,
                    last_name: userinfo.last_name,
                    birth_date: userinfo.birth_date,
                    zip_code: userinfo.zip_code,
                })
                .then((res) => {
                    console.log(res);
                    navigate("/thankyou");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const handleReset = () => {
        setUserinfo({
            email: "",
            first_name: "",
            last_name: "",
            birth_date: "",
            zip_code: "",
        });
        setChecked(false);
    };

    return (
        <>
            <Layout>
                <div className="topimage">
                    <img src="/images/top.png" alt="" />
                </div>
                <div className="contentbox">
                    <div className="contentwrapper">
                        <div className="content">
                            <div className="title">
                                <img src="/images/email.png" alt="" />
                            </div>
                            <div
                                className={
                                    isinvalid.email ? "data invalid" : "data"
                                }
                            >
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={userinfo.email}
                                    onChange={(e) => {
                                        setUserinfo({
                                            ...userinfo,
                                            email: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="content">
                            <div className="title">
                                <img src="/images/first.png" alt="" />
                            </div>
                            <div
                                className={
                                    isinvalid.first_name
                                        ? "data invalid"
                                        : "data "
                                }
                            >
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={userinfo.first_name}
                                    maxLength={100}
                                    onChange={(e) => {
                                        setUserinfo({
                                            ...userinfo,
                                            first_name: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="content">
                            <div className="title">
                                <img src="/images/last.png" alt="" />
                            </div>
                            <div
                                className={
                                    isinvalid.last_name
                                        ? "data invalid"
                                        : "data "
                                }
                            >
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={userinfo.last_name}
                                    maxLength={100}
                                    onChange={(e) => {
                                        setUserinfo({
                                            ...userinfo,
                                            last_name: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>

                        <div className="content">
                            <div className="title">
                                <img src="/images/birth.png" alt="" />
                            </div>
                            <div
                                className={
                                    isinvalid.birth_date
                                        ? "data invalid"
                                        : "data"
                                }
                            >
                                <input
                                    type="text"
                                    placeholder="MM/DD/YYYY"
                                    value={userinfo.birth_date}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setUserinfo({
                                            ...userinfo,
                                            birth_date: value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="content">
                            <div className="title">
                                <img src="/images/zip.png" alt="" />
                            </div>
                            <div className="data">
                                <input
                                    type="number"
                                    placeholder="Zip Code"
                                    value={userinfo.zip_code}
                                    onChange={(e) => {
                                        if (e.target.value.length > 10) {
                                            return;
                                        }
                                        setUserinfo({
                                            ...userinfo,
                                            zip_code: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="togglebox">
                            <div className="toggle">
                                <img src="/images/toggle.png" alt="" />
                            </div>
                            <div className="slider">
                                <CustomSwitch
                                    checked={checked}
                                    onChange={(e) => {
                                        setChecked(e.target.checked);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="contentwrapperbottom">
                        <button onClick={() => handleReset()}>
                            <img src="/images/cancel.png" alt="" />
                        </button>
                        <button
                            onClick={() => handleNext()}
                            style={{
                                opacity: checked ? 1 : 0.5,
                                cursor: checked ? "pointer" : "not-allowed",
                            }}
                        >
                            <img src="/images/next.png" alt="" />
                        </button>
                    </div>
                </div>
            </Layout>
        </>
    );
};

const Layout = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #000;
    .topimage {
        width: 100%;
        height: 233px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        img {
            width: 90%;
        }
    }
    .contentbox {
        padding: 100px 60px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: calc(100% - 233px);
        .contentwrapperbottom {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            button {
                height: 82px;
                background: transparent;
                border: 0;
                outline: 0;
                padding: 0;
                gap: 20px;
                img {
                    height: 100%;
                }
            }
        }
        .content {
            margin-bottom: 34px;
            .title {
                height: 21px;
                img {
                    height: 100%;
                }
            }
            .data {
                margin-top: 18px;
                input {
                    font-size: 30px;
                    border: 0;
                    outline: 0;
                    color: #fff;
                    background: transparent;
                    border-bottom: 3px solid #fff;
                    width: 100%;
                }
                &.invalid {
                    input {
                        border-bottom: 3px solid #e91e63;
                    }
                }
            }
        }
    }
    .togglebox {
        display: flex;
        align-items: center;
        .toggle {
            img {
                width: 100%;
            }
        }
    }
`;

export default Welcome;
