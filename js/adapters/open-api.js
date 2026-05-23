window.OpenApiAdapter = {
  async listItems(config) {
    if (!config.enabled || !config.endpoint) {
      return null;
    }

    const response = await fetch(config.endpoint);

    if (!response.ok) {
      throw new Error(`Open API 요청 실패: ${response.status}`);
    }

    const payload = await response.json();
    const rows = Array.isArray(payload) ? payload : payload.items || payload.data || [];

    return rows.slice(0, 5).map((item, index) => ({
      title: item.title || item.name || `API 항목 ${index + 1}`,
      description: item.description || item.summary || JSON.stringify(item).slice(0, 120),
      source: "Open API"
    }));
  }
};
