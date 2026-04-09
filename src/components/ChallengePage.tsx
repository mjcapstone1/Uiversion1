import { Users, Trophy, Award, MessageCircle, TrendingUp, Target } from 'lucide-react';

interface ChallengePageProps {
  onBack: () => void;
}

export function ChallengePage({ onBack }: ChallengePageProps) {
  return (
    <div className="min-h-screen bg-[#1a1d24] px-6 py-6">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl text-white">🎯 챌린지</h1>
        <p className="text-lg text-gray-400">실전 투자 전략을 게임처럼 즐기며 배워 보세요</p>
      </div>

      {/* 이번 주 핫한 챌린지 */}
      <div className="mb-8 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-600 p-4">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <div>
              <div className="mb-1 flex items-center gap-2">
                <h3 className="text-2xl text-white">이번 주 HOT 챌린지</h3>
                <span className="rounded-full bg-red-600 px-3 py-1 text-xs">진행중</span>
              </div>
              <p className="text-gray-300">ESG 테마 종목으로 최고 수익률 달성하기</p>
            </div>
          </div>
          <div className="text-right">
            <div className="mb-1 text-3xl text-white">1,250명 참여 중</div>
            <div className="text-sm text-gray-400">3일 남음</div>
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          <button className="rounded-lg bg-blue-600 px-8 py-3 transition-colors hover:bg-blue-700">
            지금 참여하기
          </button>
          <button className="rounded-lg border border-gray-600 px-8 py-3 transition-colors hover:bg-gray-800">
            자세히 보기
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* 리그 (학교별) */}
        <div className="rounded-xl border border-gray-700 bg-[#25282f] p-8 transition-all hover:border-yellow-500">
          <div className="mb-6 flex items-center gap-4">
            <div className="rounded-lg bg-yellow-600/20 p-4">
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-2xl text-white">리그 (학교별 경쟁)</h3>
              <p className="text-sm text-gray-400">같은 학교 학생들과 순위 경쟁</p>
            </div>
          </div>
          <div className="mb-6 space-y-3">
            <div className="flex items-center gap-3 text-gray-300">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-600/20">
                <Trophy className="h-4 w-4 text-yellow-500" />
              </div>
              <span>우리 학교 내 실시간 순위</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-600/20">
                <TrendingUp className="h-4 w-4 text-yellow-500" />
              </div>
              <span>학교간 대항전 참여</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-600/20">
                <Award className="h-4 w-4 text-yellow-500" />
              </div>
              <span>월간 학교 랭킹 보상</span>
            </div>
          </div>
          <div className="mb-6 rounded-lg bg-[#1a1d24] p-4">
            <div className="mb-2 text-sm text-gray-400">내 학교 리그</div>
            <div className="text-xl text-white">서울대학교 리그</div>
            <div className="mt-2 text-sm text-gray-400">현재 순위: <span className="text-yellow-500">12위</span> / 284명</div>
          </div>
          <button className="w-full rounded-lg bg-yellow-600 py-3 transition-colors hover:bg-yellow-700">
            리그 순위 보기
          </button>
        </div>

        {/* 스쿼드 (친구 그룹) */}
        <div className="rounded-xl border border-gray-700 bg-[#25282f] p-8 transition-all hover:border-blue-500">
          <div className="mb-6 flex items-center gap-4">
            <div className="rounded-lg bg-blue-600/20 p-4">
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h3 className="text-2xl text-white">스쿼드 (친구 그룹)</h3>
              <p className="text-sm text-gray-400">친구들과 소규모 그룹 경쟁</p>
            </div>
          </div>
          <div className="mb-6 space-y-3">
            <div className="flex items-center gap-3 text-gray-300">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600/20">
                <Users className="h-4 w-4 text-blue-500" />
              </div>
              <span>3-10명 소규모 그룹 생성</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600/20">
                <TrendingUp className="h-4 w-4 text-blue-500" />
              </div>
              <span>그룹 내 포트폴리오 공유</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600/20">
                <MessageCircle className="h-4 w-4 text-blue-500" />
              </div>
              <span>실시간 투자 전략 토론</span>
            </div>
          </div>
          <div className="mb-6 rounded-lg bg-[#1a1d24] p-4">
            <div className="mb-2 text-sm text-gray-400">내 스쿼드</div>
            <div className="text-xl text-white">투자 고수들 🚀</div>
            <div className="mt-2 text-sm text-gray-400">멤버 5명 • 그룹 수익률: <span className="text-green-500">+12.4%</span></div>
          </div>
          <button className="w-full rounded-lg bg-blue-600 py-3 transition-colors hover:bg-blue-700">
            스쿼드 관리하기
          </button>
        </div>

        {/* 테마 챌린지 */}
        <div className="rounded-xl border border-gray-700 bg-[#25282f] p-8 transition-all hover:border-purple-500">
          <div className="mb-6 flex items-center gap-4">
            <div className="rounded-lg bg-purple-600/20 p-4">
              <Target className="h-8 w-8 text-purple-500" />
            </div>
            <div>
              <h3 className="text-2xl text-white">테마 챌린지</h3>
              <p className="text-sm text-gray-400">주간/월간 테마별 이벤트</p>
            </div>
          </div>
          <div className="mb-6 space-y-3">
            <div className="flex items-center gap-3 text-gray-300">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600/20">
                <Trophy className="h-4 w-4 text-purple-500" />
              </div>
              <span>주간 테마 챌린지 참여</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600/20">
                <Award className="h-4 w-4 text-purple-500" />
              </div>
              <span>ESG, 성장주 등 다양한 테마</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600/20">
                <TrendingUp className="h-4 w-4 text-purple-500" />
              </div>
              <span>월간 리더보드 순위</span>
            </div>
          </div>
          <div className="mb-6 rounded-lg bg-[#1a1d24] p-4">
            <div className="mb-2 text-sm text-gray-400">진행중인 챌린지</div>
            <div className="text-xl text-white">ESG 테마 챌린지</div>
            <div className="mt-2 text-sm text-gray-400">3일 남음 • 1,250명 참여중</div>
          </div>
          <button className="w-full rounded-lg bg-purple-600 py-3 transition-colors hover:bg-purple-700">
            챌린지 참여하기
          </button>
        </div>

        {/* 소셜 게이미피케이션 */}
        <div className="rounded-xl border border-gray-700 bg-[#25282f] p-8 transition-all hover:border-green-500">
          <div className="mb-6 flex items-center gap-4">
            <div className="rounded-lg bg-green-600/20 p-4">
              <Award className="h-8 w-8 text-green-500" />
            </div>
            <div>
              <h3 className="text-2xl text-white">업적 & 리더보드</h3>
              <p className="text-sm text-gray-400">뱃지 획득 및 전체 랭킹</p>
            </div>
          </div>
          <div className="mb-6 space-y-3">
            <div className="flex items-center gap-3 text-gray-300">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600/20">
                <Trophy className="h-4 w-4 text-green-500" />
              </div>
              <span>업적 및 뱃지 시스템</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600/20">
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <span>전체 유저 리더보드</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600/20">
                <Award className="h-4 w-4 text-green-500" />
              </div>
              <span>레벨업 보상 시스템</span>
            </div>
          </div>
          <div className="mb-6 rounded-lg bg-[#1a1d24] p-4">
            <div className="mb-2 text-sm text-gray-400">내 레벨</div>
            <div className="text-xl text-white">LV. 8 중급 투자자</div>
            <div className="mt-2 text-sm text-gray-400">획득한 뱃지: <span className="text-green-500">12개</span></div>
          </div>
          <button className="w-full rounded-lg bg-green-600 py-3 transition-colors hover:bg-green-700">
            내 업적 보기
          </button>
        </div>

        {/* 멘토/코치 모드 */}
        <div className="col-span-2 rounded-xl border border-gray-700 bg-[#25282f] p-8 transition-all hover:border-orange-500">
          <div className="mb-6 flex items-center gap-4">
            <div className="rounded-lg bg-orange-600/20 p-4">
              <MessageCircle className="h-8 w-8 text-orange-500" />
            </div>
            <div>
              <h3 className="text-2xl text-white">멘토/코치 모드</h3>
              <p className="text-sm text-gray-400">우수 유저 (상위 랭커)나 외부 멘토와 Q&A</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-3 text-gray-300">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600/20">
                <Users className="h-4 w-4 text-orange-500" />
              </div>
              <span>1:1 멘토링 매칭</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600/20">
                <MessageCircle className="h-4 w-4 text-orange-500" />
              </div>
              <span>실시간 Q&A 세션</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600/20">
                <Trophy className="h-4 w-4 text-orange-500" />
              </div>
              <span>상위 랭커 전략 공유</span>
            </div>
          </div>
          <button className="mt-6 rounded-lg bg-orange-600 px-8 py-3 transition-colors hover:bg-orange-700">
            멘토 찾기
          </button>
        </div>
      </div>
    </div>
  );
}
