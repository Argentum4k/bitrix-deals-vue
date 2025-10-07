import {getQueryString} from "./utils.js";

export function getBitrixAuth() {
    const params = new URLSearchParams(window.location.search);
    console.log('getBitrixAuth',{
        domain: params.get("DOMAIN"),
        authId: params.get("AUTH_ID"),
        refreshId: params.get("REFRESH_ID"),
        memberId: params.get("member_id"),
    });
    return {
        domain: params.get("DOMAIN"),
        authId: params.get("AUTH_ID"),
        refreshId: params.get("REFRESH_ID"),
        memberId: params.get("member_id"),
    };
}

export async function callRest(method, params = {}, auth) {
    const query = new URLSearchParams(params).toString();
    params.auth = auth.ACCESS_TOKEN;
    const url = `https://${auth.DOMAIN}/rest/${method}.json?auth=${auth.ACCESS_TOKEN}&${query}`;
    const queryString = getQueryString(params);
    const res = await fetch(url,{
        method: 'POST',
        body: queryString,
    });
    return await res.json();
}
