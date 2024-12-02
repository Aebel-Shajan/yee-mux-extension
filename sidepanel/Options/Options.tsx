import styles from "./Options.module.css"
import { MdFeedback } from "react-icons/md";
import { FaGear } from "react-icons/fa6"
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import someCoolImage from "data-base64:~assets/icon.png"
import { useStorage } from "@plasmohq/storage/hook"

const Options = () => {
  const [showFrameOptions, setShowFrameOptions] = useStorage("showFrameOptions", true)

  return (
    <div className={styles.optionsContainer}>
      <a
        href={chrome.runtime.getURL('sidepanel.html')}
        target="_blank"
      >
        <img src={someCoolImage} />
      </a>
      <button
        onClick={() => setShowFrameOptions(!showFrameOptions)}
        style={
          showFrameOptions ?
            {} :
            { background: "#d63336" }
        }
      >
        {
          showFrameOptions ?
            <FaEye /> :
            <FaEyeSlash />
        }
      </button>
      <button>
        <FaGear />
      </button>
      <button>
        <MdFeedback />
      </button>
      <a
        href="https://github.com/Aebel-Shajan"
        target="_blank"
      >
        <FaGithub />
      </a>

    </div>
  );
}

export default Options;