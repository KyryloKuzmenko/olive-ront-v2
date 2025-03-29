import styles from "./LocateButton.module.css";

const LocateButton = ({ mapRef, userLocation }) => {
    const handleClick = () => {
        const map = mapRef.current;
        if (map && userLocation) {
            map.setView(userLocation, 16);
        }
    };

    return (
        <button className={styles.locateBtn} onClick={handleClick}>
            📍
        </button>
    );
};

export default LocateButton;