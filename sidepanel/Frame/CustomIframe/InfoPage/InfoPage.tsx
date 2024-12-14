import { FaHeadphones, FaSubway, FaWikipediaW } from "react-icons/fa";
import styles from "./InfoPage.module.css"
import { RiFileTextLine, RiYoutubeLine, RiTimeLine, RiSunCloudyLine } from "react-icons/ri";
import IconButton from "~sidepanel/IconButton/IconButton";
import { SiPhotopea } from "react-icons/si";

interface InfoPageProps {
  changeUrl: CallableFunction
}
const InfoPage = (
  {
    changeUrl
  }
) => {
  return (
    <div
      className={styles.messageContainer}
    >
      <div
        className={styles.message}
      >
        <div>
          Useful stuff
        </div>
        <div className={styles.buttonContainer}>
          <IconButton onClick={() => changeUrl("https://notepad-online.com/en/")}>
            <RiFileTextLine />
          </IconButton>
          <IconButton onClick={() => changeUrl("https://discovertube.xyz")}>
            <RiYoutubeLine />
          </IconButton>
          <IconButton onClick={() => changeUrl("https://www.wikipedia.org/")}>
            <FaWikipediaW />
          </IconButton>
          <IconButton onClick={() => changeUrl("https://www.clockfaceonline.com/clocks/digital/")}>
            <RiTimeLine />
          </IconButton>
          <IconButton onClick={() => changeUrl("https://www.worldweatheronline.com/country.aspx")}>
            <RiSunCloudyLine />
          </IconButton>
          <IconButton onClick={() => changeUrl("https://www.photopea.com/")}>
            <SiPhotopea />
          </IconButton>
        </div>
        <div>
          Also useful stuff
        </div>
        <div className={styles.buttonContainer}>
          <IconButton onClick={() => changeUrl("https://youtu.be/HuFYqnbVbzY")}>
          <FaHeadphones />
          </IconButton>
          <IconButton onClick={() => changeUrl("https://www.youtube.com/watch?v=zZ7AimPACzc")}>
            <FaSubway />
          </IconButton>
          <IconButton onClick={() => changeUrl("https://www.youtube.com/watch?v=tPEE9ZwTmy0&list=PLuOoSpwS0IXYRdujiK2zK6lMfGiiQbnON&pp=gAQB")}>
            😵‍💫
          </IconButton>
          <IconButton onClick={() => changeUrl("https://www.youtube.com/watch?v=q6EoRBvdVPQ&list=PLuOoSpwS0IXYS-BL1tlHbcQ-t_4xn26h2&index=1")}>
            👁️
          </IconButton>
        </div>

        <details name="help">
          <summary>How do I use this extension?</summary>
          <div>
            Through context menu:
            <ol>
              <li>Go to any website, or hover over a link.</li>
              <li>Right click to open the context menu.</li>
              <li>Press "Open website/link in sidepanel".</li>
              <li>The sidepanel should open and the website should be loaded in a panel.</li>
            </ol>
            or
            <ol>
              <li>Enter the url of the website at the bottom of a panel</li>
              <li>Press enter</li>
            </ol>
          </div>
        </details>

        <details name="help">
          <summary>I can't open a website in the panels.</summary>
          <div>
            Due to how iframe and cors work, these websites are disabled by default. There is a way
            to enable these websites through an extension called -
            <a
              href="https://chromewebstore.google.com/detail/hiframe-the-hyper-iframe/joibipdfkleencgfgbbncoheaekffdfn"
              target="_blank"
            >
              HiFrame.
            </a>
          </div>
        </details>
      </div>
    </div>
  );
}

export default InfoPage;