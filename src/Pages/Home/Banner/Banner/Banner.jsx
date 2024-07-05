import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
import Slider from "../Slider/Slider";




const Banner = () => {

    const img1 = 'https://i.ibb.co/h84xBbT/nguy-n-hi-p-2r-NHli-X6-XHk-unsplash.jpg '
    const img2 = 'https://i.ibb.co/9ntFH5B/mufid-majnun-Pz-Sga-Hs-Qmg-Y-unsplash.jpg'
    const img3 = 'https://i.ibb.co/smYS6bj/national-cancer-institute-o-CLu-Fi9-GYNA-unsplash.jpg'

    return (
        <div>

            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}

                modules={[Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Slider img={img1}></Slider>
                </SwiperSlide>
                <SwiperSlide>
                    <Slider img={img2}></Slider>
                </SwiperSlide>
                <SwiperSlide>
                    <Slider img={img3}></Slider>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Banner;
