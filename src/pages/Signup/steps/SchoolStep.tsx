import React from "react";
import { cn } from "@/utils/cn";

interface SchoolStepProps {
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

const schoolSuggestions = [
  "서울대학교",
  "연세대학교",
  "고려대학교",
  "성균관대학교",
  "한양대학교",
  "중앙대학교",
  "경희대학교",
  "건국대학교",
];

const SchoolStep: React.FC<SchoolStepProps> = ({ value, error, onChange, onNext }) => {
  const filteredSuggestions = schoolSuggestions.filter((school) => (
    !value.trim() || school.includes(value.trim())
  ));

  return (
    <div className="flex flex-col gap-[30px] w-full font-noto">
      <div className="flex flex-col gap-[2px]">
        <div className="px-[122px] pt-[22px]">
          <label className="block text-[16px] font-normal text-black mb-[12px]">학교</label>
          <input
            type="text"
            placeholder="예: 서울대학교"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              "w-full bg-[#eaebed] border border-[#c7c7c9] rounded-[8px] px-[28px] py-[16px] text-[14px] font-light text-black placeholder:text-[#c7c7c9] focus:outline-none",
              error && "border-red-500"
            )}
          />
          {error && <p className="mt-2 text-[12px] text-red-500">{error}</p>}
          <div className="mt-3 flex flex-wrap gap-2">
            {filteredSuggestions.map((schoolName) => (
              <button
                key={schoolName}
                type="button"
                onClick={() => onChange(schoolName)}
                className="rounded-full border border-[#42d6ba]/40 bg-[#42d6ba]/10 px-3 py-1.5 text-[12px] font-light text-[#1D1E20] hover:bg-[#42d6ba]/20"
              >
                {schoolName}
              </button>
            ))}
          </div>
        </div>
        <div className="px-[122px] py-[10px]">
          <p className="text-[12px] font-light text-black">
            챌린지에서 학교별 랭킹과 팀 활동에 사용할 학교를 선택해주세요
          </p>
        </div>
      </div>
      <div className="px-[122px] w-full py-[10px]">
        <button
          type="button"
          onClick={onNext}
          className="w-full bg-[#42d6ba] py-[8px] text-white text-[16px] font-light rounded-[4px] flex items-center justify-center gap-[20px] hover:opacity-90 transition-opacity"
        >
          <span>다음</span>
          <span>&gt;</span>
        </button>
      </div>
    </div>
  );
};

export default SchoolStep;
