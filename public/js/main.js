import { API_ROUTES } from "../../src/Routes/index.js";

API_ROUTES.getProducts().then((data) => console.log(data));

const logout = async () => {
  await fetch("/api/auth/logout", { method: "POST" });

  window.location.replace("/login");
};

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.onclick = logout;