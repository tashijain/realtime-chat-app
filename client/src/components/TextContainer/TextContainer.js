import React from "react";
import "./TextContainer.css";
import onlineIcon from "../../icons/onlineIcon.png";

const TextContainer = ({ users }) => {
  return (
    <div className="textContainer">
      <div>
        <h1>
          Realtime Chat Application{" "}
          <span role="img" aria-label="emoji">
            💬
          </span>
        </h1>
        <h2>
          Created by Tashi using React, Express, Node and Socket.io{" "}
          <span role="img" aria-label="emoji">
            ❤️
          </span>
        </h2>
        <h2>
          Try it out right now!{" "}
          <span role="img" aria-label="emoji">
            ⬅️
          </span>
        </h2>
      </div>
      {users ? (
        <div>
          <h1>Currently online</h1>
          <div className="activeItem">
            <h2>
              {users.map(({ name }) => (
                <div key={name} className="activeItem">
                  <img alt="Online Icon" src={onlineIcon} alt="online icon" />
                  {name}
                </div>
              ))}
            </h2>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TextContainer;
