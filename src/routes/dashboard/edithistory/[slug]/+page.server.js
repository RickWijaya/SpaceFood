// @ts-ignore
export async function load({ params, fetch, cookies }) {

  const id = params.slug;
  const res = await fetch(`http://localhost/spacefood/loadeditpost.php?id=${id}`, {
    credentials: "include",
    headers: {
        Cookie: cookies.get("PHPSESSID") ? `PHPSESSID=${cookies.get("PHPSESSID")}` : "",
    }
});
  const data = await res.json();

  if (res.ok && !data.error) {
    return {
      editable: data
    };
  } else {
    return {
      status: 404,
      error: new Error(data.error || "Recipe not found")
    };
  }
}
