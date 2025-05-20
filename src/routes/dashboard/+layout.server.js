import { redirect } from '@sveltejs/kit';

export async function load({ fetch, cookies, url }) {
    const res = await fetch("http://localhost/spacefood/session.php", {
        credentials: "include",
        headers: {
            Cookie: cookies.get("PHPSESSID") ? `PHPSESSID=${cookies.get("PHPSESSID")}` : "",
        }
    });
    const data = await res.json();
    if (!data.loggedIn) {
        throw redirect(302, '/login');
    }

    return {
        user: data.user
    };
}
