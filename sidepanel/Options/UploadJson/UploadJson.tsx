import { assert } from "console";
import { useRef, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { frameTree } from "~sidepanel";
import { loadTree, saveTree } from "~sidepanel/Frame/FrameUtils";
import Modal from "~sidepanel/Modal/Modal";
import styles from "./UploadJson.module.css"

interface UploadJsonProps {
  onClose: CallableFunction,
  forceRefresh: CallableFunction
}
const UploadJson = (
  {
    onClose,
    forceRefresh
  }: UploadJsonProps
) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasValidFile, setHasValidFile] = useState(false)
  const [jsonToLoad, setJsonToLoad] = useState(null)


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          if (
            json && typeof json === 'object' &&
            'data' in json && 'left' in json &&
            'right' in json
          ) {
            setHasValidFile(true)
          } else {
            throw new Error("Invalid tree node");
          }
          setJsonToLoad({ ...json })
        } catch (error) {
          alert(error);
          setHasValidFile(false)
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }
      };
      reader.readAsText(file);
    }
  };

  function handleLoadFrame() {
    if (hasValidFile && jsonToLoad) {

      saveTree(jsonToLoad)
      setHasValidFile(false)
      setJsonToLoad(null)
      onClose()      
      forceRefresh()
    } else {
      alert("Couldnt load json as layout! 😟")
    }
  }

  return (
    <Modal onClose={onClose}>
      <div className={styles.uploadJsonContainer}>

        <h1>
          Load layout
        </h1>
        <div className={styles.uploadForm}>
          Choose a json file to load a layout from. The json must
          have been downloaded from this extension.
          <input
            type="file"
            ref={fileInputRef}
            accept=".json"
            onChange={handleFileUpload}
          />
          <button
            onClick={handleLoadFrame}
            style={{width: "fit-content"}}
          >
            Load layout<BiChevronRight />
          </button>
        </div>
      </div>

    </Modal>
  );
}

export default UploadJson;