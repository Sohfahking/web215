import { useState } from "react";

export default function IntroForm() {
  const [data, setData] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const form = new FormData(e.target);

    const first = form.get("first");
    const middle = form.get("middle");
    const last = form.get("last");

    // Process middle initial
    const middleInitial = middle ? middle.trim().charAt(0).toUpperCase() + "." : "";

    setData({
      fullName: `${first} ${middleInitial} ${last}`.trim(),
      about: form.get("about"),
      personal: form.get("personal"),
      professional: form.get("professional"),
      academic: form.get("academic"),
      background_subject: form.get("background_subject"),
      platform: form.get("platform"),
      image: form.get("image"),
      caption: form.get("caption"),
      courses: form.getAll("courses[]").filter(c => c.trim() !== ""),
      funFact: form.get("funFact")
    });
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      {!data && (
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input name="first" defaultValue="Dajabre" required />
          </label>

          <label>
            Middle Initial:
            <input name="middle" maxLength="1" />
          </label>

          <label>
            Last Name:
            <input name="last" defaultValue="Torain-Williams" required />
          </label>

          <label>
            About You:
            <textarea name="about" rows="4" defaultValue="My name is Dajabre..." />
          </label>

          <label>
            Personal Background:
            <textarea name="personal" rows="2" />
          </label>

          <label>
            Professional Background:
            <textarea name="professional" rows="2" />
          </label>

          <label>
            Academic Background:
            <textarea name="academic" rows="2" />
          </label>

          <label>
            Background in This Subject:
            <textarea name="background_subject" rows="2" />
          </label>

          <label>
            Primary Computer Platform:
            <input name="platform" />
          </label>

          <label>
            Image URL:
            <input name="image" defaultValue="images/gudetamame.png" />
          </label>

          <label>
            Caption:
            <input name="caption" defaultValue="My Mood" />
          </label>

          <label>
            Course 1:
            <input name="courses[]" />
          </label>
          <label>
            Course 2:
            <input name="courses[]" />
          </label>
          <label>
            Course 3:
            <input name="courses[]" />
          </label>

          <label>
            Fun Fact:
            <input name="funFact" defaultValue="I crochet and design my own clothing!" />
          </label>

          <button type="submit">Generate Introduction</button>
        </form>
      )}

      {data && (
        <div>
          <h3>{data.fullName}</h3>

          <figure style={{ textAlign: "center" }}>
            <img
              src={data.image}
              alt="Profile"
              style={{ maxWidth: "200px", display: "block", margin: "0 auto" }}
            />
            <figcaption>{data.caption}</figcaption>
          </figure>

          <p>{data.about}</p>

          <ul>
            {data.personal && <li><strong>Personal:</strong> {data.personal}</li>}
            {data.professional && <li><strong>Professional:</strong> {data.professional}</li>}
            {data.academic && <li><strong>Academic:</strong> {data.academic}</li>}
            {data.background_subject && <li><strong>Background:</strong> {data.background_subject}</li>}
            {data.platform && <li><strong>Platform:</strong> {data.platform}</li>}
            {data.courses.length > 0 && (
              <li>
                <strong>Courses:</strong>
                <ul>
                  {data.courses.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </li>
            )}
            {data.funFact && <li><strong>Fun Fact:</strong> {data.funFact}</li>}
          </ul>
        </div>
      )}
    </div>
  );
}

