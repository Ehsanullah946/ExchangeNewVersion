import React, { useState } from 'react';
import Select from 'react-select';
import { BiChevronDown } from 'react-icons/bi';
const Receive = () => {
  const [isActive, setIsActive] = useState(true);
  return (
    <>
      <div>
        <div>buttons</div>
        <div>
          <form>
            <div className="grid gap-10 justify-around sm:grid-cols-2 bg-amber-500">
              <div className="w-100">
                <div className="flex gap-10  justify-center ml-5 mr-5 mt-1">
                  <label htmlFor="" className="mt-1 w-30">
                    Branch:
                  </label>
                  <Select
                    className="w-full max-w-53"
                    name="branch"
                    // value={{ label: formData.branch, value: formData.branch }}
                    // options={branch.map((item) => ({
                    //   label: item.firstName,
                    //   value: item.firstName,
                    // }))}
                    isSearchable
                    isDisabled={!isActive}
                  />
                </div>
                <div className="flex gap-10  justify-center ml-5 mr-5 mt-1">
                  <label htmlFor="" className="w-30 mt-1">
                    Number
                  </label>
                  <input
                    type="text"
                    id="number"
                    aria-describedby="helper-text-explanation"
                    class="bg-gray-50 border border-gray-300 shadow-cyan-400 max-w-53  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex gap-10  justify-center ml-5 mr-5 mt-1">
                  <label htmlFor="" className="w-30 mt-1">
                    Transfer:
                  </label>
                  <input
                    type="text"
                    id="transfer"
                    aria-describedby="helper-text-explanation"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full max-w-53  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex gap-10  justify-center ml-5 mr-5 mt-1">
                  <label htmlFor="" className="w-30 mt-1">
                    Receiver:
                  </label>
                  <input
                    type="text"
                    id="receiver"
                    aria-describedby="helper-text-explanation"
                    class="bg-gray-50 border border-gray-300 max-w-53 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex gap-10 justify-center  ml-5 mr-5 mt-1">
                  <label htmlFor="" className="w-30 mt-1 ">
                    Amount:
                  </label>
                  <div className="flex items-center max-w-53 rounded-md bg-white pl-2 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                      $
                    </div>
                    <input
                      id="price"
                      name="price"
                      type="text"
                      placeholder="0.00"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    />
                    <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                      <select
                        id="currency"
                        name="currency"
                        aria-label="Currency"
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      >
                        <option>USD</option>
                        <option>CAD</option>
                        <option>EUR</option>
                      </select>
                      <BiChevronDown
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-10 justify-center  ml-5 mr-5 mt-1">
                  <label htmlFor="" className="w-30 mt-1 ">
                    charges:
                  </label>
                  <div className="flex items-center max-w-53 rounded-md bg-white pl-2 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                      $
                    </div>
                    <input
                      id="price"
                      name="price"
                      type="text"
                      placeholder="0.00"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    />
                    <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                      <select
                        id="currency"
                        name="currency"
                        aria-label="Currency"
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      >
                        <option>USD</option>
                        <option>CAD</option>
                        <option>EUR</option>
                      </select>
                      <BiChevronDown
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-10 justify-center  ml-5 mr-5 mt-1">
                  <label htmlFor="" className="w-30 mt-1">
                    pass Charges:
                  </label>
                  <div className="flex items-center max-w-53 rounded-md bg-white pl-2 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                      $
                    </div>
                    <input
                      id="price"
                      name="price"
                      type="text"
                      placeholder="0.00"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    />
                    <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                      <select
                        id="currency"
                        name="currency"
                        aria-label="Currency"
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      >
                        <option>USD</option>
                        <option>CAD</option>
                        <option>EUR</option>
                      </select>
                      <BiChevronDown
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-100">
                <div className="flex gap-10  justify-center ml-5 mr-5 mt-1">
                  <label htmlFor="" className="w-30 mt-1">
                    Date:
                  </label>
                  <input
                    type="date"
                    id="transfer"
                    aria-describedby="helper-text-explanation"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full max-w-53  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex gap-10  justify-center ml-5 mr-5 mt-1">
                  <label htmlFor="" className="mt-1 w-30">
                    Customer:
                  </label>
                  <Select
                    className="w-full max-w-53"
                    name="Customer"
                    // value={{ label: formData.branch, value: formData.branch }}
                    // options={branch.map((item) => ({
                    //   label: item.firstName,
                    //   value: item.firstName,
                    // }))}
                    isSearchable
                    isDisabled={!isActive}
                  />
                </div>
                <div className="flex gap-10  justify-center ml-5 mr-5 mt-1">
                  <label htmlFor="" className="mt-1 w-30">
                    pass To:
                  </label>
                  <Select
                    className="w-full max-w-53"
                    name="passTo"
                    // value={{ label: formData.branch, value: formData.branch }}
                    // options={branch.map((item) => ({
                    //   label: item.firstName,
                    //   value: item.firstName,
                    // }))}
                    isSearchable
                    isDisabled={!isActive}
                  />
                </div>
                <div className="flex gap-10  justify-center ml-5 mr-5 mt-1">
                  <label htmlFor="" className="mt-1 w-30">
                    Description:
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full max-w-53  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Details.."
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Receive;
