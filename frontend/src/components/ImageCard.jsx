export default function ImageCard({ imageUrl, category, customText, tagBgColor }) {
    return (
        <div
            className="rounded-xl overflow-hidden w-80 m-3 shadow-lg transition-transform transform container-bordershadow"
            style={{ backgroundColor: "white", color: "black" }}>
            <div className="bg-cover bg-center h-52" style={{ backgroundImage: `url('${imageUrl}')` }}></div>
            <div className="p-4 relative">
                <div className="flex justify-between items-center mb-3">
                    <a
                        className="text-xs uppercase px-2 py-1"
                        style={{
                            color: "white",
                            backgroundColor: tagBgColor,
                        }}>
                        {category}
                    </a>
                </div>
                <h1 className="text-xl mb-2" style={{ color: "black" }}>
                    {customText}
                </h1>
                <a
                    href="https://www.instagram.com/lenincruises/"
                    className="underline flex items-center"
                    target="_blank">
                    <span className="font-normal underline" style={{ color: "rgba(0, 0, 0, 0.75)" }}>
                        VIEW MORE{" "}
                    </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        viewBox="0 0 21 21"
                        style={{ fill: "rgba(0, 0, 0, 0.75)", transform: "", msFilter: "" }}>
                        <path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path>
                        <path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path>
                    </svg>
                </a>
            </div>
        </div>
    );
}
