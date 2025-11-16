import { supabase } from "./supabase.js";

console.log("ORB background running...");

// Track every 15 sec (0.25 min)
const INTERVAL = 15000;

setInterval(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        if (!tabs || !tabs[0]) return;

        const tab = tabs[0];
        let url;

        try {
            url = new URL(tab.url);
        } catch {
            return;
        }

        const hostname = url.hostname.replace("www.", "");

        chrome.storage.sync.get(["trackedSites"], (data) => {
            const sites = data.trackedSites || {};
            if (!sites[hostname]) return;

            const site = sites[hostname];

            // Add 0.25 minutes every interval
            site.spent = (site.spent || 0) + 0.25;

            // ---- OPEN POPUP when time limit exceeded ----
            if (!site.alert && site.spent >= site.limit) {
                site.alert = true;

                chrome.storage.sync.set({ trackedSites: sites });

                // Open break popup window
                chrome.windows.create({
                    url: "breakPopup.html",
                    type: "popup",
                    width: 360,
                    height: 420,
                    focused: true
                });
            }

            chrome.storage.sync.set({ trackedSites: sites });
        });
    });
}, INTERVAL);
