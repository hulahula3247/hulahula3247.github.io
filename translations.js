// Korean public copy; shared dates, links, authors and citations come from content.js.
(() => {
  const base = window.siteContent;
  const papers = {
  "roshift-preprint": {
    "type": "제1저자",
    "venueLabel": "ICLR 2027 (Under review)",
    "description": "학습 없이 lazy shift와 activation 및 weight 정보를 함께 반영한 회전을 적용하여 LLM의 희소 추론을 가속하는 기법입니다.",
    "abstract": "RoShift는 추가 학습 없이 activation을 희소화에 적합한 표현으로 변환합니다. Lazy shift는 SiLU activation 분포의 중심을 0으로 옮기고, 보정 연산을 FFN 끝으로 미룹니다. Activation과 weight 정보를 함께 고려한 회전은 희소화로 인한 출력 오차를 줄입니다. Shift와 회전에 필요한 보정 연산을 융합하여 디코딩 속도를 높입니다."
  },
  "offn-asplos-2026": {
    "type": "제1저자",
    "venueLabel": "ASPLOS 2026",
    "description": "Activation outlier와 hot/cold neuron의 특성을 함께 활용해 LLM 추론을 가속하는 구조화된 FFN 설계입니다.",
    "abstract": "oFFN은 FFN 가중치를 입력과 출력 차원에서 재배치해 activation outlier와 hot/cold neuron 특성을 함께 활용합니다. 이를 통해 출력 희소성을 더 정확하게 예측하고, 뉴런 그룹과 배치 크기에 맞는 연산 경로를 선택합니다. ReLU 기반 대규모 언어 모델에서 추론 효율과 정확도를 평가한 연구입니다."
  },
  "submitted-manuscript": {
    "type": "공동 제1저자",
    "title": "심사 중인 원고",
    "venueLabel": "Under review",
    "description": "여러 GPU에서 MoE 모델을 효율적으로 서빙하기 위해 활성화 희소성을 활용한 추론 시스템을 설계했습니다."
  }
};
  const demos = {
    "offn-jetson": {
      "videoDescription": "llama.cpp에 구현한 oFFN의 실제 추론 영상입니다. oFFN과 Attention 입력 희소화를 함께 적용하여, 기본 llama.cpp 대비 3.11배의 토큰 생성 속도를 달성했습니다.",
      "summary": "oFFN은 ReLU 이후 0이 될 뉴런을 미리 예측하여 불필요한 FFN 연산과 가중치 읽기를 생략하는 기법입니다. ReLU 이전의 값이 음수이면 출력이 0이 되므로, 해당 뉴런에 대응하는 연산을 건너뛸 수 있습니다. 이를 위해 oFFN에서는 outlier 차원의 기여는 정확하게 계산하고, 나머지는 그룹 기반으로 근사하여 활성화 여부를 적은 비용으로 효율적으로 예측합니다.\n\n또한 자주 활성화되는 Hot neuron은 예측 과정을 거치지 않고 Tensor Core에서 처리하며, Cold neuron은 예측 결과에 따라 필요한 연산만 수행합니다. 소규모 배치에서 활성화 희소성을 활용해 가중치 읽기를 줄이고 실제 추론을 가속할 수 있도록 GPU 커널을 설계하고 최적화하였습니다. 이러한 실행 경로를 배치 크기에 맞게 구성하여 단일 배치와 소규모 배치 환경에서 추론을 가속합니다.\n\nJetson AGX Orin에서 ReLU 기반 모델인 ProSparse-LLaMA-2-13B를 평가한 결과, Dense 대비 FFN 연산은 최대 5.46배, 전체 디코딩은 최대 2.01배 가속하였습니다."
    },
    "roshift-project": {
      "summary": "현대의 LLM에서는 대부분 활성화 함수로 SiLU를 사용합니다. SiLU는 ReLU와 달리 활성화 값이 자연적으로 0이 되는 경우가 드뭅니다. 따라서 작은 값을 0으로 근사하여 불필요한 연산과 메모리 접근을 줄이지만, 원래 0이 아닌 값을 제거하므로 모델의 정확도가 떨어질 수 있습니다.\n\nRoShift는 모델의 표현 공간을 변환하여 이러한 정확도 손실을 줄이면서 추론을 가속하는 기법입니다. 먼저 SiLU 이후 활성화 분포의 중심이 0에서 벗어나 있다는 점에 착안하여, 분포의 중심을 0으로 옮기고 이에 따른 보정을 FFN 연산 이후에 지연시켜서 수행하는 Lazy Shift를 제안합니다. 또한 활성화와 가중치 정보를 함께 고려한 회전을 통해, 모델의 표현 공간을 희소화에 유리한 형태로 변환합니다.\n\n5개 모델에서 50% uniform 희소도를 적용한 결과, 최소한의 정확도 손실로 RTX 5090에서 평균 1.60배의 디코딩 가속을 달성하였습니다."
    }
  };
  const awards = {
  "icpc-apac-2025": {
    "title": "38위",
    "organization": "싱가포르국립대학교(NUS), 싱가포르"
  },
  "icpc-seoul-2024": {
    "title": "13위(장려상)",
    "localName": "전국 대학생 프로그래밍 경시대회",
    "organization": "과학기술정보통신부"
  },
  "lgcpc-2024": {
    "title": "5위(우수상)",
    "event": "LG 대학생 코딩대회(LGCPC)",
    "organization": "LG"
  },
  "ucpc-2024": {
    "title": "15위(5등상)",
    "event": "대학생 프로그래밍 대회 동아리 연합 대회(UCPC)",
    "organization": "대한민국"
  },
  "hyundai-mobis-2024": {
    "title": "21위(장려상)",
    "event": "현대모비스 알고리즘 경진대회",
    "organization": "현대모비스"
  },
  "icpc-apac-2024": {
    "title": "42위",
    "organization": "VNU 공과대학교, 베트남"
  },
  "sogang-pc-2023": {
    "title": "1위(대상)",
    "event": "서강대학교 프로그래밍 대회",
    "organization": "서강대학교"
  },
  "icpc-seoul-2023": {
    "title": "29위",
    "localName": "전국 대학생 프로그래밍 경시대회",
    "organization": "과학기술정보통신부"
  },
  "hyundai-mobis-2023": {
    "title": "28위(장려상)",
    "event": "현대모비스 알고리즘 경진대회",
    "organization": "현대모비스"
  },
  "sogang-pc-2022": {
    "title": "8위",
    "event": "서강대학교 프로그래밍 대회",
    "organization": "서강대학교"
  }
};
  window.siteI18n = {
    locales: {
      en: base,
      ko: {
        ...base,
        ...{
  "profile": {
    "name": "송근수",
    "authorName": "Geunsoo Song",
    "initials": "GS",
    "role": "서강대학교 컴퓨터공학과",
    "researchFocus": "LLM 추론 최적화, AI 시스템",
    "department": "컴퓨터공학과",
    "institution": "서강대학교",
    "location": "대한민국 서울",
    "photo": "./assets/profile-portrait.png",
    "photoAlt": "졸업식에서 촬영한 송근수의 사진",
    "email": "hulahula3247@gmail.com",
    "github": "https://github.com/hulahula3247",
    "scholar": "https://scholar.google.com/citations?hl=en&user=i8bV0RMAAAAJ",
    "orcid": "https://orcid.org/0009-0008-6158-7833"
  },
  "updated": "2026년 11월",
  "competitiveProgrammingIntro": "지금까지 다양한 문제를 풀고 여러 알고리즘 경진대회에 참여하여 여러 대회에서 수상하였습니다.",
  "biography": [
    "안녕하세요! 서강대학교 컴퓨터공학과 석사과정에 재학 중인 송근수입니다. 저는 효율적인 AI 시스템 설계와 대규모 언어 모델(LLM)의 추론 가속에 관심이 있으며, 소프트웨어와 하드웨어 양쪽의 관점에서 이를 연구하고 있습니다.",
    "특히 아래와 같은 두 분야에 관심이 많습니다."
  ],
  "research": [
    {
      "title": "Activation Sparsity (활성화 희소성)",
      "description": "Activation Sparsity는 모델에서 불필요한 연산을 생략하여 추론을 가속하는 기술입니다. 예를 들어, 활성화 값이 0이거나 충분히 작은 경우, 해당 값과 연결된 가중치 연산을 생략하여 연산량과 메모리 접근을 줄일 수 있습니다. 또한 Activation Sparsity를 효율적으로 활용하기 위해, 희소 패턴을 미리 예측하거나 모델의 활성화 표현을 희소화에 적합하게 변환하는 연구를 진행하였습니다."
    },
    {
      "title": "Hardware-aware Optimization",
      "description": "효율적인 알고리즘이 실제 하드웨어에서도 높은 성능을 발휘하도록 HW/SW Co-design에 관심이 있습니다. 이를 위해 CUDA 및 Triton으로 GPU 커널을 개발하고, Nsight Systems/Compute를 활용해 성능 병목을 분석하고 최적화하는 연구를 진행하였습니다. 또한 여러 서버 GPU를 사용하는 LLM 서빙 환경에서 연산을 분산하고 GPU 간 부하를 균형 있게 나누는 병렬화 기법을 연구하고 있습니다."
    }
  ],
  "education": [
    {
      "period": "2025.03 - 현재",
      "title": "서강대학교 컴퓨터공학 석사과정",
      "organization": "",
      "detail": "재학 중, 2027년 2월 졸업 예정",
      "advisor": "지도교수: 이영민 교수님"
    },
    {
      "period": "2020.03 - 2025.02",
      "title": "서강대학교 기계공학/컴퓨터공학 복수전공",
      "organization": "",
      "detail": ""
    }
  ],
  "skills": []
},
        publications: base.publications.map(paper => ({ ...paper, ...papers[paper.id] })),
        researchDemos: base.researchDemos.map(demo => ({ ...demo, ...demos[demo.id] })),
        awards: base.awards.map(award => ({ ...award, ...awards[award.id] }))
      }
    },
    strings: {
  "en": {
    "about": "About",
    "research": "Research",
    "researchInterests": "Research interests",
    "publications": "Publications",
    "researchDemos": "Research Projects",
    "paperDetails": "Research overview",
    "videoFallback": "Open video",
    "demoDetails": "Experiment Details",
    "awards": "Awards & Honors",
    "awardsNav": "Awards",
    "education": "Education",
    "awardCountOne": "{count} entry",
    "awardCountMany": "{count} entries",
    "featuredAwards": "Selected awards",
    "competitiveProgramming": "Competitive Programming",
    "peakRating": "Max rating",
    "allAwards": "All awards",
    "skills": "Skills",
    "selected": "Selected",
    "all": "All",
    "equalContribution": "* Equal contribution",
    "backTop": "Back to top",
    "email": "Email",
    "scholar": "Google Scholar",
    "cv": "CV",
    "curriculumVitae": "Curriculum vitae",
    "backHome": "Back to homepage",
    "printCV": "Print / Save PDF",
    "printTitle": "Print or save as PDF",
    "researchProfile": "Research profile",
    "abstract": "Summary",
    "paperCode": "Code",
    "paperProject": "Project",
    "noLink": "Link not added yet",
    "closeCitation": "Close citation",
    "copyCitation": "Copy citation",
    "copySuccess": "Copied to clipboard.",
    "copyFailure": "Select the citation text to copy it.",
    "mainNavigation": "Main navigation",
    "profileLabel": "Profile",
    "publicationView": "Publication view",
    "languageLabel": "Language / 언어",
    "skip": "Skip to content",
    "cvDocumentTitle": "Curriculum Vitae",
    "metaDescription": "Research, publications, and awards in machine learning systems.",
    "updated": "Last updated",
    "languageChanged": "Language set to English.",
    "darkMode": "Switch to dark mode",
    "lightMode": "Switch to light mode",
    "darkModeLabel": "Dark mode",
    "lightModeLabel": "Light mode",
    "paperLink": "Paper",
    "acceptanceRate": "Acceptance rate"
  },
  "ko": {
    "about": "소개",
    "research": "연구",
    "researchInterests": "연구 관심사",
    "publications": "논문",
    "researchDemos": "연구 프로젝트",
    "paperDetails": "연구 소개",
    "videoFallback": "영상 열기",
    "demoDetails": "실험정보",
    "awards": "수상실적",
    "awardsNav": "수상실적",
    "education": "학력",
    "awardCountOne": "{count}건",
    "awardCountMany": "{count}건",
    "featuredAwards": "주요 수상실적",
    "competitiveProgramming": "Competitive Programming",
    "peakRating": "Max rating",
    "allAwards": "모든 수상실적",
    "skills": "보유 역량",
    "selected": "주요 논문",
    "all": "전체",
    "equalContribution": "* 동등 기여",
    "backTop": "맨 위로",
    "email": "이메일",
    "scholar": "Google 학술검색",
    "cv": "CV",
    "curriculumVitae": "이력서",
    "backHome": "홈으로 돌아가기",
    "printCV": "인쇄 / PDF 저장",
    "printTitle": "인쇄 또는 PDF로 저장",
    "researchProfile": "연구 소개",
    "abstract": "연구 요약",
    "paperCode": "코드",
    "paperProject": "프로젝트",
    "noLink": "아직 등록되지 않은 링크입니다",
    "closeCitation": "인용 정보 닫기",
    "copyCitation": "인용 복사",
    "copySuccess": "클립보드에 복사했습니다.",
    "copyFailure": "인용 문구를 선택해서 복사해 주세요.",
    "mainNavigation": "주 메뉴",
    "profileLabel": "프로필",
    "publicationView": "논문 보기",
    "languageLabel": "언어 / Language",
    "skip": "본문으로 이동",
    "cvDocumentTitle": "이력서",
    "metaDescription": "머신러닝 시스템 분야의 연구, 논문 및 수상실적을 소개합니다.",
    "updated": "최근 업데이트",
    "languageChanged": "한국어로 변경했습니다.",
    "darkMode": "다크모드로 전환",
    "lightMode": "라이트모드로 전환",
    "darkModeLabel": "다크 모드",
    "lightModeLabel": "라이트 모드",
    "paperLink": "논문",
    "acceptanceRate": "Acceptance rate"
  }
},
    resolveLanguage(requested, saved, browserLanguage) {
      if (requested === "ko" || requested === "en") return requested;
      if (saved === "ko" || saved === "en") return saved;
      return /^ko(?:-|$)/i.test(browserLanguage || "") ? "ko" : "en";
    }
  };
})();
