import React, { Component } from "react";

export class NewsItems extends Component {
  render() {
    let { title, description, imageURL, newsURL, author, date ,source} = this.props;
    return (
      <div>
        <div
          className="card"
          style={{ width: "18rem", backgroundColor: "#f8f9fa" }}
        >
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: "90%"}}>
            {source}
          </span>
          <img
            src={imageURL}
            className="card-img-top"
            alt="..."
            style={{ height: "10rem", width: "auto" }}
          />
          <div className="card-body">
            <h5 className="card-title" style={{ height: "4rem" }}>
              {title}...
            </h5>
            <p className="card-text" style={{ height: "4rem" }}>
              {description}...
            </p>
            <br />
            <a
              href={newsURL}
              target="_blank"
              className="btn btn-sm"
              style={{ backgroundColor: "#ba181b", color: "white" }}
            >
              Read More
            </a>
            <div className="my-3">
              <small className="text-body-secondary">
                Published by {author}
              </small>{" "}
              <br />
              <small className="text-body-secondary">
                {new Date(date).toGMTString()}
              </small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItems;
