import { useSiteSettings } from '../../context/SiteSettings.tsx';
import { useRef, useState } from 'react';
import CheckboxTwo from '../../components/CheckboxTwo.tsx';
import { FaDownload, FaSearch } from 'react-icons/fa';
import AdminDashTable from '../../components/AdminDashboardTable.tsx';
import { useReactToPrint } from 'react-to-print';
import '../../components/PrintableComponent.css';
import { BeltTypeOptions, GenderOptions } from '../../components/RuleOptions.tsx';
import {
  ageCategoryNames,
  colourGroups,
  needsColour,
  useChampionshipConfig,
  weightCategoryLabels,
} from '../../context/ChampionshipConfig.tsx';

const AdminDashBoard = () => {
  const { championshipName } = useSiteSettings();
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
  const config = useChampionshipConfig();
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
              <GenderOptions />
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
              <BeltTypeOptions />
            </select>
            {needsColour(config, selectedBelt) && 
            <select
            onChange={handleBeltCategoryChange}
            ref={beltCategory} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
              <option disabled selected value="">
                Belt color
              </option>
              <option value="">All</option>
              {colourGroups(config, selectedBelt).map((group) => (
                <option key={group.value} value={group.value}>
                  {group.label}
                </option>
              ))}
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
              {ageCategoryNames(config, selectedBelt).map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
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

                {weightCategoryLabels(config, selectedBelt, selectedAgeCategory, selectedGenderCategory).map((label) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
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
              {championshipName}
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
