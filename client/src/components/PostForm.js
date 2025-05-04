import { useState } from "react";
import "../styles/PostForm.css";

function PostForm() {
  const [link, setLink] = useState("");
  const [shortLink, setShortLink] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const linkToShorten = { link };

    const response = await fetch("http://localhost:9393/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(linkToShorten),
    });

    const newLink = await response.json();
    setShortLink(`http://localhost:9393/links/${newLink.id}`);
  };

  return (
    <div className="postform--container">
      <form className="postform--container__form" onSubmit={onSubmitForm}>
        <input onChange={(e) => setLink(e.target.value)} />
        <button type="submit">Generate Short Link</button>
      </form>

      <p>
        Shortened Link: <br /> <b>{shortLink}</b>
      </p>
    </div>
  );
}

export default PostForm;
