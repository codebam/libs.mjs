export const get_website = (x) =>
  fetch(x)
    .then((response) => response.text())
    .then(console.log);

export const log = (obj) => console.log(obj) === undefined && obj;

export const sha256 = async (text) =>
  crypto.subtle
    .digest("SHA-256", new TextEncoder().encode(text))
    .then((array_buffer) =>
      Array.from(new Uint8Array(array_buffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
    );

export const read_file = (filename) =>
  fs.readFileSync(filename, { encoding: "utf-8" });

export const pastebin_url = "https://pastebin.seanbehan.ca";
export const pastebin = {
  upload: async (filename) =>
    fetch(pastebin_url, {
      method: "POST",
      body: new URLSearchParams({ upload: await read_file(filename) }),
      redirect: "manual",
    }).then((response) => response.headers.get("location")),
  delete: async (filename) =>
    fetch(pastebin_url + `/${filename}`, { method: "DELETE" }).then(
      (response) => response.text()
    ),
};
