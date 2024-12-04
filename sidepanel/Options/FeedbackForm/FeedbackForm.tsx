import { useState } from "react";
import styles from "./FeedbackForm.module.css"
import Modal from "~sidepanel/Modal/Modal";

interface FeedbackFormProps {
  onClose: CallableFunction
}

const FeedbackForm = (
  {
    onClose
  }: FeedbackFormProps
) => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "86168a8b-2a69-46e2-800e-8016f5907618");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
      onClose()
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <Modal onClose={onClose}>

      <div className={styles.feedbackContainer}>

        <h1
          className={styles.title}
        >
          Feedback form
        </h1>

        <form
          className={styles.feedbackForm}
          onSubmit={onSubmit}
        >
          <div>
            <label>Name</label>
            <input type="text" name="name" required />
          </div>
          <div>
            <label>Email</label>
            <input 
              type="email"
              name="email"
               />
          </div>
          <div>
            <label>Feedback</label>
            <textarea
              name="message"
              required
              placeholder="Write feedback here, can be bug report 🐞, feature requests 🧪 or anything else that can improve the extension."
            ></textarea>
          </div>
          <button
            style={{ width: "100%" }}
            type="submit">
            Submit Form
          </button>
        </form>
        <span style={{ color: "white" }}>{result}</span>
      <div className={styles.info}>
        <p>
          Thanks for using my extension :). 
        </p>

        <p>
          I look forward to hearing what you have to say.
        </p>

        <p>
          Apologies if there is a bug or if the extension
          does not work.
          I will try and get a fix released as soon as possible if there is such an issue.
        </p>

      </div>
      </div>
    </Modal>

  );
}

export default FeedbackForm;