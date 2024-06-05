import { useNavigate } from "react-router-dom";

// https://i.ibb.co/FwtXmWM/13346237-5197213.jpg
const ErrorPage = () => {

    const navigate = useNavigate()

    const handleGoHome = () => {
        navigate('/')
    }
    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <div>

            <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/FwtXmWM/13346237-5197213.jpg)' }}>
                <div className="hero-overlay bg-opacity-20"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="w-3/4 mx-auto">
                        <h1 className="mb-5 text-8xl font-bold">404</h1>
                        <p className="mb-5 text-xl">Sorry, we couldn't find this page.</p>

                        <div className="flex  text-center mx-auto">

                            <button onClick={handleGoHome} className="btn btn-primary mx-auto">Go Home</button>
                            <button onClick={handleGoBack} className="btn btn-secondary mx-auto">Go Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;