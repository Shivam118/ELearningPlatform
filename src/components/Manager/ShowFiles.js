import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { grey } from "@mui/material/colors";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { styled, useTheme } from "@mui/material/styles";
import { storage } from "../../firebase-config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ShowFiles = () => {
    
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/">
          Radient Security
        </Link>,
        <Link underline="hover" key="2" color="inherit" href="/AdminLogin">
          Admin
        </Link>,
        <Typography key="3" color="text.primary">
          Dashboard
        </Typography>,
      ];
      const EmpFileListRef = ref(storage, "Employees/");
      const HRFileListRef = ref(storage, "HR/");
      const [dataEmpFiles, setDataEmpFiles] = useState([]);
      const [dataHRFiles, setDataHRFiles] = useState([]);
      
      useEffect(()=>{
        listAll(EmpFileListRef).then((response) => {
            response.items.forEach((item) => {
                console.log(item)
              getDownloadURL(item).then((url) => {
                setDataEmpFiles((prev) => [...prev, url]);
              });
            });
          });
      
          listAll(HRFileListRef).then((response) => {
            response.items.forEach((item) => {
              getDownloadURL(item).then((url) => {
                setDataHRFiles((prev) => [...prev, url]);
              });
            });
          });
      },[]);

  return (
    <Box
      sx={{
        // width: '100%',
        // height: 300,
        p: 4,
        pt: 2,
        m: 6,
        mt: 0,
        ml: 15,
        backgroundColor: grey["50"],
      }}
    >
      <Stack spacing={2} sx={{ my: 2, mx: "auto" }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>

      <Grid container spacing={3}>
        {/* {console.log(dataEmpFiles)} */}
        {dataEmpFiles.length > 0 ? (
          dataEmpFiles.map((url) => {
            // {FolderName.map((folder) => {
            return (
              <Grid item xs={6} md={4} lg={3}>
                <Paper
                  elevation={5}
                  sx={{
                    px: 2,
                    py: 1,
                    overflow: "hidden",
                    "&:hover": {
                      backgroundColor: grey["300"],
                      cursor: "pointer",
                    },
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid
                      item
                      xs={12}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Link href={url} target="_blank">
                        <img
                          style={{ width: "100px", height: "100px" }}
                          src={url}
                          Alt="Preview"
                        />
                      </Link>
                      <hr />
                      <span
                        style={{
                          width: "100%",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {url}
                      </span>
                      {/* <span style={{ width: "70%" }}>{folder}</span> */}
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            );
          })
        ) : (
          <h4>No Files To Show</h4>
        )}
      </Grid>
      <br />
      <Grid container spacing={3}>
        {/* {console.log(dataEmpFiles)} */}
        {dataHRFiles.length > 0 ? (
          dataHRFiles.map((url) => {
            // {FolderName.map((folder) => {
            return (
              <Grid item xs={6} md={4} lg={3}>
                <Paper
                  elevation={5}
                  sx={{
                    px: 2,
                    py: 1,
                    overflow: "hidden",
                    "&:hover": {
                      backgroundColor: grey["300"],
                      cursor: "pointer",
                    },
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid
                      item
                      xs={12}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Link href={url} target="_blank">
                        <img
                          style={{ width: "100px", height: "100px" }}
                          src={url}
                          Alt="Preview"
                        />
                      </Link>
                      <hr />
                      <span
                        style={{
                          width: "100%",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {url}
                      </span>
                      {/* <span style={{ width: "70%" }}>{folder}</span> */}
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            );
          })
        ) : (
          <h4>No Files To Show</h4>
        )}
      </Grid>
    </Box>
  );
};

export default ShowFiles;
