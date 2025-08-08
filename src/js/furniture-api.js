import axios from "axios";
import iziToast from "izitoast";
import { LIMIT } from "./constants";

const BASE_URL = "https://furniture-store.b.goit.study/api";


export async function getDataByQuery(endPoint, page = 1) {
  try {
    // showLoader();   
    const response = await axios(`${BASE_URL}${endPoint}`, {
      params: {
        page,
        limit: LIMIT
      }
    });
    // hideLoader()
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

