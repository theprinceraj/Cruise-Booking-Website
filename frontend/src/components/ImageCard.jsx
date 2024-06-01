export default function ImageCard({ imageName }) {
    return (
        <div
            className="image-card"
            style={{
                backgroundImage: `url("${imageName}")`,
            }}></div>
    );
}
