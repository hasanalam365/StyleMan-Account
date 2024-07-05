import { Typewriter } from 'react-simple-typewriter'

const Slider = ({ img }) => {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: `url(${img})`,
            }}>
            <div className="hero-overlay bg-opacity-20"></div>
            <div className="hero-content text-white text-center">
                <div className="w-full md:w-3/4 lg:w-3/4">
                    {/* <h1 className="mb-5 text-3xl md:text-4xl lg:text-5xl font-bold">Give the Gift of Life: Donate Blood Today</h1>
                    <p className="mb-5">
                        Every drop of blood you donate has the power to save lives and restore hope to patients and their families. Become a hero by donating blood today
                    </p> */}
                    <div className='space-y-2'>
                        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold flex flex-col'>
                            Give the Gift of Life:{' '}
                            <span className='text-red-600'>
                                {/* Style will be inherited from the parent element */}
                                <Typewriter
                                    words={['Donate Blood Today']}
                                    loop={5}
                                    cursor
                                    cursorStyle='_'
                                    typeSpeed={70}
                                    deleteSpeed={50}
                                    delaySpeed={1000}

                                />
                            </span>

                        </h1>
                        <p className="mb-5">
                            Every drop of blood you donate has the power to save lives and restore hope to patients and their families. Become a hero by donating blood today
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Slider;