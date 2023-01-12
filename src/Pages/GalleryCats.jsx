import { useCallback, useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import RefreshBtn from "../Components/RefreshBtn";

const GalleryCats = () => {
  const [catUrls, setCatUrls] = useState('');

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

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#121212] dark:text-white transition-all duration-500 pb-10">
      <div className="flex flex-wrap justify-center md:justify-start px-16 pt-2 gap-5">
        {catUrls
          ?
          (
            catUrls.map((catUrl) =>
              <div className="pt-4 md:pt-10" key={catUrl.id}>
                <div className="card" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
                  <div className="rounded-md w-60 h-64 mx-auto">
                    <img src={catUrl.url} alt="cat" className="rounded-md w-60 h-64 object-cover object-center" />
                  </div>
                  <div className="flex justify-center gap-x-5 duration-75">
                    <a href={catUrl.url} download target="_blank" rel="noreferrer" className="btn">Download</a>
                  </div>
                </div>
              </div>)
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