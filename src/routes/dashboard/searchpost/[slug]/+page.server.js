// @ts-ignore
export async function load({ params, fetch, cookies }) {
  if (params.slug) {
      const res = await fetch(`http://localhost/spacefood/searchpost.php?searchvalue=${params.slug}&offset=0`, {
          credentials: "include",
          headers: {
              Cookie: cookies.get("PHPSESSID") ? `PHPSESSID=${cookies.get("PHPSESSID")}` : "",
          }
      });
      const data = await res.json();
      
      if (res.ok && !data.error) {
          return {
              posted: data,
              searchValue: params.slug
          };
      } else {
          return {
              status: 404,
              error: new Error(data.error || "Recipe not found")
          };
      }
  } else {
      return {
          status: 400,
          error: new Error("Search parameter missing")
      };
  }
}