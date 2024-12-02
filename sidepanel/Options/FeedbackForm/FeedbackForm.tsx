import { useState } from "react";
import styles from "./FeedbackForm.module.css"

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
    <div className={styles.feedbackModal}>
      <div className={styles.feedbackContainer}>

      <div className={styles.title}>
        <button
          onClick={() => onClose()}
        >
          x
        </button>
        <h3>Feedback form</h3>
      </div>
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
          <input type="email" name="email" required />
        </div>
        <div>
          <label>Feedback</label>
          <textarea 
          name="message" 
          required
          placeholder="Write feedback here, can be bug report, feature request or any nice words you have for the dev..."
          
          ></textarea>
        </div>
        <button 
        style={{width: "100%"}}
        
        type="submit">Submit Form</button>
      </form>
      <span style={{color: "white"}}>{result}</span>
      </div>

    </div>
  );
}

export default FeedbackForm;