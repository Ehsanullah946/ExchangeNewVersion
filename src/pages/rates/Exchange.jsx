import React, { useEffect, useState } from 'react';
import Select from '../../components/common/LazySelect';
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
import { formatNumber } from '../../utils/formatNumber';
const Exchange = () => {
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

  const isUSD = (typeId) => {
    const type = moneyTypeOptions.find((opt) => opt.value === typeId);
    return (
      type?.label?.toLowerCase().includes('usd') ||
      type?.label?.toLowerCase().includes('usa')
    );
  };

  useEffect(() => {
    const { rate, saleAmount, purchaseAmount, saleMoneyType } = form;
    if (!rate) return;

    const saleIsUSD = isUSD(form.saleMoneyType);
    const purchaseIsUSD = isUSD(form.purchaseMoneyType);

    // 🟢 Case 1: User typed SALE amount
    if (saleAmount && !purchaseAmount) {
      setForm((prev) => ({
        ...prev,
        purchaseAmount: saleIsUSD
          ? (parseFloat(saleAmount) * parseFloat(rate)).toFixed(2) // USD → AFN
          : (parseFloat(saleAmount) / parseFloat(rate)).toFixed(2), // AFN → USD
      }));
    }

    // 🟢 Case 2: User typed PURCHASE amount
    else if (!saleAmount && purchaseAmount) {
      setForm((prev) => ({
        ...prev,
        saleAmount: purchaseIsUSD
          ? (parseFloat(purchaseAmount) * parseFloat(rate)).toFixed(2) // USD → AFN
          : (parseFloat(purchaseAmount) / parseFloat(rate)).toFixed(2), // AFN → USD
      }));
    }
  }, [
    form.rate,
    form.saleAmount,
    form.purchaseAmount,
    form.saleMoneyType,
    form.purchaseMoneyType,
    moneyTypeOptions,
  ]);

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
          }
        }

        toast.error(errorMessage);
      },
    });
  };

  return (
    <>
      <div className="grid justify-center">
        <div className=" flex mt-1 justify-between  gap-1 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 mb-1">
          <div className="flex flex-wrap justify-center items-center p-2 gap-3">
            <Link to="/rates/exchangeList">
              <button className="flex  items-center gap-2 px-2 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-z-150 active:scale-110">
                <span className="flex justify-between">
                  <BsListCheck className="mt-1 ml-3" />
                  {t('List')}
                </span>
              </button>
            </Link>
            <button
              className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-110"
              type="primary"
            >
              <span className="flex justify-between ">
                <BsPrinter className="mt-1 ml-3" /> {t('Print')}
              </span>
            </button>
            <button
              className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-110"
              type="primary"
            >
              <span className="flex justify-between ">
                <BsSearch className="mt-1 ml-3" /> {t('Search')}
              </span>
            </button>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-gray-100 pl-4 pr-2 py-2 min-w-64">
              <BsSearch className="text-gray-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder={t('Search')}
                className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 font-medium tracking-wide"
              />
            </div>
          </div>
        </div>
        <div>
          <form>
            <div className="bg-gradient-to-r from-blue-600 rounded-t-2xl via-purple-600 to-indigo-700 p-3">
              <div className="flex items-center justify-center gap-3 text-white">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <RiExchangeDollarFill className="text-xl" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">
                  {t('Add New Exchange')}
                </h1>
              </div>
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
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-1 text-center me-2 mb-2"
                >
                  {t('Save')}
                </button>
                <Link to="/rates/exchangeList">
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-4 py-1 text-center me-2 mb-2"
                  >
                    {t('Cancel')}
                  </button>
                </Link>
                <button
                  type="button"
                  onClick={handleSwapCurrencies}
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-1 text-center me-2 mb-2"
                >
                  Swap ↔
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Exchange;
