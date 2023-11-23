import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import testData from '../Data.json'; // Убедитесь, что путь к файлу верный
import "./TestAssignment.css"

function TestAssignment() {
  const { testId } = useParams();
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [completed, setCompleted] = useState(false);
  const testQuestions = testData.find(test => test[testId])?.[testId];
  const [username, setUserName] = useState(localStorage.getItem('username'))

  useEffect(() => {
    const loadCompletedTests = async () => {
			
			const response = await fetch(`https://localhost:7206/Auth/getCompletedTests?username=${username}`);

      if (response.ok) {
				console.log(response)
        const completedTests = await response.json();
        if (completedTests[testId] !== undefined) {
          setCompleted(completedTests[testId].isCompleted);
          setScore(completedTests[testId].score);
        }
      }
    };

    loadCompletedTests();
  }, [testId]);

  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: selectedAnswer
    }));
  };

  const handleSubmit = async () => {
    if (completed) return;

    const calculatedScore = Object.keys(answers).reduce((total, questionIndex) => {
      if (answers[questionIndex] === testQuestions[questionIndex].correct_answer) {
        return total + 1;
      }
      return total;
    }, 0);

    setScore(calculatedScore);
    setCompleted(true);
    await fetch(`https://localhost:7206/Auth/recordTestResult?testId=${testId}&score=${calculatedScore}&username=${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
		console.log('отправлено')
  };

	return (
    <div className="test-assignment">
      <h2 className="test-title">Test {testId}</h2>
      {completed ? (
				<>
				<p className="test-result">Вы уже прошли этот тест. Ваш результат: {score} баллов.</p>
				<Link to='/page'>
					<input type="button" value="К тестам"/>
				</Link>
				</>
        
      ) : (
        testQuestions && testQuestions.map((question, index) => (
          <div key={index} className="question">
            <h3>{question.question}</h3>
            <div className="answers">
              {[...question.incorrect_answers, question.correct_answer]
                .map((answer, answerIndex) => (
                  <button 
                    key={answerIndex} 
                    onClick={() => handleAnswerChange(index, answer)}
                    className={`answer ${answers[index] === answer ? 'selected' : ''}`}
                  >
                    {answer}
                  </button>
                ))}
            </div>
          </div>
        ))
      )}
      {!completed && <button className="submit-button" onClick={handleSubmit}>Submit</button>}
    </div>
  );
}

export default TestAssignment;
