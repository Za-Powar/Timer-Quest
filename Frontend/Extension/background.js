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


const SUPABASE_URL = "https://tspuhbpauftvxoqytezd.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzcHVoYnBhdWZ0dnhvcXl0ZXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMjYzNDIsImV4cCI6MjA3ODcwMjM0Mn0.t2wNIZruPGeuILfeplVxtFc6tWmyTF1hL3LhpggWNGs";

chrome.runtime.onMessage.addListener(async (message) => {
    const { url, timeSpent } = message;

    const response = await fetch(`${SUPABASE_URL}/rest/v1/page_times`, {
        method: "POST",
        headers: {
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url, time_spent: timeSpent })
    });

    const data = await response.json();
    console.log("Page time saved:", data);
});