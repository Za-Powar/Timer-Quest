// Listen for messages from background.js
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "timeExceeded") {
        showOrbPopup(msg.site);
    }
});

function showOrbPopup(site) {
    // Prevent duplicates
    if (document.getElementById("orb-overlay")) return;

    // Inject CSS if not already injected
    if (!document.getElementById("orb-style")) {
        const style = document.createElement("style");
        style.id = "orb-style";
        style.textContent = `
            #orb-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0,0,0,0.55);
                backdrop-filter: blur(4px);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 999999;
                font-family: Arial, sans-serif;
            }

            #orb-box {
                background: white;
                padding: 25px;
                border-radius: 15px;
                text-align: center;
                width: 320px;
                box-shadow: 0 6px 25px rgba(0,0,0,0.25);
            }

            #orb-character {
                width: 80px;
                margin-bottom: 10px;
            }

            .orb-button {
                width: 100%;
                padding: 10px;
                margin-top: 10px;
                border: none;
                border-radius: 10px;
                font-size: 16px;
                cursor: pointer;
            }

            #orb-break-btn {
                background: #4CAF50;
                color: white;
            }

            #orb-ignore-btn {
                background: #e74c3c;
                color: white;
            }
        `;
        document.head.appendChild(style);
    }

    // Create overlay container
    const overlay = document.createElement("div");
    overlay.id = "orb-overlay";

    // Create popup box
    const box = document.createElement("div");
    box.id = "orb-box";

    // ORB image
    const orbImg = document.createElement("img");
    orbImg.id = "orb-character";
    orbImg.src = "https://i.ibb.co/51f0ZyF/orb-placeholder.png";

    // Warning text
    const text = document.createElement("p");
    text.innerHTML = `
        <strong>Time's up!</strong><br>
        You've spent your limit on <br><em>${site}</em>.
    `;

    // "Take a Break" button
    const breakBtn = document.createElement("button");
    breakBtn.className = "orb-button";
    breakBtn.id = "orb-break-btn";
    breakBtn.textContent = "Take a Break";
    breakBtn.onclick = () => {
        overlay.remove();
        enableScroll();
    };

    // "Ignore" button
    const ignoreBtn = document.createElement("button");
    ignoreBtn.className = "orb-button";
    ignoreBtn.id = "orb-ignore-btn";
    ignoreBtn.textContent = "Ignore";
    ignoreBtn.onclick = () => {
        overlay.remove();
        enableScroll();
    };

    // Build DOM
    box.appendChild(orbImg);
    box.appendChild(text);
    box.appendChild(breakBtn);
    box.appendChild(ignoreBtn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    disableScroll();
}

function disableScroll() {
    document.body.style.overflow = "hidden";
}

function enableScroll() {
    document.body.style.overflow = "auto";
}
