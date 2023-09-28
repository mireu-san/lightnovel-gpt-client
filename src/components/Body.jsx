// import React from 'react';

const Body = () => {
    return (
        <section>
            <h2 className="text-3xl font-bold underline">
                환영합니다!
            </h2>
            <p>원하시는 라이트노벨 또는 아니메를 찾으시려면 저에게 물어보세요.</p>
            <form action="post" id="questionnaire">
                <div className="threeQ">
                    <h3>1. 좋아하는 장르가 뭔지 말해주세요.</h3>
                    <input type="text" id="input1" autoFocus title="라노벨 질문 1번" placeholder="예) 판타지 장르가 마음에 들었어요. 특히, 현자들의 설전이요!" />
                    <h3>2. 최근에 읽은 라이트 노벨의 제목은 뭔가요?</h3>
                    <input type="text" id="input2" autoFocus title="라노벨 질문 2번" placeholder="없어요 or 늑대와 향신료를 감명깊게 봤어요. 로렌스가 매력이었죠." />
                    <h3>3. 이야기의 분위기는 밝으면 좋겠나요, 어두운 편이 좋나요?</h3>
                    <input type="text" id="input3" autoFocus title="라노벨 질문 3번" placeholder="어느쪽이든요 or 밝은 분위기면 좋겠어요!" />
                    <br />					
                </div>
                <div className="submitSection">
                    <button type="submit" id="submitBtn" disabled>검색시작</button>
                    <p id="buttonMessage"></p>
                </div>
                {/* <!-- transition --> */}
                <div id="loadingSvg" className="loading-svg">
                    {/* SVG 고치기 */}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" style="width: 50px; height: 50px">
                        <circle cx="25" cy="25" r="20" stroke="#333" strokeWidth="4" fill="none"/>
                        <circle className="loading-svg-circle" cx="25" cy="25" r="20" stroke="#999" strokeWidth="4" strokeDasharray="119" strokeDashoffset="119" fill="none">
                            <animate attributeName="stroke-dashoffset" values="119;0" dur="1s" repeatCount="indefinite"/>
                        </circle>
                    </svg> */}
                </div>	
                {/* <!-- 질문자의 질문과, chatgpt의 답변이 표시되는 영역 --> */}
                    <div className="wrapperAnswer">
                        <ul>
                        </ul>
                    </div>
                    <script src="./src/modules/questionnaire.js" type="module"></script>
            </form>
    </section>
    );
};

export default Body;
