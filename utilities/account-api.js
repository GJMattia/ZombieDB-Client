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

//Changing ProfilePic
export async function updatePP(pic) {
  try {
    return await sendRequest(`${BASE_URL}/updatepp`, "PUT", pic);
  } catch (error) {
    console.error("error changing profile pic", error);
  }
}

//Updating profile perks
export async function updatePerks(perks) {
  try {
    return await sendRequest(`${BASE_URL}/updateperks`, "PUT", perks);
  } catch (error) {
    console.error("error updating perks", error);
  }
}
