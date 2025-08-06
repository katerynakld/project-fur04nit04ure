
import { getDataByQuery } from "./js/furniture-api";
import { markup } from "./js/handlers";

const CATEGORIES_END_POINT = "/categories";
const FURNITURES_END_POINT = "/furnitures";

getDataByQuery(CATEGORIES_END_POINT)
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error.message);
    });

getDataByQuery(FURNITURES_END_POINT)
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error.message);
    });
