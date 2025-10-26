import axios from "axios";

const apiAuth = axios.create({
  baseURL: "http://localhost:4000/",
});
const api = axios.create({
  baseURL: "http://localhost:3000/",
});

async function signUp(email, username, password) {
  const { data } = await apiAuth.post(
    "/signup",
    { email, username, password },
    { withCredentials: true }
  );
  return data;
}
async function login(email, username, password) {
  const { data } = await apiAuth.post(
    "/login",
    { email, username, password },
    { withCredentials: true }
  );
  return data;
}
async function authenticate() {
  const { data } = await apiAuth.get("/me", { withCredentials: true });
  return data;
}
async function refresh() {
  const { data } = await apiAuth.post(
    "/refresh",
    {},
    { withCredentials: true }
  );

  return data;
}

async function getFriends() {
  const { data } = await api.get("/friends", { withCredentials: true });
  return data;
}

async function addFriend(username) {
  await api.post(
    "/friends",
    { friendsUsername: username },
    {
      withCredentials: true,
    }
  );
}

async function getMessages() {
  const { data } = await api.get("/messages", { withCredentials: true });
  return data;
}
async function authenticateMessage(messageId) {
  const { data } = await api.get(`/messages/auth/${messageId}`, {
    withCredentials: true,
  });
  return data;
}

async function deleteMessage(messageId) {
  try {
    const { data } = await api.delete("/messages", {
      withCredentials: true,
      data: {
        id: messageId,
      },
    });
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      return err.response.data;
    }
    console.error(`Error deleting message ${err}`);
    return { success: false, message: "Network error" };
  }
}
async function sendMessage(username, message) {
  const { data } = await api.post(
    "/messages",
    { toUsername: username, message },
    { withCredentials: true }
  );
  return data;
}

//interceptors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        await refresh();
        return api.request(error.config);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
export {
  signUp,
  login,
  authenticate,
  refresh,
  getFriends,
  addFriend,
  getMessages,
  authenticateMessage,
  deleteMessage,
  sendMessage,
};
