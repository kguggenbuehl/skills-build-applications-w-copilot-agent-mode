# OctoFit Frontend

This React 19 + Vite app consumes the backend API resources under /api.

## Environment Variable

Define VITE_CODESPACE_NAME for Codespaces API routing. Example in .env.local:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When VITE_CODESPACE_NAME is set, API requests use:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When VITE_CODESPACE_NAME is not set, the app safely falls back to:

```text
http://localhost:8000/api/[component]/
```

This prevents invalid URLs such as https://undefined-8000.app.github.dev.
