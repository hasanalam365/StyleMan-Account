import SectionHeader from "../../../Shared/SectionHeader/SectionHeader";

const ServiceCard = () => {
    return (

        <div>
            <SectionHeader heading="Services"></SectionHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

                <div className="border-b-4 rounded-xl border-b-red-600 shadow-xl image-full ">

                    <div className=" hover:scale-125 flex items-center justify-center p-6">
                        <h2 className="text-3xl font-semibold lg:text-2xl">24/7 Services</h2>
                    </div>
                </div>
                <div className="border-l-4 rounded-xl border-l-blue-600  shadow-xl image-full">

                    <div className=" hover:scale-125 flex items-center justify-center p-6">
                        <h2 className="text-3xl font-semibold lg:text-2xl">Blood Bank</h2>
                    </div>
                </div>
                <div className="border-t-4 rounded-xl border-t-purple-600  shadow-xl image-full">

                    <div className=" hover:scale-125 flex items-center justify-center p-6">
                        <h2 className="text-3xl font-semibold lg:text-2xl">Blood Donation</h2>
                    </div>
                </div>
                <div className="border-r-4 rounded-xl border-r-sky-900  shadow-xl image-full">
                    <div className=" hover:scale-125 flex items-center justify-center p-6">
                        <h2 className="text-3xl  font-semibold lg:text-2xl">Health Check</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;