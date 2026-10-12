import { useSiteSettings } from '../../context/SiteSettings';
import { Link, useNavigate } from 'react-router-dom';
import { SetStateAction, useEffect, useState } from 'react';
import useColorMode from '../../hooks/useColorMode';
import { Verifyemail } from '../../components/verifyemail';
import { axiosInstance, axiosInstanceNoToken } from '../../axios/config';
import toast from 'react-hot-toast';
interface FormData {
  name: string;
  password: string;
  email: string;
  coach_name: string;
  phone: string;
}

const SignUp = () => {
  const { loginImage } = useSiteSettings();
  let navigate = useNavigate()
  let userDetails = localStorage.getItem("user");
  const [colorMode, setColorMode] = useColorMode();
  const [verifymailcomponent, setverifymailcomponent] = useState(false);
  const [secondForm, setSecondForm] = useState(false);
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [collectedOtp, setcollectedOtp] = useState();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    password: '',
    email: '',
    coach_name: '',
    phone: '',
  });



  useEffect(() => {
    if (typeof setColorMode === 'function') {
      setColorMode('dark');
    }
    if (userDetails) {
      const user = JSON.parse(userDetails)?.access || false;
      user ? navigate('/home') : console.log('please Login');

    }
  }, []);
  

  
  const handlePasswordChange = (event: { target: { value: SetStateAction<string> } }) => {
    setPassword(event.target.value);
    // Check if passwords match when password changes
    setPasswordsMatch(event.target.value === retypePassword);
  };

  const handleRetypePasswordChange = (event: { target: { value: SetStateAction<string> } }) => {
    setRetypePassword(event.target.value);
    // Check if passwords match when retype password changes
    setPasswordsMatch(event.target.value === password);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleSubmit = async ( ) => {

    if (formData.name.length==0 || password.length==0 || formData.email.length==0 || formData.phone.length==0 ||formData.coach_name.length==0) {
      toast.error('Please Fill All The Input Fields...', {
        position: 'top-center',
      });
      return;
    }
    

    else if (password === retypePassword) {
      try {
        // Make a POST request using Axios
        const { data }: any = await axiosInstanceNoToken.post(
          '/api/clubs/otpcreate/',
          { email: formData.email, password: formData.password },
        );

        setcollectedOtp(data.otp);

        // Handle the response accordingly
        setverifymailcomponent(true);
      } catch (error: any) {
        // Handle errors
        if (error.response.data.error == 'Active Club found in gven Email Id') {

          toast.error('Already have an account with this email Please login', {
            position: 'top-center',
          });
        }
        console.error('Error submitting form:', error);
      }

      // Your form submission logic here
    } else {
      setPasswordsMatch(false);
    }
  };
  const handleRegister = async (otp: number): Promise<boolean> => {


    if (collectedOtp == otp) {
      try {
        // Make a POST request using Axios
        const { data }: any = await axiosInstanceNoToken.post(
          '/api/clubs/',
          formData,
        );

        localStorage.setItem('user', JSON.stringify(data));

        return true;
      } catch (error: any) {
        // Handle errors

        console.error('Error submitting form:', error);
        toast.error(error.response, {
          position: 'top-center',
        });
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="p-6 md:p-12 lg:p-16 xl:p-20 bg-black h-screen flex flex-col justify-center rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="flex justify-center items-center">
              <img
                src={loginImage}
                alt=""
                className="max-w-full"
              />
            </div>
          </div>
          <div className="h-10 md:h-16 lg:hidden"></div>
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 md:p-12.5 lg:p-17.5">
              {verifymailcomponent == false ? (
                <>
                  <h2 className="mb-9 text-2xl font-bold text-center text-black dark:text-white sm:text-title-xl2">
                    Sign Up to Register
                  </h2>
                </>
              ) : (
                <></>
              )}
              {verifymailcomponent ? (
                <Verifyemail register={handleRegister} email={formData.email} />
              ) : (
                <div >
                  <div className={`${!secondForm ? "" : "hidden"}`}>
                    <div className="mb-4">
                      {/* Club Name input */}
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Club Name
                      </label>
                      <div className="relative">
                        <input
                          required
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your Club name"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-red-700 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-red-700"
                        />
                        <span className="absolute right-4 top-4">
                          {/* Icon */}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      {/* Name input */}


                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Email
                      </label>
                      <div className="relative">
                        <input
                          required
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-red-700 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-red-700"
                        />
                        <span className="absolute right-4 top-4">
                          {/* Icon */}
                        </span>
                      </div>
                    </div>



                    <div className="mb-4">
                      {/* Name input */}


                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Phone
                      </label>
                      <div className="relative">
                        <input
                          required
                          name="phone"
                          type="text"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-red-700 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-red-700"
                        />
                        <span className="absolute right-4 top-4">
                          {/* Icon */}
                        </span>
                      </div>
                    </div>




                    <div className="mb-4">
                      {/* Name input */}


                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Name
                      </label>
                      <div className="relative">
                        <input
                          required
                          name="coach_name"
                          type="text"
                          value={formData.coach_name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-red-700 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-red-700"
                        />
                        <span className="absolute right-4 top-4">
                          {/* Icon */}
                        </span>
                      </div>
                    </div>

                    <div className="mb-5">
                      {/* Submit button */}
                      <input
                        required
                        type="button"
                        onClick={() => setSecondForm(!secondForm)}
                        value="Next"
                        className="w-full cursor-pointer rounded-lg border border-red-700 bg-red-700 p-4 text-white transition hover:bg-opacity-90"
                      />
                    </div>


                  </div>

                  <div className={`${secondForm ? "" : "hidden"}`}>
                    <div className="mb-6">
                      {/* Password input */}
                      <div className='flex justify-center'>
                        <span onClick={() => setSecondForm(!secondForm)} className='text-white bg-re text-center border-red-700 bg-red-700 rounded-lg p-2 cursor-pointer'> Go back</span></div>
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          required
                          name="password"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e)=>{handlePasswordChange(e)
                            handleInputChange(e)}
                        }
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-red-700 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-red-700"
                        />
                        <span className="absolute right-4 top-4">
                          {/* Icon */}
                        </span>
                      </div>
                    </div>

                    <div className="mb-6">
                      {/* Retype password input */}
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Re-type Password
                      </label>
                      <div className="relative">
                        <input
                          required
                          type="password"
                          placeholder="Re-enter your password"
                          value={retypePassword}
                          onChange={handleRetypePasswordChange}
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-red-700 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-red-700"
                        />
                        <span className="absolute right-4 top-4">
                          {/* Icon */}
                        </span>
                      </div>
                      {!passwordsMatch && (
                        <p className="text-red-700 mt-2">
                          Passwords do not match
                        </p>
                      )}
                    </div>

                    <div className="mb-5">
                      {/* Submit button */}
                      <input
                        required
                        onClick={handleSubmit}
                        type="submit"
                        value="Create account"
                        className="w-full cursor-pointer rounded-lg border border-red-700 bg-red-700 p-4 text-white transition hover:bg-opacity-90"
                      />
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <p>
                      Already have an account?{' '}
                      <Link to="/auth/signin" className="text-red-700">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default SignUp;
