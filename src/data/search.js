let cards = document.querySelectorAll(".character");

function liveSearch() {
  let search_query = document.getElementById("searchbox").value;

  for (let i = 0; i < cards.length; i++) {
    cards[i].textContent.toLowerCase().includes(search_query.toLowerCase());
  }
}
