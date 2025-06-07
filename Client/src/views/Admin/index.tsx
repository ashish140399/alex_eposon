import * as React from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { createGlobalStyle } from "styled-components";
import { Button } from "@mui/material";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: teal;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    background:#f3f3f3;
    overflow: scroll !important;
  }
`;

// Workaround for TS2786 error with createGlobalStyle in React 18+
const GlobalStyleProxy: any = GlobalStyle;

function createData(id: any, name: string, size: string) {
    return { id, name, size };
}

const rows = [createData(1, "asdf", "AS")];

interface Props {}
const downloadit = (url) => {
    // var link = document.createElement("a");
    // link.download = `result.png`;
    // link.href = url;
    // window.open(url, "_blank");
    const newTab = window.open(url, "_blank");
    newTab.focus();
    // link.click();
};

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    maxHeight: "80vh",
    overflow: "scroll",
    p: 4,
};

const TablerowWrapper = ({ res }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // let { questionaire } = res;
    const questionaire = res.questionaire;

    return (
        <>
            <TableRow
                key={res.id}
                sx={{
                    "&:last-child td, &:last-child th": {
                        border: 0,
                    },
                }}
            >
                <TableCell component="th" scope="row">
                    {res.id}
                </TableCell>
                <TableCell>{res.first_name}</TableCell>
                <TableCell>{res.last_name}</TableCell>
                <TableCell>{res.email}</TableCell>
                <TableCell>{res.birth_date}</TableCell>
                <TableCell>{res.zip_code}</TableCell>
            </TableRow>
        </>
    );
};
const Admin: React.FC<Props> = () => {
    const [dbres, setDbres] = React.useState(null);
    const [showadmin, setShowadmin] = React.useState(true);
    React.useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/fetchdbespolon`)
            .then((response) => {
                // console.log(response.data);
                setDbres(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    // React.useEffect(() => {
    //     let foo = prompt("Enter code to login to admin :-)");
    //     if (foo === "silverfox") {
    //         setShowadmin(true);
    //     }
    // }, []);

    return (
        <>
            <GlobalStyleProxy />
            {showadmin && (
                <Layout>
                    <div className="heading">
                        <h1>Admin Panel</h1>Espolon
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Birth Date</TableCell>
                                    <TableCell>Zip Code</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dbres &&
                                    dbres.map((res) => (
                                        <TablerowWrapper res={res} />
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Layout>
            )}
        </>
    );
};
const Layout = styled.div`
    max-width: 1000px;
    margin: auto;
    background: #fff;
    padding: 24px;
    margin-top: 40px;
    border-radius: 12px;
    .heading {
        background: linear-gradient(to top, #5d6dc3, #3c86d8);
        color: #fff;
        padding: 12px 20px;
        border-radius: 10px;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 600;
        margin-bottom: 14px;
        h1 {
            font-size: 22px;
        }
    }
    .canvaspreview {
        width: auto;
        height: 80px;
    }
    .MuiTableHead-root {
        background: #f7f7f7 !important;
    }
    .MuiTableCell-root {
        padding-top: 14px !important;
        padding-bottom: 14px !important;
    }
`;

export default Admin;
