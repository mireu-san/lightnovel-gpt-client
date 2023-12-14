import { useState, useContext, useEffect } from 'react';
import { useApi } from './api';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import { useCallback } from 'react';

const Questionnaire = () => {
  const [inputValues, setInputValues] = useState({ input1: '' });
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isIncomplete, setIsIncomplete] = useState(false);
  const { apiPost } = useApi();
  const [chat, setChat] = useState({ prompt: '', response: '' });
  const { isLoggedIn } = useContext(AuthContext);
  // chat history
  const [selectedChat, setSelectedChat] = useState(null);

  // Function to update chat history after receiving a new message
  const updateChatHistory = (newChat) => {
    setChatHistory(prevHistory => [...prevHistory, newChat]);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  // Function to fetch chat history from the backend


  // used useCallback to avoid unnecessary re-renders
  const fetchChatHistory = useCallback(async () => {
    if (isLoggedIn) {
      try {
        const response = await axios.get(`http://localhost/chatbot/api/chat/`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setChatHistory(response.data.chat_history); // Assuming the backend returns a 'chat_history' key
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    }
  }, [isLoggedIn]);

  // Fetch chat history when the component mounts or when the isLoggedIn state changes
  useEffect(() => {
    fetchChatHistory();
  }, [isLoggedIn, fetchChatHistory]);

  const checkTaskResult = async (task_id) => {
    try {
      const result = await axios.get(`http://localhost/chatbot/task-result/${task_id}/`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      console.log(result.data); // Log the entire data object
      if (result.data && result.data.status === 'SUCCESS') {
        console.log("Received SUCCESS response:", result.data);
        const newChat = {
          prompt: inputValues.input1,
          response: result.data.result // Adjusted based on the actual data structure
        };
        setChat(newChat);
        updateChatHistory(newChat); // Update chat history with the new chat
        setIsLoading(false); // Set isLoading to false once the task is completed
        fetchChatHistory(); // Refetch chat history to include the latest message
      } else if (result.data.status === 'PENDING') {
        console.log("Received PENDING response:", result.data);
        setTimeout(() => checkTaskResult(task_id), 5000); // 5 second delay
      }
    } catch (error) {
      console.log("Error fetching task result:", error);
      setIsLoading(false); // Set isLoading to false in case of an error
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

  // chat history
  const handleChatHistoryClick = (historyItem) => {
    // When a chat history item is clicked, set the selected chat for display
    setSelectedChat(historyItem);
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

      {/* Chat history and chat interface containers */}
      <div className="chat-container">
        {/* Chat history sidebar */}
        <div className="chat-history">
          <h2>Chat History</h2>
          <ul>
            {chatHistory.length > 0 ? (
              chatHistory.map((historyItem, index) => (
                <li key={index} onClick={() => handleChatHistoryClick(historyItem)}>
                  {/* Display a preview (first 10 characters) of the chat response */}
                  <div>{historyItem.response.slice(0, 10)}...</div>
                </li>
              ))
            ) : (
              <p>No chat history to display.</p>
            )}
          </ul>
        </div>
        {/* Detailed view of the selected chat */}
        <div className="chat-interface">
          {selectedChat ? (
            <>
              <p><strong>Prompt:</strong> {selectedChat.prompt}</p>
              <p><strong>Response:</strong> {selectedChat.response}</p>
            </>
          ) : (
            <p>Select a chat to view the conversation.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Questionnaire;
