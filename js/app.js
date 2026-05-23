const elements = {
  status: document.querySelector("#status"),
  itemList: document.querySelector("#itemList"),
  refreshButton: document.querySelector("#refreshButton"),
  sheetsState: document.querySelector("#sheetsState"),
  apiState: document.querySelector("#apiState"),
  dbState: document.querySelector("#dbState")
};

async function loadItems() {
  setStatus("데이터를 불러오는 중...");

  const config = window.APP_CONFIG;
  updateConnectionState(config);

  try {
    const items =
      (await window.GoogleSheetsAdapter.listItems(config.googleSheets)) ||
      (await window.OpenApiAdapter.listItems(config.openApi)) ||
      (await window.DatabaseAdapter.listItems(config.database)) ||
      (await window.SampleDataAdapter.listItems());

    renderItems(items);
    setStatus(`${items.length}개의 항목을 표시했습니다.`);
  } catch (error) {
    console.error(error);
    setStatus(`오류가 발생했습니다: ${error.message}`);
    renderItems(await window.SampleDataAdapter.listItems());
  }
}

function updateConnectionState(config) {
  elements.sheetsState.textContent = config.googleSheets.enabled ? "연결 시도 중" : "샘플 데이터 사용 중";
  elements.apiState.textContent = config.openApi.enabled ? "연결 시도 중" : "샘플 데이터 사용 중";
  elements.dbState.textContent = config.database.enabled ? "연결 시도 중" : "샘플 데이터 사용 중";
}

function renderItems(items) {
  elements.itemList.innerHTML = "";

  for (const item of items) {
    const card = document.createElement("li");
    card.className = "item-card";
    card.innerHTML = `
      <strong>${escapeHtml(item.title)}</strong>
      <span>${escapeHtml(item.description)}</span>
      <small>${escapeHtml(item.source)}</small>
    `;
    elements.itemList.append(card);
  }
}

function setStatus(message) {
  elements.status.textContent = message;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

elements.refreshButton.addEventListener("click", loadItems);
loadItems();
