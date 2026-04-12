import svgPaths from "./svg-az73suwb4x";
import imgTestAccount from "figma:asset/e363996861873a0562908d3bcbb6dc6a5cbf8609.png";

function Icon() {
  return (
    <div className="h-[23.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[29.17%_8.33%_45.83%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
            <path d={svgPaths.pd61b900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.95833" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-10%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 12">
            <path d={svgPaths.pd8b8c80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.95833" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="relative rounded-[9.792px] shrink-0 size-[39.167px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(21, 93, 252) 0%, rgb(152, 16, 250) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[7.833px] px-[7.833px] relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="basis-0 grow h-[23.5px] min-h-px min-w-px relative shrink-0" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[23.5px] left-0 not-italic text-[#0f172b] text-[15.667px] text-nowrap top-[-1.96px] whitespace-pre">FinVest</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex gap-[11.75px] h-[39.167px] items-center left-0 top-0 w-[103.226px]" data-name="Container">
      <Container />
      <Heading />
    </div>
  );
}

function Button() {
  return (
    <div className="h-[23.5px] relative shrink-0 w-[15.667px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[23.5px] left-0 text-[#314158] text-[15.667px] text-nowrap top-[-1.96px] whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
          홈
        </p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="basis-0 grow h-[23.5px] min-h-px min-w-px relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[23.5px] left-0 text-[#314158] text-[15.667px] text-nowrap top-[-1.96px] whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
          투자 시뮬레이터
        </p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[23.5px] relative shrink-0 w-[83.841px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[23.5px] left-0 text-[#314158] text-[15.667px] text-nowrap top-[-1.96px] whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
          AI 투자 학습
        </p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[23.5px] relative shrink-0 w-[77.354px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[23.5px] left-0 text-[#0f172b] text-[15.667px] text-nowrap top-[-1.96px] whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>{`뉴스 & 토론`}</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[23.5px] relative shrink-0 w-[31.333px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[23.5px] left-0 text-[#0f172b] text-[15.667px] text-nowrap top-[-1.96px] whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
          챌린지
        </p>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="absolute content-stretch flex gap-[31.333px] h-[23.5px] items-center left-[141.42px] top-[7.64px] w-[441.604px]" data-name="Navigation">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function Input() {
  return (
    <div className="absolute bg-[#f3f3f5] h-[35.25px] left-[1089.81px] rounded-[7.833px] top-[1.96px] w-[250.667px]" data-name="Input">
      <div className="content-stretch flex items-center overflow-clip pl-[39.167px] pr-[11.75px] py-[3.917px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#717182] text-[13.708px] text-nowrap whitespace-pre">Search in site</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.979px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[7.833px]" />
    </div>
  );
}

function Depth4Frame1() {
  return (
    <div className="absolute bg-[#717182] left-[1406.23px] overflow-clip rounded-[17.478px] size-[34.956px] top-[2.26px]" data-name="Depth 4, Frame 3">
      <div className="absolute left-[-3.87px] size-[42.515px] top-[-4.11px]" data-name="Test Account">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgTestAccount} />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[11.75px] size-[15.667px] top-[9.79px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p387b5500} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.30556" />
          <path d={svgPaths.p1e582100} id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.30556" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[35.25px] left-[1089.81px] top-[1.96px] w-[250.667px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Depth6Frame() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Depth 6, Frame 0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute left-0 size-[17.478px] top-0" data-name="Vector - 0">
          <div className="absolute inset-[9.38%_12.51%_9.38%_12.5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 15">
              <path clipRule="evenodd" d={svgPaths.p29ab8970} fill="var(--fill-0, #717182)" fillRule="evenodd" id="Vector - 0" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Depth5Frame() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Depth 5, Frame 0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative w-full">
        <Depth6Frame />
      </div>
    </div>
  );
}

function Depth4Frame() {
  return (
    <div className="absolute bg-[#f3f3f5] content-stretch flex h-[34.956px] items-center justify-center left-[1357.78px] max-w-[419.4708251953125px] overflow-clip px-[8.739px] py-0 rounded-[6.991px] top-[2.26px]" data-name="Depth 4, Frame 1">
      <Depth5Frame />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[39.167px] relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Navigation />
      <Input />
      <Depth4Frame1 />
      <Container2 />
      <Depth4Frame />
    </div>
  );
}

function App() {
  return (
    <div className="bg-white h-[71.479px] relative shrink-0 w-full" data-name="App">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.979px] border-slate-200 border-solid inset-0 pointer-events-none shadow-[0px_0.979px_2.938px_0px_rgba(0,0,0,0.1),0px_0.979px_1.958px_-0.979px_rgba(0,0,0,0.1)]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start pb-[0.979px] pt-[15.667px] px-[23.5px] relative size-full">
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-0 size-[20px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_149_280)" id="Icon">
          <path d="M10 15.0003V4.16699" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p28aa85e0} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p9a1bdc0} id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pb8e0d00} id="Vector_4" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1c9a41c0} id="Vector_5" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1a5e9e00} id="Vector_6" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3bb16700} id="Vector_7" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p37916b80} id="Vector_8" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_149_280">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CardTitle() {
  return (
    <div className="absolute h-[20px] left-[25px] top-[25px] w-[944.656px]" data-name="CardTitle">
      <Icon2 />
      <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] left-[28px] text-[16px] text-neutral-950 text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
        AI 학습 인사이트
      </p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[24px] left-0 text-[#0f172b] text-[16px] text-nowrap top-[-2px] whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
        오늘의 AI 추천 학습
      </p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-0 text-[#314158] text-[14px] text-nowrap top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>{`최근 거래 패턴을 분석한 결과, "기술적 분석" 코스의 RSI와 MACD 강의를 학습하시면 투자 의사결정에 도움이 될 것으로 예상됩니다.`}</p>
    </div>
  );
}

function LearningPlatform() {
  return (
    <div className="bg-gradient-to-r from-[#eff6ff] h-[86px] relative rounded-[10px] shrink-0 to-[#faf5ff] w-full" data-name="LearningPlatform">
      <div aria-hidden="true" className="absolute border border-blue-100 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start pb-px pt-[17px] px-[17px] relative size-full">
          <Paragraph />
          <Paragraph1 />
        </div>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[24px] left-0 text-[#0f172b] text-[16px] text-nowrap top-[-2px] whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
        학습 성향 분석
      </p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-0 text-[#314158] text-[14px] text-nowrap top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
        당신은 이론보다 실전을 선호하는 학습 스타일입니다. 시뮬레이터에서 배운 내용을 바로 적용해보세요.
      </p>
    </div>
  );
}

function LearningPlatform1() {
  return (
    <div className="bg-gradient-to-r from-[#eff6ff] h-[86px] relative rounded-[10px] shrink-0 to-[#faf5ff] w-full" data-name="LearningPlatform">
      <div aria-hidden="true" className="absolute border border-blue-100 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start pb-px pt-[17px] px-[17px] relative size-full">
          <Paragraph2 />
          <Paragraph3 />
        </div>
      </div>
    </div>
  );
}

function CardContent() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[212px] items-start left-px px-[24px] py-0 top-[75px] w-[992.656px]" data-name="CardContent">
      <LearningPlatform />
      <LearningPlatform1 />
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white h-[288px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardTitle />
      <CardContent />
    </div>
  );
}

function CardTitle1() {
  return (
    <div className="absolute h-[16px] left-[24px] top-[24px] w-[944.656px]" data-name="CardTitle">
      <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] left-0 text-[16px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
        학습 코스
      </p>
    </div>
  );
}

function CardDescription() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[46px] w-[944.656px]" data-name="CardDescription">
      <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[24px] left-0 text-[#717182] text-[16px] text-nowrap top-[-2px] whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
        체계적인 투자 교육 프로그램
      </p>
    </div>
  );
}

function CardHeader() {
  return (
    <div className="absolute h-[70px] left-px top-px w-[992.656px]" data-name="CardHeader">
      <CardTitle1 />
      <CardDescription />
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-25%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 5">
            <path d={svgPaths.p184c5900} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[20px] top-[4px]" data-name="Container">
      <Icon3 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[60.922px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-0 text-[#0f172b] text-[14px] text-nowrap top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
          투자 기초
        </p>
      </div>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-green-100 h-[22px] relative rounded-[8px] shrink-0 w-[42px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#008236] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
          초급
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#b9f8cf] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0 w-full" data-name="Container">
      <Paragraph4 />
      <Badge />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-0 text-[#45556c] text-[14px] text-nowrap top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
        투자의 기본 개념과 용어를 배웁니다
      </p>
    </div>
  );
}

function PrimitiveDiv() {
  return (
    <div className="basis-0 bg-[#030213] grow h-[8px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Primitive.div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[16px] relative shrink-0 w-[29.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#45556c] text-[12px] top-[-1px] w-[30px]">100%</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[12px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <PrimitiveDiv />
      <Text />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[70px] items-start left-[36px] top-0 w-[876.656px]" data-name="Container">
      <Container5 />
      <Paragraph5 />
      <Container6 />
    </div>
  );
}

function LearningPlatform2() {
  return (
    <div className="absolute h-[70px] left-0 top-[16px] w-[912.656px]" data-name="LearningPlatform">
      <Container4 />
      <Container7 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[928.66px] size-[16px] top-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="h-[102px] relative rounded-[8px] shrink-0 w-full" data-name="Primitive.button">
      <LearningPlatform2 />
      <Icon4 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col h-[103px] items-start pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <PrimitiveButton />
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.p147ca400} fill="var(--fill-0, #BEDBFF)" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[20px] top-[4px]" data-name="Container">
      <Icon5 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[74.922px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-0 text-[#0f172b] text-[14px] text-nowrap top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
          기술적 분석
        </p>
      </div>
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-blue-100 h-[22px] relative rounded-[8px] shrink-0 w-[42px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#1447e6] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
          중급
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0 w-full" data-name="Container">
      <Paragraph6 />
      <Badge1 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-0 text-[#45556c] text-[14px] text-nowrap top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
        차트와 지표를 활용한 분석 방법
      </p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[16px] left-[853.39px] top-0 w-[23.266px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#45556c] text-[12px] top-[-1px] w-[24px]">65%</p>
    </div>
  );
}

function Container11() {
  return <div className="bg-[#030213] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv1() {
  return (
    <div className="absolute bg-[rgba(3,2,19,0.2)] content-stretch flex flex-col h-[8px] items-start left-0 overflow-clip pl-[-294.487px] pr-[294.487px] py-0 rounded-[3.35544e+07px] top-[4px] w-[841.391px]" data-name="Primitive.div">
      <Container11 />
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <Text1 />
      <PrimitiveDiv1 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[70px] items-start left-[36px] top-0 w-[876.656px]" data-name="Container">
      <Container10 />
      <Paragraph7 />
      <Container12 />
    </div>
  );
}

function LearningPlatform3() {
  return (
    <div className="absolute h-[70px] left-0 top-[16px] w-[912.656px]" data-name="LearningPlatform">
      <Container9 />
      <Container13 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[928.66px] size-[16px] top-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="h-[102px] relative rounded-[8px] shrink-0 w-full" data-name="Primitive.button">
      <LearningPlatform3 />
      <Icon6 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col h-[103px] items-start pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <PrimitiveButton1 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #CAD5E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[20px] top-[4px]" data-name="Container">
      <Icon7 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[88.922px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-0 text-[#0f172b] text-[14px] text-nowrap top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
          재무제표 분석
        </p>
      </div>
    </div>
  );
}

function Badge2() {
  return (
    <div className="bg-blue-100 h-[22px] relative rounded-[8px] shrink-0 w-[42px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#1447e6] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
          중급
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0 w-full" data-name="Container">
      <Paragraph8 />
      <Badge2 />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-0 text-[#45556c] text-[14px] text-nowrap top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
        기업의 재무 상태를 평가하는 방법
      </p>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute h-[16px] left-[860px] top-0 w-[16.656px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#45556c] text-[12px] top-[-1px] w-[17px]">0%</p>
    </div>
  );
}

function Container17() {
  return <div className="bg-[#030213] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv2() {
  return (
    <div className="absolute bg-[rgba(3,2,19,0.2)] content-stretch flex flex-col h-[8px] items-start left-0 overflow-clip pl-[-848px] pr-[848px] py-0 rounded-[3.35544e+07px] top-[4px] w-[848px]" data-name="Primitive.div">
      <Container17 />
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <Text2 />
      <PrimitiveDiv2 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[70px] items-start left-[36px] top-0 w-[876.656px]" data-name="Container">
      <Container16 />
      <Paragraph9 />
      <Container18 />
    </div>
  );
}

function LearningPlatform4() {
  return (
    <div className="absolute h-[70px] left-0 top-[16px] w-[912.656px]" data-name="LearningPlatform">
      <Container15 />
      <Container19 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-[928.66px] size-[16px] top-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="h-[102px] relative rounded-[8px] shrink-0 w-full" data-name="Primitive.button">
      <LearningPlatform4 />
      <Icon8 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col h-[103px] items-start pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <PrimitiveButton2 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #CAD5E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[20px] top-[4px]" data-name="Container">
      <Icon9 />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[102.922px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-0 text-[#0f172b] text-[14px] text-nowrap top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
          포트폴리오 관리
        </p>
      </div>
    </div>
  );
}

function Badge3() {
  return (
    <div className="bg-purple-100 h-[22px] relative rounded-[8px] shrink-0 w-[42px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#8200db] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
          고급
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e9d4ff] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0 w-full" data-name="Container">
      <Paragraph10 />
      <Badge3 />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-0 text-[#45556c] text-[14px] text-nowrap top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
        리스크 관리와 자산 배분 전략
      </p>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute h-[16px] left-[860px] top-0 w-[16.656px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#45556c] text-[12px] top-[-1px] w-[17px]">0%</p>
    </div>
  );
}

function Container23() {
  return <div className="bg-[#030213] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv3() {
  return (
    <div className="absolute bg-[rgba(3,2,19,0.2)] content-stretch flex flex-col h-[8px] items-start left-0 overflow-clip pl-[-848px] pr-[848px] py-0 rounded-[3.35544e+07px] top-[4px] w-[848px]" data-name="Primitive.div">
      <Container23 />
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <Text3 />
      <PrimitiveDiv3 />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[70px] items-start left-[36px] top-0 w-[876.656px]" data-name="Container">
      <Container22 />
      <Paragraph11 />
      <Container24 />
    </div>
  );
}

function LearningPlatform5() {
  return (
    <div className="absolute h-[70px] left-0 top-[16px] w-[912.656px]" data-name="LearningPlatform">
      <Container21 />
      <Container25 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute left-[928.66px] size-[16px] top-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton3() {
  return (
    <div className="h-[102px] relative rounded-[8px] shrink-0 w-full" data-name="Primitive.button">
      <LearningPlatform5 />
      <Icon10 />
    </div>
  );
}

function PrimitiveDiv4() {
  return (
    <div className="absolute content-stretch flex flex-col h-[411px] items-start left-[25px] top-[95px] w-[944.656px]" data-name="Primitive.div">
      <Container8 />
      <Container14 />
      <Container20 />
      <PrimitiveButton3 />
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white h-[531px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardHeader />
      <PrimitiveDiv4 />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[843px] items-start left-0 top-0 w-[994.656px]" data-name="Container">
      <Card />
      <Card1 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="absolute left-0 size-[20px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p61efc00} id="Vector" stroke="var(--stroke-0, #D08700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3f696780} id="Vector_2" stroke="var(--stroke-0, #D08700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function CardTitle2() {
  return (
    <div className="absolute h-[20px] left-[25px] top-[25px] w-[435.344px]" data-name="CardTitle">
      <Icon11 />
      <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] left-[28px] text-[16px] text-neutral-950 text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
        학습 통계
      </p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-0 text-[#45556c] text-[14px] text-nowrap top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
        완료한 강의
      </p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#0f172b] text-[16px] text-nowrap top-[-2px] whitespace-pre">8 / 13</p>
    </div>
  );
}

function Container27() {
  return <div className="bg-[#030213] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv5() {
  return (
    <div className="bg-[rgba(3,2,19,0.2)] content-stretch flex flex-col h-[8px] items-start overflow-clip pl-[-155.287px] pr-[155.287px] py-0 relative rounded-[3.35544e+07px] shrink-0 w-full" data-name="Primitive.div">
      <Container27 />
    </div>
  );
}

function LearningPlatform6() {
  return (
    <div className="bg-blue-50 h-[96px] relative rounded-[10px] shrink-0 w-full" data-name="LearningPlatform">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-start pb-0 pt-[16px] px-[16px] relative size-full">
          <Paragraph12 />
          <Paragraph13 />
          <PrimitiveDiv5 />
        </div>
      </div>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-0 text-[#45556c] text-[14px] text-nowrap top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
        총 학습 시간
      </p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[24px] left-0 text-[#0f172b] text-[16px] text-nowrap top-[-2px] whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
        3시간 45분
      </p>
    </div>
  );
}

function LearningPlatform7() {
  return (
    <div className="bg-green-50 h-[80px] relative rounded-[10px] shrink-0 w-full" data-name="LearningPlatform">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-start pb-0 pt-[16px] px-[16px] relative size-full">
          <Paragraph14 />
          <Paragraph15 />
        </div>
      </div>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-0 text-[#45556c] text-[14px] text-nowrap top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
        획득 경험치
      </p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#0f172b] text-[16px] text-nowrap top-[-2px] whitespace-pre">850 XP</p>
    </div>
  );
}

function LearningPlatform8() {
  return (
    <div className="bg-purple-50 h-[80px] relative rounded-[10px] shrink-0 w-full" data-name="LearningPlatform">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-start pb-0 pt-[16px] px-[16px] relative size-full">
          <Paragraph16 />
          <Paragraph17 />
        </div>
      </div>
    </div>
  );
}

function CardContent1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[312px] items-start left-px px-[24px] py-0 top-[75px] w-[483.344px]" data-name="CardContent">
      <LearningPlatform6 />
      <LearningPlatform7 />
      <LearningPlatform8 />
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-white h-[388px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardTitle2 />
      <CardContent1 />
    </div>
  );
}

function CardTitle3() {
  return (
    <div className="h-[16px] relative shrink-0 w-[435.344px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] left-0 text-[16px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre" style={{ fontVariationSettings: "'wght' 400" }}>
          획득 배지
        </p>
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[32px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[53.71%_29.17%_8.34%_29.18%]" data-name="Vector">
          <div className="absolute inset-[-10.98%_-10%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 15">
              <path d={svgPaths.p26bc9a40} id="Vector" stroke="var(--stroke-0, #D08700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[41.67%] left-1/4 right-1/4 top-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-8.33%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
              <path d={svgPaths.p1d3a5280} id="Vector" stroke="var(--stroke-0, #D08700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="h-[16px] relative shrink-0 w-[68.438px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="basis-0 font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#314158] text-[12px] text-center" style={{ fontVariationSettings: "'wght' 400" }}>
          첫 강의 완료
        </p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[80px] items-center left-0 px-0 py-[12px] rounded-[10px] top-0 w-[137.109px]" data-name="Container" style={{ backgroundImage: "linear-gradient(149.737deg, rgb(254, 252, 232) 0%, rgb(255, 247, 237) 100%)" }}>
      <Icon12 />
      <Paragraph18 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[32px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bottom-[12.5%] left-1/2 right-1/2 top-[29.17%]" data-name="Vector">
          <div className="absolute inset-[-7.14%_-1.33px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 22">
              <path d="M1.33333 1.33333V20" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[12.5%_8.33%]" data-name="Vector">
          <div className="absolute inset-[-5.56%_-5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 27">
              <path d={svgPaths.p3abf5f70} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="h-[16px] relative shrink-0 w-[64.219px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="basis-0 font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#314158] text-[12px] text-center" style={{ fontVariationSettings: "'wght' 400" }}>
          초급 마스터
        </p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[80px] items-center left-[149.11px] px-0 py-[12px] rounded-[10px] top-0 w-[137.109px]" data-name="Container" style={{ backgroundImage: "linear-gradient(149.737deg, rgb(239, 246, 255) 0%, rgb(236, 254, 255) 100%)" }}>
      <Icon13 />
      <Paragraph19 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[32px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[29.17%_8.33%_45.83%_66.67%]" data-name="Vector">
          <div className="absolute inset-[-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
              <path d={svgPaths.p3bd90b80} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[29.17%_8.33%]" data-name="Vector">
          <div className="absolute inset-[-10%_-5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 16">
              <path d={svgPaths.p18f5a1c0} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="h-[16px] relative shrink-0 w-[52.219px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="basis-0 font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#314158] text-[12px] text-center" style={{ fontVariationSettings: "'wght' 400" }}>
          연속 학습
        </p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[80px] items-center left-[298.22px] px-0 py-[12px] rounded-[10px] top-0 w-[137.109px]" data-name="Container" style={{ backgroundImage: "linear-gradient(149.737deg, rgb(240, 253, 244) 0%, rgb(236, 253, 245) 100%)" }}>
      <Icon14 />
      <Paragraph20 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[32px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[45.83%_12.5%_8.33%_12.5%]" data-name="Vector">
          <div className="absolute inset-[-9.09%_-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 18">
              <path d={svgPaths.p7c20080} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[8.33%_29.17%_54.17%_29.17%]" data-name="Vector">
          <div className="absolute inset-[-11.11%_-10%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 15">
              <path d={svgPaths.p1791a00} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="h-[16px] relative shrink-0 w-[36px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="basis-0 font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#62748e] text-[12px] text-center" style={{ fontVariationSettings: "'wght' 400" }}>
          미획득
        </p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute bg-slate-50 content-stretch flex flex-col gap-[8px] h-[80px] items-center left-0 opacity-50 px-0 py-[12px] rounded-[10px] top-[92px] w-[137.109px]" data-name="Container">
      <Icon15 />
      <Paragraph21 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[32px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[45.83%_12.5%_8.33%_12.5%]" data-name="Vector">
          <div className="absolute inset-[-9.09%_-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 18">
              <path d={svgPaths.p7c20080} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[8.33%_29.17%_54.17%_29.17%]" data-name="Vector">
          <div className="absolute inset-[-11.11%_-10%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 15">
              <path d={svgPaths.p1791a00} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="h-[16px] relative shrink-0 w-[36px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="basis-0 font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#62748e] text-[12px] text-center" style={{ fontVariationSettings: "'wght' 400" }}>
          미획득
        </p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute bg-slate-50 content-stretch flex flex-col gap-[8px] h-[80px] items-center left-[149.11px] opacity-50 px-0 py-[12px] rounded-[10px] top-[92px] w-[137.109px]" data-name="Container">
      <Icon16 />
      <Paragraph22 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[32px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[45.83%_12.5%_8.33%_12.5%]" data-name="Vector">
          <div className="absolute inset-[-9.09%_-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 18">
              <path d={svgPaths.p7c20080} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[8.33%_29.17%_54.17%_29.17%]" data-name="Vector">
          <div className="absolute inset-[-11.11%_-10%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 15">
              <path d={svgPaths.p1791a00} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="h-[16px] relative shrink-0 w-[36px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="basis-0 font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#62748e] text-[12px] text-center" style={{ fontVariationSettings: "'wght' 400" }}>
          미획득
        </p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute bg-slate-50 content-stretch flex flex-col gap-[8px] h-[80px] items-center left-[298.22px] opacity-50 px-0 py-[12px] rounded-[10px] top-[92px] w-[137.109px]" data-name="Container">
      <Icon17 />
      <Paragraph23 />
    </div>
  );
}

function LearningPlatform9() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[435.344px]" data-name="LearningPlatform">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container28 />
        <Container29 />
        <Container30 />
        <Container31 />
        <Container32 />
        <Container33 />
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="bg-white h-[268px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[30px] items-start pl-[25px] pr-px py-[25px] relative size-full">
          <CardTitle3 />
          <LearningPlatform9 />
        </div>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[843px] items-start left-[1018.66px] top-0 w-[485.344px]" data-name="Container">
      <Card2 />
      <Card3 />
    </div>
  );
}

function LearningPlatform10() {
  return (
    <div className="h-[843px] relative shrink-0 w-[1504px]" data-name="LearningPlatform">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container26 />
        <Container34 />
      </div>
    </div>
  );
}

function PrimitiveDiv6() {
  return (
    <div className="content-stretch flex flex-col h-[935px] items-start px-0 py-[25px] relative shrink-0 w-full" data-name="Primitive.div">
      <LearningPlatform10 />
    </div>
  );
}

function App1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[1063px] items-start left-0 pb-0 pt-[6px] px-[16px] top-0 w-[1536px]" data-name="App" style={{ backgroundImage: "linear-gradient(145.315deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)" }}>
      <App />
      <PrimitiveDiv6 />
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute h-[18px] left-0 top-[-20000px] w-[6.609px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[18px] left-0 not-italic text-[12px] text-neutral-950 text-nowrap top-[-1px] whitespace-pre">0</p>
    </div>
  );
}

export default function Ai() {
  return (
    <div className="bg-white relative size-full" data-name="AI 학습">
      <App1 />
      <Text4 />
    </div>
  );
}