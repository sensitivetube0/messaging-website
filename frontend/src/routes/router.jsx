import NotLoggedIn from "../components/pages/homePage/notLoggedInHome/notLoggedInHome";
import Signup from "../components/pages/signupPage/signup";
import Login from "../components/pages/loginPage/login";
import Home from "../components/pages/homePage/loggedInHome/home";
import Send from "../components/pages/sendPage/sendPage";
import Friends from "../components/pages/friendsPage/friends";
import AddFriend from "../components/pages/addFriendPage/addFriendPage";
import Messages from "../components/pages/messagesPage/messages";
import OpenMessage from "../components/pages/openMessage/openMessage";
//all pages need a loader that check user auth and useloader data in component to chek user also when the pages get this loader data make it so u put it into a context and can use it on all of that page for components that need it
const router = [
  {
    path: "/",
    element: <NotLoggedIn />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/send",
    element: <Send />,
  },
  {
    path: "/friends",
    element: <Friends />,
  },
  {
    path: "/addfriend",
    element: <AddFriend />,
  },
  {
    path: "/messages",
    element: <Messages />,
  },
  {
    path: "/open/:messageId",
    element: <OpenMessage />,
  },
];
export default router;
