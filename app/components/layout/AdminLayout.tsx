"use client";

import {
  AdminIconKey,
  getPageTitle,
  NAV_ITEMS,
} from "@/app/constants/adminNavigation";
import { authService } from "@/app/services/auth/service";
import { loginNotice } from "@/app/utils/auth/loginNotice";
import { logoutNotice } from "@/app/utils/auth/logoutNotice";
import { tokenStorage } from "@/app/utils/auth/tokenStorage";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DRAWER_WIDTH = 264;

export type AdminLayoutProps = {
  title?: string;
  children: React.ReactNode;
};

export const AdminLayout = ({ title, children }: AdminLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoginSnackbarOpen, setIsLoginSnackbarOpen] = useState(false);

  const closeLoginSnackbar = () => {
    setIsLoginSnackbarOpen(false);
  };

  useEffect(() => {
    if (!tokenStorage.get()) {
      router.replace("/login");
      return;
    }
    if (loginNotice.consume()) {
      setIsLoginSnackbarOpen(true);
    }
  }, [router]);

  const iconMap: Record<AdminIconKey, React.ReactNode> = {
    dashboard: <DashboardIcon />,
    users: <PeopleIcon />,
    settings: <SettingsIcon />,
  };

  const pageTitle = getPageTitle(pathname);
  const appBarTitle = title ?? pageTitle;

  const drawer = (
    <Box sx={{ px: 1.5, py: 1 }}>
      <Typography
        variant="subtitle2"
        sx={{ px: 1.5, py: 1, color: "text.secondary" }}
      >
        Navigation
      </Typography>

      <List disablePadding>
        {NAV_ITEMS.map((item) => {
          const selected =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              selected={selected}
              onClick={() => setMobileOpen(false)}
              sx={{ borderRadius: 2, mb: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {iconMap[item.icon]}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100dvh",
        bgcolor: "background.default",
      }}
    >
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          color: "text.primary",
          zIndex: (t) => t.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ gap: 1.5 }}>
          <IconButton
            edge="start"
            onClick={() => setMobileOpen((v) => !v)}
            sx={{ display: { xs: "inline-flex", md: "none" } }}
            aria-label="Open sidebar"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {appBarTitle}
          </Typography>

          <Box sx={{ flex: 1 }} />

          <Button
            variant="outlined"
            size="small"
            startIcon={<LogoutIcon />}
            onClick={async () => {
              try {
                await authService.logout();
              } finally {
                tokenStorage.remove();
                logoutNotice.set();
                router.replace("/login");
              }
            }}
          >
            ログアウト
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            borderRight: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          },
        }}
      >
        <Toolbar />
        {drawer}
      </Drawer>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        {drawer}
      </Drawer>
      <Box component="main" sx={{ flex: 1, minWidth: 0 }}>
        <Toolbar />
        <Box
          sx={{
            mx: { xs: "auto", md: "325px" },
            width: "100%",
            maxWidth: 1536,
            px: { xs: 2, sm: 3 },
            py: { xs: 2.5, sm: 3.5 },
          }}
        >
          {children}
        </Box>
      </Box>
      <Snackbar
        open={isLoginSnackbarOpen}
        autoHideDuration={2000}
        onClose={closeLoginSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={closeLoginSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          ログインしました
        </Alert>
      </Snackbar>
    </Box>
  );
};
