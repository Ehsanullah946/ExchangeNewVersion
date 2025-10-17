import React, { useState } from 'react';
import Select from '../../../components/common/LazySelect';
import { BiChevronDown } from 'react-icons/bi';
import {
  BsCheckCircle,
  BsLightningCharge,
  BsSearch,
  BsXCircle,
} from 'react-icons/bs';
import { BsListCheck } from 'react-icons/bs';
import { BsPrinter } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { RiDownload2Line } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../../hooks/useToast';
import { useCreateReceive } from '../../../hooks/useReceive';
import { useMoneyType } from '../../../hooks/useMoneyType';
import { useCustomers } from '../../../hooks/useCustomers';
import { useBranch } from '../../../hooks/useBranch';
import { useDateFormatter } from '../../../hooks/useDateFormatter';
import AfghanDatePicker from '../../../components/common/AfghanDatePicker';
import DateInput from '../../../components/common/DateInput';
const Receive = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const toast = useToast();
  const { mutate, isLoading } = useCreateReceive();

  const { currentCalendar } = useDateFormatter();

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
    destinationType: 'customer',
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // simple validation
    if (
      !form.fromWhere ||
      !form.senderName ||
      !form.receiverName ||
      !form.moneyTypeId ||
      !form.receiveNo
    ) {
      toast.error(t('Please select Receive field'));
      return;
    }

    const payload = {
      ...form,
      transferAmount: parseFloat(form.transferAmount) || 0,
      chargesAmount: parseFloat(form.chargesAmount) || 0,
      branchCharges: parseFloat(form.branchCharges),
    };

    const cleanData = Object.fromEntries(
      Object.entries(payload).filter(
        ([_, v]) => v !== '' && v !== null && v !== undefined
      )
    );

    mutate(cleanData, {
      onSuccess: () => {
        toast.success(t('Receive Created'));
        navigate('/main/receiveList');
      },
      onError: (error) => {
        console.error('Backend error:', error);
        let errorMessage = t('createReceiveFailed');

        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;

          if (error.response.data.message.includes('Validation error')) {
            errorMessage = t('ReceiveDuplicate');
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Actions */}
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
              <button
                className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-110"
                type="primary"
              >
                <span className="flex justify-between ">
                  <BsPrinter className="mt-1 ml-3" /> {t('Print')}
                </span>
              </button>
              <button
                className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 active:scale-110"
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

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-600 rounded-t-2xl via-purple-600 to-indigo-700 p-3">
              <div className="flex items-center justify-center gap-3 text-white">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <RiDownload2Line className="text-xl" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">
                  {t('Receive')}
                </h1>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-2 md:p-8">
              <form>
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-2">
                    {/* Branch Selection */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('Branch')}
                      </label>
                      <Select
                        className="w-full"
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
                        styles={{
                          control: (base) => ({
                            ...base,
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            padding: '2px 4px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            transition: 'all 0.2s',
                            '&:hover': {
                              borderColor: '#6366f1',
                              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.1)',
                            },
                          }),
                        }}
                      />
                    </div>

                    {/* Number Input */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('Number')}
                      </label>
                      <input
                        type="text"
                        name="receiveNo"
                        onChange={handleChange}
                        value={form.receiveNo}
                        className="w-full border border-gray-200 bg-gray-50/50 rounded-xl py-2 px-4 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                        required
                      />
                    </div>

                    {/* Transfer Input */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('Transfer')}
                      </label>
                      <input
                        type="text"
                        name="senderName"
                        onChange={handleChange}
                        value={form.senderName}
                        className="w-full border border-gray-200 bg-gray-50/50 rounded-xl py-2 px-4 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                        required
                      />
                    </div>

                    {/* Receiver Input */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('Receiver')}
                      </label>
                      <input
                        type="text"
                        name="receiverName"
                        onChange={handleChange}
                        value={form.receiverName}
                        className="w-full border border-gray-200 bg-gray-50/50 rounded-xl py-2 px-4 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                        required
                      />
                    </div>

                    {/* Amount with Currency */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('Amount')}
                      </label>
                      <div className="relative">
                        <div className="flex items-center bg-white border border-gray-200 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
                          <div className="pl-4 pr-3 py-2 text-gray-500 font-medium">
                            $
                          </div>
                          <input
                            name="receiveAmount"
                            value={form.receiveAmount}
                            onChange={handleChange}
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="w-full py-2 pr-4 border-0 bg-transparent text-gray-700 font-medium focus:outline-none focus:ring-0"
                            required
                          />
                          <div className="relative pr-3">
                            <select
                              name="moneyTypeId"
                              value={form.moneyTypeId}
                              onChange={(e) =>
                                setForm((prev) => ({
                                  ...prev,
                                  moneyTypeId: e.target.value,
                                }))
                              }
                              className="appearance-none bg-transparent py-2 pl-3 pr-8 text-gray-700 font-medium border-0 focus:outline-none focus:ring-0 cursor-pointer"
                            >
                              <option value="">{t('Currency')}</option>
                              {moneyTypeOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            <BiChevronDown className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Charges Amount */}
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50/30 rounded-xl p-3 border border-orange-200">
                      <h3 className="text-sm font-semibold text-orange-800 mb-3 flex items-center gap-2">
                        <BsLightningCharge className="text-orange-600" />
                        {t('Receive Charges')}
                      </h3>

                      {/* Service Charges */}
                      <div className="group mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('Service Charges')}
                        </label>
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-transparent transition-all duration-200">
                          <div className="pl-3 pr-2 py-2 text-gray-500 text-sm">
                            $
                          </div>
                          <input
                            name="chargesAmount"
                            value={form.chargesAmount}
                            onChange={handleChange}
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="w-full py-2 pr-3 border-0 bg-transparent text-gray-700 text-sm focus:outline-none focus:ring-0"
                          />
                          <div className="relative pr-2">
                            <select
                              name="chargesType"
                              value={form.chargesType}
                              onChange={(e) =>
                                setForm((prev) => ({
                                  ...prev,
                                  chargesType: e.target.value,
                                }))
                              }
                              className="appearance-none bg-transparent py-2 pl-2 pr-6 text-gray-700 text-sm border-0 focus:outline-none focus:ring-0 cursor-pointer"
                            >
                              <option value="">{t('Cur')}</option>
                              {moneyTypeOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            <BiChevronDown className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      {/* Branch Charges */}
                      <div className="group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('Branch Charges')}
                        </label>
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-transparent transition-all duration-200">
                          <div className="pl-3 pr-2 py-2 text-gray-500 text-sm">
                            $
                          </div>
                          <input
                            name="branchCharges"
                            value={form.branchCharges}
                            onChange={handleChange}
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="w-full py-2 pr-3 border-0 bg-transparent text-gray-700 text-sm focus:outline-none focus:ring-0"
                          />
                          <div className="relative pr-2">
                            <select
                              name="branchChargesType"
                              value={form.branchChargesType}
                              onChange={(e) =>
                                setForm((prev) => ({
                                  ...prev,
                                  branchChargesType: e.target.value,
                                }))
                              }
                              className="appearance-none bg-transparent py-2 pl-2 pr-6 text-gray-700 text-sm border-0 focus:outline-none focus:ring-0 cursor-pointer"
                            >
                              <option value="">{t('Cur')}</option>
                              {moneyTypeOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            <BiChevronDown className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-2">
                    {/* Customer vs Pass To Radio Group */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        {t('Destination Type')}
                      </label>

                      {/* Radio Group Container */}
                      <div className="flex flex-col gap-4 p-3 bg-gray-50/50 rounded-xl border border-gray-200">
                        {/* Customer Option */}
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-3 cursor-pointer group flex-1">
                            <div className="relative">
                              <input
                                type="radio"
                                name="destinationType"
                                value="customer"
                                checked={form.destinationType === 'customer'}
                                onChange={(e) =>
                                  setForm((prev) => ({
                                    ...prev,
                                    destinationType: e.target.value,
                                    passTo: '',
                                  }))
                                }
                                className="sr-only"
                              />
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                  form.destinationType === 'customer'
                                    ? 'border-blue-500 bg-blue-500'
                                    : 'border-gray-400 bg-white group-hover:border-blue-400'
                                }`}
                              >
                                {form.destinationType === 'customer' && (
                                  <div className="w-2 h-2 rounded-full bg-white"></div>
                                )}
                              </div>
                            </div>
                            <span
                              className={`font-medium transition-colors duration-200 ${
                                form.destinationType === 'customer'
                                  ? 'text-blue-600'
                                  : 'text-gray-700'
                              }`}
                            >
                              {t('Customer')}
                            </span>
                          </label>

                          {/* Customer Select - Only enabled when customer radio is selected */}
                          <div className="flex-1">
                            <Select
                              className="w-full"
                              name="customerId"
                              isSearchable
                              isDisabled={form.destinationType !== 'customer'}
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
                              styles={{
                                control: (base, state) => ({
                                  ...base,
                                  border: '1px solid #e2e8f0',
                                  borderRadius: '8px',
                                  padding: '1px 8px',
                                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                  backgroundColor: state.isDisabled
                                    ? '#f9fafb'
                                    : '#ffffff',
                                  opacity: state.isDisabled ? 0.6 : 1,
                                  transition: 'all 0.2s',
                                  '&:hover': {
                                    borderColor: state.isDisabled
                                      ? '#e2e8f0'
                                      : '#6366f1',
                                  },
                                }),
                              }}
                            />
                          </div>
                        </div>

                        {/* Pass To Option */}
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-3 cursor-pointer group flex-1">
                            <div className="relative">
                              <input
                                type="radio"
                                name="destinationType"
                                value="passTo"
                                checked={form.destinationType === 'passTo'}
                                onChange={(e) =>
                                  setForm((prev) => ({
                                    ...prev,
                                    destinationType: e.target.value,
                                    customerId: '', // Clear customerId when passTo is selected
                                  }))
                                }
                                className="sr-only"
                              />
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                  form.destinationType === 'passTo'
                                    ? 'border-green-500 bg-green-500'
                                    : 'border-gray-400 bg-white group-hover:border-green-400'
                                }`}
                              >
                                {form.destinationType === 'passTo' && (
                                  <div className="w-2 h-2 rounded-full bg-white"></div>
                                )}
                              </div>
                            </div>
                            <span
                              className={`font-medium transition-colors duration-200 ${
                                form.destinationType === 'passTo'
                                  ? 'text-green-600'
                                  : 'text-gray-700'
                              }`}
                            >
                              {t('pass to')}
                            </span>
                          </label>

                          {/* Pass To Select - Only enabled when passTo radio is selected */}
                          <div className="flex-1">
                            <Select
                              className="w-full"
                              name="passTo"
                              isSearchable
                              isDisabled={form.destinationType !== 'passTo'}
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
                              styles={{
                                control: (base, state) => ({
                                  ...base,
                                  border: '1px solid #e2e8f0',
                                  borderRadius: '8px',
                                  padding: '1px 8px',
                                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                  backgroundColor: state.isDisabled
                                    ? '#f9fafb'
                                    : '#ffffff',
                                  opacity: state.isDisabled ? 0.6 : 1,
                                  transition: 'all 0.2s',
                                  '&:hover': {
                                    borderColor: state.isDisabled
                                      ? '#e2e8f0'
                                      : '#10b981',
                                  },
                                }),
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('Description')}
                      </label>
                      <textarea
                        rows="4"
                        value={form.description}
                        onChange={handleChange}
                        name="description"
                        className="w-full border border-gray-200 bg-gray-50/50 rounded-xl py-2 px-3 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm resize-none"
                        placeholder={t('Enter description...')}
                      />
                    </div>

                    {/* Date Input */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('Date')}
                      </label>
                      {currentCalendar === 'persian' ? (
                        <AfghanDatePicker
                          name="rDate"
                          value={form.rDate}
                          onChange={handleChange}
                          required
                          className="w-full border border-gray-200 bg-gray-50/50 rounded-xl py-2 px-4 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                        />
                      ) : (
                        <DateInput
                          name="rDate"
                          value={form.rDate}
                          onChange={handleChange}
                          required
                        />
                      )}
                    </div>

                    {/* Status Toggle */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        {t('Status')}
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="receiveStatus"
                          checked={form.receiveStatus}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="relative w-14 h-7  bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
                        <span className="mr-3 text-sm font-medium text-gray-900">
                          {form.receiveStatus ? t('Completed') : t('Pending')}
                        </span>
                      </label>
                      {form.receiveStatus && (
                        <p className="text-sm text-green-600 mt-2 flex  gap-1">
                          <BsCheckCircle className="text-lg" />
                          {t('This receive is marked as completed')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    type="button"
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <BsCheckCircle className="text-md" />
                    )}
                    {t('Save Receive')}
                  </button>

                  <Link to="/main/receiveList">
                    <button
                      type="button"
                      className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                    >
                      <BsXCircle className="text-md" />
                      {t('Cancel')}
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Receive;
