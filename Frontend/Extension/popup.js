document.addEventListener("DOMContentLoaded", () => {

  const websiteInput = document.getElementById("websiteInput");
  const minutesInput = document.getElementById("minutesInput");
  const addButton = document.getElementById("addButton");
  const trackedList = document.getElementById("trackedList");

  // ------------------
  // ADD SITE BUTTON
  // ------------------
  addButton.addEventListener("click", () => {
    const site = websiteInput.value.trim();
    const mins = minutesInput.value.trim();

    if (!site || !mins) return;

    chrome.storage.sync.get(["trackedSites"], (data) => {
      const sites = data.trackedSites || {};

      sites[site] = {
        limit: parseFloat(mins),
        spent: 0,
        alert: false
      };

      chrome.storage.sync.set({ trackedSites: sites }, () => {
        websiteInput.value = "";
        minutesInput.value = "";
        renderList();
      });
    });
  });

  // ------------------
  // RENDER LIST
  // ------------------
  function renderList() {
    chrome.storage.sync.get(["trackedSites"], (data) => {
      const sites = data.trackedSites || {};
      trackedList.innerHTML = "";

      Object.keys(sites).forEach((site) => {
        const div = document.createElement("div");
        div.className = "site-item";

        div.innerHTML = `
          <span>${site} — ${sites[site].limit} min</span>
          <span class="delete-btn">&times;</span>
        `;

        div.querySelector(".delete-btn").addEventListener("click", () => {
          delete sites[site];
          chrome.storage.sync.set({ trackedSites: sites }, renderList);
        });

        trackedList.appendChild(div);
      });
    });
  }

  renderList();

});
