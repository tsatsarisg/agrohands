import { getUser } from "../api/Profile";
import ProfileSettingsPage from "../pages/ProfileSettings/ProfileSettings";

const profileRoutes = {
  path: "profile",
  id: "profile-page",
  loader: getUser,
  children: [{ element: <ProfileSettingsPage />, index: true }],
};

export default profileRoutes;
