console.log("ORB background running...");

/*// How often to check (15 sec for testing)
const INTERVAL = 15000;

setInterval(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        if (!tabs || !tabs[0]) return;

        const tab = tabs[0];
        let url;

        try {
            url = new URL(tab.url);
        } catch (e) {
            return;
        }

        const hostname = url.hostname.replace("www.", "");

        chrome.storage.sync.get(["trackedSites"], (data) => {
            const sites = data.trackedSites || {};

            if (!sites[hostname]) return;

            const site = sites[hostname];

            site.spent = (site.spent || 0) + 0.25;

            console.log(`${hostname}: ${site.spent.toFixed(2)} / ${site.limit} minutes`);

            // Check if limit exceeded
            if (!site.alerted && site.spent >= site.limit) {
                site.alerted = true;

                console.log(`LIMIT EXCEEDED for ${hostname}`);

                // SAFE SEND — prevents your error
                chrome.tabs.sendMessage(
                    tab.id,
                    { action: "timeExceeded", site: hostname },
                    (response) => {
                        if (chrome.runtime.lastError) {
                            console.warn(
                                "Content script not available in this tab:",
                                chrome.runtime.lastError.message
                            );
                            return; // prevents crash
                        }

                        console.log("Content script response:", response);
                    }
                );
            }

            sites[hostname] = site;
            chrome.storage.sync.set({ trackedSites: sites });
        });
    });
}, INTERVAL); */