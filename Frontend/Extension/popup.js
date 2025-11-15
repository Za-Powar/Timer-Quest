document.addEventListener("DOMContentLoaded", loadSites);

document.getElementById("addBtn").onclick = () => {
    const site = document.getElementById("siteInput").value.trim();
    const time = parseInt(document.getElementById("timeInput").value);

    if (!site || !time || time <= 0) {
        alert("Enter a valid website and time (in minutes).");
        return;
    }

    chrome.storage.sync.get(["trackedSites"], (data) => {
        let sites = data.trackedSites || {};

        sites[site] = { limit: time, spent: 0 };

        chrome.storage.sync.set({ trackedSites: sites }, loadSites);
    });

    document.getElementById("siteInput").value = "";
    document.getElementById("timeInput").value = "";
};

function loadSites() {
    chrome.storage.sync.get(["trackedSites"], (data) => {
        const sites = data.trackedSites || {};
        const list = document.getElementById("siteList");
        list.innerHTML = "";

        Object.keys(sites).forEach((site) => {
            const displaySite = site.length > 25 ? site.slice(0, 22) + "…" : site;
            const li = document.createElement("li");
            li.innerHTML = `
                <div class="site-info" title="${site}">${displaySite}</div>
                <div class="minutes">${sites[site].limit} min</div>
                <button class="delBtn" data-site="${site}">x</button>
            `;
            list.appendChild(li);
        });

        document.querySelectorAll(".delBtn").forEach(btn => {
            btn.onclick = () => deleteSite(btn.dataset.site);
        });
    });
}

function deleteSite(site) {
    chrome.storage.sync.get(["trackedSites"], (data) => {
        let sites = data.trackedSites || {};
        delete sites[site];
        chrome.storage.sync.set({ trackedSites: sites }, loadSites);
    });
}