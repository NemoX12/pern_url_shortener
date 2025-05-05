import { useState } from "react";
import "../styles/PostForm.css";

function PostForm() {
  const [link, setLink] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [error, setError] = useState("");

  const isValidUrl = (link) => {
    try {
      new URL(link);
      return true;
    } catch (err) {
      return false;
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setError("");
    setShortLink("");

    const linkToShorten = { link };

    try {
      if (!isValidUrl(link.trim())) {
        setError("Enter a vaild URL.");
        return;
      }

      const response = await fetch("http://localhost:9393/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(linkToShorten),
      });

      if (!response.ok) {
        throw new Error("Failed to shorten the link. Please try again.");
      }

      const newLink = await response.json();
      setShortLink(`http://localhost:9393/${newLink.id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="postform-container">
      <form className="postform-container__form" onSubmit={onSubmitForm}>
        <label className="link_input">
          <input
            onChange={(e) => setLink(e.target.value)}
            required
            placeholder="Enter link..."
          />
        </label>
        <button type="submit">Generate Link</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {shortLink && (
        <p className="output">
          Shortened Link: <br /> <b>{shortLink}</b>
        </p>
      )}
    </div>
  );
}

export default PostForm;
