import styles from "./Scale.module.css"

interface ScaleProps {
  scale?: number,
  children: React.ReactNode
}


const Scale = ({ scale = 1, children }: ScaleProps) => {
  return (
    <div className={styles.baseContainer}>
      <div
        className={styles.scaleContainer}
        style={{
          width: `${100 / scale}%`,
          height: `${100 / scale}%`,
          transform: `scale(${scale})`,
          transformOrigin: "0 0"

        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Scale;