import { useState, useContext } from 'react';
import { useApi } from './api';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const Questionnaire = () => {
  const [inputValues, setInputValues] = useState({
    input1: '',
    input2: '',
    input3: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isIncomplete, setIsIncomplete] = useState(false);
  const { apiPost } = useApi();
  const [chat, setChat] = useState({ prompt: '', response: '' });
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const { isLoggedIn } = useContext(AuthContext);

  const checkTaskResult = async (task_id) => {
    try {
      const result = await axios.get(`http://localhost/chatbot/task-result/${task_id}/`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      console.log(result.data);  // Log the entire data object
      if (result.data && result.data.status !== 'PENDING') {  // Check for a non-PENDING status
        console.log("Received non-PENDING response:", result.data);
        setChat({
          // prompt: inputValues.input1 + '. ' + inputValues.input2 + '. ' + inputValues.input3 + '.',
          prompt: inputValues.input1,
          response: result.data.result  // Adjusted based on the actual data structure
        });
        setIsLoading(false);  // Set isLoading to false once the task is completed
      } else {
        console.log("Received PENDING response:", result.data);
        // Introduce a fixed delay before making the next check
        setTimeout(() => checkTaskResult(task_id), 5000);  // 5 second delay
      }
    } catch (error) {
      console.log("Error fetching task result:", error);
      setIsLoading(false);  // Set isLoading to false in case of an error
    }
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!isLoggedIn) {
      alert('먼저 로그인 후 이용하세요');
      return;
    }

    // if (!inputValues.input1 || !inputValues.input2 || !inputValues.input3) {
    if (!inputValues.input1) {
      setIsIncomplete(true);
      return;
    }

    setIsIncomplete(false);
    console.log('Setting isLoading to true');
    setIsLoading(true);

    try {
      // const combinedQuestion = `${inputValues.input1}. ${inputValues.input2}. ${inputValues.input3}.`;
      const combinedQuestion = `${inputValues.input1}`;
      const apiResult = await apiPost(combinedQuestion);
      console.log("서버로부터 받은 응답:", apiResult);
      checkTaskResult(apiResult.task_id);  // Start checking for the task result
    } catch (err) {
      console.log("API 호출 중 문제 발생. 확인해주세요.", err);
    }  // removed the finally block here
  };
    

  return (
    <form id="questionnaire" onSubmit={handleSubmit}>
      <div className="threeQ">
        <h3>대화를 시작해볼까요? 좋아하는 장르, 라이트 노벨 제목 등 추천 받고 싶은 내용을 얘기해보세요.</h3>
        <input
          type="text"
          id="input1"
          value={inputValues.input1}
          onChange={handleInputChange}
          placeholder="어떤 작품에 대해 이야기 해 볼까요?"
        />
        {/* <h3>1. 좋아하는 장르가 뭔지 말해주세요.</h3> */}
        {/* <input
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
        /> */}
        <br />
      </div>
      <div className="submitSection">
        <button type="submit" disabled={isLoading}>
          검색시작
        </button>
        <p>
          {isLoading
            ? "잠시만 기다려주세요..."
            : (isSubmitted && isIncomplete) && "모든 칸의 내용을 채워 주셔야 합니다!"}
        </p>
      </div>
      <div id="loadingSvg" className="loading-svg">
        {/* SVG 로딩 애니메이션을 여기에 추가 */}
      </div>
      {/* 하부에 표시하는 입력값과 API 서버로의 반응내용 */}
      <div className="wrapperAnswer">
        <ul>
          {chat.prompt && <li className="prompt">당신의 키워드: {chat.prompt}</li>}
          {chat.response && <li className="response">답변: {chat.response}</li>}
        </ul>
      </div>
    </form>
  );  
};

export default Questionnaire;
