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
            site.spent = (site.spent || 0) + 0.25;

            chrome.storage.sync.set({ trackedSites: sites });

            if (!site.alert && site.spent >= site.limit) {
                site.alert = true;

                // Delete website from list when time reached
                delete sites[host];
                chrome.storage.sync.set({ trackedSites: sites });

                chrome.notifications.create({
                    type: "basic",
                    iconUrl: chrome.runtime.getURL("icon.png"),
                    title: "Time limit reached",
                    message: `You've exceeded your limit on ${host}.`
                });

                // ======= CENTERED POPUP =======
                const width = 380;
                const height = 480;

                chrome.system.display.getInfo((displayInfo) => {
                    const screen = displayInfo[0].workArea;

                    const left = Math.round(screen.left + (screen.width - width) / 2);
                    const top = Math.round(screen.top + (screen.height - height) / 2);

                    chrome.windows.create({
                        url: chrome.runtime.getURL("limitPopup.html"),
                        type: "popup",
                        width: width,
                        height: height,
                        left: left,
                        top: top,
                        focused: true
                    }, () => {
                        chrome.runtime.sendMessage({
                            type: "time-info",
                            minutes: site.limit,
                            site: host
                        });
                    });
                });
                // ===== END CENTERED POPUP =====

            }
        });
    });
}, CHECK_INTERVAL);
