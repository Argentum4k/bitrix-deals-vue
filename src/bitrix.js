export function getBitrixAuth() {
    const params = new URLSearchParams(window.location.search);
    return {
        domain: params.get("DOMAIN"),
        authId: params.get("AUTH_ID"),
        refreshId: params.get("REFRESH_ID"),
        memberId: params.get("member_id"),
    };
}

export async function callRest(method, params = {}, auth) {
    const query = new URLSearchParams(params).toString();
    const url = `https://${auth.domain}/rest/${method}.json?auth=${auth.authId}&${query}`;
    const res = await fetch(url);
    return await res.json();
}
