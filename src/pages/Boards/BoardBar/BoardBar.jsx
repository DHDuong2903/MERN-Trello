import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterIcon from "@mui/icons-material/Filter";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { capitalizeFirstLetter } from "~/utils/formatters";

const MENU_STYLES = {
  color: "white",
  bgcolor: "transparent",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  ".MuiSvgIcon-root": {
    color: "white",
  },
  "&:hover": {
    bgcolor: "primary.50",
  },
};

const BoardBar = ({ board }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.trello.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        overflowX: "auto",
        paddingX: 2,
        bgcolor: (theme) => (theme.palette.mode === "dark" ? "#34495e" : "#1976d2"),
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Tooltip title={board?.description}>
          <Chip sx={MENU_STYLES} icon={<DashboardIcon />} label={board?.title} clickable />
        </Tooltip>

        <Chip sx={MENU_STYLES} icon={<VpnLockIcon />} label={capitalizeFirstLetter(board?.type)} clickable />
        <Chip sx={MENU_STYLES} icon={<AddToDriveIcon />} label="Add To Google Drive" clickable />
        <Chip sx={MENU_STYLES} icon={<BoltIcon />} label="Automation" clickable />
        <Chip sx={MENU_STYLES} icon={<FilterIcon />} label="Filters" clickable />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{ color: "white", borderColor: "white", "&:hover": { borderColor: "white" } }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={5}
          sx={{
            gap: "10px",
            "& .MuiAvatar-root": {
              width: 34,
              height: 34,
              fontSize: 16,
              border: "none",
              color: "white",
              cursor: "pointer",
              "&:first-of-type": { bgcolor: "#a4b0be" },
            },
          }}
        >
          <Tooltip title="duongdo">
            <Avatar
              alt="duongdo"
              src="https://cdn.goenhance.ai/user/2024/07/19/c0c1400b-abc2-4541-a849-a7e4f361d28d_0.jpg"
            />
          </Tooltip>
          <Tooltip title="duongdo">
            <Avatar alt="duongdo" src="https://cdn.pixabay.com/photo/2024/03/05/20/13/girl-8615258_640.jpg" />
          </Tooltip>
          <Tooltip title="duongdo">
            <Avatar alt="duongdo" src="https://i.pinimg.com/236x/48/65/86/48658600970a4e2f95ab228bd93b8526.jpg" />
          </Tooltip>
          <Tooltip title="duongdo">
            <Avatar alt="duongdo" src="https://i.pinimg.com/236x/65/f0/93/65f0937b7c467362d7a3610ea141f99f.jpg" />
          </Tooltip>
          <Tooltip title="duongdo">
            <Avatar
              alt="duongdo"
              src="https://i.pinimg.com/236x/65/f0/93/65f0937b7c467362d7a3610ea141f99f.jpghttps://afamilycdn.com/zoom/640_400/2019/2/25/avatar1551079860411-1551079860411686096470-crop-15510798867791793347140.jpg"
            />
          </Tooltip>
          <Tooltip title="duongdo">
            <Avatar
              alt="duongdo"
              src="https://kenh14cdn.com/2019/2/24/243274223900552214242885258065423810691072n-15510057259421664638280.jpg"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
};

export default BoardBar;
