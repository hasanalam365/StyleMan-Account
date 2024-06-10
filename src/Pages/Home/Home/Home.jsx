
import Banner from "../Banner/Banner/Banner";
import Contact from "../Contact/Contact";
import Features from "../Features/Features";
import ServiceCard from "../ServiceCard/ServiceCard";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
    return (
        <div className=" w-[95%] md:w-[95%] mx-auto lg:container">
            <Banner></Banner>
            <ServiceCard></ServiceCard>
            <Features></Features>
            <Testimonial></Testimonial>
            <Contact></Contact>
        </div>
    );
};

export default Home;