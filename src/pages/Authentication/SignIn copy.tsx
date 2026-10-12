import { useSiteSettings } from '../../context/SiteSettings';
import React from 'react';

export function PrintInvoice() {
  const { logo } = useSiteSettings();
  const handlePrint = () => {
    window.print();
  };
  const containerStyle = {
    backgroundImage: `url("${logo}")`,
    backgroundSize: 'contain', // Adjust this based on your preference
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
   
  };
  return (
    <>
      
      <div style={containerStyle} className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4" >
        <div  className="bg-boxdark  backdrop-blur-md bg-opacity-90 border border-opacity-10  shadow-lg rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 border-strokedark">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="h-8 sm:h-12 mr-2" />
              <div className="text-lg sm:text-xl font-bold text-white">Invoice</div>
            </div>
            <div className="text-sm text-white mt-2 sm:mt-0">
              <div>Date: 11/01/2024</div>
              <div>Invoice #: 123456</div>
            </div>
          </div>
          {/* Invoice Content */}
          <div  className="flex flex-col sm:flex-row  justify-between items-start mb-4 sm:mb-6">
            {/* From */}
            <div className="text-sm text-white mb-4 sm:mb-0">
              <div className="font-bold">From:</div>
              <div>John Doe</div>
              <div>123 Main Street</div>
              <div>Kondotti, Kerala, India</div>
              <div>Phone: +91 1234567890</div>
              <div>Email: john.doe@example.com</div>
            </div>
            {/* To */}
            <div className="text-sm text-white">
              <div className="font-bold">To:</div>
              <div>Jane Smith</div>
              <div>456 Park Avenue</div>
              <div>New York, NY, USA</div>
              <div>Phone: +1 9876543210</div>
              <div>Email: jane.smith@example.com</div>
            </div>
          </div>
          {/* Table */}
          <table className="w-full table-auto  mb-4 sm:mb-6">
            {/* Table Head */}
            <thead className="text-left text-sm text-white border-b">
              <tr>
                <th className="py-2 px-2 sm:px-4">Description</th>
                <th className="py-2 px-2 sm:px-4">Quantity</th>
                <th className="py-2 px-2 sm:px-4">Price</th>
                <th className="py-2 px-2 sm:px-4">Amount</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="text-white">
              <tr>
                <td className="py-2 px-2 sm:px-4">Web Design</td>
                <td className="py-2 px-2 sm:px-4">1</td>
                <td className="py-2 px-2 sm:px-4">$500.00</td>
                <td className="py-2 px-2 sm:px-4">$500.00</td>
              </tr>
              <tr>
                <td className="py-2 px-2 sm:px-4">Web Development</td>
                <td className="py-2 px-2 sm:px-4">1</td>
                <td className="py-2 px-2 sm:px-4">$1,000.00</td>
                <td className="py-2 px-2 sm:px-4">$1,000.00</td>
              </tr>
              <tr>
                <td className="py-2 px-2 sm:px-4">SEO</td>
                <td className="py-2 px-2 sm:px-4">1</td>
                <td className="py-2 px-2 sm:px-4">$300.00</td>
                <td className="py-2 px-2 sm:px-4">$300.00</td>
              </tr>
            </tbody>
            {/* Table Foot */}
            <tfoot className="text-right text-sm text-white border-t">
              <tr>
                <td className="py-2 px-2 sm:px-4" colSpan={3}>Subtotal</td>
                <td className="py-2 px-2 sm:px-4">$1,800.00</td>
              </tr>
              <tr>
                <td className="py-2 px-2 sm:px-4" colSpan={3}>Tax (10%)</td>
                <td className="py-2 px-2 sm:px-4">$180.00</td>
              </tr>
              <tr className="font-bold">
                <td className="py-2 px-2 sm:px-4" colSpan={3}>Total</td>
                <td className="py-2 px-2 sm:px-4">$1,980.00</td>
              </tr>
            </tfoot>
          </table>
          {/* End of Invoice Content */}
          <div className="text-center text-sm text-white mb-4 sm:mb-6">
            {/* Footer */}
            <p>Thank you for your business!</p>
            <p>Please make the payment within 15 days.</p>
          </div>

        </div>
      </div>
    </>
  );
}
