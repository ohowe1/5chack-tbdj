import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  IconBellRinging,
  IconAd2,
  IconAlbum,
  IconLogout,
  IconSettings,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { Code, Group, Anchor, Button } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import classes from "./css/NavbarSimple.module.css";
import { useAuth } from "../context/AuthContext";

const data = [
  { link: "/profile/notifications", label: "Notifications", icon: IconBellRinging },
  { link: "/profile/outgoing", label: "Outgoing Bountees", icon: IconAd2 },
  { link: "/profile/finished", label: "Finished Bountees", icon: IconAlbum },
  { link: "/profile/settings", label: "Settings", icon: IconSettings },
];

export function ProfileNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [active, setActive] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const { width } = useViewportSize();

  const { logout } = useAuth();


  // Set active based on current path
  useEffect(() => {
    const currentPath = pathname;
    const activeItem = data.find((item) => item.link === currentPath);
    if (activeItem) {
      setActive(activeItem.label);
    }
  }, [pathname]);

  // Auto-collapse on small screens
  useEffect(() => {
    if (width < 768) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [width]);

  const links = data.map((item) => (
    <a
      className={`${classes.link} ${collapsed ? classes.collapsedLink : ""}`}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      {!collapsed && <span>{item.label}</span>}
    </a>
  ));

  const footerLinks = [
    { label: "Logout", icon: IconLogout },
  ].map((item) => (
    <a
      className={`${classes.link} ${collapsed ? classes.collapsedLink : ""}`}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        logout();
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      {!collapsed && <span>{item.label}</span>}
    </a>
  ));

  return (
    <nav className={`${classes.navbar} ${collapsed ? classes.navbarCollapsed : ""}`}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          {!collapsed && <Anchor href="/">Bountee!</Anchor>}
          {!collapsed && <Code fw={700}>v0.0.0</Code>}
          {!collapsed ? <Button
            variant="subtle"
            size="xs"
            onClick={() => setCollapsed(!collapsed)}
            className={classes.collapseButton}
          >
            {collapsed ? <IconChevronRight size={16} /> : <IconChevronLeft size={16} />}
          </Button> :
          <Button
          variant="subtle"
          size="xs"
          onClick={() => navigate("/")}
          className={classes.collapseButton}
        >
          <img src="/bountee.svg" alt="Logo" className="h-8" />
        </Button>
          }
        </Group>
        {links}
      </div>

      <div className={`${classes.footer} ${collapsed ? classes.footerCollapsed : ""}`}>
        {footerLinks}
      </div>
    </nav>
  );
}