import Image from "next/image";
import loader from "@/assets/loader.gif";

const LoadingPAge = () => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            backgroundColor: "#f0f0f0"
        }}>
            <Image src={loader} alt="Loading..." height={150} width={150}/>
        </div>
    );
};

export default LoadingPAge;