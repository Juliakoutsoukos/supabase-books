import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://iwxtvfkxfwaelekcgdmh.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_OD01Vze0ZDJuznV9K41fZw_h_jAKo7s";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const statusEl = document.querySelector("#status");
const errorEl = document.querySelector("#error");
const tbody = document.querySelector("#books-body");

async function loadBooks() {
  const { data, error } = await supabase
    .from("Books") // your table name is capital-B Books
    .select("Title, Author, ISBN")
    .order("id", { ascending: true });

  if (error) {
    statusEl.textContent = "";
    errorEl.textContent = error.message;
    console.log(error);
    return;
  }

  tbody.innerHTML = data.map(b => `
    <tr>
      <td>${b.Title}</td>
      <td>${b.Author}</td>
      <td>${b.ISBN}</td>
    </tr>
  `).join("");

  statusEl.textContent = `Loaded ${data.length} book(s).`;
}

loadBooks();