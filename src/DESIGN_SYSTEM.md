# FinVest 디자인 시스템 가이드

> 피그마 컴포넌트 제작을 위한 상세 스펙 문서

---

## 🎨 1. 색상 팔레트 (Color Palette)

### Primary Colors (주요 색상)
```
Blue 600 (Primary): #3B82F6 (Lighter)
  - 용도: 주요 버튼, 활성 탭, 링크
  - RGB: 59, 130, 246
  - 그림자: 0 10px 25px rgba(59, 130, 246, 0.3)

Blue 500: #4E91FF
  - 용도: 그라디언트, 아이콘
  - RGB: 78, 145, 255

Blue 100: #F0F7FF
  - 용도: 배지, 라벨 배경
  - RGB: 240, 247, 255

Blue 50: #F8FAFF
  - 용도: 호버 배경, 하이라이트
  - RGB: 248, 250, 255
```

### Success Colors (성공/상승)
```
Emerald 700: #047857
  - 용도: 상승 텍스트
  - RGB: 4, 120, 87

Emerald 600: #059669
  - 용도: 상승 아이콘
  - RGB: 5, 150, 105

Emerald 100: #D1FAE5
  - 용도: 상승 배경
  - RGB: 209, 250, 229
```

### Error Colors (에러/하락)
```
Red 700: #B91C1C
  - 용도: 하락 텍스트
  - RGB: 185, 28, 28

Red 600: #DC2626
  - 용도: 하락 아이콘
  - RGB: 220, 38, 38

Red 100: #FEE2E2
  - 용도: 하락 배경
  - RGB: 254, 226, 226

Red 500: #EF4444
  - 용도: Hot 배지
  - RGB: 239, 68, 68
```

### Neutral Colors (중립 색상)
```
White: #FFFFFF
  - 용도: 카드 배경, 주요 배경
  - RGB: 255, 255, 255

Gray 900: #111827
  - 용도: 주요 텍스트, 헤딩
  - RGB: 17, 24, 39

Gray 700: #374151
  - 용도: 보조 텍스트
  - RGB: 55, 65, 81

Gray 600: #4B5563
  - 용도: 비활성 텍스트
  - RGB: 75, 85, 99

Gray 500: #6B7280
  - 용도: Placeholder, 캡션
  - RGB: 107, 114, 128

Gray 200: #E5E7EB
  - 용도: 테두리, 구분선
  - RGB: 229, 231, 235

Gray 100: #F3F4F6
  - 용도: 비활성 버튼 배경
  - RGB: 243, 244, 246

Gray 50: #F9FAFB
  - 용도: 섹션 배경
  - RGB: 249, 250, 251
```

### Accent Colors (강조 색상)
```
Purple 600: #7C3AED
  - 용도: 보라색 강조
  - RGB: 124, 58, 237

Purple 100: #EDE9FE
  - 용도: 보라색 배경
  - RGB: 237, 233, 254

Amber 500: #F59E0B
  - 용도: 즐겨찾기 별
  - RGB: 245, 158, 11

Orange 600: #EA580C
  - 용도: 오렌지 강조
  - RGB: 234, 88, 12
```

### Background Gradients (배경 그라디언트)
```
Main Background:
  - Type: Linear Gradient
  - Angle: 135deg (bottom-left to top-right)
  - Stop 1: #EFF6FF (Blue 50) at 0%
  - Stop 2: #FFFFFF (White) at 50%
  - Stop 3: #FAF5FF (Purple 50) at 100%

Button Gradient (Blue):
  - Type: Linear Gradient
  - Angle: 180deg (top to bottom)
  - Stop 1: #3B82F6 (Blue 500) at 0%
  - Stop 2: #2563EB (Blue 600) at 100%

Card Gradient (Subtle):
  - Type: Linear Gradient
  - Angle: 135deg
  - Stop 1: #F9FAFB (Gray 50) at 0%
  - Stop 2: #FFFFFF (White) at 100%
```

---

## 📝 2. 타이포그래피 (Typography)

### Font Family
```
Primary: 'Noto Sans KR', sans-serif
  - 모든 한글 텍스트에 사용
  - Font weights: 400 (Regular), 500 (Medium), 700 (Bold)
```

### Heading Styles
```
H1 (Page Title):
  - Font Size: 30px (1.875rem)
  - Line Height: 36px (1.2)
  - Font Weight: 700 (Bold)
  - Color: Gray 900 (#111827)
  - Letter Spacing: -0.3px

H2 (Section Title):
  - Font Size: 20px (1.25rem)
  - Line Height: 28px (1.4)
  - Font Weight: 700 (Bold)
  - Color: Gray 900 (#111827)
  - Letter Spacing: -0.2px

H3 (Card Title):
  - Font Size: 18px (1.125rem)
  - Line Height: 26px (1.44)
  - Font Weight: 700 (Bold)
  - Color: Gray 900 (#111827)
  - Letter Spacing: -0.18px

H4 (Subsection):
  - Font Size: 16px (1rem)
  - Line Height: 24px (1.5)
  - Font Weight: 700 (Bold)
  - Color: Gray 900 (#111827)
```

### Body Text
```
Body Large:
  - Font Size: 16px (1rem)
  - Line Height: 24px (1.5)
  - Font Weight: 400 (Regular)
  - Color: Gray 700 (#374151)

Body Regular:
  - Font Size: 14px (0.875rem)
  - Line Height: 20px (1.43)
  - Font Weight: 400 (Regular)
  - Color: Gray 700 (#374151)

Body Medium (Emphasized):
  - Font Size: 14px (0.875rem)
  - Line Height: 20px (1.43)
  - Font Weight: 500 (Medium)
  - Color: Gray 900 (#111827)

Body Small:
  - Font Size: 12px (0.75rem)
  - Line Height: 16px (1.33)
  - Font Weight: 400 (Regular)
  - Color: Gray 600 (#4B5563)

Caption:
  - Font Size: 10px (0.625rem)
  - Line Height: 14px (1.4)
  - Font Weight: 400 (Regular)
  - Color: Gray 500 (#6B7280)
```

### Number/Price Display
```
Large Number (Index Value):
  - Font Size: 32px (2rem)
  - Line Height: 40px (1.25)
  - Font Weight: 700 (Bold)
  - Color: Gray 900 (#111827)

Medium Number (Stock Price):
  - Font Size: 24px (1.5rem)
  - Line Height: 32px (1.33)
  - Font Weight: 700 (Bold)
  - Color: Gray 900 (#111827)

Small Number (Change):
  - Font Size: 14px (0.875rem)
  - Line Height: 20px (1.43)
  - Font Weight: 500 (Medium)
  - Color: Emerald 600 or Red 600
```

---

## 📏 3. 간격 시스템 (Spacing)

### Scale (8px base unit)
```
xs: 4px (0.25rem)
sm: 8px (0.5rem)
md: 12px (0.75rem)
lg: 16px (1rem)
xl: 24px (1.5rem)
2xl: 32px (2rem)
3xl: 48px (3rem)
4xl: 64px (4rem)
```

### Common Spacing Patterns
```
Card Padding: 24px (xl)
Section Padding: 32px (2xl)
Container Padding: 32px horizontal (2xl)
Item Gap (Grid): 24px (xl)
Button Padding: 12px vertical, 24px horizontal
Input Padding: 12px vertical, 16px horizontal
Icon-Text Gap: 8px (sm)
List Item Padding: 16px vertical, 24px horizontal
```

---

## 🔲 4. Border Radius (모서리 둥글기)

```
Small (Badges, Tags): 9999px (pill shape)
  - 사용: 배지, 라벨

Medium (Buttons, Inputs): 12px (0.75rem)
  - 사용: 버튼, 인풋 필드, 작은 카드

Large (Cards): 16px (1rem)
  - 사용: 주요 카드 컴포넌트

Extra Large (Main Cards): 24px (1.5rem)
  - 사용: 대형 카드, 모달

Circle (Icons, Avatars): 50% or 9999px
  - 사용: 아바타, 아이콘 컨테이너
```

---

## 🌫️ 5. Shadow System (그림자)

```
Small (Subtle):
  - Box Shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
  - 용도: 카드 기본 상태

Medium (Cards):
  - Box Shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
                0 2px 4px -1px rgba(0, 0, 0, 0.06)
  - 용도: 카드 호버 상태

Large (Modals):
  - Box Shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
                0 10px 10px -5px rgba(0, 0, 0, 0.04)
  - 용도: 모달, 드롭다운

Blue Glow (Primary Button):
  - Box Shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.3)
  - 용도: 활성 버튼, 강조 요소

Purple Glow (Accent):
  - Box Shadow: 0 10px 25px -5px rgba(124, 58, 237, 0.3)
  - 용도: 보라색 강조 카드
```

---

## 🧩 6. 컴포넌트 스펙 (Component Specifications)

### 6.1 Button Components

#### Primary Button (활성)
```
Size: Variable width × 48px height
Padding: 12px vertical, 24px horizontal
Background: Linear Gradient (Blue 600 to Blue 700)
Text: 14px, Medium (500), White
Border Radius: 12px
Shadow: 0 10px 25px rgba(37, 99, 235, 0.3)

States:
- Hover: Background darker, Shadow stronger
- Active: Scale 0.98
- Disabled: Opacity 0.5, Cursor not-allowed
```

#### Secondary Button (비활성)
```
Size: Variable width × 48px height
Padding: 12px vertical, 24px horizontal
Background: Gray 100 (#F3F4F6)
Text: 14px, Medium (500), Gray 600
Border Radius: 12px
Border: 1px solid Gray 200

States:
- Hover: Background Gray 200
- Active: Background Gray 300
```

#### Icon Button
```
Size: 40px × 40px
Padding: 10px
Background: Transparent
Border Radius: 12px

States:
- Hover: Background Gray 100
- Active: Background Gray 200
```

### 6.2 Tab Components

#### Tab Button (활성)
```
Size: Auto width × 40px height
Padding: 8px vertical, 16px horizontal
Background: Blue 600
Text: 14px, Medium (500), White
Border Radius: 12px
Shadow: 0 10px 25px rgba(37, 99, 235, 0.3)
Icon: 16px × 16px, White
Gap: 8px between icon and text
```

#### Tab Button (비활성)
```
Size: Auto width × 40px height
Padding: 8px vertical, 16px horizontal
Background: Gray 100
Text: 14px, Medium (500), Gray 600
Border Radius: 12px
Icon: 16px × 16px, Gray 600

States:
- Hover: Background Gray 200
```

### 6.3 Card Components

#### Main Card (화이트 카드)
```
Size: Variable
Padding: 24px
Background: White (#FFFFFF)
Border: 1px solid Gray 200 (#E5E7EB)
Border Radius: 16px
Shadow: 0 1px 2px rgba(0, 0, 0, 0.05)

States:
- Hover: Shadow 0 4px 6px rgba(0, 0, 0, 0.1)
- Active: Border Blue 300
```

#### Gradient Card (지수 카드)
```
Size: Variable
Padding: 24px
Background: Linear Gradient (Gray 50 to White, 135deg)
Border: 1px solid Gray 200
Border Radius: 12px
Shadow: 0 1px 2px rgba(0, 0, 0, 0.05)

States:
- Hover: Shadow 0 4px 6px rgba(0, 0, 0, 0.1)
```

#### Stat Card (통계 카드)
```
Size: Variable
Padding: 24px
Background: White
Border: 1px solid Gray 200
Border Radius: 16px
Shadow: 0 1px 2px rgba(0, 0, 0, 0.05)

Content Structure:
- Label: 14px, Regular, Gray 600
- Value: 32px, Bold, Gray 900
- Change: 14px, Medium, Emerald/Red 600
```

### 6.4 List Item Components

#### Stock List Item
```
Size: Full width × 72px height
Padding: 16px vertical, 24px horizontal
Background: White
Border Bottom: 1px solid Gray 100

Layout:
- Left: Rank Badge (40px × 40px) + Name & Code
- Right: Price & Volume + Change Badge

States:
- Hover: Background Blue 50
- Active: Background Blue 100
```

#### Rank Badge
```
Size: 40px × 40px
Background: Linear Gradient (Blue 500 to Blue 600)
Text: 14px, Bold, White
Border Radius: 12px
Shadow: 0 2px 4px rgba(37, 99, 235, 0.2)

States:
- Hover: Shadow stronger
```

#### Change Badge (상승)
```
Size: Auto width × 32px height
Padding: 6px vertical, 12px horizontal
Background: Emerald 100 (#D1FAE5)
Text: 14px, Medium, Emerald 700
Border Radius: 8px
Icon: 16px × 16px, Emerald 600
Gap: 4px between icon and text
```

#### Change Badge (하락)
```
Size: Auto width × 32px height
Padding: 6px vertical, 12px horizontal
Background: Red 100 (#FEE2E2)
Text: 14px, Medium, Red 700
Border Radius: 8px
Icon: 16px × 16px, Red 600
Gap: 4px between icon and text
```

### 6.5 Input Components

#### Search Input
```
Size: Variable width × 48px height
Padding: 12px vertical, 16px horizontal, 48px left (for icon)
Background: White
Border: 1px solid Gray 300
Border Radius: 12px
Text: 14px, Regular, Gray 900
Placeholder: 14px, Regular, Gray 500

Icon:
- Position: Absolute left 16px
- Size: 20px × 20px
- Color: Gray 400

States:
- Focus: Border Blue 500, Ring 2px Blue 100
- Hover: Border Gray 400
```

### 6.6 Badge Components

#### Category Badge
```
Size: Auto width × 20px height
Padding: 2px vertical, 8px horizontal
Background: Blue 100
Text: 10px, Medium, Blue 700
Border Radius: 9999px (pill)
```

#### Hot Badge
```
Size: Auto width × 20px height
Padding: 2px vertical, 8px horizontal
Background: Red 100
Text: 10px, Medium, Red 700
Border Radius: 9999px (pill)
Icon: 12px × 12px Flame, Red 700
Gap: 4px
```

#### Level Badge (초급/중급/고급)
```
초급:
- Background: Emerald 100
- Text: Emerald 700
- Border: 1px Emerald 200

중급:
- Background: Blue 100
- Text: Blue 700
- Border: 1px Blue 200

고급:
- Background: Purple 100
- Text: Purple 700
- Border: 1px Purple 200

Size: Auto width × 24px height
Padding: 4px vertical, 8px horizontal
Text: 12px, Medium
Border Radius: 9999px
```

### 6.7 Header Component

#### Header Container
```
Size: Full width × 72px height
Padding: 16px vertical, 32px horizontal
Background: White (#FFFFFF)
Border Bottom: 1px solid Gray 200
Shadow: 0 1px 2px rgba(0, 0, 0, 0.05)
Position: Sticky top

Layout:
- Left: Logo (40px × 40px) + Brand Name
- Center: Navigation Tabs
- Right: Search + Icons
```

#### Logo
```
Size: 40px × 40px
Background: Linear Gradient (Blue 500 to Blue 600)
Border Radius: 12px
Shadow: 0 10px 25px rgba(37, 99, 235, 0.3)
```

#### Brand Name
```
Text: 20px, Bold, Gray 900
Letter Spacing: -0.2px
```

#### Navigation Tab (활성)
```
Text: 14px, Medium, Blue 600
Border Bottom: 2px solid Blue 600
Padding Bottom: 4px
```

#### Navigation Tab (비활성)
```
Text: 14px, Medium, Gray 600
Padding Bottom: 4px

States:
- Hover: Text Gray 900
```

### 6.8 Modal Components

#### Modal Overlay
```
Background: rgba(0, 0, 0, 0.5)
Backdrop Filter: blur(4px)
Position: Fixed
Z-index: 50
```

#### Modal Container
```
Size: Max width 896px (56rem), Max height 90vh
Background: White
Border Radius: 16px
Shadow: 0 20px 25px rgba(0, 0, 0, 0.1)
Overflow: Auto
```

#### Modal Header
```
Padding: 32px horizontal, 24px vertical
Border Bottom: 1px solid Gray 200
Background: White
Position: Sticky top
Border Radius: 16px 16px 0 0

Layout:
- Left: Title (24px, Bold, Gray 900)
- Right: Close Button (40px × 40px)
```

#### Modal Content
```
Padding: 32px horizontal, 24px vertical
Background: White
```

#### Modal Footer
```
Padding: 24px horizontal
Border Top: 1px solid Gray 100
Gap: 12px between buttons
```

---

## 🎯 7. Icon System

### Icon Sizes
```
XS: 12px × 12px (Hot badge)
SM: 16px × 16px (Tab icons, Change badges)
MD: 20px × 20px (Search, Header icons)
LG: 24px × 24px (Section icons)
XL: 32px × 32px (Dashboard icons)
```

### Icon Colors by Context
```
Primary Action: Blue 600
Success/Up: Emerald 600
Error/Down: Red 600
Neutral: Gray 600
Disabled: Gray 400
On Dark: White
```

### Commonly Used Icons (Lucide React)
```
- Search (검색)
- TrendingUp (상승)
- TrendingDown (하락)
- Star (즐겨찾기)
- Bell (알림)
- User (사용자)
- BookOpen (학습)
- Newspaper (뉴스)
- Users (커뮤니티)
- Flame (Hot)
- ChevronDown/Up (확장/축소)
- CheckCircle (완료)
- GraduationCap (교육)
- Target, Brain, Award (AI 학습)
- ArrowRight (다음)
```

---

## 📱 8. Responsive Breakpoints

```
Mobile: 0px - 639px
  - Single column layout
  - Reduced padding (16px)
  - Stacked cards

Tablet: 640px - 1023px
  - 2 column grid
  - Medium padding (24px)

Desktop: 1024px - 1279px
  - Full layout
  - 2-3 column grid
  - Standard padding (32px)

Large Desktop: 1280px+
  - Max width container (1920px)
  - Full grid layouts
  - Maximum padding (32px)
```

---

## 🎬 9. Animation & Transitions

### Transition Timing
```
Fast: 150ms
  - 용도: Hover states, Color changes

Normal: 200ms
  - 용도: Button states, Background changes

Slow: 300ms
  - 용도: Modal open/close, Panel slides

Easing: cubic-bezier(0.4, 0, 0.2, 1)
  - Smooth, natural motion
```

### Common Animations
```
Hover Scale:
  - Transform: scale(1.05)
  - Transition: 200ms

Button Press:
  - Transform: scale(0.98)
  - Transition: 150ms

Fade In:
  - Opacity: 0 → 1
  - Duration: 300ms

Slide Up:
  - Transform: translateY(10px) → translateY(0)
  - Opacity: 0 → 1
  - Duration: 300ms
```

---

## 🔄 10. State Variations

### Button States
```
Default: Base styles
Hover: Darker background, stronger shadow
Active/Pressed: Slightly scaled down (0.98)
Focus: Ring outline (2px, color-specific)
Disabled: Opacity 0.5, cursor not-allowed
Loading: Spinner animation, disabled state
```

### Input States
```
Default: Border Gray 300
Hover: Border Gray 400
Focus: Border Blue 500, Ring Blue 100
Error: Border Red 500, Ring Red 100
Disabled: Background Gray 100, Text Gray 500
```

### Card States
```
Default: Border Gray 200, Shadow Small
Hover: Shadow Medium
Active: Border Blue 300
Selected: Border Blue 500, Background Blue 50
```

---

## 📐 11. Layout Grid System

### Container Widths
```
Home Page Container: Max 1600px
Simulator Container: Max 1280px
Learning Page Container: Max 1120px (7xl)
```

### Grid Layouts
```
Home Page (Desktop):
- Market Indices: 3 columns (equal width)
- Stock List + Chart: 2 columns (1:1 ratio)

Learning Page:
- Main Content + Sidebar: 2:1 ratio (2 cols : 1 col)
- Course Grid: 2 columns

Simulator Page:
- Stats: 3 columns (equal width)
- Stock List: Single column, full width
```

### Gap Sizes
```
Tight: 8px (0.5rem)
Normal: 16px (1rem)
Relaxed: 24px (1.5rem)
Loose: 32px (2rem)
```

---

## 🎨 12. Figma Component Naming Convention

```
Button/Primary/Default
Button/Primary/Hover
Button/Primary/Disabled
Button/Secondary/Default
Button/Secondary/Hover

Card/Main/Default
Card/Main/Hover
Card/Stat/Default

Badge/Category/Blue
Badge/Hot
Badge/Change/Up
Badge/Change/Down

Input/Search/Default
Input/Search/Focus
Input/Search/Error

Tab/Button/Active
Tab/Button/Inactive

List/Stock/Default
List/Stock/Hover

Icon/Size=SM/Color=Primary
Icon/Size=MD/Color=Success
```

---

## 📋 13. Component Checklist for Figma

### Must-Create Components
- [ ] Primary Button (3 states)
- [ ] Secondary Button (3 states)
- [ ] Tab Button (2 states)
- [ ] Main Card
- [ ] Stat Card
- [ ] Gradient Card
- [ ] List Item (Stock)
- [ ] Rank Badge
- [ ] Change Badge (Up/Down)
- [ ] Category Badge
- [ ] Hot Badge
- [ ] Level Badge (3 variants)
- [ ] Search Input (3 states)
- [ ] Header (Full)
- [ ] Modal Container
- [ ] Icon Set (all sizes/colors)

### Auto-Layout Settings
```
Cards:
- Direction: Vertical
- Padding: 24px
- Gap: 16px
- Hug contents: No (Fill container)

Buttons:
- Direction: Horizontal
- Padding: 12px 24px
- Gap: 8px
- Hug contents: Yes

List Items:
- Direction: Horizontal
- Padding: 16px 24px
- Gap: 16px
- Hug contents: No (Fill container)
- Space between: Yes
```

---

## 🎯 14. 컴포넌트 우선순위

### Priority 1 (핵심 컴포넌트)
1. Primary Button
2. Card Container (Main, Stat)
3. Tab Button
4. List Item (Stock)
5. Badge (Change, Category)
6. Input (Search)

### Priority 2 (레이아웃 컴포넌트)
1. Header
2. Navigation
3. Container Layouts
4. Grid Systems

### Priority 3 (고급 컴포넌트)
1. Modal
2. Dropdown
3. Charts
4. Complex Cards

---

## 💡 15. 디자인 팁

### 일관성 유지
- 모든 카드는 16px 또는 12px border-radius
- 모든 버튼은 12px border-radius
- 간격은 8의 배수 사용 (8, 16, 24, 32, 48, 64)
- 그림자는 3가지 레벨만 사용

### 색상 사용
- 텍스트는 Gray 900 (주요), Gray 700 (보조), Gray 600 (캡션)
- 상승은 항상 Emerald, 하락은 항상 Red
- 강조는 Blue 600, 보조 강조는 Purple 600

### 타이포그래피
- 제목은 Bold (700), 본문은 Regular (400), 강조는 Medium (500)
- 줄간격은 1.4-1.5배 유지
- 긴 텍스트는 16px 이상 사용

### 간격
- 카드 내부: 24px padding
- 섹션 간: 32px gap
- 리스트 아이템: 16px vertical padding
- 아이콘-텍스트: 8px gap

---

이 문서를 기반으로 피그마에서 체계적으로 컴포넌트를 제작하실 수 있습니다!
각 컴포넌트의 정확한 픽셀값, 색상코드, 간격이 모두 명시되어 있어 1:1로 재현 가능합니다.
