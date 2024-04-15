import axios from "axios";
import { server } from "../../server";

export const loadUser = () => async (dispacth) => {
  try {
    dispacth({
      type: "LoadUseRequest",
    });
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispacth({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispacth({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};
