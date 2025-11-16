console.log("TimerQuest background service worker started");

const CHECK_INTERVAL = 15000; // 15 sec for testing

setInterval(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        if (!tabs || !tabs[0]) return;
        let url;

        try {
            url = new URL(tabs[0].url);
        } catch (e) {
            return;
        }

        const host = url.hostname.replace("www.", "");

        chrome.storage.sync.get(["trackedSites"], (data) => {
            const sites = data.trackedSites || {};
            if (!sites[host]) return;

            const site = sites[host];
            site.spent = (site.spent || 0) + 0.25; // 0.25 min per 15s

            chrome.storage.sync.set({ trackedSites: sites });

            if (!site.alert && site.spent >= site.limit) {
                site.alert = true;
                chrome.storage.sync.set({ trackedSites: sites });

                chrome.notifications.create({
                    type: "basic",
                    iconUrl: "logo.png",
                    title: "Time limit reached",
                    message: `You've exceeded your limit on ${host}.`
                });
            }
        });
    });
}, CHECK_INTERVAL);
