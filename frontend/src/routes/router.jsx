import NotLoggedIn from "../components/pages/homePage/notLoggedInHome/notLoggedInHome";
import Signup from "../components/pages/signupPage/signup";
import Login from "../components/pages/loginPage/login";
import Home from "../components/pages/homePage/loggedInHome/home";
import Send from "../components/pages/sendPage/sendPage";
import Friends from "../components/pages/friendsPage/friends";
import AddFriend from "../components/pages/addFriendPage/addFriendPage";
import Messages from "../components/pages/messagesPage/messages";
import OpenMessage from "../components/pages/openMessage/openMessage";
import authenticateLoader from "../../loaders/authenticateLoader";
import openMessageLoader from "../../loaders/openMesssageLoader";
import signupAction from "../../actions/signupAction";
import loginAction from "../../actions/loginAction";
import addFriendAction from "../../actions/addFriendAction";
import sendAction from "../../actions/sendAction";
//all pages need a loader that check user auth and useloader data in component to chek user also when the pages get this loader data make it so u put it into a context and can use it on all of that page for components that need it
const router = [
  {
    path: "/",
    element: <NotLoggedIn />,
  },
  {
    path: "/signup",
    element: <Signup />,
    action: signupAction,
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/home",
    element: <Home />,
    loader: authenticateLoader,
  },
  {
    path: "/send",
    element: <Send />,
    loader: authenticateLoader,
    action: sendAction,
  },
  {
    path: "/friends",
    element: <Friends />,
    loader: authenticateLoader,
  },
  {
    path: "/addfriend",
    element: <AddFriend />,
    loader: authenticateLoader,
    action: addFriendAction,
  },
  {
    path: "/messages",
    element: <Messages />,
    loader: authenticateLoader,
  },
  {
    path: "/open/:messageId",
    element: <OpenMessage />,
    loader: openMessageLoader,
  },
];
export default router;
