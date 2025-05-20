// @ts-ignore
export async function load({ fetch, cookies}) {
    const res = await fetch(`http://localhost/spacefood/renderposted.php`, {
      credentials: "include",
      headers: {
          Cookie: cookies.get("PHPSESSID") ? `PHPSESSID=${cookies.get("PHPSESSID")}` : "",
      }
  });
    const data = await res.json();
  
    if (res.ok && !data.error) {
      return {
        posted: data
      };
    } else {
      return {
        status: 404,
        error: new Error(data.error || "Recipe not found")
      };
    }
  }
  