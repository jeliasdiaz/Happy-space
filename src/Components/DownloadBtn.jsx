import { AiOutlineDownload } from "react-icons/ai";
import { downloadImage } from "../utils/downloadImage";

export const DownloadBtn = ({ url }) => {
    const handleDownload = () => {
        const filename = url.split("/").pop().split("?")[0] || "happy-space.jpg";
        downloadImage(url, filename);
    };

    return (
        <button onClick={handleDownload} aria-label="Download image">
            <span className="p-0.5 backdrop-blur-sm rounded-full">
                <AiOutlineDownload size={35} className="hover:bg-white/30 text-white font-semibold p-1 rounded-full transition-all duration-200" />
            </span>
        </button>
    )
}
