# SMIL (Synchronized Multimedia Intergration Language)

멀티미디어 데이터를 XML을 이용하여 시간적, 공간적으로 배치, 제어하기 위한 W3C 표준 프레젠테이션 언어

### SVG Animation

`<animate>`태그를 사용하여 애니메이션 동작을 할 요소 안쪽에 생성

- attributeName: 애니메이션동작할 속성
- dur(duration): 지속시간
- to: 동작값
- values: 애니메이션의 동작값을 (;,세미콜론)으로 구분하여 작성
  - alternate효과를 줄때 사용
- keyTimes: css animation의 keyframes와 비슷
  - 동작을 세분화할 구간을 작성
  - 마찬가지로 (;,세미콜론)으로 구분
- fill: 애니메이션이 끝났을떄의 상태를 지정 ex) freeze
- repeatCount: 동작 횟수
  - 무한반복: indefinite;
- begin: 애니메이션 지연시간
