import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { BiChevronDown } from 'react-icons/bi';
import Button from '../../components/layout/Button';
import { BsListCheck, BsPrinter, BsSearch } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import {
  RiExchangeCnyFill,
  RiExchangeDollarFill,
  RiExchangeFundsFill,
  RiSendPlaneLine,
} from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateExchange } from '../../hooks/useExchange';
import { useToast } from '../../hooks/useToast';
import { useCustomers } from '../../hooks/useCustomers';
import { useExchanger } from '../../hooks/useExchanger';
import { useMoneyType } from '../../hooks/useMoneyType';
const Exchange = () => {
  const [isActive, setIsActive] = useState(false);
  const { t } = useTranslation();

  const [form, setForm] = useState({
    rate: '',
    saleAmount: '',
    purchaseAmount: '',
    description: '',
    fingerprint: '',
    photo: '',
    swap: false,
    calculate: true,
    saleMoneyType: '',
    purchaseMoneyType: '',
    exchangerId: '',
    employeeId: '',
    eDate: '',
    customerId: '',
    transferId: null,
    receiveId: null,
  });

  const { mutate, isLoading, error } = useCreateExchange();
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSwapCurrencies = () => {
    setForm((prev) => ({
      ...prev,
      swap: !prev.swap,
      saleMoneyType: prev.purchaseMoneyType,
      purchaseMoneyType: prev.saleMoneyType,
      saleAmount: prev.purchaseAmount,
      purchaseAmount: prev.saleAmount,
    }));
  };

  useEffect(() => {
    const { rate, saleAmount, purchaseAmount, swap } = form;
    if (!rate) return;

    // If user entered saleAmount only → calculate purchaseAmount
    if (saleAmount && !purchaseAmount) {
      setForm((prev) => ({
        ...prev,
        purchaseAmount: swap
          ? (parseFloat(saleAmount) / parseFloat(rate)).toFixed(2) // reversed
          : (parseFloat(saleAmount) * parseFloat(rate)).toFixed(2),
      }));
    }
    // If user entered purchaseAmount only → calculate saleAmount
    else if (!saleAmount && purchaseAmount) {
      setForm((prev) => ({
        ...prev,
        saleAmount: swap
          ? (parseFloat(purchaseAmount) * parseFloat(rate)).toFixed(2)
          : (parseFloat(purchaseAmount) / parseFloat(rate)).toFixed(2),
      }));
    }
  }, [form.rate, form.saleAmount, form.purchaseAmount, form.swap]);

  const { data: customerResponse } = useCustomers();

  const customerOptions = (customerResponse?.data || []).map((c) => ({
    value: c.id,
    label: `${c.Stakeholder?.Person?.firstName} ${c.Stakeholder?.Person?.lastName}`,
  }));

  const { data: exchangerResponse } = useExchanger();
  const exchangerOptions = (exchangerResponse?.data || []).map((c) => ({
    value: c.id,
    label: `${c.Person?.firstName || c.firstName} ${
      c.Person?.lastName || c.lastName
    }`,
  }));

  const { data: moneyTypeResponse } = useMoneyType();
  const moneyTypeOptions = (moneyTypeResponse?.data || []).map((c) => ({
    value: String(c.id), // ✅ must be string
    label: c.typeName,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.rate || !form.saleMoneyType || !form.purchaseMoneyType) {
      toast.error(t('Please select required field'));
      return;
    }

    const payload = {
      ...form,
      rate: parseFloat(form.rate) || 0,
      saleAmount: parseFloat(form.saleAmount),
      purchaseAmount: parseFloat(form.purchaseAmount),
    };

    const cleanData = Object.fromEntries(
      Object.entries(payload).filter(
        ([_, v]) => v !== '' && v !== null && v !== undefined
      )
    );

    mutate(cleanData, {
      onSuccess: () => {
        toast.success(t('exchange Created'));
        navigate('/rates/exchangeList');
      },
      onError: (error) => {
        console.error('Backend error:', error);
        let errorMessage = t('createExchangeFailed');

        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;

          if (error.response.data.message.includes('Validation error')) {
            errorMessage = t('ExchangeDuplicate');
          } else if (error.response.data.message.includes('validation')) {
            errorMessage = t('invalidInputData');
          }
        }

        toast.error(errorMessage);
      },
    });
  };

  return (
    <>
      <div className="grid justify-center">
        <div className=" flex mt-1 mb-1">
          <Link to="/rates/exchangeList">
            <Button type="primary">
              <span className="flex justify-between">
                <BsListCheck className="mt-1 ml-3" />
                {t('List')}
              </span>
            </Button>
          </Link>
          <Button type="primary">
            <span className="flex justify-between ">
              <BsPrinter className="mt-1 ml-3" /> {t('Print')}
            </span>
          </Button>
          <Button type="primary">
            <span className="flex justify-between ">
              <BsSearch className="mt-1 ml-3" /> {t('Limit Search')}
            </span>
          </Button>
          <div class="h-8 flex items-center justify-center bg-gradient-to-b from-[#e3d5ff] to-[#ffe7e7] rounded-2xl overflow-hidden cursor-pointer shadow-md">
            <input
              type="text"
              name="text"
              id="input"
              placeholder={t('Search by number')}
              class="h-6 border-none outline-none caret-orange-600 bg-white rounded-[30px] px-3 tracking-[0.8px] text-[#131313] font-serif"
            />
          </div>
        </div>
        <div>
          <form>
            <div className="font-extrabold bg-blue-400 w-full  p-3 ltr:mr-4 rtl:ml-4  rounded-t-2xl text-white  text-center">
              <span className="flex justify-center gap-2 ">
                {t('Exchange')}{' '}
                <RiExchangeDollarFill className="mt-0.5 text-xl" />
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 p-3 rounded-b-2xl ltr:mr-4 rtl:ml-4 px-4 md:px-6 lg:px-10 border-b-2 border-t-2 shadow-2xl w-full max-w-7xl mx-auto">
              <div className=" space-y-1.5 w-full">
                {/* <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Number')}:</label>
                  <input
                    type="text"
                    className="border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                    required
                  />
                </div> */}
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label htmlFor="" className="sm:w-32">
                    {t('Sel Amount')}:
                  </label>
                  <div className="flex items-center w-full rounded-md bg-white px-1 py-0.5 outline outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600">
                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm rtl:ml-3 ltr:mr-3">
                      $
                    </div>
                    <input
                      id="price"
                      name="saleAmount"
                      value={form.saleAmount}
                      onChange={handleChange}
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="block w-full grow border-0 bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                    />

                    {/* Currency dropdown */}
                    <div className="relative shrink-0">
                      <select
                        id="currency"
                        name="saleMoneyType"
                        value={form.saleMoneyType}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            saleMoneyType: e.target.value,
                          }))
                        }
                        aria-label="Currency"
                        className="appearance-none rounded-md bg-transparent py-1.5 pr-6 pl-2 text-base text-gray-700 focus:outline-none sm:text-sm"
                      >
                        <option value="">Cur</option>
                        {moneyTypeOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>

                      {/* Dropdown icon */}
                      <BiChevronDown
                        aria-hidden="true"
                        className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 size-5 text-gray-500 sm:size-4"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Rates')}:</label>
                  <input
                    name="rate"
                    value={form.rate}
                    onChange={handleChange}
                    type="number"
                    className="border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                  />
                </div>

                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label htmlFor="" className="sm:w-32">
                    {t('Purchase Amount')}:
                  </label>
                  <div className="flex items-center w-full rounded-md bg-white px-1 py-0.5 outline outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600">
                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm rtl:ml-3 ltr:mr-3">
                      $
                    </div>
                    <input
                      id="price"
                      name="purchaseAmount"
                      value={form.purchaseAmount}
                      onChange={handleChange}
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="block w-full grow border-0 bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                    />

                    <div className="relative shrink-0">
                      <select
                        id="currency"
                        name="purchaseMoneyType"
                        value={form.purchaseMoneyType}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            purchaseMoneyType: e.target.value,
                          }))
                        }
                        aria-label="Currency"
                        className="appearance-none rounded-md bg-transparent py-1.5 pr-6 pl-2 text-base text-gray-700 focus:outline-none sm:text-sm"
                      >
                        <option value="">Cur</option>
                        {moneyTypeOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <BiChevronDown
                        aria-hidden="true"
                        className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 size-5 text-gray-500 sm:size-4"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Date')}:</label>
                  <input
                    name="eDate"
                    value={form.eDate}
                    onChange={handleChange}
                    type="date"
                    className="w-full border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    required
                  />
                </div>
              </div>

              <div className="w-full space-y-1.5">
                <div className="flex gap-5 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Customer')}:</label>
                  <Select
                    className="w-full shadow-sm"
                    name="customerId"
                    isSearchable
                    options={customerOptions}
                    value={customerOptions.find(
                      (opt) => opt.value === form.customerId
                    )}
                    onChange={(selected) =>
                      setForm((prev) => ({
                        ...prev,
                        customerId: selected?.value || '',
                      }))
                    }
                  />
                </div>
                <div className="flex gap-5 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Exchanger')}:</label>
                  <Select
                    className="w-full shadow-sm"
                    name="exchangerId"
                    isSearchable
                    options={exchangerOptions}
                    value={exchangerOptions.find(
                      (opt) => opt.value === form.exchangerId
                    )}
                    onChange={(selected) =>
                      setForm((prev) => ({
                        ...prev,
                        exchangerId: selected?.value || '',
                      }))
                    }
                  />
                </div>
                <div className="flex gap-5 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32 mt-1">{t('Description')}:</label>
                  <textarea
                    rows="4"
                    className="w-full border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    placeholder="more...."
                  />
                </div>
              </div>
              <div className="flex justify-center sm:justify-start gap-2 col-span-full">
                <button
                  type="button"
                  onClick={handleSwapCurrencies}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Swap ↔
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-lg"
                >
                  {t('Save')}
                </button>
                <Link to="/rates/exchangeList">
                  <button
                    type="button"
                    className="text-white bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg"
                  >
                    {t('Cancel')}
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Exchange;
