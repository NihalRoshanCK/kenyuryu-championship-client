import TableThree from '../../components/TableThree.tsx';
import { IoPersonAddOutline } from 'react-icons/io5';
import AddStudent from '../../components/Addstudent.tsx';
import React, { useEffect, useRef, useState } from 'react';
import DefaultLayoutUser from '../../layout/DefaultLayoutUser.tsx';
import { FaDownload } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';
import generatePDF from 'react-to-pdf';
import { axiosInstance } from '../../axios/config.ts';

const ECommerce = () => {
  const [size, setSize] = React.useState(null);
  const [paid, setPaid] = useState(true)
  const handleOpen = (value: any) => setSize(value);
  const componentPDf = useRef<HTMLTableElement | null>(null);
  const [pdf, setpdf] = useState(false);
  const generatesPDF = useReactToPrint({
    content: () => componentPDf.current,
    documentTitle: 'INVOICE',
  });


  const isPaid = async () => {
    const userString:any = localStorage.getItem('user');
const user = JSON.parse(userString);
const id =user.user.id;
console.log(user.user.id);
    
    try {
      // Make a POST request using Axios
      const { data }: any = await axiosInstance.get(
        `/api/clubs/${id}`);
  
      if (data) {
        setPaid(data.is_paid)
      } 
    } catch (error:any) {
      console.error('Error submitting form:', error);
    
    }
  }
  useEffect(() => {
    isPaid();
  }, []);
   useEffect(()=>console.log(paid,'dsfdfcfcx'),[paid])
  const generatePDFS = () => {
    setpdf(!pdf);
    setTimeout(() => {
      generatePDF(componentPDf, { filename: 'page.pdf' });

      setpdf(false);
    }, 1000);
  };
  const marqueeStyles: React.CSSProperties = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  };

  const textAnimation: React.CSSProperties = {
    animation: 'marqueeAnimation 10s linear infinite',
  };


  return (
    <>
      <DefaultLayoutUser>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="col-span-12 ">
            <div ref={componentPDf} className="admindashboard-table">
              <div className="text-center justify-center flex p-5 bg-gradient-to-r from-red-500 to-black text-white text-2xl font-bold uppercase">
                <p className="admindashboard-table-criteria">
                  2ND ISKA NATIONAL INVITATIONAL KARATE CHAMPIONSHIP 2025
                </p>
              </div>

              <TableThree pdf={pdf} size={size} />
            </div>
            <div className=" border-stroke flex gap-3 justify-end py-4 dark:border-strokedark cursor-pointer">
            {!paid?(
              <div
                onClick={() => handleOpen('lg')}
                className="inline-flex items-center  justify-center gap-2.5 rounded-md bg-black py-2 px-3 md:py-4 md:px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                <span>
                  <IoPersonAddOutline size={25} />
                </span>
                Add Student
              </div>):null}
              <div
                onClick={generatesPDF}
                className="inline-flex items-center  justify-center gap-2.5 rounded-md bg-black py-2 px-3 md:py-4 md:px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                <span>
                  <FaDownload size={25} />
                </span>
                Download
              </div>
            </div>

{/* <div style={marqueeStyles}>
      <p className="text-2xl font-bold uppercase p-5 bg-gradient-to-r from-red-500 to-black text-white" style={textAnimation}>
        REGISTRATION CLOSED... THANK YOU....
      </p>
    </div> */}
          </div>
          <AddStudent size={size} handleOpen={handleOpen} />
        </div>
      </DefaultLayoutUser>
    </>
  );
};

export default ECommerce;
