import React, { useEffect, useState } from 'react';
import { useSingleReceive, useUpdateReceive } from '../../../hooks/useReceive';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Select from '../../../components/common/LazySelect';
import { useToast } from '../../../hooks/useToast';
import { useMoneyType } from '../../../hooks/useMoneyType';
import { useCustomers } from '../../../hooks/useCustomers';
import { useBranch } from '../../../hooks/useBranch';
import Button from '../../../components/layout/Button';
import { BsListCheck, BsSearch } from 'react-icons/bs';
import { RiDownload2Line } from 'react-icons/ri';
import { PulseLoader } from 'react-spinners';
import { BiChevronDown } from 'react-icons/bi';

const ReceiveEdit = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toast = useToast();

  const { data, isLoading: loadingReceive } = useSingleReceive(id);
  const { mutate: updateReceive, isLoading: updating } = useUpdateReceive();

  const { data: moneyTypeResponse } = useMoneyType();

  const moneyTypeOptions = (moneyTypeResponse?.data || []).map((c) => ({
    value: c.id,
    label: `${c.typeName}`,
  }));

  const { data: customerResponse } = useCustomers();

  const customerOptions = (customerResponse?.data || []).map((c) => ({
    value: c.id,
    label: `${c.Stakeholder?.Person?.firstName} ${c.Stakeholder?.Person?.lastName}`,
  }));

  const { data: branchResponse } = useBranch();

  const branchOptions = (branchResponse?.data || []).map((b) => ({
    value: b.id,
    label: `${b.Customer?.Stakeholder?.Person?.firstName} ${b.Customer?.Stakeholder?.Person?.lastName}`,
  }));

  const [form, setForm] = useState({
    receiveNo: '',
    receiveAmount: '',
    chargesAmount: '',
    chargesType: '',
    branchCharges: '',
    branchChargesType: '',
    rDate: '',
    description: '',
    passTo: '',
    fromWhere: '',
    passNo: '',
    customerId: '',
    senderName: '',
    receiverName: '',
    moneyTypeId: '',
    channels: '',
    receiveStatus: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  useEffect(() => {
    if (data?.data) {
      const receive = data.data;
      setForm((prev) => ({
        ...prev,
        ...receive,
      }));
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanData = Object.fromEntries(
      Object.entries(form).filter(
        ([_, v]) => v !== '' && v !== null && v !== undefined
      )
    );

    updateReceive(
      { id, payload: cleanData },
      {
        onSuccess: () => {
          toast.success(t('Update Successful'));
          navigate('/main/receiveList');
        },
        onError: (err) => {
          console.error(err);
          toast.error(t('Update failed'));
        },
      }
    );
  };

  if (loadingReceive)
    return (
      <p className="p-4 flex justify-center">
        <PulseLoader color="green" size={15} />
      </p>
    );

  return (
    <>
      <div className="grid justify-center">
        <div className=" flex mt-1 justify-between  gap-1 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 mb-1">
          <div className="flex flex-wrap justify-center items-center p-2 gap-3">
            <Link to="/main/receiveList">
              <button
                className="flex  items-center gap-2 px-2 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-z-150 active:scale-110"
                type="primary"
              >
                <span className="flex justify-between">
                  <BsListCheck className="mt-1 ml-3" />
                  {t('List')}
                </span>
              </button>
            </Link>
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
                  <RiDownload2Line className="text-xl" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">
                  {t('Update Receive')}
                </h1>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 p-3 rounded-b-2xl ltr:mr-4 rtl:ml-4 px-4 md:px-6 lg:px-10 border-b-2 border-t-2 shadow-2xl w-full max-w-7xl mx-auto">
              <div className="space-y-1 w-full">
                <div className="flex gap-4 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32 mt-1">{t('Branch')}:</label>
                  <Select
                    className="w-full shadow-sm"
                    name="fromWhere"
                    isSearchable
                    options={branchOptions}
                    value={branchOptions.find(
                      (opt) => opt.value === form.fromWhere
                    )}
                    onChange={(selected) =>
                      setForm((prev) => ({
                        ...prev,
                        fromWhere: selected?.value || '',
                      }))
                    }
                  />
                </div>

                <div className="flex gap-4 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Number')}:</label>
                  <input
                    type="text"
                    name="receiveNo"
                    onChange={handleChange}
                    value={form.receiveNo}
                    className="border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                    required
                  />
                </div>
                <div className="flex gap-4 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Transfer')}:</label>
                  <input
                    type="text"
                    name="senderName"
                    onChange={handleChange}
                    value={form.senderName}
                    className=" w-full border border-gray-300 shadow-sm  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    required
                  />
                </div>
                <div className="flex gap-4 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Receiver')}:</label>
                  <input
                    type="text"
                    name="receiverName"
                    onChange={handleChange}
                    value={form.receiverName}
                    className=" w-full border border-gray-300 shadow-sm  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    required
                  />
                </div>

                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label htmlFor="" className="sm:w-32">
                    {t('Amount')}:
                  </label>
                  <div className="flex items-center w-full rounded-md bg-white px-1 py-0.5 outline outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600">
                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm rtl:ml-3 ltr:mr-3">
                      $
                    </div>
                    <input
                      id="price"
                      name="receiveAmount"
                      value={form.receiveAmount}
                      onChange={handleChange}
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="block w-full grow border-0 bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                    />

                    <div className="relative shrink-0">
                      <select
                        id="currency"
                        name="moneyTypeId"
                        value={form.moneyTypeId}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            moneyTypeId: e.target.value,
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

                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label htmlFor="" className="sm:w-32">
                    {t('charges')}:
                  </label>
                  <div className="flex items-center w-full rounded-md bg-white px-1 py-0.5 outline outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600">
                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm rtl:ml-3 ltr:mr-3">
                      $
                    </div>
                    <input
                      id="price"
                      name="chargesAmount"
                      value={form.chargesAmount}
                      onChange={handleChange}
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="block w-full grow border-0 bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                    />

                    <div className="relative shrink-0">
                      <select
                        id="currency"
                        name="chargesType"
                        value={form.chargesType}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            chargesType: e.target.value,
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

                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between">
                  <label htmlFor="" className="sm:w-32">
                    {t('pass charges')}:
                  </label>
                  <div className="flex items-center w-full rounded-md bg-white px-1 py-0.5 outline outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600">
                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm rtl:ml-3 ltr:mr-3">
                      $
                    </div>
                    <input
                      id="price"
                      name="branchCharges"
                      value={form.branchCharges}
                      onChange={handleChange}
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="block w-full grow border-0 bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                    />

                    <div className="relative shrink-0">
                      <select
                        id="currency"
                        name="branchChargesType"
                        value={form.branchChargesType}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            branchChargesType: e.target.value,
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
              </div>
              <div className="w-full space-y-1">
                <div className="flex gap-4 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Date')}:</label>
                  <input
                    type="date"
                    name="rDate"
                    value={form.rDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    required
                  />
                </div>

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

                <div className="flex gap-4 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('pass to')}:</label>
                  <Select
                    className="w-full shadow-sm"
                    name="passTo"
                    isSearchable
                    options={branchOptions}
                    value={branchOptions.find(
                      (opt) => opt.value === form.passTo
                    )}
                    onChange={(selected) =>
                      setForm((prev) => ({
                        ...prev,
                        passTo: selected?.value || '',
                      }))
                    }
                  />
                </div>
                <div className="flex gap-4 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32 mt-1">{t('Description')}:</label>
                  <textarea
                    rows="4"
                    value={form.description}
                    onChange={handleChange}
                    name="description"
                    className="w-full border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    placeholder="more...."
                  />
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="react-option"
                    name="receiveStatus"
                    checked={form.receiveStatus}
                    onChange={handleChange}
                    class="hidden peer"
                  />
                  <label
                    for="react-option"
                    class="inline-flex items-center shadow-xl justify-between p-2 text-gray-500 bg-white border-3 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-red-600 peer-checked:text-red-600 dark:peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300  hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div class="block">
                      <div class="w-full text-lg font-semibold">
                        {t('Completed')}
                      </div>
                      <div class="w-full text-sm">complete</div>
                    </div>
                  </label>
                </div>
              </div>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 col-span-full">
                <button
                  onClick={handleSubmit}
                  disabled={updating}
                  type="button"
                  className="flex items-center gap-2 px-4  bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {t('Save')}
                </button>
                <Link to="/main/receiveList">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-1  bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-110"
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

export default ReceiveEdit;
