
const Contact = () => {
    return (
        <div className="bg-gray-100 mt-10 mb-10">

            <div className="flex flex-col-reverse max-w-screen-xl justify-between gap-8 px-8 py-16 mx-auto rounded-lg  md:flex-row lg:flex-row md:px-12 lg:px-16 xl:px-32 dark:bg-gray-100 dark:text-gray-800 ">

                <form className="space-y-6 flex-1">
                    <div>
                        <label htmlFor="name" className="text-sm">Full name</label>
                        <input id="name" type="text" placeholder="" className="w-full p-3 rounded dark:bg-gray-100" />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm">Email</label>
                        <input id="email" type="email" className="w-full p-3 rounded dark:bg-gray-100" />
                    </div>
                    <div>
                        <label htmlFor="message" className="text-sm">Message</label>
                        <textarea id="message" rows="3" className="w-full p-3 rounded dark:bg-gray-100"></textarea>
                    </div>
                    <button className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded-2xl dark:bg-default-600 dark:text-gray-50 btn bg-orange-300 r">Send Message</button>
                </form>
                <div className="flex flex-col gap-3 flex-1">
                    <div className="space-y-2">
                        <h2 className="text-4xl font-bold leading-tight lg:text-5xl">Contact Us</h2>
                        <div className="dark:text-gray-600">Any question? Please send  your openion</div>
                    </div>
                    <img src="https://i.ibb.co/m5VCBwz/NA-SEP-03.jpg" alt="" className=" h-52 md:h-64" />
                </div>
            </div>
        </div>
    );
};

export default Contact;