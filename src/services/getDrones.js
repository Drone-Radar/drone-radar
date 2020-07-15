import axios from "axios";

export async function getDrones() {
  const response = await axios.get(
    "https://34a58a41-88dc-4337-bf72-b128818bc1ee.mock.pstmn.io/get"
  );

  return response.data;
}
