const API_URL = process.env.REACT_APP_API_URL;
if (!API_URL) {
  console.error("REACT_APP_API_URL is not defined in .env");
}
export { API_URL };
