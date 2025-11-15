document.getElementById("saveBtn").addEventListener("click", () => {
  let limit = document.getElementById("limitInput").value;

  chrome.storage.sync.set({ dailyLimit: limit }, () => {
    alert("Limit saved!");
  });
});