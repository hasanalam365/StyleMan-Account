import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div>

            <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/LQMwjrD/nguy-n-hi-p-2r-NHli-X6-XHk-unsplash.jpg)' }}>
                <div className="hero-overlay bg-opacity-30"></div>
                <div className="hero-content text-white">
                    <div className="text-center w-3/4 mx-auto">
                        <h1 className="mb-5 text-5xl font-bold">Give the Gift of Life: Donate Blood Today</h1>
                        <p className="mb-5 ">Every drop of blood you donate has the power to save lives and restore hope to patients and their families. Become a hero by donating blood today</p>
                        <div className="flex gap-5  w-[37%] mx-auto ">
                            <Link to='/register'>
                                <button className="btn btn-primary">Join as a Donor</button>
                            </Link>
                            <Link to="/searchDonors">
                                <button className="btn btn-secondary">Search Donors</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;

{/* <Carousel>
                <div className='h-[600px]'>
                    <img src="https://i.ibb.co/LQMwjrD/nguy-n-hi-p-2r-NHli-X6-XHk-unsplash.jpg" />

                </div>
                <div>
                    <img src="https://i.ibb.co/fr9zc0j/nguy-n-hi-p-ma-Ye-Ml3x-Cr-Y-unsplash.jpg" />

                </div>
                <div>
                    <img src="https://i.ibb.co/Wf4mVCj/luann-hunt-X20g2-GQs-Vd-A-unsplash.jpg" />

                </div>
                <div>
                    <img src="https://i.ibb.co/qxQwQJL/nguy-n-hi-p-s-TTea-N4wwr-U-unsplash.jpg" />

                </div>
            </Carousel> */}