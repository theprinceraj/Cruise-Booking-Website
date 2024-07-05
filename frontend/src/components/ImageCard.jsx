export default function ImageCard({ imageUrl, category, customText, author }) {
    return (
        <div
            className="relative !bg-white rounded-xl overflow-hidden w-80 m-3 shadow-lg transition-transform transform hover:scale-105"
            style={{ backgroundColor: "white" }}>
            <div className="bg-cover bg-center h-52" style={{ backgroundImage: `url('${imageUrl}')` }}></div>
            <a
                href="#"
                className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent hover:to-black/60 transition-all duration-350"></a>
            <div className="p-4 relative">
                <div className="flex justify-between items-center mb-3">
                    <a className="bg-green-500 text-white text-xs uppercase px-2 py-1">{category}</a>
                    <div className="text-sm text-gray-500">6/11/2024</div>
                </div>
                <h1 className="text-xl mb-2">{customText}</h1>
                <div className="text-gray-600">
                    by{" "}
                    <a href="#" className="underline">
                        {author}
                    </a>
                </div>
            </div>
        </div>
    );
}
