import styles from "./Options.module.css"
import { MdFeedback } from "react-icons/md";
import { FaEye, FaEyeSlash, FaGithub, FaQuestion } from "react-icons/fa";
import someCoolImage from "data-base64:~assets/icon.png"
import { useStorage } from "@plasmohq/storage/hook"
import { useState } from "react";
import FeedbackForm from "./FeedbackForm/FeedbackForm";
import { Tooltip } from 'react-tooltip';
import HelpPage from "./HelpPage/HelpPage";
import { LuRectangleHorizontal, LuRectangleVertical } from "react-icons/lu";


const Options = () => {
  const [showFrameOptions, setShowFrameOptions] = useStorage("showFrameOptions", true)
  const [landscape, setLandscape] = useStorage("landscape", false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showHelp, setShowHelp] = useState(false)


  function handleOpenTab() {
    window.close() 
  }
  return (
    <div className={styles.optionsContainer}>
      <div>

        <a
          href={chrome.runtime.getURL('sidepanel.html')}
          target="_blank"
          data-tooltip-id="open-tab"
          onClick={handleOpenTab}
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
          data-tooltip-id="toggle-frame-options"
        >
          {
            showFrameOptions ?
              <FaEye /> :
              <FaEyeSlash />
          }
        </button>
        <button
          onClick={() => setLandscape(!landscape)}
          style={
            landscape ?
              { background: "#d63336" } :
              {}
          }
          data-tooltip-id="toggle-landscape"

        >
          {
            landscape ?
              <LuRectangleHorizontal /> :
              <LuRectangleVertical />

          }


        </button>
      </div>
      <div className={styles.infoButtons}>
        <button
          onClick={() => setShowFeedback(true)}
          data-tooltip-id="give-feedback"
        >
          <MdFeedback />
        </button>
        <button
          onClick={() => setShowHelp(true)}
          data-tooltip-id="show-help"
        >
          <FaQuestion />
        </button>
        <a
          href="https://github.com/Aebel-Shajan"
          target="_blank"
          data-tooltip-id="follow-github"
        >
          <FaGithub />
        </a>
      </div>


      {
        showFeedback &&
        <FeedbackForm
          onClose={() => setShowFeedback(false)}
        />
      }

      {
        showHelp &&
        <HelpPage
          onClose={() => setShowHelp(false)}
        />
      }
      <Tooltip id="open-tab" place="bottom-start">
        Open yeemux in tab
      </Tooltip>
      <Tooltip id="toggle-frame-options" place="bottom-start">
        {(showFrameOptions ? "hide" : "show") + " frame options"}
      </Tooltip>
      <Tooltip id="toggle-landscape" place="bottom-start">
        {(landscape ? "Rotate to portrait" : "Rotate to landscape")}
      </Tooltip>
      <Tooltip id="give-feedback" place="bottom-start">
        Give Feedback
      </Tooltip>
      <Tooltip id="show-help" place="bottom-start">
        Help / FAQ
      </Tooltip>
      <Tooltip id="follow-github" place="bottom-start">
        Follow me on github 👨‍🎨
      </Tooltip>

    </div>
  );
}

export default Options;