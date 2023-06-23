import axios from "axios";

export default async function getAccount(
  id: string,
  setAccount: React.Dispatch<any>,
) {
  try {
    const response = await axios.get(`http://localhost:5000/api/account/${id}`);
    const AccountData = response.data;
    console.log(response.data);
    setAccount(AccountData);
  } catch (error) {
    console.error("Error while fetching account:", error);
  }
}
