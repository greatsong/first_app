window.GoogleSheetsAdapter = {
  async listItems(config) {
    if (!config.enabled) {
      return null;
    }

    const { spreadsheetId, range, apiKey } = config;
    const encodedRange = encodeURIComponent(range);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodedRange}?key=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Google Sheets 요청 실패: ${response.status}`);
    }

    const payload = await response.json();
    const rows = payload.values || [];

    return rows.map((row) => ({
      title: row[0] || "제목 없음",
      description: row[1] || "설명 없음",
      source: row[2] || "Google Sheets"
    }));
  }
};
