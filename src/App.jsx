import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Organization from "./components/Organization";


function App() {
  const [orgs, setOrgs] = useState([]);
  const [currentOrg, setCurrentOrg] = useState("");
  const [currentOrgData, setCurrentOrgData] = useState([]);



  useEffect(() => {
    const timer = setTimeout(() => {
      fetch("./orgs.csv")
        .then((response) => response.text())
        .then((data) => {
          const array = data.split(",");
          setOrgs(array);
          console.log(array);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (orgs.length > 0) {
      setCurrentOrg(orgs[0]);
    }

    console.log(currentOrg);
  }, [orgs]);

  useEffect(() => {
    fetch(`https://api.github.com/orgs/${currentOrg}`)
    .then(response => response.json())
    .then(data => {
      setCurrentOrgData(data);
      console.log(data);
    })

    .catch(error => {
      console.log(error);
    });
  }, [currentOrg]);

  return (
    <main>
    <Organization orgs={orgs} currentOrg={currentOrg} currentOrgData={ currentOrgData} setCurrentOrg={setCurrentOrg} />
      <div>
        {orgs.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {orgs.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        )}
      </div>
      <div>{currentOrg === "" ? <p>Loading...</p> : <p>{currentOrg}</p>}</div>
      <div>
      {
        (currentOrgData.length === 0) ? <p>Loading...</p> : ( 
          <ul>{
            Object.entries(currentOrgData).map(([key,value], index) => {
              return (<li key={index}>{key}:{value}</li>)
          })
         } 
         </ul>
        )
      }
      </div>
   
     
    </main>
  );
}

export default App;
