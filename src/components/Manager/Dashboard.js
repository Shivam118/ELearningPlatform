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

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function ManagerDashboard() {
  const navigate = useNavigate();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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

  const handleLogout = () => {
    sessionStorage.removeItem("Auth Token");
    navigate("/SuperAdmin");
  };

  const [dataEmpFiles, setDataEmpFiles] = useState([]);
  const [dataHRFiles, setDataHRFiles] = useState([]);
  const [selectedHRFile, setSelectedHRFile] = useState(null);
  const [selectedEmpFile, setSelectedEmpFile] = useState(null);

  const EmpFileListRef = ref(storage, "Employees/");
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

  const HRFileListRef = ref(storage, "HR/");
  const onUploadHRFiles = (e) => {
    e.preventDefault();
    if (selectedHRFile == null) return;
    const HRFileRef = ref(storage, `HR/${selectedHRFile.name + v4()}`);
    console.log("FileReference: ", HRFileRef);
    uploadBytes(HRFileRef, selectedHRFile).then(() => {
      toast.success("File Uploaded");
    });
  };

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (authToken) {
      navigate("/AdminDashboard");
    }
    if (!authToken) {
      navigate("/SuperAdmin");
    }

    listAll(EmpFileListRef).then((response) => {
      response.items.forEach((item) => {
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
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CssBaseline />
      <ToastContainer />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Radient Security
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <Link variant="body1" underline="none" color="inherit">
                  Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link variant="body1" underline="none" color="inherit">
                  Dashboard
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link variant="body1" underline="none" color="inherit">
                  Account
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link
                  onClick={handleLogout}
                  variant="body1"
                  underline="none"
                  color="inherit"
                >
                  Logout
                </Link>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

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

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
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
      </Box>
    </Box>
  );
}
