import { useContext, useState, useEffect } from "react"
import AppContext from "../context/AppContext"
import axios from "axios"
import { toast } from "react-hot-toast"


const VerifyEmail = () => {

    const { userData, backendUrl, userToken, setUserData } = useContext(AppContext)
    const [otp, setOtp] = useState("");
    const [timeing, setTiming] = useState(false)

    const [timeLeft, setTimeLeft] = useState(0); // 60 seconds

    console.log("user data is", userData)

    useEffect(() => {
        if (timeLeft === 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer); // cleanup
    }, [timeLeft]);

    // format mm:ss
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };


    const sendOTP = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/auth/sendOTP`, {}, { headers: { token: userToken } })
            console.log("data  after sending otp ", data)
            if (data.success) {
                toast.success(data.message)
                setTimeLeft(60)
            } else
                toast.error(data.message)
        } catch (error) {
            console.log(error)
        }
    }

    //verify calling 
    const verify = async (e) => {
        try {
            e.preventDefault()
            const { data } = await axios.post(`${backendUrl}/auth/verifyOtp`, { otp: otp }, { headers: { token: userToken } })
            console.log("verify otp response", data)
            if (data.success) {
                setUserData(data.user);
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <div>
            <style>{`
                @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
            
                * {
                    font-family: "Poppins", sans-serif;
                }
            `}</style>
            <section className='relative my-5 md:px-10 py-10 lg:mx-32 rounded-2xl text-black  bg-gray-200 flex  md:flex-row justify-center px-4 md:py-20 gap-20  flex-col-reverse '>


                <div className='text-center md:text-left mt-12'>
                    <div className="flex items-center  p-1.5 rounded-full border border-green-900 text-xs w-fit mx-auto md:mx-0">
                        <div className="flex items-center">
                            <img className="size-7 rounded-full border border-green-900" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50" alt="userImage1" />
                            <img className="size-7 rounded-full border border-green-900 -translate-x-2" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50" alt="userImage2" />
                            <img className="size-7 rounded-full border border-green-900 -translate-x-4" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop" alt="userImage3" />
                        </div>
                        <p className="-translate-x-2 text-xs text-gray-500">Join community of 1m+ founders </p>
                    </div>
                    <h1 className='font-medium text-3xl md:text-5xl/15 bg-linear-to-r max-md:mx-auto from-white to-green-300 bg-clip-text text-gray-500 max-w-[470px] mt-4'>Ready to Transform Your Digital Experience?</h1>
                    <p className='text-sm/6 text-gray-500 max-w-[345px] mt-4 mx-auto md:mx-0'>Let our design team craft a website that elevates your brand. Book a free session today.</p>
                </div>

                <div className='w-full max-w-lg max-md:mx-auto bg-[#00A63E]/0 backdrop-blur-sm border border-white/10 rounded-xl p-8'>
                    <form className='space-y-6  '>
                        <div>
                            <label className='block text-gray-800 text-sm mb-2'>Email</label>
                            <input
                                value={userData?.email || ""}
                                type="email"
                                required
                                className='w-full bg-[#00A63E]/5 border border-gray-500 rounded-lg px-4 py-3 text-gray-800 placeholder:text-white/40 placeholder:text-sm focus:outline-none focus:border-green-600 transition'
                            />
                        </div>

                        <button
                            type="button"
                            disabled={timeLeft > 0 || userData?.verify}
                            title={userData?.verify ? "You have already verified" : timeLeft > 0 ? "Wait for current OTP to expire" : ""}
                            className={`border border-white px-4 py-2 rounded-xl bg-green-950 text-white  ${(timeLeft > 0 || userData?.verify) ? "cursor-not-allowed opacity-60" : "cursor-pointer"} `}
                            onClick={sendOTP}
                        >
                            Send OTP
                        </button>

                        <div>
                            <label className='block text-gray-800 text-sm mb-2'>Otp</label>
                            <input
                                onChange={(e) => setOtp(e.target.value)}
                                type="text"
                                required
                                className='w-full bg-[#00A63E]/5 border border-gray-800 rounded-lg px-4 py-3 text-gray-800 placeholder:text-white/40 placeholder:text-sm focus:outline-none focus:border-green-600 transition'
                            />
                        </div>
                        <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                            {timeLeft > 0 ? <>OTP expires in: {formatTime(timeLeft)}</> : null}
                        </div>

                        <div className='flex items-center justify-between'>
                            <p className='text-xs md:text-sm text-gray-700 max-w-3xs'>
                                By submitting, you agree to our <span className='text-gray-800'>Terms</span> and <span className='text-gray-800'>Privacy Policy</span>.
                            </p>
                            <button
                                disabled={userData?.verify}
                                title={userData?.verify ? "You have already verified" : ""}
                                onClick={(e) => verify(e)}
                                type="submit"
                                className={`bg-liner-to-r from-red-600 to-red-900 bg-green-600  border-2 border-green-900 hover:from-green-600 hover:to-green-950 text-white text-md px-5 md:px-16 py-3 rounded-full transition duration-300 cursor-pointer    ${userData?.verify ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}>
                                Verify
                            </button>
                        </div>
                    </form>

                    {userData?.verify && (
                        <span className="absolute color-white bottom-full mb-2  group-hover:block  text-red-500 text-xs px-2 py-1 rounded">
                            You have  verified
                        </span>
                    )}
                </div>
            </section>
        </div>
    )
}

export default VerifyEmail
