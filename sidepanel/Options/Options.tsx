import styles from "./Options.module.css"
import { MdFeedback } from "react-icons/md";
import { FaGear } from "react-icons/fa6"
import { FaEye, FaGithub } from "react-icons/fa";
import someCoolImage from "data-base64:~assets/icon.png"

const Options = () => {
  return (
    <div className={styles.optionsContainer}>
      <a 
        href={chrome.runtime.getURL('sidepanel.html')}
        target="_blank"
        >
        <img src={someCoolImage} />
      </a>
      <button>
        <FaEye />
      </button>
      <button>
        <FaGear />
      </button>
      <button>
        <MdFeedback />
      </button>
      <button>
        <FaGithub />
      </button>

    </div>
  );
}

export default Options;