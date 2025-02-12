import { getUser } from "../api/Profile";
import ProfilePage from "../features/Profile/Profile";

const profileRoutes = {
  path: "profile",
  id: "profile-page",
  loader: getUser,
  children: [{ element: <ProfilePage />, index: true }],
};

export default profileRoutes;
