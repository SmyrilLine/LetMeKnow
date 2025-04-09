# LetMeKnow.js

LetMeKnow.js is a lightweight JavaScript plugin that captures errors, logs, and performance metrics on your website and sends them to your backend for monitoring and debugging purposes.

## Features

- Captures JavaScript runtime errors using window.onerror
- Captures unhandled promise rejections
- Provides a global logging function for manual event tracking
- Collects basic performance metrics (page load time)
- Captures browser and environment details
- Configurable backend URL via a script tag attribute

## Installation

Copy the letmeknow.js file into your project directory and include it in your HTML document's <head> section. Be sure to specify the backend URL where data should be sent by using the data-url attribute.

Example script inclusion:

```html
<script src="js/letmeknow.js" data-url="https://your-backend.example.com/api/letmeknow/"></script>
```

## Manual Logging

You can manually log custom events or messages from your JavaScript using the global function:

```js
window.letmeknowLog({ type: 'custom', message: 'User clicked the subscribe button.' });
```

This will send your message along with browser details and page context to your backend.

## Backend Requirements

Your backend endpoint should accept HTTP POST requests with JSON payloads. Here's an example payload your server might receive from LetMeKnow.js:

```json
{
  "type": "error",
  "message": "ReferenceError: exampleFunction is not defined",
  "source": "https://example.com/",
  "lineno": 10,
  "colno": 5,
  "error": "ReferenceError: exampleFunction is not defined",
  "timestamp": 1700000000000,
  "pageURL": "https://example.com/",
  "sessionID": "letmeknowsessionid-abc123",
  "browser": {
    "sessionID": "letmeknowsessionid-abc123",
    "OS": "Windows",
    "Browser": "Chrome 100",
    "Language": "en-US"
  }
}
```

Your server-side application should parse and handle these requests accordingly.

## Example Backend (Node.js Express)

Install dependencies:

npm install express cors

## License

MIT License – Feel free to use, modify, and distribute.

## Contributing

Contributions are welcome. Submit a pull request or open an issue to suggest improvements or fixes.
