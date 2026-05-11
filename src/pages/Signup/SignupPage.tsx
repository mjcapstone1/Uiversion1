import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button } from "@/components";
import UserIcon from "@/assets/svgs/UserIcon";
import LockIcon from "@/assets/svgs/LockIcon";
import EyeIcon from "@/assets/svgs/EyeIcon";
import CalendarIcon from "@/assets/svgs/CalendarIcon";
import BackIcon from "@/assets/svgs/BackIcon";
import EmailIcon from "@/assets/svgs/EmailIcon";
import { authApi } from "@/api/auth";
import type { SignupRequest } from "@/api/auth";
import { gamificationApi, type SquadItem } from "@/api/gamification";
import { SCHOOL_OPTIONS, searchSchools, type SchoolOption } from "@/api/schools";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/utils/cn";

// Steps
import StockStep from "./steps/StockStep";
import InvestmentStyleStep from "./steps/InvestmentStyleStep";
import CompletionStep from "./steps/CompletionStep";
import PasswordStrength from "./components/PasswordStrength";
import type { StyleType } from "./components/StyleCard";

type SignupStep = "info" | "onboarding_stock" | "onboarding_style" | "complete";

type SignupErrorResponse = {
  message?: string;
  fieldErrors?: Array<{
    field: keyof SignupRequest | "passwordConfirm";
    message: string;
  }>;
};

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const setTokens = useAuthStore((state) => state.setTokens);

  const [currentStep, setCurrentStep] = useState<SignupStep>("info");

  const [formData, setFormData] = useState<SignupRequest>({
    password: "",
    name: "",
    nickname: "",
    email: "",
    birthDate: "",
    phoneNumber: "",
  });

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  // Onboarding Data
  const [school, setSchool] = useState("");
  const [schoolOptions, setSchoolOptions] = useState<SchoolOption[]>(SCHOOL_OPTIONS);
  const [schoolError, setSchoolError] = useState<string | undefined>();
  const [schoolMenuOpen, setSchoolMenuOpen] = useState(false);
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<StyleType | null>(null);

  // Validation States
  const [errors, setErrors] = useState<Partial<Record<keyof SignupRequest | "passwordConfirm", string>>>({});

  const passwordStrength = useMemo(() => {
    let score = 0;
    if (!formData.password) return 0;
    if (formData.password.length >= 8) score += 2;
    if (/[A-Z]/.test(formData.password)) score += 1;
    if (/[0-9]/.test(formData.password)) score += 1;
    if (/[^A-Za-z0-9]/.test(formData.password)) score += 1;
    return Math.min(score, 5) as 0 | 1 | 2 | 3 | 4 | 5;
  }, [formData.password]);

  const schoolSearchResults = useMemo(() => searchSchools(school, schoolOptions), [school, schoolOptions]);
  const hasExactSchoolMatch = useMemo(
    () => schoolOptions.some((option) => option.name === school.trim()),
    [school, schoolOptions],
  );

  useEffect(() => {
    let cancelled = false;

    gamificationApi.getSquads()
      .then((squads: SquadItem[]) => {
        if (cancelled || squads.length === 0) return;

        setSchoolOptions(
          squads.map((squad) => ({
            name: squad.squadName,
            region: squad.region ?? "지역 미정",
            type: "대학교",
          }))
        );
      })
      .catch(() => {
        if (!cancelled) setSchoolOptions(SCHOOL_OPTIONS);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const validateInfo = () => {
    const newErrors: typeof errors = {};
    if ((formData.password?.length || 0) < 8) {
      newErrors.password = "비밀번호는 최소 8자 이상이어야 합니다";
    }
    if (formData.password !== passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다";
    }
    
    if (!/^[A-Z a-z가-힣]{2,10}$/.test(formData.name || "")) {
      newErrors.name = "이름은 2자 이상의 한글 완성형 또는 영문만 입력해주세요";
    }
    if (!/^[A-Za-z0-9가-힣]{2,10}$/.test(formData.nickname || "")) {
      newErrors.nickname = "닉네임은 2-10자의 한글, 영문, 숫자만 입력해주세요";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email || "")) {
      newErrors.email = "올바른 이메일 형식이 아닙니다 (@포함)";
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.birthDate || "")) {
      newErrors.birthDate = "올바른 생년월일 형식이 아닙니다 (YYYY-MM-DD)";
    }
    if (!/^\d{3}-\d{3,4}-\d{4}$/.test(formData.phoneNumber || "")) {
      newErrors.phoneNumber = "올바른 휴대폰 번호 형식이 아닙니다 (010-0000-0000)";
    }
    if (!school.trim()) {
      setSchoolError("학교를 선택하거나 입력해주세요");
    } else {
      setSchoolError(undefined);
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && Boolean(school.trim());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleInitialSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreements.terms || !agreements.privacy) {
      alert("필수 약관에 동의해주세요.");
      return;
    }

    if (!validateInfo()) return;

    try {
      // API 요청 데이터 준비
      const signupData: SignupRequest = {
        ...formData,
        nickname: formData.nickname || formData.name,
        phoneNumber: formData.phoneNumber,
        schoolName: school.trim(),
      };

      console.log("Submitting signup data:", signupData);

      const response = await authApi.signup(signupData);
      
      localStorage.setItem("schoolName", school.trim());
      setTokens(response.data.tokens);
      setCurrentStep("onboarding_stock");
    } catch (error: unknown) {
      const serverError = axios.isAxiosError<SignupErrorResponse>(error) ? error.response?.data : undefined;
      console.error("Signup failed details:", serverError);

      let errorMessage = serverError?.message || "회원가입에 실패했습니다.";
      
      // 상세 필드 에러가 있는 경우 첫 번째 에러 메시지를 표시
      if (serverError?.fieldErrors && serverError.fieldErrors.length > 0) {
        const firstError = serverError.fieldErrors[0];
        errorMessage = `${firstError.message} (${firstError.field})`;
        
        // 해당 필드에 에러 상태 표시
        setErrors(prev => ({
          ...prev,
          [firstError.field]: firstError.message
        }));
      }
      
      alert(errorMessage);
    }
  };

  const completeOnboarding = () => {
    localStorage.setItem("schoolName", school.trim());
    localStorage.setItem("favoriteStocks", JSON.stringify(selectedStocks));
    if (selectedStyle) localStorage.setItem("signupInvestmentStyle", selectedStyle);
    setCurrentStep("complete");
  };

  const renderProgress = (stepIdx: number) => (
    <div className="content-stretch flex flex-col items-start px-[122px] py-0 relative shrink-0 w-full mb-[30px]">
      <div className="h-[4px] relative shrink-0 w-full bg-[#eaebed]" />
      <div 
        className="h-[4px] relative shrink-0 bg-[#42d6ba] transition-all duration-300" 
        style={{ width: `${(stepIdx / 2) * 100}%`, marginTop: "-4px" }}
      />
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case "info":
        return (
          <form onSubmit={handleInitialSignup} className="px-[52px] flex flex-col gap-[4px]">
            <TextField
              label="이메일"
              name="email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={formData.email}
              onChange={handleChange}
              leftIcon={<EmailIcon className="size-[24px] text-gray-400" />}
              errorMessage={errors.email}
              successMessage={formData.email && !errors.email ? "올바른 이메일입니다" : undefined}
            />

            <div className="flex flex-col gap-2">
              <TextField
                label="비밀번호"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="8자 이상 입력"
                value={formData.password}
                onChange={handleChange}
                leftIcon={<LockIcon className="size-[24px] text-gray-400" />}
                rightIcon={<EyeIcon />}
                onRightIconClick={() => setShowPassword(!showPassword)}
                errorMessage={errors.password}
              />
              {formData.password && <PasswordStrength strength={passwordStrength} />}
            </div>
            <TextField
              label="비밀번호 확인"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호 재입력"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              leftIcon={<LockIcon className="size-[24px] text-gray-400" />}
              rightIcon={<EyeIcon />}
              onRightIconClick={() => setShowPassword(!showPassword)}
              errorMessage={errors.passwordConfirm}
              successMessage={passwordConfirm && formData.password === passwordConfirm ? "비밀번호가 일치합니다" : undefined}
            />

            <TextField
              label="이름"
              name="name"
              placeholder="홍길동"
              value={formData.name}
              onChange={handleChange}
              leftIcon={<UserIcon className="size-[24px] text-gray-400" />}
              errorMessage={errors.name}
              successMessage={formData.name && !errors.name ? "올바른 이름입니다" : undefined}
            />

            <TextField
              label="닉네임"
              name="nickname"
              placeholder="사용하실 닉네임을 입력하세요"
              value={formData.nickname}
              onChange={handleChange}
              leftIcon={<UserIcon className="size-[24px] text-gray-400" />}
              errorMessage={errors.nickname}
              successMessage={formData.nickname && !errors.nickname ? "사용 가능한 닉네임입니다" : undefined}
            />

            <TextField
              label="생년월일"
              name="birthDate"
              placeholder="YYYY-MM-DD"
              value={formData.birthDate}
              onChange={handleChange}
              leftIcon={<CalendarIcon className="size-[24px] text-gray-400" />}
              errorMessage={errors.birthDate}
              successMessage={formData.birthDate && !errors.birthDate ? "올바른 생년월일입니다" : undefined}
            />

            <TextField
              label="휴대폰 번호"
              name="phoneNumber"
              placeholder="010-0000-0000"
              value={formData.phoneNumber}
              onChange={handleChange}
              leftIcon={<UserIcon className="size-[24px] text-gray-400" />}
              errorMessage={errors.phoneNumber}
            />

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-normal text-black">학교</label>
              <div className="relative">
                <input
                  type="text"
                  role="combobox"
                  aria-expanded={schoolMenuOpen}
                  placeholder="학교명 또는 지역으로 검색"
                  value={school}
                  onFocus={() => setSchoolMenuOpen(true)}
                  onBlur={() => {
                    window.setTimeout(() => setSchoolMenuOpen(false), 120);
                  }}
                  onChange={(event) => {
                    setSchool(event.target.value);
                    setSchoolMenuOpen(true);
                    if (schoolError) setSchoolError(undefined);
                  }}
                  className={cn(
                    "h-[48px] w-full rounded-[4px] border border-[#d9d9d9] bg-white px-4 pr-11 text-[14px] text-black outline-none placeholder:text-gray-400 focus:border-[#42d6ba] focus:ring-1 focus:ring-[#42d6ba]",
                    schoolError && "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                />
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => setSchoolMenuOpen((open) => !open)}
                  className="absolute right-3 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded text-[#747474] hover:bg-gray-100"
                  aria-label="학교 목록 열기"
                >
                  <span className={cn("text-[12px] transition-transform", schoolMenuOpen && "rotate-180")}>▼</span>
                </button>
                {schoolMenuOpen && (
                  <div className="absolute left-0 right-0 top-[52px] z-20 max-h-[240px] overflow-y-auto rounded-[8px] border border-[#d9d9d9] bg-white py-1 shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
                    {schoolSearchResults.length > 0 ? (
                      schoolSearchResults.map((option) => (
                        <button
                          key={`${option.name}-${option.region}`}
                          type="button"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => {
                            setSchool(option.name);
                            setSchoolError(undefined);
                            setSchoolMenuOpen(false);
                          }}
                          className={cn(
                            "flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-[14px] transition-colors hover:bg-[#f2fffc]",
                            school === option.name && "bg-[#f2fffc]"
                          )}
                        >
                          <span className="font-medium text-[#1D1E20]">{option.name}</span>
                          <span className="shrink-0 text-[12px] text-[#909193]">
                            {option.region} · {option.type}
                          </span>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-[13px] text-[#909193]">검색 결과가 없습니다.</div>
                    )}
                    {school.trim() && !hasExactSchoolMatch && (
                      <button
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => {
                          setSchool(school.trim());
                          setSchoolError(undefined);
                          setSchoolMenuOpen(false);
                        }}
                        className="flex w-full items-center justify-between gap-3 border-t border-gray-100 px-4 py-3 text-left text-[14px] hover:bg-[#f8fffd]"
                      >
                        <span className="font-medium text-[#1D1E20]">"{school.trim()}" 직접 입력으로 사용</span>
                        <span className="text-[12px] text-[#42d6ba]">직접입력</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
              {schoolError ? (
                <p className="text-[12px] text-red-500">{schoolError}</p>
              ) : (
                <p className="text-[12px] text-gray-400">학교명/지역으로 검색하거나 목록에 없으면 직접 입력할 수 있습니다.</p>
              )}
            </div>

            <div className="mt-4 bg-gray-100 rounded-lg p-2 flex flex-col gap-1">
              <label className="flex items-center gap-2 p-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={agreements.terms}
                  onChange={(e) => setAgreements(prev => ({ ...prev, terms: e.target.checked }))}
                  className="size-4 rounded border-gray-300 accent-[#42d6ba]"
                />
                <span className="text-[14px] text-black"><span className="text-red-500">*</span> 이용약관에 동의합니다</span>
              </label>
              <label className="flex items-center gap-2 p-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={agreements.privacy}
                  onChange={(e) => setAgreements(prev => ({ ...prev, privacy: e.target.checked }))}
                  className="size-4 rounded border-gray-300 accent-[#42d6ba]"
                />
                <span className="text-[14px] text-black"><span className="text-red-500">*</span> 개인정보처리방침에 동의합니다</span>
              </label>
              <label className="flex items-center gap-2 p-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={agreements.marketing}
                  onChange={(e) => setAgreements(prev => ({ ...prev, marketing: e.target.checked }))}
                  className="size-4 rounded border-gray-300 accent-[#42d6ba]"
                />
                <span className="text-[14px] text-gray-500">마케팅 정보 수신에 동의합니다 (선택)</span>
              </label>
            </div>

            <div className="py-6 flex flex-col gap-3">
              <Button 
                type="submit"
                className="w-full bg-[#42d6ba] border-none py-3 text-white font-light rounded-[4px]"
              >
                가입하기
              </Button>
              <div className="flex items-center justify-center gap-4 py-1">
                <span className="text-[14px] font-light text-black">이미 계정이 있으신가요?</span>
                <button 
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-[16px] font-normal text-black hover:underline"
                >
                  로그인하기
                </button>
              </div>
            </div>
          </form>
        );

      case "onboarding_stock":
        return (
          <>
            <div className="flex gap-[19px] items-center px-[122px] pb-[20px]">
              <div className="bg-[#42d6ba] p-[8px] rounded-[8px] flex items-center justify-center">
                <UserIcon className="size-[26px] text-white" />
              </div>
              <div>
                <h1 className="text-[20px] font-medium text-black leading-[25px]">개인화 설정</h1>
                <p className="text-[12px] font-light text-[#747474] leading-[17px]">맞춤 투자 정보를 위한 설정 (1/2)</p>
              </div>
            </div>
            {renderProgress(1)}
            <StockStep 
              selectedStocks={selectedStocks}
              onToggleStock={(stock) => {
                setSelectedStocks(prev => 
                  prev.includes(stock) ? prev.filter(s => s !== stock) : [...prev, stock].slice(0, 3)
                );
              }}
              onNext={() => setCurrentStep("onboarding_style")}
              onPrev={() => setCurrentStep("info")}
            />
          </>
        );

      case "onboarding_style":
        return (
          <>
            <div className="flex gap-[19px] items-center px-[122px] pb-[20px]">
              <div className="bg-[#42d6ba] p-[8px] rounded-[8px] flex items-center justify-center">
                <UserIcon className="size-[26px] text-white" />
              </div>
              <div>
                <h1 className="text-[20px] font-medium text-black leading-[25px]">개인화 설정</h1>
                <p className="text-[12px] font-light text-[#747474] leading-[17px]">맞춤 투자 정보를 위한 설정 (2/2)</p>
              </div>
            </div>
            {renderProgress(2)}
            <InvestmentStyleStep 
              selectedStyle={selectedStyle}
              onSelect={setSelectedStyle}
              onNext={completeOnboarding}
              onPrev={() => setCurrentStep("onboarding_stock")}
            />
          </>
        );

      case "complete":
        return <CompletionStep onComplete={() => navigate("/ai-learning")} />;
      
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 font-noto">
      <div className={cn(
        "bg-white rounded-lg shadow-[0px_5px_15px_0px_rgba(0,0,0,0.25)] overflow-hidden transition-all duration-300",
        currentStep === "info" ? "w-full max-w-[535px]" : "w-full max-w-[910px] py-[60px]"
      )}>
        {currentStep === "info" && (
          <div className="p-[20px] flex flex-col gap-[24px]">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-[20px] text-black hover:opacity-70 transition-opacity"
            >
              <BackIcon className="size-4" />
              <span className="text-[16px]">뒤로</span>
            </button>

            <div className="flex items-center gap-[19px] px-[32px]">
              <div className="bg-[#42d6ba] p-[8px] rounded-[8px]">
                <UserIcon className="size-[26px] text-white" />
              </div>
              <div>
                <h1 className="text-[20px] font-medium text-black">회원가입</h1>
                <p className="text-[12px] font-light text-gray-400">FinVest 계정을 만들어보세요</p>
              </div>
            </div>
          </div>
        )}

        {renderStep()}
      </div>
    </div>
  );
};

export default SignupPage;
