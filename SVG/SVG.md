# SVG란

- 확장 가능한 벡터 그래픽(Scalable Vector Graphics)
- XML 기반의 2차원 그래픽
- 아이콘, 이미지, 그래프 사용자 인터페이스(UI) 등에 널리 쓰임
- DOM의 일부로서 각 개체별로 HTML 엘리먼트가 추가됨
- 벡터이기 때문에 이미지의 크기에 상관없이 선명하게 유지되고 모양이 많이 복잡하지 않은 경우 파일 사이즈도 작다.
- CSS와 자바스크립트를 이용해서 조작이 가능
- 크기(width, height)가 큰 이미지 표현에 유리
- 모양이 복잡하고 개체수가 많을 수록 성능이 떨어짐

### 비교: 캔버스(Canvas)

- 비트맵 기반 그래픽
- 이미지나 비디오의 픽셀 조작, 게임, 퍼포먼스가 중요한 조작 등에 쓰임
- 단일 태그 `<canvas>`로 표현
- 자바스크립트를 이용해서 조작 가능(CSS는 불가)
- 픽셀 단위의 조작이 가능해서 일반 HTML, 엘리먼트로는 불가능한 다양한 표현이 가능
- 저수준(low-level) API로 코딩량이 많고 까다로움
- 크기가 커질수록 성능이 떨어짐

### HTML 문서에 SVG를 넣는 여러가지 방법들

#### `<img>` 태그

```html
<body>
  <!-- 이미지 태그로 넣기 -->
  <img src="경로.svg" alt="" />
  <!-- CSS Background -->
  <style>
    body > img {
      background: url("경로.svg");
    }
  </style>
  <!-- SVG 요소들을 직접 inline으로 삽입 -->
  <svg>..요소들</svg>
</body>
```

#### `<object>` 태그

```html
<body>
  <object data="경로.svg" type="image/svg+xml"></object>
</body>
```

### SVG 크기 설정

#### viewBox

> 보이는 뷰의 크기를 나타냄

- 실제 크기와 상관없이 svg의 상대 너비를 결정
- viewBox의 크기에 따라서 상대적인 비율로 안의 요소들에 크기가 결정됨
- `<svg viewBox="0 0 100 100>`
  - viewBox="x좌표 y좌표 width height"

### SVG 압축하기

> svg태그의 불필요한 코드들을 정리 압축 용량 절감

[압축사이트](https://jakearchibald.github.io/svgomg/)

### CSS 적용하기

> svg의 각 요소에 클래스를 주어 CSS에서 꾸며줄수 있다.

- background 대신 fill 속성 사용
- border(선) 대신 stroke 속성 사용

### SVG 요소의 쌓이는 순서

> SVG는 CSS의 `z-index`와 같이 요소의 쌓이는 순서를 조절할 수 있는 별도의 속성이 없다. <br> SVG요소가 쌓이는 순서는 마크업 순서에 절대적으로 의존한다.

### SVG 하이퍼링크

> SVG 컨테츠 요소에 하이퍼링크를 설정하는 것은 HTML과 유사하다. <br>한가지 차이점은 일부 속성에 `xlink` 네임스페이스를 사용한다는 것

#### xlink 네임스페이스 속성

> 네임스페이스를 사용하는 속성은 HTML `<a>`요소의 `href`, `title` 속성 앞에 `xlink:` 접두사가 붙는다고 생각하면 기억하기 쉽습니다.
> <br>설정가능한 속성은 이외에도 `target`속성이 있다.

| 속성        | 설명                                                      |
| :---------- | :-------------------------------------------------------- |
| xlink:href  | 사용자 인터렉션에 따라 연결된 웹 URL로 이동한다.          |
| xlink:title | 마우스가 텍스트 위에 올라가면 타이틀을 툴팁으로 제공한다. |

### 기본 도형 태그

> SVG 내에서 대부분의 요소를 만드는데 사용됨

- `<rect>`
  - 직사각형 및 정사각형
- `<circle>`
  - 원
- `<ellipse>`
  - 타원
- `<line>`
  - 선
- `<polyline>`
- `<polygon>`
  - 다각형
- `<path>`

### 텍스트 태그

> 텍스트 태그 `<text>`는 SVG 내부에 텍스트를 만드는데 사용되며 HTML의 텍스트와 마찬가지로 선택할수 있고 엑세스 가능

- `<textPath>` 태그
  - `<path>`의 모양을 따라 텍스트를 렌더링 한다.
- `<tspan>` 요소
  - SVG에서 자동 줄바꿈 또는 줄 바꿈을 지원하지 않기 떄문에 중요하다.
  - 특정 단어나 글자를 개별적으로 조작하여 별도의 디자인을 수행할 수 있다.
  - 개별 제어 할 때 새로운 좌표 설정 대신 이전 텍스트에 상대적으로 위치 설정이 가능
  - `<tspan>` 요소의 `dy` 속성 값으로 나열된 값을 설정햇을 때 각 글자 글리프의 행높이를 조절 가능<br>이전 값에 이은 다음 값은 이전 값의 상대적으로 위치 이동하게됨

### 접근성 태그

> 제목 (`<title>`) 및 설명 (`<desc>`) 태그는 특히 내게 필요한 옵션 컨텐츠를 제공하기 위한 것이며 화면에 표시되지 않는다.

### `<g>` 그룹 묶기

> 요소를 그룹화하여 클래스 이름을 추가하고 애니메이션,필터 패턴 및 효과를 요소 그룹에 적용 할수있게 한다.

- `<g>`태그로 감싸면 그룹화됨

### `<symbol>` 요소

> `<symbol>` 요소는 `<g>`요소와 비슷하다. 하지만 화면에 렌더링 되지 않는다는 점이 차이점이다.
> <br> 마찬가지로 `<use>` 요소를 사용해 재사용할 수 있다. `<defs>`,`<g>`요소와 달리 `viewBox`, `preserveAspectRatio` 속성을 설정할수 있다.

### `<svg>` 요소

> `<svg>` 요소 내부에 `<svg>` 요소를 중첩할수 있다.

```xml
 <svg id="root-svg">
    <svg id="nested-svg" x="55" y="55">
    </svg>
 </svg>
```

### `<defs>` 태그

> 나중에 재사용 할 수 있도록 요소를 정의하는데 사용 됨
> <br>여기서 패턴, 필터 및 마스크를 만들어 나중에 재사용 가능
> <br>아이콘 시스템을 만드는데도 사용됨

### SVG Gradient

#### 리니어 그레디언트(Linear Gradient)

> 선형 그레디언트를 그려 요소에 매핑

- `<defs>` 요소 내에 `<linearGradient>` 요소를 정의한 후, 그레디언트를 적용할 요소 `fill` 속성에 참조 연결한다.
  - `fill: url('#ID')`
- `<linearGradient>` 요소 내부에는 `<stop>` 요소를 2개 이상 사용해 그레디언트 컬러 스톱을 설정할수 있다.
  - `<stop offset="0%" stop-color="yellow"/>`

#### 레이디얼 그레디언트(Radial Gradient)

> 원형 그레디언트를 그려 요소에 매핑
> <br> 선형 그레디언트와 유사하지만 `<radialGradient>` 원 중심(cx, cy)과 반지름(r), 초점(fx, fy)을 설정하는 점이 다름

- `<radialGradient id="id" cx="50%" cy="50%" r="50%" fx="20%" fy="20%">`

### SVG Pattern

#### 도형 패턴

> SVG 도형 패턴을 정의해 요소에 적용할수 잇다.<br>
> 패턴을 적용하고자 하는 요소 `fill`속성에 패턴 요소의 ID를 참조 연결한다.

#### 패턴 재사용

> 도형 패턴을 `<defs>` 내에 정의하는 영역으로 옮긴 후, 식별 가능한 ID를 설정한다

```xml
  <svg>
    <defs>
      <pattern id="cross-pattern">...</pattern>
      <rect id="ptrn" fill="url(#corss-pattern)" />
    </defs>
    <!--<use> 요소를 사용해 이를 재 사용할 수 있다. -->
    <use xlink:href="#ptrn" x="10" y="10" />
    <use xlink:href="#ptrn" x="120" y="120" />
  </svg>
```

#### 텍스트 패턴

> 텍스트 패턴을 매핑하는 방법도 도형 패턴과 유사하다.
> <br>패턴 ID 값을 텍스트 요소 fill 속성에 참조 연결한다.

```xml
<svg>
  <defs>
    <pattern id="text-pattern">
      <line x1="0" y1="0" x2="30" y2="30" class+"ptrn1" />
      <line x1="0" y1="30" x2="30" y2="0" class+"ptrn2" />
    </pattern>
  </defs>
  <text fill="url(#text-pattern)">SVG</text>
</svg>
```

#### 텍스트 패턴 + 마스크

> 패턴이 매핑된 텍스트에 마스크 처리 또한 가능

- 패턴은 `fill`속성, 마스크는 `mask`속성에 참조 연결한다.

```xml
<svg>
  <defs>
    <pattern id="text-pattern">...</pattern>
    <mask id="text-mask"></mask>
  </defs>
  <texts fill="url(#text-pattern)" mask="url(#text-mask)">
  SVG
  </texts>
</svg>
```

### SVG 마스크

- 마스크(mask)와 클립패스(clipPath)의 차이점
  - 마스킹은 마스크의 투명도 및 회색 값을 고려하여 부드러운 가장자리를 허용한다. 반면에 클리핑은 다른 파트에서 정의한 요소의 일부를 제거하는 것을 말한다. 이 경우 모든 반투명 효과는 가능하지 않는다.

#### 이미지 마스크

> `<defs>` 내부에 `<mask>` 요소를 선언하고, 식별 가능한 `id` 속성을 부여한다.

- `<image>` 요소 mask 속성 값으로 `url()` 함수를 사용해 마스크 ID를 설정하면 마스킹 된 이미지가 화면에 렌더링 된다.
- 주의할 점은 마스크는 Alpha Channel을 사용 하므로 하얀색(#fff)일 경우 Opacity 100%와 같고, 검정색(#000)일 경우는 Opacity 0%와 같다.

```xml
<svg>
  <defs>
    <mask id="photo-mask">
      <polygon fill="#fff" points="151.9,159.4 ..." />
    </mask>
  </defs>
  <image mask="url(#photo-mask)" xlink:href="./image/photo.jpg" x="20" y="10" width="200" height="480" />
</svg>
```

#### 그레디언트 마스크 이미지

```xml
  <svg width="512" height="702" viewBox="0 0 512 702">
    <defs>
      <radialGradient id="mask-gradient">
        <stop/>
      </radialGradient>
      <mask id="mask">
        <polygon fill="url(#mask-gradient)" points="">
      </mask>
    </defs>
    <image mask="url(#mask)" xlink:href="경로" aria-label="설명">
  </svg>
```

#### 텍스트 마스크

> 텍스트에 이미지를 마스킹 하는 방법도 유사한다. 알파 채널로 사용할 이미지를 선택하고, 텍스트 요소에 `mask` 속성을 설정해 이미지를 마스킹 처리한다. 이미지는 알파 채널로 사용 되었기에 흑백으로 표현된다.

```xml
<svg width="512" height="702" viewBox="0 0 512 702">
  <defs>
    <mask id="mask">
      <image xlink:href="경로">
    </mask>
  </defs>
  <text mask="url(#mask)" x="0" y="250" font-size="100" font-family="Arial" font-weight="bold">
  </text>
</svg>
```

### SVG 이미지

#### 주의사항

> SVG 요소 내부에 `<image>` 요소를 사용할 때 다음의 특성에 주의하여 사용하여야 한다.

- `x` 또는 `y`속성을 설정하지 않으면 `0` 이 된다.
- `height` 또는 `width` 속성을 설정하지 않으면 `0`이 된다.
- `height` 또는 `width` 속성이 `0`이면 이미지는 표시되지 않는다.

#### `<image>` 요소

> SVG 요소 내부에 비트맵 이미지를 포함하고자 한다면 `<image>` 요소를 사용한다. <br> HTML `<img>`요소와 사용법은 유사하다. 하지만 `xlink:href`,`x`,`y` 속성을 제공하는 반면 `alt` 속성은 제공하지 않는다. 대체 텍스트는 WAI-ARIA `aria-label` 속성을 사용해 제공할수 있다.

```xml
  <svg width="600" height="300">
    <image xlink:href="경로" x="105" y="15" width="400" height="267" aria-label="설명">
  </svg>
```
