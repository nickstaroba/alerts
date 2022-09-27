import MenuIcon from "@mui/icons-material/Menu";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import * as React from "react";
import { Link } from "wouter";

import { AlertsManager } from "./AlertsManager";

const pages = [
  { href: "/", title: "Create Alert" },
  { href: "/page/one", title: "One" },
  { href: "/page/two", title: "Two" },
];

const Logo = ({ sx }) => (
  <Box sx={{ display: "flex", alignItems: "center", ...sx }}>
    <NotificationImportantIcon sx={{ mr: 1 }} />
    <Typography
      component={"a"}
      href={"/"}
      noWrap
      sx={{
        color: "inherit",
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".25rem",
        mr: 2,
        textDecoration: "none",
        textTransform: "uppercase",
      }}
      variant={"h6"}
    >
      Alerts
    </Typography>
  </Box>
);

const MobileNavigation = () => {
  const [anchorNavigation, setAnchorNavigation] = React.useState(null);

  const handleOpenNavigation = (event) => {
    setAnchorNavigation(event.currentTarget);
  };

  const handleCloseNavigation = () => {
    setAnchorNavigation(null);
  };

  return (
    <Box sx={{ display: { xs: "flex", md: "none" } }}>
      <IconButton
        aria-controls={"navigation"}
        aria-haspopup={"true"}
        aria-label={"navigation"}
        color={"inherit"}
        onClick={handleOpenNavigation}
        size={"large"}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorNavigation}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        id={"navigation"}
        keepMounted
        onClose={handleCloseNavigation}
        open={!!anchorNavigation}
        sx={{ display: { xs: "block", md: "none" } }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
      >
        {pages.map((page) => (
          <MenuItem
            key={page.title}
            onClick={handleCloseNavigation}
            sx={{ a: { color: "#000", textDecoration: "none" } }}
          >
            <Link href={page.href}>{page.title}</Link>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

const Navigation = () => (
  <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
    {pages.map((page) => (
      <Button
        key={page.title}
        sx={{
          my: 2,
          minWidth: "auto",
          a: { color: "#fff", textDecoration: "none" },
        }}
      >
        <Link href={page.href}>{page.title}</Link>
      </Button>
    ))}
  </Box>
);

export const Header = () => (
  <AppBar position={"static"}>
    <Container maxWidth={"sm"}>
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        <MobileNavigation />
        <Logo />
        <Navigation />
        <AlertsManager />
      </Toolbar>
    </Container>
  </AppBar>
);
