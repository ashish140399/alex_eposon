import React, { useEffect, useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import styled from "styled-components";
import { Dialog, DialogContent, DialogTitle, Switch, styled as muiStyled } from "@mui/material";
import validator from "validator";
import axios from "axios";
interface Props { }

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

  const [openDialog, setOpenDialog] = useState(true);
  return (
    <>
      <Dialog
        open={openDialog}
        onClose={() => { setOpenDialog(false) }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Privacy Policy <span style={{ cursor: 'pointer', verticalAlign: 'middle' }} onClick={() => setOpenDialog(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="18" y1="6" x2="6" y2="18" stroke="#000" strokeWidth="2" strokeLinecap="round" />
              <line x1="6" y1="6" x2="18" y2="18" stroke="#000" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </DialogTitle>
        <DialogContent>
          <div className="dialogwrapper">
            {/* <b>PRIVACY POLICY</b><br /> */}
            <span>Last Modified: February 2025</span><br /><br />
            Thank you for your interest in Campari! This Privacy Notice explains how information about you, that directly identifies you, or that makes you identifiable (“personal information”) is collected, used, disclosed, and otherwise processed by Campari in connection with our services.<br /><br />
            When we use the terms “Campari”, “Campari Group”, “we”, “us”, or “our” in this Privacy Notice, we are referring to Davide Campari-Milano N.V., and its affiliates and subsidiaries. When we use the term “Service,” we are referring to all of the services and product offerings that we offer on our own behalf, including our product offerings such as our website https://www.campari.com/, our mobile applications, or any other Campari Group product or service that posts or links to this Privacy Notice.<br /><br />
            <b>● 1. GLOBAL APPLICABILITY AND REGION-SPECIFIC DISCLOSURES</b><br />
            This Privacy Notice is designed to apply to our website visitors, users of our Service, and other companies and users on a global basis. We may choose or be required by law to provide additional disclosures relating to the processing of personal information in certain countries, regions or states. Please refer below for disclosures that may be applicable to you:<br /><br />
            ● <b>California (United States):</b> If you are a resident of the State of California in the United States, please see Additional Notice for California Residents for additional California-specific privacy information.<br />
            ● <b>Nevada (United States):</b> If you are a resident of the State of Nevada, Chapter 603A of the Nevada Revised Statutes permits a Nevada resident to opt out of future sales of certain covered information that a website operator has collected or will collect about the resident. Note we do not sell your personal information within the meaning of Chapter 603A. However, if you would still like to submit such a request, please contact us at gpdp.office@campari.com<br />
            ● <b>European Economic Area, United Kingdom or Switzerland:</b> If you are located in the European Economic Area (“EEA”), United Kingdom (“UK”) or Switzerland, or otherwise engage with Campari Group’s European operations, please see the Additional Notice for the European Economic Area, United Kingdom and Switzerland for additional European-specific privacy information, including, but not limited to, what constitutes your personal information, the lawful bases we rely on to process your personal information, how we use cookies when you access our Services from the EEA, UK or Switzerland and your rights in respect of your personal information.<br />
            ● <b>Peru:</b> If you are a resident of the Republic of Peru, please review the Additional Notice for Residents of the Republic of Peru for additional privacy information specific to Peru.<br />
            ● <b>Argentina:</b> If you are a resident of the Republic of Argentina, please review the Additional Notice for Residents of the Republic of Argentina for additional privacy information in Argentina.<br /><br />
            <b>● 1.1 HOW WE COLLECT YOUR PERSONAL INFORMATION</b><br />
            From the first moment you interact with us, we are collecting personal information about you. Sometimes we collect personal information automatically when you interact with our services and sometimes, we collect the personal information directly from you. At times, we may collect personal information about you from other sources and third parties, even before our first direct interaction. The type of personal information we collect may also depend on the relationship we have with you (e.g., business representative, consumer).<br /><br />
            <b>Controllers:</b> The controller, which is the company belonging to the Campari Group that is responsible for the processing of your personal data, depends on how you interact with the Campari Group brands. As such, the relevant controller will typically consist of one or two entities: (1) The main entity who manages the Campari brands based on region, and, if applicable, (2) the local company you interact with in connection with localized activities (e.g., marketing campaigns, events, competitions). In connection with the local controller, the controller and contact information will be disclosed in the specific method of interaction.
          </div>
        </DialogContent>
      </Dialog>
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
                    let value = e.target.value;

                    // Handle backspace
                    if (
                      value.length <
                      userinfo.birth_date.length
                    ) {
                      // If deleting a slash, remove the digit before it too
                      if (
                        userinfo.birth_date[
                        value.length
                        ] === "/"
                      ) {
                        value = value.slice(0, -1);
                      }
                    }

                    // Remove non-digits
                    value = value.replace(/\D/g, "");

                    // Limit to 8 digits
                    value = value.slice(0, 8);

                    // Format as MM/DD/YYYY
                    if (value.length >= 2) {
                      value =
                        value.slice(0, 2) +
                        "/" +
                        value.slice(2);
                    }
                    if (value.length >= 5) {
                      value =
                        value.slice(0, 5) +
                        "/" +
                        value.slice(5);
                    }

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
              <div className="toggle" onClick={() => setOpenDialog(true)}>
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
