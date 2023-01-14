import { useCallback, useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import RefreshBtn from "../Components/RefreshBtn";
import { MdOutlineFileDownload } from "react-icons/md";

const GalleryCats = () => {
  const [catUrls, setCatUrls] = useState('');
  const [likes, setLikes] = useState(JSON.parse(localStorage.getItem("likes")) || {});
  const [liked, setLiked] = useState(false);
  const [showLikesOnly, setShowLikesOnly] = useState(false);

  const getCat = useCallback(async () => {
    try {
      const res = await fetch('https://api.thecatapi.com/v1/images/search?limit=10')
      const data = await res.json() // data in json
      const catImageUrlList = await data.map(cat => cat);
      setCatUrls(catImageUrlList);
    } catch (error) {
      console.log(error)
    }

  }, [setCatUrls]);

  useEffect(() => {
    getCat()
  }, [getCat])

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [likes])

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#121212] dark:text-white transition-all duration-500 pb-10">

      <div className="flex justify-end pr-3 md:pr-16"><button onClick={() => setShowLikesOnly(!showLikesOnly)} className="px-8 py-3 text-black dark:text-slate-400 dark:hover:text-white text-center mt-8 text-xl cursor-pointer hover:underline underline-offset-4 decoration-red-200 transition-all duration-200">
        Favorites
      </button></div>

      <div className="flex flex-wrap justify-center md:justify-start px-3 md:px-16 pt-10 gap-5">
        {
          catUrls
            ?
            (
              catUrls
                .filter(catUrl => !showLikesOnly || likes[catUrl.id])
                .map((catUrl) =>
                  <div className="relative" key={catUrl.id} data-aos="fade-up" data-aos-duration="800" data-aos-once="true">
                    <img src={catUrl.url} alt="cat" className="h-72 w-[10.3rem] md:h-60 md:w-full object-cover rounded-md" />
                    <div className="absolute bottom-0 right-0 p-2">
                      <button onClick={function () { setLikes({ ...likes, [catUrl.id]: !likes[catUrl.id] }); setLiked(true) }}>

                        {
                          liked & likes[catUrl.id]
                            ?
                            <div className="flex gap-x-2">
                              <AiFillHeart size={35} className="hover:bg-red-200 text-red-100 font-semibold hover:text-white p-1 rounded-full transition-all duration-200" />
                              <a href={catUrl.url} download target="_blank" rel="noreferrer">
                                <MdOutlineFileDownload size={35} className="hover:bg-red-200 text-red-100 font-semibold hover:text-white p-1 rounded-full transition-all duration-200" />
                              </a>
                            </div>
                            :
                            <div className="flex gap-x-2">
                              <AiOutlineHeart size={35} className="hover:bg-red-200 text-red-100 font-semibold hover:text-white p-1 rounded-full transition-all duration-200" />
                              <a href={catUrl.url} download target="_blank" rel="noreferrer">
                                <MdOutlineFileDownload size={35} className="hover:bg-red-200 text-red-100 font-semibold hover:text-white p-1 rounded-full transition-all duration-200" />
                              </a>
                            </div>
                        }

                      </button>
                    </div>
                  </div>
                )
            )
            :
            (
              <div className="pt-4 md:pt-10 mx-auto m-20">
                <CgSpinner size={90} className="animate-spin mx-auto " />
              </div>
            )
        }
      </div>
      <RefreshBtn path="/cats" get="getCats" />
    </div>
  )
}

export default GalleryCats