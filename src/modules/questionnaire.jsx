import { useState } from 'react';

const Questionnaire = () => {
  // 각 input의 값을 관리하는 state
  const [inputValues, setInputValues] = useState({
    input1: '',
    input2: '',
    input3: '',
  });
  // 각 input의 값을 관리하는 state
  const [isLoading, setIsLoading] = useState(false);
  // 버튼이 클릭되었는지 여부를 관리하는 state
  const [buttonClicked, setButtonClicked] = useState(false);
  // 입력 값의 유효성을 검사하는 함수
  const checkInputs = () => {
    if (buttonClicked) return;
    // 모든 input 값들이 비어있지 않은지 확인
    const isValid = Object.values(inputValues).every((value) => value.trim() !== '');
    // 유효하지 않은 경우 로딩 상태 설정
    setIsLoading(!isValid);

    return isValid;
  };

  // input 값이 변경될 때 호출되는 함수
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // 변경된 input 값 설정
    setInputValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
    // 입력 값 유효성 검사
    checkInputs();
  };

  // 폼 제출 시 호출되는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    // 로딩 중이라면 제출 방지
    if (isLoading) return;

    // 버튼 클릭 상태로 설정
    setButtonClicked(true);
    // 로딩 상태로 설정
    setIsLoading(true);

    setTimeout(() => {
      // 입력 값이 유효한 경우 input 초기화
      if (checkInputs()) {
        setInputValues({
          input1: '',
          input2: '',
          input3: '',
        });
      }
      // 버튼 클릭 상태 해제
      setButtonClicked(false);
    }, 0);
  };

  return (
    <form id="questionnaire" onSubmit={handleSubmit}>
      <div className="threeQ">
        <h3>1. 좋아하는 장르가 뭔지 말해주세요.</h3>
        <input
          type="text"
          id="input1"
          value={inputValues.input1}
          onChange={handleInputChange}
          placeholder="예) 판타지 장르가 마음에 들었어요. 특히, 현자들의 설전이요!"
        />
        <h3>2. 최근에 읽은 라이트 노벨의 제목은 뭔가요?</h3>
        <input
          type="text"
          id="input2"
          value={inputValues.input2}
          onChange={handleInputChange}
          placeholder="없어요 or 늑대와 향신료를 감명깊게 봤어요. 로렌스가 매력이었죠."
        />
        <h3>3. 이야기의 분위기는 밝으면 좋겠나요, 어두운 편이 좋나요?</h3>
        <input
          type="text"
          id="input3"
          value={inputValues.input3}
          onChange={handleInputChange}
          placeholder="어느쪽이든요 or 밝은 분위기면 좋겠어요!"
        />
        <br />
      </div>
      <div className="submitSection">
        <button type="submit" disabled={isLoading}>
          검색시작
        </button>
        <p>
          {isLoading
            ? "모든 칸의 내용을 채워 주셔야 합니다!"
            : "잠시만 기다려주세요..."}
        </p>
      </div>
      <div id="loadingSvg" className="loading-svg">
        {/* SVG 로딩 애니메이션을 여기에 추가 */}
      </div>
      <div className="wrapperAnswer">
        <ul>
          {/* 여기에 질문과 답변이 동적으로 추가됨 */}
        </ul>
      </div>
    </form>
  );  
};

export default Questionnaire;
