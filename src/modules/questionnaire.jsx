import { useState, useContext, useEffect } from 'react';
import { useApi } from './api';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const Questionnaire = () => {
  const [inputValues, setInputValues] = useState({ input1: '' });
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isIncomplete, setIsIncomplete] = useState(false);
  const { apiPost } = useApi();
  const [chat, setChat] = useState({ prompt: '', response: '' });
  const { isLoggedIn } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (isLoggedIn) {
        try {
          const response = await axios.get(`http://localhost/chatbot/history/`, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
            },
          });
          setChatHistory(response.data.chat_history);
        } catch (error) {
          console.error('Error fetching chat history:', error);
        }
      }
    };

    fetchChatHistory();
  }, [isLoggedIn]);

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

    if (!inputValues.input1) {
      setIsIncomplete(true);
      return;
    }

    setIsIncomplete(false);
    setIsLoading(true);

    try {
      const combinedQuestion = inputValues.input1;
      const apiResult = await apiPost(combinedQuestion);
      checkTaskResult(apiResult.task_id);
    } catch (err) {
      console.error("API 호출 중 문제 발생. 확인해주세요.", err);
      setIsLoading(false);
    }
  };

    

  return (
    <>
      <form id="questionnaire" onSubmit={handleSubmit}>
        {/* Input field for the user's prompt */}
        <div className="threeQ">
          <h3>대화를 시작해볼까요? 좋아하는 장르, 라이트 노벨 제목 등 추천 받고 싶은 내용을 얘기해보세요.</h3>
          <input
            type="text"
            id="input1"
            value={inputValues.input1}
            onChange={handleInputChange}
            placeholder="어떤 작품에 대해 이야기 해 볼까요?"
          />
          <br />
        </div>
        <div className="submitSection">
          <button type="submit" disabled={isLoading}>검색시작</button>
          <p>
            {isLoading ? "잠시만 기다려주세요..." : isSubmitted && isIncomplete && "내용을 입력해주세요!"}
          </p>
        </div>
      </form>

      {/* Display for current chat prompt and response */}
      <div className="wrapperAnswer">
        {chat.prompt && <p>당신의 키워드: {chat.prompt}</p>}
        {chat.response && <p>답변: {chat.response}</p>}
      </div>

      {/* Display for chat history */}
      <div className="chat-history">
        <h2>Chat History:</h2>
        {chatHistory.length > 0 ? (
          <ul>
            {chatHistory.map((historyItem, index) => (
              <li key={index}>
                <div><strong>Prompt:</strong> {historyItem.prompt}</div>
                <div><strong>Response:</strong> {historyItem.response}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No chat history to display.</p>
        )}
      </div>
    </>
  );
};

export default Questionnaire;