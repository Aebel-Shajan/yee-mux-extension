import styles from "./Options.module.css"
import { MdFeedback } from "react-icons/md";
import { FaDownload, FaEye, FaEyeSlash, FaGithub, FaQuestion, FaUpload } from "react-icons/fa";
import someCoolImage from "data-base64:~assets/icon.png"
import { useStorage } from "@plasmohq/storage/hook"
import { useState } from "react";
import FeedbackForm from "./FeedbackForm/FeedbackForm";
import { Tooltip } from 'react-tooltip';
import HelpPage from "./HelpPage/HelpPage";
import { LuRectangleHorizontal, LuRectangleVertical } from "react-icons/lu";
import { frameTree } from "~sidepanel";
import { useRef } from "react";
import Modal from "~sidepanel/Modal/Modal"; // Import your custom Modal component
import { BiChevronRight } from "react-icons/bi";
import UploadJson from "./UploadJson/UploadJson";

interface OptionsProps {
  forceRefresh: CallableFunction
}

const Options = (
  {
    forceRefresh
  }: OptionsProps
) => {
  const [showFrameOptions, setShowFrameOptions] = useStorage("showFrameOptions", true)
  const [landscape, setLandscape] = useStorage("landscape", false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showUpload, setshowUpload] = useState(false);



  function downloadFrameTree() {
    const data = frameTree;
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "yee-mux-layout.json";
    a.click();
    URL.revokeObjectURL(url);
  }



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
        <div>
        <button
          onClick={downloadFrameTree}
          data-tooltip-id="download-json"
        >
          <FaDownload />
        </button>

        <button
          onClick={() => setshowUpload(true)}
          data-tooltip-id="upload-json"
        >
          <FaUpload />
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



      {showUpload && (
        <UploadJson
          forceRefresh={forceRefresh}
          onClose={() => setshowUpload(false)}
        />
      )}


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
      <Tooltip id="download-json" place="bottom-start">
        Download layout as json
      </Tooltip>
      <Tooltip id="upload-json" place="bottom-start">
        Upload a custom layout
      </Tooltip>
    </div>
  );
}
export default Options;