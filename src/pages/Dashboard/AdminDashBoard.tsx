import { useRef, useState } from 'react';
import CheckboxTwo from '../../components/CheckboxTwo.tsx';
import { FaDownload, FaSearch } from 'react-icons/fa';
import AdminDashTable from '../../components/AdminDashboardTable.tsx';
import { useReactToPrint } from 'react-to-print';
import '../../components/PrintableComponent.css';

const AdminDashBoard = () => {
  const [kata, setkata] = useState(false);
  const [Kumite, setkumita] = useState(false);
  const [fetch,setFetch]=useState(true);
  const selectBeltRef = useRef<HTMLSelectElement | null>(null);
  const ageCategoryRef = useRef<HTMLSelectElement | null>(null);
  const gendeRef = useRef<HTMLSelectElement | null>(null);
  const weightRef = useRef<HTMLSelectElement | null>(null);
  const beltCategory = useRef<HTMLSelectElement | null>(null);
  const [selectedBelt, setSelectedBelt] = useState('');
  const [selectedAgeCategory, setSelectedAgeCategory] = useState('');
  const [selectedGenderCategory, setSelectedGenderCategory] = useState('');
  const [selectedWeightCategory, setSelectedWeightCategory] = useState('');
  const [selectedBeltCategory, setSelectedBeltCategory] = useState('');
  const handleSelectBeltChange = () => {
    if (selectBeltRef.current) {
      setSelectedBelt(selectBeltRef.current.value);
    }
  };

  const handleAgeCategoryChange = () => {
    if (ageCategoryRef.current) {
      setSelectedAgeCategory(ageCategoryRef.current.value);
    }
  };
  const handleGenderCategoryChange = () => {
    if (gendeRef.current) {
      setSelectedGenderCategory(gendeRef.current.value);
    }
  };
  const handleWeightCategoryChange = () => {
    if (weightRef.current) {
      setSelectedWeightCategory(weightRef.current.value);
    }
  };
  const handleBeltCategoryChange = () => {
    if (beltCategory.current) {
      setSelectedBeltCategory(beltCategory.current.value);
    }
  };

  const componentPDf = useRef<HTMLTableElement | null>(null);
  const generatePDF = useReactToPrint({
    content: () => componentPDf.current,
    documentTitle: 'INVOICE',
    onAfterPrint: () => alert('success'),
  });

  return (
    <>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 ">
          <div className="border-b border-stroke flex flex-col  lg:flex-row  gap-5  py-4 dark:border-strokedark">
            <select
              onChange={handleGenderCategoryChange}
              ref={gendeRef} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
              <option disabled selected value="">
                Select Gender
              </option>
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <select
              ref={selectBeltRef}
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              onChange={handleSelectBeltChange}
            >
              <option disabled selected value="">
                Select Belt
              </option>
              <option value="">All</option>
              <option value="Black Belt">Black</option>
              <option value="Colour Belt">Colour</option>
            </select>
            {selectedBelt === 'Colour Belt' && 
            <select
            onChange={handleBeltCategoryChange}
            ref={beltCategory} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
              <option disabled selected value="">
                Belt color
              </option>
              <option value="">All</option>
              <option value={["White", "Yellow" , "Orange"]}>White, Yellow & Orange</option>
              <option value={["Blue", "Green" , "Purple" ]}>Blue, Green & Purple </option>Brown
              <option value={["Brown"]}>Brown</option>
            </select>
                }
            <select
              ref={ageCategoryRef}
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              onChange={handleAgeCategoryChange}
            >
              <option disabled selected value="">
                Select Age-Category
              </option>
              <option value="" >All</option>
              {selectedBelt === 'Colour Belt' && (
                <option value="Mini Sub Junior">Mini Sub Junior</option>
              )}
              <option value="Sub Junior">Sub Junior</option>
              <option value="Cadet">Cadet</option>
              <option value="Junior">Junior</option>
              <option value="Senior Below 21">Senior Below 21</option>
              <option value="Senior Above 21">Senior Above 21</option>
            </select>
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
                isChecked={Kumite}
              />
            </div>

            {Kumite && (
              <select
              onChange={handleWeightCategoryChange}
               ref={weightRef} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                <option disabled selected value="">
                  Weight Category
                </option>

                {/* mini sub junior color */}
                {selectedBelt === 'Colour Belt' &&
                  selectedAgeCategory === 'Mini Sub Junior' && (
                    <>
                      <option value="Kumite -20 Kg">Kumite -20 Kg</option>
                      <option value="Kumite -25 Kg">Kumite -25 Kg</option>
                      <option value="Kumite +25 Kg">Kumite +25 Kg</option>
                    </>
                  )}

                {/*  sub junior color */}

                {(selectedBelt === 'Colour Belt' ||
                  selectedBelt === 'Black Belt') &&
                  selectedAgeCategory === 'Sub Junior' && (
                    <>
                      <option value="Kumite -30 Kg">Kumite -30 Kg</option>
                      <option value="Kumite -35 Kg">Kumite -35 Kg</option>
                      <option value="Kumite -40 Kg">Kumite -40 Kg</option>
                      <option value="Kumite -45 Kg">Kumite -45 Kg</option>
                      <option value="Kumite +45 Kg">Kumite +45 Kg</option>
                    </>
                  )}

                {/* Cadet */}

                {(selectedBelt === 'Colour Belt' ||
                  selectedBelt === 'Black Belt') &&
                  selectedAgeCategory === 'Cadet' && (
                    <>
                      <option value="Kumite -45 Kg">Kumite -45 Kg</option>
                      <option value="Kumite -50 Kg">Kumite -50 Kg</option>
                      <option value="Kumite -55 Kg">Kumite -55 Kg</option>
                      <option value="Kumite -60 Kg">Kumite -60 Kg</option>

                      {selectedBelt === 'Colour Belt' && (
                        <option value="Kumite +60 Kg">Kumite +60 Kg</option>
                      )}
                      {selectedBelt === 'Black Belt' && (
                        <>
                          <option value="Kumite -65 Kg">Kumite -65 Kg</option>
                          <option value="Kumite +65 Kg">Kumite +65 Kg</option>
                        </>
                      )}
                    </>
                  )}

                {(selectedBelt === 'Colour Belt' ||
                  selectedBelt === 'Black Belt') &&
                  selectedAgeCategory === 'Junior' && (
                    <>
                      <option value="Kumite -50 Kg">Kumite -50 Kg</option>
                      <option value="Kumite -55 Kg">Kumite -55 Kg</option>
                      <option value="Kumite -60 Kg">Kumite -60 Kg</option>
                      <option value="Kumite -65 Kg">Kumite -65 Kg</option>
                      <option value="Kumite +65 Kg">Kumite +65 Kg</option>
                    </>
                  )}

                {(selectedBelt === 'Colour Belt' ||
                  selectedBelt === 'Black Belt') &&
                  (selectedAgeCategory === 'Senior Above 21' ||
                    selectedAgeCategory === 'Senior Below 21') && (
                    <>
                      <option value="Kumite -50 Kg">Kumite -50 Kg</option>
                      <option value="Kumite -55 Kg">Kumite -55 Kg</option>
                      <option value="Kumite -60 Kg">Kumite -60 Kg</option>
                      <option value="Kumite -65 Kg">Kumite -65 Kg</option>
                      <option value="Kumite -70 Kg">Kumite -70 Kg</option>
                      <option value="Kumite -75 Kg">Kumite -75 Kg</option>
                      <option value="Kumite +75 Kg">Kumite +75 Kg</option>
                    </>
                  )}

                {/* 
                
                

                <option value="">colour</option> */}
              </select>
            )}
            <button 
            onClick={()=>setFetch(!fetch)} 
            style={{ cursor: 'pointer' }}
            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
              <span>
                <FaSearch size={25} />
              </span>
              Search
            </button>
          </div>
          <div ref={componentPDf} className='admindashboard-table'>
            <div className="text-center justify-center flex p-5 bg-gradient-to-r from-red-500 to-black text-white text-2xl font-bold uppercase">
              <p className="admindashboard-table-criteria">
              2ND ISKA NATIONAL INVITATIDNAL KARATE CHAMMPIOSHIP 2025
              </p>
            </div>
            
            <div className='admindashboard-table-criteria hidden text-black-2 w-full  py-4 admindashboard-table-criteria'>
              <th className=' p-2 border-2 w-full flex justify-between px-10 text-sm'>
                <td className='inline'>Gender: {selectedGenderCategory}</td>
                <td className='inline'>Belt: {selectedBelt}</td>
                <td className='inline'>Age: {selectedAgeCategory}</td>
                <td className='inline'>Events: {kata&&'Kata'}, {Kumite&&'Kumite'}</td>
                {Kumite&&<td>Weight: {selectedWeightCategory}</td>}

              </th>
            </div>

            <AdminDashTable color={selectedBeltCategory}  weight_category={selectedWeightCategory} age_category={selectedAgeCategory} fetch={fetch} belt_color={selectedBelt} gender={selectedGenderCategory} kata={kata}  kumite={Kumite}/>
          </div>

          <div className="  flex justify-center lg:justify-end gap-5  py-4 ">
            <div
              onClick={generatePDF}
              className="inline-flex items-center cursor-pointer justify-center gap-2.5 rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              <span>
                <FaDownload size={25} />
              </span>
              Download
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
