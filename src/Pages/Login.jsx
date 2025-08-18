import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const Login = () => {
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        if (result?.user) {
          toast.success("Login Successfully!", {
            position: "top-center",
            autoClose: 1500,
          });
          setTimeout(() => {
            navigate(location?.state || "/");
          }, 1500);
        }
      })
      .catch(() => {
        toast.error("Invalid email or password", {
          position: "top-center",
          autoClose: 2000,
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-red-900 to-black relative overflow-hidden">
      <Helmet>
        <title>Shop | Login</title>
      </Helmet>

      {/* Animated background shapes */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: [0, 20, 0], opacity: 1 }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-32 h-32 bg-red-500 rounded-full blur-3xl opacity-30"
      ></motion.div>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: [0, -20, 0], opacity: 1 }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-40 h-40 bg-red-400 rounded-full blur-3xl opacity-20"
      ></motion.div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-[350px] md:w-[400px] lg:w-[400px] relative z-10 border border-white/20"
      >
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-center text-white mb-6"
        >
          🔐 Welcome Back
        </motion.h1>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="form-control"
          >
            <label className="input input-bordered flex items-center gap-2 bg-white/20 border-white/30 text-white">
              <MdOutlineMailOutline className="text-xl" />
              <input
                type="email"
                name="email"
                className="grow bg-transparent outline-none placeholder-gray-200"
                placeholder="Enter your email"
                required
              />
            </label>
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="form-control"
          >
            <label className="input input-bordered flex items-center gap-2 bg-white/20 border-white/30 text-white">
              <RiLockPasswordLine className="text-xl" />
              <input
                type="password"
                name="password"
                className="grow bg-transparent outline-none placeholder-gray-200"
                placeholder="Enter your password"
                required
              />
            </label>
            {/* <div className="text-right mt-2">
              <a
                href="#"
                className="text-sm text-red-300 hover:text-red-400 transition"
              >
                Forgot password?
              </a>
            </div> */}
          </motion.div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn w-full bg-red-600 hover:bg-red-700 text-white text-lg rounded-xl shadow-lg transition"
          >
            Login
          </motion.button>

          {/* Register link
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-sm text-gray-200"
          >
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-red-400 font-bold">
              Register
            </Link>
          </motion.p> */}
        </form>
        
          </motion.div>
          <ToastContainer />
    </div>
  );
};

export default Login;
