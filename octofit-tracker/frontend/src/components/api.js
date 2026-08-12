const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export const buildApiUrl = (resource) => `${apiBaseUrl}/${resource}/`;

export const normalizeResponseItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.data?.results)) {
    return payload.data.results;
  }

  return [];
};

export const getApiBaseUrl = () => apiBaseUrl;
