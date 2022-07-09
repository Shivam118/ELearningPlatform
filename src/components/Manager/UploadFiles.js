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


const UploadFiles = () => {

    const [selectedHRFile, setSelectedHRFile] = useState(null);
    const [selectedEmpFile, setSelectedEmpFile] = useState(null);
    const [dataEmpFiles, setDataEmpFiles] = useState([]);
    const [dataHRFiles, setDataHRFiles] = useState([]);

    const onUploadEmpFiles = (e) => {
      e.preventDefault();
      if (selectedEmpFile == null) return;
      const EmpFileRef = ref(storage, `Employees/${selectedEmpFile.name + v4()}`);
      console.log("FileReference: ", EmpFileRef);
      uploadBytes(EmpFileRef, selectedEmpFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setDataEmpFiles((prev) => [...prev, url]);
        });
        toast.success("File Uploaded");
      });
    };
  
    const onUploadHRFiles = (e) => {
      e.preventDefault();
      if (selectedHRFile == null) return;
      const HRFileRef = ref(storage, `HR/${selectedHRFile.name + v4()}`);
      console.log("FileReference: ", HRFileRef);
      uploadBytes(HRFileRef, selectedHRFile).then(() => {
        toast.success("File Uploaded");
      });
    };
  


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
    <Box
        sx={{
          // width: '100%',
          display: "flex",
          flexDirection: "column",
          p: 4,
          pt: 2,
          mr: 6,
          mb: 2,
          mt: 15,
          ml: 15,
          backgroundColor: grey["50"],
        }}
      >
        <strong>Employee Storage</strong>
        <br />
        <br />
        <label htmlFor="file">
          <input
            type="file"
            id="file"
            onChange={(e) => {
              setSelectedEmpFile(e.target.files[0]);
            }}
          />
        </label>
        <br />
        <Button variant="contained" component="span" onClick={onUploadEmpFiles}>
          Upload
        </Button>
      </Box>

      <Box
        sx={{
          // width: '100%',
          display: "flex",
          flexDirection: "column",
          p: 4,
          pt: 2,
          mr: 6,
          mb: 2,
          mt: 15,
          ml: 15,
          backgroundColor: grey["50"],
        }}
      >
        <strong>HR Storage</strong>
        <br />
        <br />
        <label htmlFor="file">
          <input
            type="file"
            id="file"
            onChange={(e) => {
              setSelectedHRFile(e.target.files[0]);
            }}
          />
        </label>
        <br />
        <Button variant="contained" component="span" onClick={onUploadHRFiles}>
          Upload
        </Button>
      </Box>
      </Box>
  )
}

export default UploadFiles