import sendRequest from "./send-request";
const BASE_URL = "http://localhost:4741/accounts";

//For Creating Account Schema, used upon account sign up
export async function createAccount(userID) {
  try {
    await sendRequest(`${BASE_URL}`, "POST", userID);
  } catch (error) {
    console.error("Error creating friend list", error);
  }
}

//Used for getting account data
export async function getAccount() {
  return sendRequest(`${BASE_URL}/getaccount`);
}
