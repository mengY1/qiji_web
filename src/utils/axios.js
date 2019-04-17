import axios from "axios";
let AUTH_TOKEN = (function () {
    return sessionStorage.getItem('token')
})();

var instance = axios.create({});
instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
instance.interceptors.request.use(function (config) {
    let url = config.url;
    // if (url.indexOf("outLogin")) {
    //     config.headers.ContentType = "application/x-www-form-urlencoded";
    // }
        if (url.indexOf("login") > -1) {
            sessionStorage.setItem('token', "");
            config.headers.Authorization = "";
        }
        if (url.indexOf("login") == -1) {
            var token = ' '
            token += sessionStorage.getItem('token')
            config.headers.Authorization = "Bearer" + token
        }
        return config;
    },
    function (err) {
        return Promise.reject(err)
    });

instance.interceptors.response.use(function (res) {
    if (res.headers.token) {
        sessionStorage.setItem('token', res.headers.token);
    }
    return res;
}, function (err) {
    if (err.response.status == 422) {
      return Promise.reject(err.response.data)
   }
});
export default instance;