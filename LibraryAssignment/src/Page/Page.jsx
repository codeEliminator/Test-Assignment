import "./Page.css";
import data from '../Data.json';
import { Link } from "react-router-dom";
import TestCard from "../TestCard/TestCard";
import { useState, useEffect } from "react";

function Page() {
  const [completedTests, setCompletedTests] = useState({});

  useEffect(() => {
    const fetchCompletedTests = async () => {
      try {
        const username = localStorage.getItem('username'); 
        const response = await fetch(`https://localhost:7206/Auth/getCompletedTests?username=${username}`);

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setCompletedTests(data);
        } else {
          console.error("Failed to fetch completed tests", response);
        }
      } catch (error) {
        console.error("Error fetching completed tests:", error);
      }
    };

    fetchCompletedTests();
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="testWrapper">
          {data.map((el, idx) => {
            const testId = `test${idx + 1}`;
            const isCompleted = completedTests[testId];

            return (
              <div key={idx} className="test">
                <Link to={`/test/${testId}`}>
                  <TestCard 
                    key={idx}
                    testId={testId}
                    isCompleted={isCompleted}
                  />
                </Link>
              </div>
            );
          })}
        </div>
        <Link to="/profile">
          <div className="profile">
            Profile
          </div>
        </Link>
      </div>
    </>
  );
}

export default Page;
