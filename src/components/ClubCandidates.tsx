import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import { useReactToPrint } from 'react-to-print';
import './PrintableComponent.css';
import { adminaxios } from '../axios/config';
import toast from 'react-hot-toast';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { MdOutlineNotInterested } from 'react-icons/md';

interface Candidate {
  id: number;
  name: string;
  chest_no:any;
  age: number;
  gender: string;
  belt_color: string;
  weight: number;
  kata: boolean;
  kumite: boolean;
  category: string;
  weight_category: string;
  entry_fee: number;
  colours: string;
  club: number;
}

interface ClubData {
  email: string;
  coach_name: string;
  name: string;
  phone: number;
  fees: number;
  id: number;
  is_paid: boolean;
  no_of_candidate: number;
  candidates: Candidate[];
}

interface YourComponentProps {
  size: any | string | undefined; // Adjust the type for size
  handleOpen: (arg: any) => void; // Adjust the type for handleOpen if needed
  ClubData: ClubData;
}
const ClubCandidatesModal: React.FC<YourComponentProps> = ({
  size,
  handleOpen,
  ClubData,
}) => {


  const componentPDf = useRef<HTMLDivElement | null>(null);
  const containerStyle = {
    backgroundImage:
      'url(/static/images/new_logo_karate___2_-removebg-preview.png)',
    backgroundSize: 'contain', // Adjust this based on your preference
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDf.current,
    documentTitle: 'INVOICE',

  });
  return (
    <>
      <Dialog
        open={['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].includes(size as string)}
        size={size || 'lg'}
        handler={handleOpen}
        className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
      >
        <DialogHeader className="text-black dark:text-white">
          Invoice
        </DialogHeader>
        <DialogBody>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-boxdark dark:bg-boxdark">
              <div ref={componentPDf} className=" ">
                <div
                  style={containerStyle}
                  className="  container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 "
                >
                  <div className="bg-boxdark    backdrop-blur-md bg-opacity-90 border border-opacity-10  shadow-lg rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 border-strokedark">
                    <div className="text-center flex p-5 bg-gradient-to-r from-red-500 to-black text-white  text-2xl font-bold uppercase justify-center">
                      <p className=''>SANKUKAI CUP SEASON 2 </p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
                      <div className="flex items-center"></div>
                    </div>
                    {/* Invoice Content */}

                    {/* Table */}
                    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                      <div className="text-center mb-4">
                        <h3 className="text-lg font-semibold text-black dark:text-white">
                          {ClubData?.name}
                        </h3>
                      </div>
                      <div className="max-w-full overflow-x-auto ">
                        <table className=" w-full table-auto ">
                          <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[10px] py-4 font-medium text-black dark:text-white">
                                SI
                              </th>
                              <th className="min-w-[150px] py-4 pl-2 pr-4 font-medium text-black dark:text-white">
                                Name
                              </th>
                              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                Chest No 
                              </th>
                              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                Age Category
                              </th>
                              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Belt Category
                              </th>

                              <th className="py-4 px-4 font-medium text-black dark:text-white">
                                Kata
                              </th>
                              <th className="py-4 px-4 font-medium text-black dark:text-white">
                                Kumite
                              </th>
                              <th className="py-4 px-4 font-medium text-black dark:text-white">
                                Weight Category
                              </th>
                            </tr> 
                          </thead>
                          <tbody>
                            {ClubData?.candidates?.length != 0 ? (
                              ClubData?.candidates?.map((item, index) => (
                                <tr key={index}>
                                  <td className="border-b border-[#eee] py-5  dark:border-strokedark">
                                    {index+1}
                                  </td>
                                  <td className="border-b border-[#eee] py-5 pl-2 pr-4 dark:border-strokedark">
                                    {item.name}
                                  </td>
                                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    {item.chest_no}
                                  </td>
                                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    {item.category}
                                  </td>
                                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    {item.belt_color}
                                  </td>
                                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    {item.kata ? (
                                      <IoCheckmarkDoneSharp size={25} />
                                    ) : (
                                      <MdOutlineNotInterested size={25} />
                                    )}
                                  </td>
                                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    {item.kumite ? (
                                      <IoCheckmarkDoneSharp size={25} />
                                    ) : (
                                      <MdOutlineNotInterested size={25} />
                                    )}
                                  </td>
                                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    {item.weight_category}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <></>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* End of Invoice Content */}
                    <div className="text-center text-sm text-white mt-5 mb-4 sm:mb-6">
                      {/* Footer */}
                      <p>Wish You A Successfull Championship</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => generatePDF()}
          >
            <span>Print</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ClubCandidatesModal;
