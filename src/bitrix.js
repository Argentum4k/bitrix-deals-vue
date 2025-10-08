import {getQueryString} from "./utils.js";


export async function callRest(method, params = {}, auth) {
    const query = new URLSearchParams(params).toString();
    params.auth = auth.ACCESS_TOKEN;
    // квери ушло в тело запроса
    const url = `https://${auth.DOMAIN}/rest/${method}.json`;//?auth=${auth.ACCESS_TOKEN}&${query}
    const queryString = getQueryString(params);
    const res = await fetch(url,{
        method: 'POST',
        body: queryString,
    });
    return await res.json();
}
