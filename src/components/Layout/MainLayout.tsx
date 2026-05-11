import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { useAuthStore } from "@/store/useAuthStore";
import { authApi } from "@/api/auth";

const MENU_ROUTES: Record<string, string> = {
  "홈": "/home",
  "투자 시뮬레이터": "/simulation",
  "AI 학습": "/ai-learning",
  "챌린지": "/challenge",
};

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tokens, clearAuth } = useAuthStore();

  const handleMenuClick = (menu: string) => {
    const route = MENU_ROUTES[menu];
    if (route) {
      navigate(route);
    }
  };

  const handleProfileClick = () => {
    // 로그인 상태면 마이페이지, 아니면 로그인으로 유도
    navigate(tokens ? "/mypage" : "/login");
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
      // 목업/네트워크 실패와 관계없이 로컬 세션은 종료한다.
    } finally {
      clearAuth();
      navigate("/login", { replace: true });
    }
  };

  // 현재 경로에 맞는 활성화된 메뉴 찾기
  const activeMenu = Object.entries(MENU_ROUTES).find(([, route]) => {
    if (route === "/home") return location.pathname === "/home";
    if (route.startsWith("/simulation")) return location.pathname.startsWith("/simulation");
    return location.pathname.startsWith(route);
  })?.[0] || "홈";

  return (
    <div className="min-h-screen bg-white">
      <Header 
        activeMenu={activeMenu} 
        onMenuClick={handleMenuClick} 
        onProfileClick={handleProfileClick}
        onLogoutClick={handleLogout}
      />
      <Outlet />
    </div>
  );
};

export default MainLayout;
