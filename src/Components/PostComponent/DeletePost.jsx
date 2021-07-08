import React, { useEffect, useState } from "react";
import Axios from "../../Axios";
import { useParams, Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
const DeletePost = ({ history }) => {
  let [removePost, setRemovePost] = useState("");
  let { id } = useParams();
  useEffect(() => {
    let fetchData = async () => {
      let data = await Axios.get(`/api/posts/post/${id}`);
      let existingData = data.data;
      setRemovePost(existingData);
    };
    fetchData();
  }, [id]);

  let deletePost = async e => {
    await Axios.delete(`/api/posts/delete-post/${id}`);
    toast.warning("post deleted...");
    history.push("/");
  };

  let { title, details } = removePost;
  return (
    <section className="container my-2 d-flex">
      <article className="jumbotron align-items-center vh-100">
        <h2 className="text-success font-weight-bold text-uppercase text-center">
          {title}
        </h2>
        <p className="card-title">{details}</p>
        <hr className="hr my-2" />
        <Link to="/" className="btn btn-secondary">
          go back
        </Link>
        <button
          to="/"
          className="btn btn-danger float-right"
          onClick={deletePost}
        >
          delete
        </button>
      </article>
    </section>
  );
};

export default withRouter(DeletePost);
