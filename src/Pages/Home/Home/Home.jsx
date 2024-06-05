
import Banner from "../Banner/Banner/Banner";
import Contact from "../Contact/Contact";
import Features from "../Features/Features";
import ServiceCard from "../ServiceCard/ServiceCard";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ServiceCard></ServiceCard>
            <Features></Features>
            <Testimonial></Testimonial>
            <Contact></Contact>
        </div>
    );
};

export default Home;