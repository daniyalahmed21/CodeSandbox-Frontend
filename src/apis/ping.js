import axios from "axios";

async function ping() {
  try {
    const response = await axios.get("");
    return response;
  } catch (error) {
    console.log(error);
  }
}

export default ping;
