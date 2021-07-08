import React, { useEffect, useState } from "react";
import Axios from "../../Axios";
import { useParams, Link } from "react-router-dom";

import faker from "faker/locale/en_IND";
const PostDetail = () => {
  let [post, setPost] = useState("");

  let { id } = useParams();
  useEffect(() => {
    let fetchData = async () => {
      let data = await Axios.get(`/api/posts/post/${id}`);
      let payload = data.data;
      setPost(payload);
      console.log(payload);
    };
    fetchData();
  }, [id]);

  let { title, details } = post;
  return (
    <section className="container my-2 d-flex">
      <article className="jumbotron align-items-center vh-100">
        <figure className="text-center">
          <img
            src={faker.image.avatar()}
            alt={title}
            className="rounded-circle text-center"
          />
        </figure>
        <h2 className="text-success font-weight-bold text-uppercase text-center">
          {title}
        </h2>
        <p className="card-title">{details}</p>
        <Link to="/" className="btn btn-secondary">
          go back
        </Link>
      </article>
    </section>
  );
};

export default PostDetail;
