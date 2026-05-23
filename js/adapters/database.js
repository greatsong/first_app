window.DatabaseAdapter = {
  async listItems(config) {
    if (!config.enabled) {
      return null;
    }

    throw new Error("DB 연동은 chapter-05에서 Supabase SDK를 추가한 뒤 활성화합니다.");
  }
};
