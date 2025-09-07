import React, { useState } from 'react';
import { useStateContext } from '../../../context/contextProvider';
import Select from 'react-select';
import { BiChevronDown } from 'react-icons/bi';
import Button from '../../../components/layout/Button';
import { MdOutlineCancel } from 'react-icons/md';
import { BsListCheck, BsPrinter, BsSearch } from 'react-icons/bs';
const Transfer = () => {
  const { currentColor } = useStateContext();
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div>
        <div className=" flex mt-1 mb-1">
          <Button type="secondry">
            <span className="flex justify-between">
              لیست <BsListCheck className="mt-1 ml-3" />
            </span>
          </Button>
          <Button type="secondry">
            <span className="flex justify-between ">
              پرینت <BsPrinter className="mt-1 ml-3" />
            </span>
          </Button>
          <Button type="secondry">
            <span className="flex justify-between ">
              جستجو <BsSearch className="mt-1 ml-3" />
            </span>
          </Button>
        </div>
        <div>
          <form>
            <div className="font-extrabold bg-blue-400 p-2.5 rounded-t-2xl text-white  text-center">
              <span>انتفال حواله</span>
            </div>
            <div className="grid justify-around sm:grid-cols-2 rounded-b-2xl md:pl-0 pl-10 pr-10 border-b-2 border-t-2 shadow-2xl ">
              <div className="w-100">
                <div className="flex gap-10 lg:flex  md:block justify-center ml-5 mr-5 mt-1">
                  <label htmlFor="" className="mt-1  w-30 ">
                    نماینده گی:
                  </label>
                  <Select
                    className="w-full max-w-58 shadow-2xl"
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
                <div className="flex gap-10 lg:flex  md:block justify-center ml-5 mr-5 mt-1">
                  <label htmlFor="" className="w-30 mt-1">
                    نمبر:
                  </label>
                  <input
                    type="text"
                    id="number"
                    aria-describedby="helper-text-explanation"
                    class="border border-gray-300 shadow-cyan-400 max-w-58 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 focus:outline-indigo-600"
                    required
                  />
                </div>
                <div className="flex gap-10 lg:flex  md:block justify-center ml-5 mr-5 mt-1">
                  <label htmlFor="" className="w-30 mt-1">
                    فرستنده:
                  </label>
                  <input
                    type="text"
                    id="transfer"
                    aria-describedby="helper-text-explanation"
                    class="bg-gray-50 border max-w-58 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 focus:outline-indigo-600"
                    required
                  />
                </div>
                <div className="flex gap-10 lg:flex  md:block justify-center ml-5 mr-5 mt-1">
                  <label htmlFor="" className="w-30 mt-1">
                    گیرنده:
                  </label>
                  <input
                    type="text"
                    id="receiver"
                    aria-describedby="helper-text-explanation"
                    class="bg-gray-50 border border-gray-300 max-w-58 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 focus:outline-indigo-600"
                    required
                  />
                </div>
                <div className="flex gap-10 lg:flex  md:block justify-center  ml-5 mr-5 mt-1">
                  <label htmlFor="" className="w-30 mt-1 ">
                    مقدار:
                  </label>
                  <div className="flex items-center max-w-60  rounded-md bg-white pl-2 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                    <div className="shrink-0 text-base pl-1 pr-1 text-gray-500 select-none sm:text-sm/6">
                      $
                    </div>
                    <input
                      id="price"
                      name="price"
                      type="text"
                      placeholder="0.00"
                      className="block min-w-0 grow py-1.5 pr-4 pl-3  text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    />
                    <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                      <select
                        id="currency"
                        name="currency"
                        aria-label="Currency"
                        className="col-start-1 row-start-1  appearance-none rounded-md py-1.5 pr-7 ml-2 pl-2 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      >
                        <option>USD</option>
                        <option>CAD</option>
                        <option>EUR</option>
                      </select>
                      <BiChevronDown
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-10 lg:flex  md:block justify-center  ml-5 mr-5 mt-1">
                  <label htmlFor="" className="w-30 mt-1 ">
                    کمیشن:
                  </label>
                  <div className="flex items-center max-w-60  rounded-md bg-white pl-2 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                    <div className="shrink-0 text-base pl-1 pr-1 text-gray-500 select-none sm:text-sm/6">
                      $
                    </div>
                    <input
                      id="price"
                      name="price"
                      type="text"
                      placeholder="0.00"
                      className="block min-w-0 grow py-1.5 pr-4 pl-3  text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    />
                    <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                      <select
                        id="currency"
                        name="currency"
                        aria-label="Currency"
                        className="col-start-1 row-start-1  appearance-none rounded-md ml-2 py-1.5 pr-7 pl-2 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      >
                        <option>USD</option>
                        <option>CAD</option>
                        <option>EUR</option>
                      </select>
                      <BiChevronDown
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-10 lg:flex  md:block justify-center  ml-5 mr-5 mt-1">
                  <label htmlFor="" className="w-30 mt-1 ">
                    کمیشن پاس:
                  </label>
                  <div className="flex items-center max-w-60  rounded-md bg-white pl-2 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                    <div className="shrink-0 text-base pl-1 pr-1 text-gray-500 select-none sm:text-sm/6">
                      $
                    </div>
                    <input
                      id="price"
                      name="price"
                      type="text"
                      placeholder="0.00"
                      className="block min-w-0 grow py-1.5 pr-4 pl-3  text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    />
                    <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                      <select
                        id="currency"
                        name="currency"
                        aria-label="Currency"
                        className="col-start-1 row-start-1  appearance-none rounded-md ml-2 py-1.5 pr-7 pl-2 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      >
                        <option>USD</option>
                        <option>CAD</option>
                        <option>EUR</option>
                      </select>
                      <BiChevronDown
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-100">
                <div className="flex gap-10 md:block lg:flex  justify-center  md:gap-0  ml-5 mr-5 mt-1">
                  <label htmlFor="" className="w-30 mt-1">
                    تاریخ:
                  </label>
                  <input
                    type="date"
                    id="transfer"
                    aria-describedby="helper-text-explanation"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full max-w-58 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex gap-10 md:block lg:flex   justify-center  md:gap-0 ml-5 mr-5 mt-1">
                  <label htmlFor="" className="mt-1 w-30">
                    مشتری:
                  </label>
                  <Select
                    className="w-full max-w-58"
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
                <div className="flex gap-10 md:block  lg:flex  justify-center  md:gap-0  ml-5 mr-5 mt-1">
                  <label htmlFor="" className="mt-1 w-30">
                    پاس به:
                  </label>
                  <Select
                    className="w-full max-w-58"
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
                <div className="flex gap-10 justify-center md:block lg:flex  md:gap-0  ml-5 mr-5 mt-1">
                  <label htmlFor="" className="mt-1 w-30">
                    توضیحات:
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full max-w-58  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 focus:outline-indigo-600"
                    placeholder="بشتر ..........."
                  ></textarea>
                </div>
              </div>
              <div className="mt-4 flex mb-2 ml-3">
                {isActive ? (
                  <>
                    <Button type="primary" htmlType="submit">
                      ذخیره
                    </Button>
                    <Button type="primary">Cancel</Button>
                  </>
                ) : (
                  <>
                    <Button type="primary" onClick={() => setIsActive(true)}>
                      جدید
                    </Button>
                    <Button type="primary">ویرایش</Button>
                    <Button type="primary">حذف</Button>
                    <Button type="primary">اجراکردن</Button>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Transfer;
