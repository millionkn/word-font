import Axios from "axios";
import router from "@/router";
let needLogin = Axios.interceptors.response.use(undefined, async (err) => {
    if (err.response.status === 401) {
        router.push({ name: "login" })
    }
    throw err;
})
export default {
    needLogin
}