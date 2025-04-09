(function () {
    'use strict';
  
    // Use document.currentScript for direct access to the executing <script> element.
    const scriptTag = document.currentScript;
    // Get the backend URL from the "data-url" attribute on the <script> tag.
    const backendUrl = scriptTag ? scriptTag.getAttribute('data-url') : '';
    if (!backendUrl) {
        console.error("LetMeKnow: Backend URL not specified in the script tag 'data-url' attribute.");
        return;
    }
  
    // Generate a unique session ID using timestamp and a random component.
    const sessionID = "letmeknowsessionid-" + (Date.now().toString(16) + Math.floor(1E7 * Math.random()).toString(16));
  
    // Detect basic system and browser information.
    const letmeknowBrowser = {
        sessionID,
        OS: (() => {
            const ua = navigator.userAgent;
            if (ua.indexOf("Win") !== -1) return "Windows";
            if (ua.indexOf("Mac") !== -1) return "Macintosh";
            if (ua.indexOf("Linux") !== -1) return "Linux";
            if (ua.indexOf("Android") !== -1) return "Android";
            if (ua.indexOf("like Mac") !== -1) return "iOS";
            return "Unknown OS";
        })(),
        Browser: (() => {
            const ua = navigator.userAgent;
            let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if (/trident/i.test(M[1])) {
                const tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                return 'IE ' + (tem[1] || '');
            }
            if (M[1] === 'Chrome') {
                const tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
                if (tem !== null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
            }
            M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
            const tem = ua.match(/version\/(\d+)/i);
            if (tem !== null) M.splice(1, 1, tem[1]);
            return M.join(' ');
        })(),
        Language: navigator.language || navigator.userLanguage
    };
  
    // Send data (errors/stats) to the backend using Fetch API.
    const sendData = (payload) => {
        // Attach additional context to every payload.
        payload.timestamp = Date.now();
        payload.pageURL = window.location.href;
        payload.sessionID = sessionID;
        payload.browser = letmeknowBrowser;
        
        // Send a POST request.
        fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .catch((err) => {
            console.error("LetMeKnow: Failed to send data", err);
        });
    };
  
    // Global error handler for synchronous errors.
    window.onerror = function (message, source, lineno, colno, error) {
        const errorData = {
            type: "error",
            message: message,
            source: source,
            lineno: lineno,
            colno: colno,
            error: error ? error.toString() : null
        };
        sendData(errorData);
    };
  
    // Listen for unhandled promise rejections (asynchronous errors).
    window.addEventListener('unhandledrejection', function (event) {
        const error = event.reason;
        const errorData = {
            type: "unhandledrejection",
            message: error && error.message ? error.message : error,
            stack: error && error.stack ? error.stack : null
        };
        sendData(errorData);
    });
  
    // Expose a manual logging function for custom events or stats.
    window.letmeknowLog = function (data) {
        if (!data || typeof data !== 'object') {
            console.warn("LetMeKnow: Invalid data for logging");
            return;
        }
        // Default type 'log' if not already provided.
        data.type = data.type || "log";
        sendData(data);
    };
  
    // Optionally capture and report performance statistics after the page load.
    window.addEventListener('load', function () {
        if (window.performance && performance.timing) {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            sendData({
                type: "performance",
                loadTime: loadTime,
                timing: {
                    navigationStart: timing.navigationStart,
                    loadEventEnd: timing.loadEventEnd
                }
            });
        }
    });
  
    // Optional: Throttling logic could be added here to prevent flooding the backend
    // if too many errors or logs are being reported in a short amount of time.
  })();
  