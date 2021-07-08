import React, { useEffect, useState, Fragment } from "react";
import Axios from "../Axios";
import faker from "faker/locale/en_IND";
import Moment from "react-moment";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
const Home = props => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let fetchData = async () => {
      let postData = await Axios.get("/api/posts/all-posts");
      console.log(postData.data.posts);
      setPosts(postData.data.posts);
      setLoading(false);
    };
    fetchData();
  }, []);

  let PostData = posts
    .filter(val => {
      if (searchTerm === "") {
        return val;
      } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val;
      }
    })
    .map(post => {
      return (
        <Fragment key={post._id}>
          <div className="col-md-3 card-body">
            <img
              src={faker.image.avatar()}
              alt={post.title}
              className="card-img-top"
            />
            <div className="card-body">
              <h2
                className="font-weight-bold pt-2 text-uppercase font-smaller"
                style={{ fontSize: 14 }}
              >
                {post.title}
              </h2>
              <p className="font-wight-normal pt-2 font-smaller">
                {post.details.slice(0, 100)} ...
              </p>
              <p
                className="text-secondary text-muted font-smaller font-weight-bold text-capitalize"
                style={{ fontSize: "12px", color: "#999" }}
              >
                <Moment fromNow>{post.createdAt}</Moment>
              </p>
              <hr className="hr" />
              <footer className="btn-group btn-block bg-secondary">
                <div className="icons btn btn-secondary btn-sm">
                  <Link to={`/edit-post/${post._id}`}>
                    <i className="fas fa-pen text-white"></i>
                  </Link>
                </div>
                <div className="icons btn btn-light btn-sm">
                  <Link to={`/post-detail/${post._id}`}>
                    <i className="fas fa-eye text-black"></i>
                  </Link>
                </div>
                <div className="icons btn btn-danger btn-sm">
                  <Link to={`/delete-post/${post._id}`}>
                    <i
                      className="fa fa-trash text-white"
                      aria-hidden="true"
                    ></i>
                  </Link>
                </div>
              </footer>
            </div>
          </div>
        </Fragment>
      );
    });

  return (
    <div className="container my-2">
      <h2 className="h5 font-weight-bold text-success border-bottom pt-2  pb-2 text-uppercase">
        Posts
      </h2>
      <hr className="hr" />
      <input
        type="search"
        className="form-control my-2 vw-75"
        placeholder="search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <hr className="hr" />
      {loading === true ? (
        <div className="centerBlock d-flex justify-content-center align-items-center vh-100">
          <ClipLoader loading={loading} size={150} />
        </div>
      ) : (
        <div className="card1">
          <div>
            <div className="row">{PostData}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
