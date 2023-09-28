import Questionnaire from "../modules/questionnaire";


const Body = () => {
    return (
        <section>
            <h2 className="text-3xl font-bold underline">
                환영합니다!
            </h2>
            <p>원하시는 라이트노벨 또는 아니메를 찾으시려면 저에게 물어보세요.</p>
            <Questionnaire />
        </section>
    );
};

export default Body;
