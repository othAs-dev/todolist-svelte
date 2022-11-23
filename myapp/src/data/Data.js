import axios from "axios";

export const dataGetting = async () => {
  const res = await axios.get("http://localhost:3030/todos");
  console.log(res.data);
  return res.data;
};
