window.SampleDataAdapter = {
  async listItems() {
    return [
      {
        title: "GitHub Pages 배포",
        description: "index.html을 저장소에 올리고 Pages 주소로 접속합니다.",
        source: "chapter-01"
      },
      {
        title: "Google Sheets 연결",
        description: "시트의 표 데이터를 웹앱 카드 목록으로 바꿉니다.",
        source: "chapter-03"
      },
      {
        title: "Open API 호출",
        description: "외부 API 응답을 화면에 표시하고 오류를 다룹니다.",
        source: "chapter-04"
      }
    ];
  }
};
