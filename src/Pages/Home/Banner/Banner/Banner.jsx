import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div>

            <div className="hero h-[350px] md:h-[450px] lg:h-[600px]" style={{ backgroundImage: 'url(https://i.ibb.co/LQMwjrD/nguy-n-hi-p-2r-NHli-X6-XHk-unsplash.jpg)' }}>
                <div className="hero-overlay bg-opacity-30"></div>
                <div className="hero-content text-white">
                    <div className="text-center w-[90%] lg:w-3/4 mx-auto">
                        <h1 className="mb-2 lg:mb-5 text-2xl md:text-4xl lg:text-5xl font-bold">Give the Gift of Life: Donate Blood Today</h1>
                        <p className="mb-2 lg:mb-5 ">Every drop of blood you donate has the power to save lives and restore hope to patients and their families. Become a hero by donating blood today</p>
                        <div className="flex gap-5  w-[90%] lg:w-[37%] lg:mx-auto ml-10 md:mx-auto md:w-[45%]">
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