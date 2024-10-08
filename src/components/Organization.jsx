import { useState,useEffect } from "react";
import "./Organization.css";
import Repo from "./Repo";

function Organization({ orgs, currentOrg, currentOrgData, setCurrentOrg }) {

const [repos, setRepos] = useState([]);

useEffect(() => {
  const setTime = setTimeout(() => {
    fetch(`https://api.github.com/orgs/${currentOrg}/repos`)
    .then(response => response.json())
    .then(data => {
      setRepos(data);
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
  }, 15000);
  return () => clearTimeout(setTime);
}, [currentOrg]);


  function handleNext() {
    let nextOrg = orgs[orgs.indexOf(currentOrg) + 1];
    if (!nextOrg) {
      nextOrg = orgs[0];
    }
    setCurrentOrg(nextOrg);
  }



  return (
    <div className="org">
      <button onClick={handleNext}>Next</button>

      <h2>{currentOrgData.name}</h2>
      <img src={currentOrgData.avatar_url} alt="" />
      <p>{currentOrgData.description}</p>
      <p>
        {currentOrgData.location} {currentOrgData.followers} followers
      </p>
      <ul></ul>
      <div>
      {
        (repos.length === 0) ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {repos.map((repo, index) => {
              return (<Repo key={index} repo={repo} />);
            })}
          </ul>)
      }

      </div>

    </div>
  );
}

export default Organization;
