import styles from "./PageLoader.module.css";

const PageLoader = () => {
    return (
        <div className={styles.loaderWrap}>
            <div className={styles.loader}>Loading...</div>
        </div>
    )
}

export default PageLoader;