import { TrendingUp, Instagram, Youtube, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <span className="text-gray-900">InvestLearn</span>
            </div>
            <p className="text-sm text-gray-600">
              AI와 함께하는 스마트한 투자 학습 플랫폼
            </p>
          </div>

          <div>
            <div className="mb-4 text-gray-900">서비스</div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600">투자 시뮬레이터</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">AI 금융 학습</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">커뮤니티</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">블로그</a>
              </li>
            </ul>
          </div>

          <div>
            <div className="mb-4 text-gray-900">회사</div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600">소개</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">채용</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">문의하기</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">파트너십</a>
              </li>
            </ul>
          </div>

          <div>
            <div className="mb-4 text-gray-900">소셜</div>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-colors hover:bg-blue-600 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-colors hover:bg-blue-600 hover:text-white"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-colors hover:bg-blue-600 hover:text-white"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          <p>© 2025 InvestLearn. All rights reserved.</p>
          <p className="mt-2">
            본 서비스는 교육 목적으로 제공되며 실제 투자 권유가 아닙니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
