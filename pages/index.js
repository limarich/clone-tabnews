import { useEffect, useRef, useState } from "react";
import styles from "./home.module.css"; 

function Home() {
       const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const handleVideoClick = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = false; 

        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = true; 
            videoRef.current.play().catch((err) => {
                console.warn("Autoplay bloqueado:", err);
            });
        }
    }, []);

    return (
        <div className={styles["video-container"]}>
            <video
                ref={videoRef}
                className={styles["background-video"]}
                src="/boa-noite.mp4"
                autoPlay
                loop
                playsInline
                onClick={handleVideoClick}
            />
            <div className={styles["overlay-content"]}>
                <h1>Bem-vindo à Home</h1>
            </div>
        </div>
    );
}

export default Home;
