import React, { useEffect, useState } from "react";
import Axios from "../../Axios";
import { withRouter, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditPost = ({ history }) => {
  console.log(history);
  let [posts, setPosts] = useState({
    title: "",
    details: "",
    loading: false,
  });
  let { title, details, loading } = posts;
  let { id } = useParams();
  useEffect(() => {
    let fetchData = async () => {
      let data = await Axios.get(`/api/posts/post/${id}`);
      let existingData = data.data;
      setPosts(existingData);
    };
    fetchData();
  }, [id]);

  let handleChange = e => {
    let { name, value } = e.target;
    setPosts({ ...posts, [name]: value });
  };

  let handleSubmit = async e => {
    e.preventDefault();
    try {
      let data = { title, details };
      setPosts({ loading: true });
      await Axios.put(`/api/posts/edit-post/${id}`, data);
      history.push("/");
      toast.success(`successfully post Updated`);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
    setPosts({ loading: false, title: "", details: "" });
  };

  return (
    <section id="PostBlock" className="card container mx-auto col-md-4 my-4">
      <article className="card-body">
        <h2 className="h4 text-uppercase font-weight-bold text-secondary border-bottom pb-2">
          Update Post
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="enter title"
              className="form-control"
              value={title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="details">Details</label>
            <textarea
              name="details"
              id="details"
              cols="30"
              rows="10"
              className="form-control"
              value={details}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-success btn-block">
              {loading === true ? "loading..." : "Update Post"}
            </button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default withRouter(EditPost);
