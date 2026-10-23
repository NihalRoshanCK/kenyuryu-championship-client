import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import CheckboxTwo from './CheckboxTwo';
import { axiosInstance } from '../axios/config';
import toast from 'react-hot-toast';
import { apiErrorMessage, needsColour, useChampionshipConfig } from '../context/ChampionshipConfig';
import { BeltTypeOptions, ColourOptions, GenderOptions } from './RuleOptions';
interface User {
  id: number;
  name: string;
  age: number;
  gender: string;
  belt_color: string;
  weight: number;
  kata: boolean;
  kumite: boolean;
  category: string;
  weight_category: string;
  entry_fee: number;
  club?: number;
  colours:string
}
interface YourComponentProps {
  size: any | string | undefined; // Adjust the type for size
  handleOpen: (arg: any) => void; // Adjust the type for handleOpen if needed
  id: number | undefined;
}

const EditStudent: React.FC<YourComponentProps> = ({
  size,
  handleOpen,
  id,
}) => {

  
  const [kata, setkata] = useState(false);
  const [kumita, setkumita] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const config = useChampionshipConfig();
  
  
  // Usage in your component
  const [user, setuser] = useState<User | null>(null);
  useEffect(() => {
    getStudent();
    return () => {
      formRef.current?.reset();
    }
  }, [id,size]);

  

  const getStudent = async () => {
    try {
      // Make a POST request using Axios
      const { data }: any = await axiosInstance.get(`/api/candidates/${id}/`);

      if (data) {
        setuser(data);
        setkata(data?.kata as boolean)
        setkumita(data?.kumite as boolean)
      }
    } catch (error: any) {
      console.error('Error sstudent fetched for edit:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const gender = form.elements.namedItem('gender') as HTMLInputElement;
    const name = form.elements.namedItem('name') as HTMLInputElement;
    const weightElement = form.elements.namedItem('weight') as HTMLInputElement;
    const weight = weightElement.value;
    const belt_color = form.elements.namedItem(
      'belt_color',
    ) as HTMLInputElement;
    const belt = form.elements.namedItem(
      'belt',
    ) as HTMLInputElement;
    const age = form.elements.namedItem('age') as HTMLInputElement;
    if(!kata&&!kumita){
      alert("please Select Atleast one Event")
    }else if(!gender.value||!name.value||!weight||!belt_color.value||!age.value||(needsColour(config, belt_color.value) && !belt?.value)){
      alert("please Fill All Input Fields")
    }else{
    try {
      // Make a POST request using Axios
      const { data }: any = await axiosInstance.patch(
        `/api/candidates/${id}/`,
        {
          name: name.value,
          gender: gender.value,
          weight: weight,
          belt_color: belt_color.value,
          age: age.value,
          kata: kata,
          kumite: kumita,
          colours: needsColour(config, belt_color.value) ? belt.value : ''
        }, 
      );

      if (data) {
        handleOpen(null);
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error(apiErrorMessage(error));
    }}
  };

  const handleSubmitButton = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Access the form using the ref and submit it
    formRef?.current?.dispatchEvent(new Event('submit', { bubbles: true }));
  };
  const handleSelectChange = (
    event: ChangeEvent<HTMLSelectElement>,
    field: keyof User // Specify that field should be a key of User
  ) => {
    setuser((prevUser) => ({
      ...(prevUser as User),
      [field]: event.target.value, // Use computed property to set the field dynamically
    }));
  };



  return (
    <>
      <Dialog
        open={['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].includes(size as string)}
        size={size || 'lg'}
        handler={handleOpen}
        className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
      >
        <DialogHeader className="text-black dark:text-white">
          Edit Player
        </DialogHeader>
        <DialogBody>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Full Name
                    </label>
                    <input
                    required
                    minLength={3}
                      type="text"
                      name="name"
                      defaultValue={user?.name}
                      placeholder="Enter Player full name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Age
                    </label>
                    <input
                    required
                    min={1}
                    max={100}
                      type="text"
                      name="age"
                      defaultValue={user?.age}
                      placeholder="Enter Player Age"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Gender
                    </label>
                    <select
                    required
                      name="gender"
                      value={`${user?.gender}`}
                      onChange={(e)=>handleSelectChange(e,"gender")}

                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option disabled value="">
                        Select Gender
                      </option>
                      <GenderOptions />
                    </select>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Belt
                    </label>
                    <select
                    required
                      name="belt_color"
                      value={user?.belt_color || ''}
                      onChange={(e)=>handleSelectChange(e,"belt_color")}

                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option disabled selected value="">
                        Select Belt
                      </option>
                      <BeltTypeOptions />
                    </select>
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Events
                    </label>
                    <div className="w-full flex justify-center gap-15 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                    <CheckboxTwo
                      key={1}
                      value={'Kata'}
                      setIsChecked={setkata}
                      isChecked={kata}
                    />
                    <CheckboxTwo
                      key={2}
                      value={'Kumite'}
                      setIsChecked={setkumita}
                      isChecked={kumita}
                    />
                    </div>
                  </div>
                  <div className="w-full xl:w-1/2">
                    <>
                      <label className="mb-2.5 block text-black dark:text-white">
                        Weight
                      </label>
                      <input
                      min={5}
                      max={200}
                      required
                        name="weight"
                        type="number"
                        defaultValue={user?.weight}
                        placeholder="Enter Player weight"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </>
                  </div>
                </div>
               {needsColour(config, user?.belt_color)&&<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Belt 
                      </label>
                      <select
                        required
                        name="belt"
                        value={user?.colours || ''}
                        onChange={(e)=>handleSelectChange(e,"colours")}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option disabled selected value="">
                          Select Belt
                        </option>
                        <ColourOptions beltType={user?.belt_color} />
                      </select>
                    </div>
                  </div>}
              </div>
            </form>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              setuser(null)
              handleOpen(null)
              }}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmitButton}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default EditStudent;