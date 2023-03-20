import { useState } from "react";
import "./main.css";

export default function Main() {
  const [loading, setLoading] = useState<boolean>(false);

  const [url, setUrl] = useState<string>("");

  const [avatar, setAvatar] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string | undefined>("");
  const [following, setFollowing] = useState<number | null>(null);
  const [followers, setFollowers] = useState<number | null>(null);
  const [reposQty, setReposQty] = useState<number | null>(null);
  const [reposLink, setReposLink] = useState<string>("");

  const urlCreator = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    setUrl("https://api.github.com/users/" + username);
    setReposLink("https://github.com/" + username + "?tab=repositories");
  };

  const getUserData = () => {
    setLoading(true);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAvatar(data.avatar_url);
        setName(data.name);
        setLocation(data.location);
        setFollowing(data.following);
        setFollowers(data.followers);
        setReposQty(data.public_repos);
      });

    // This timeout is just for displaying loading screen a bit more. if I don't use it app works faster and we can't inspect loading screen.
    setTimeout(function () {
      setLoading(false);
    }, 1000);
  };

  if (loading === true) {
    return (
      <>
        <div className="spinner"></div>
      </>
    );
  } else if (name === "") {
    return (
      <form className="searchForm">
        <h1 className="formH1">Search GitHub Profiles</h1>
        <input
          type="text"
          className="usernameInput"
          placeholder="Type Username"
          onChange={urlCreator}
        ></input>
        <button className="searchBtn" onClick={getUserData}>
          Search
        </button>
      </form>
    );
  } else if (name === undefined) {
    return (
      <section>
        <p className="invalidUsernameMessage">I can't found this user :(</p>
        <button
          className="searchAgainBtn"
          onClick={() => window.location.reload()}
        >
          Search Again
        </button>
      </section>
    );
  } else {
    return (
      <>
        <button
          className="searchAgainBtn"
          onClick={() => window.location.reload()}
        >
          Search Again
        </button>
        <section className="userProfileSection">
          <aside className="leftSide">
            <img src={avatar} alt="user avatar" />
            <p>{name}</p>
          </aside>
          <section className="rightSide">
            <div className="locationDiv">
              <p className="label">Location:</p>
              <p className="userLocation">{location ? location : 'Universe'}</p>
            </div>
            <div className="followingDiv">
              <p className="userFollowing">{following}</p>
              <p className="label">Following</p>
            </div>
            <div className="followersDiv">
              <p className="userFollowers">{followers}</p>
              <p className="label">Followers</p>
            </div>
            <div className="repoQtyDiv">
              <p className="userReposQty">{reposQty}</p>
              <p className="label">Repositories</p>
            </div>
          </section>
        </section>
        <a
          className="seeAllRepos"
          href={reposLink}
          target="_blank"
          rel="noreferrer"
        >
          <button>See All Repos of {name}</button>
        </a>
      </>
    );
  }
}
