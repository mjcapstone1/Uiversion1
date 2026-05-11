export interface SchoolOption {
  name: string;
  region: string;
  type: "대학교" | "고등학교";
}

export const SCHOOL_OPTIONS: SchoolOption[] = [
  { name: "서울대학교", region: "서울", type: "대학교" },
  { name: "연세대학교", region: "서울", type: "대학교" },
  { name: "고려대학교", region: "서울", type: "대학교" },
  { name: "성균관대학교", region: "서울", type: "대학교" },
  { name: "한양대학교", region: "서울", type: "대학교" },
  { name: "이화여자대학교", region: "서울", type: "대학교" },
  { name: "중앙대학교", region: "서울", type: "대학교" },
  { name: "명지대학교", region: "서울", type: "대학교" },
  { name: "경희대학교", region: "서울", type: "대학교" },
  { name: "한국외국어대학교", region: "서울", type: "대학교" },
  { name: "서울시립대학교", region: "서울", type: "대학교" },
  { name: "인하대학교", region: "인천", type: "대학교" },
  { name: "아주대학교", region: "경기", type: "대학교" },
  { name: "경기대학교", region: "경기", type: "대학교" },
  { name: "가톨릭대학교", region: "경기", type: "대학교" },
  { name: "한국과학기술원", region: "대전", type: "대학교" },
  { name: "충남대학교", region: "대전", type: "대학교" },
  { name: "한남대학교", region: "대전", type: "대학교" },
  { name: "충북대학교", region: "충북", type: "대학교" },
  { name: "부산대학교", region: "부산", type: "대학교" },
  { name: "경북대학교", region: "대구", type: "대학교" },
  { name: "부경대학교", region: "부산", type: "대학교" },
  { name: "경상국립대학교", region: "경남", type: "대학교" },
  { name: "전남대학교", region: "광주", type: "대학교" },
  { name: "전북대학교", region: "전북", type: "대학교" },
  { name: "조선대학교", region: "광주", type: "대학교" },
  { name: "강원대학교", region: "강원", type: "대학교" },
  { name: "포항공과대학교", region: "경북", type: "대학교" },
  { name: "제주대학교", region: "제주", type: "대학교" },
];

export function searchSchools(keyword: string, options: SchoolOption[] = SCHOOL_OPTIONS): SchoolOption[] {
  const normalized = keyword.replace(/\s+/g, "").toLowerCase();

  if (!normalized) {
    return options.slice(0, 8);
  }

  return options.filter((school) => {
    const target = `${school.name}${school.region}${school.type}`.replace(/\s+/g, "").toLowerCase();
    return target.includes(normalized);
  }).slice(0, 8);
}
