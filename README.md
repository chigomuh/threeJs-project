# 고양이와 놀기

> three js와 3D 모델로 놀아보기

## 학습 내용

### useEffect return

```javascript
// index.tsx
useEffect(() => {
  /**
   * useEffect가 더이상 실행되지 않는 경우
   *
   * 1. 의존 배열이 바뀌는 경우 -> useEffect 재실행
   * 2. 현재 component가 unmount되는 경우
   *
   * 이때, 이벤트는 계속 추가되지만 삭제되지 않기에 삭제해줘야 한다.
   * 삭제하지 않으면 이전 useEffect에서 추가된 이벤트가 계속 실행 됨
   */

  // element 가져오기
  const element = ref.current;

  // 이벤트 발생 시 수행되는 함수
  const callbackFn = () => {
    console.log("이벤트 발생");
  };

  // "click" 이벤트 추가
  element.addEventListener("click", callbackFn);

  return () => {
    // 주의! remove시 콜백함수는 add와 동일해야 함!!
    // "click" 이벤트 삭제
    element.removeEventListener("click", callbackFn);
  };
}, []);
```
