import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MyContext } from "../../App";
import axios from "axios";
import { useContext } from "react";

interface Props {}

const Thankyou: React.FC<Props> = () => {
    const navigate = useNavigate();
    const { imageslist } = useContext(MyContext);
    React.useEffect(() => {
        // Redirect after delay
        setTimeout(() => {
            navigate("/");
            window.location.reload();
        }, 7000);
    }, []);

    return (
        <>
            <Layout>
                <img
                    src={imageslist[0].thankyou}
                    className="thank_you"
                    alt=""
                />
            </Layout>
        </>
    );
};
const Layout = styled.div`
    display: flex;
    // align-items: center;
    flex-direction: column;
    justify-content: center;
    align-items: Center;
    height: 100vh;
    width: 100vw;

    img {
        width: 100%;
        height: 100%;
    }
`;

export default Thankyou;
