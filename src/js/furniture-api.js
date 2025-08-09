import axios from "axios";
import iziToast from "izitoast";
import { LIMIT } from "./constants";

const BASE_URL = "https://furniture-store.b.goit.study/api";


export async function getDataByQuery(endPoint, params = {}) {
  try {

    const { page = 1, limit = LIMIT, ...rest } = params;
    const response = await axios(`${BASE_URL}${endPoint}`, {
      params: {page, limit, ...rest }
    });

    return response.data;
    
  } catch(error) { 
    iziToast.error({
          title: "",
          message: "Помилка виконання запиту. Спробуйте ще раз.",
          position: "topRight",
          timeout: 2000,
          close: false,
          maxWidth: 300,
          messageColor: "#fff",
          color: "#e23232"
    });
  };
};

