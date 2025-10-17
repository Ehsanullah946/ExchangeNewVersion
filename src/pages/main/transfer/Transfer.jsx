import { useState } from 'react';
import Select from '../../../components/common/LazySelect';
import { BiChevronDown } from 'react-icons/bi';
import {
  BsInfoCircle,
  BsLightningCharge,
  BsListCheck,
  BsPrinter,
  BsSearch,
  BsXCircle,
} from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import {
  RiDownload2Line,
  RiSendPlaneFill,
  RiSendPlaneLine,
} from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useCustomers } from '../../../hooks/useCustomers';
import { useMoneyType } from '../../../hooks/useMoneyType';
import { useToast } from '../../../hooks/useToast';
import { useBranch } from '../../../hooks/useBranch';
import { useCreateTransfer } from '../../../hooks/useTransfer';
import { useDateFormatter } from '../../../hooks/useDateFormatter';
import AfghanDatePicker from '../../../components/common/AfghanDatePicker';
import DateInput from '../../../components/common/DateInput';
const Transfer = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const toast = useToast();
  const { mutate, isLoading } = useCreateTransfer();

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
    transferNo: '',
    transferAmount: '',
    chargesAmount: '',
    chargesType: '',
    branchCharges: '',
    branchChargesType: '',
    tDate: '',
    description: '',
    toWhere: '',
    customerId: '',
    senderName: '',
    receiverName: '',
    moneyTypeId: '',
    channels: '',
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
      !form.toWhere ||
      !form.senderName ||
      !form.receiverName ||
      !form.moneyTypeId ||
      !form.transferNo
    ) {
      toast.error(t('Please select transfer field'));
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
        toast.success(t('transfer Created'));
        navigate('/main/transferList');
      },
      onError: (error) => {
        console.error('Backend error:', error);
        let errorMessage = t('createTransferFailed');

        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;

          if (error.response.data.message.includes('Validation error')) {
            errorMessage = t('TransferDuplicate');
          } else if (error.response.data.message.includes('validation')) {
            errorMessage = t('invalidInputData');
          }
        }

        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Actions */}
        <div className=" flex mt-1 justify-between  gap-1 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 mb-1">
          <div className="flex flex-wrap justify-center items-center p-2 gap-3">
            <Link to="/main/transferList">
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
                <RiSendPlaneFill className="text-xl" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">{t('Send')}</h1>
            </div>
          </div>
          {/* Form Content */}
          <div className="p-6 md:p-8">
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
                      name="toWhere"
                      isSearchable
                      options={branchOptions}
                      value={branchOptions.find(
                        (opt) => opt.value === form.toWhere
                      )}
                      onChange={(selected) =>
                        setForm((prev) => ({
                          ...prev,
                          toWhere: selected?.value || '',
                        }))
                      }
                      styles={{
                        control: (base) => ({
                          ...base,
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px',
                          padding: '2px 8px',
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

                  {/* Transfer Number */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('Number')}
                    </label>
                    <input
                      type="text"
                      name="transferNo"
                      onChange={handleChange}
                      value={form.transferNo}
                      className="w-full border border-gray-200 bg-gray-50/50 rounded-xl py-2 px-4 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                      required
                      placeholder="TRF-001"
                    />
                  </div>

                  {/* Sender Information */}
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
                      placeholder={t('Enter sender name')}
                    />
                  </div>

                  {/* Receiver Information */}
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
                      placeholder={t('Enter receiver name')}
                    />
                  </div>

                  {/* Transfer Amount */}
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
                          name="transferAmount"
                          value={form.transferAmount}
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

                  <div className="bg-gradient-to-br from-orange-50 to-amber-50/30 rounded-xl p-4 border border-orange-200">
                    <h3 className="text-sm font-semibold text-orange-800 mb-3 flex items-center gap-2">
                      <BsLightningCharge className="text-orange-600" />
                      {t('Transfer Charges')}
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
                  {/* Customer Selection */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('Customer Account')}
                    </label>
                    <Select
                      className="w-full"
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
                      styles={{
                        control: (base) => ({
                          ...base,
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px',
                          padding: '2px 8px',
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
                      className="w-full border border-gray-200 bg-gray-50/50 rounded-xl py-2 px-4 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm resize-none"
                      placeholder={t('Enter transfer purpose or notes...')}
                    />
                  </div>

                  {/* Date Input */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('Date')}
                    </label>
                    {currentCalendar === 'persian' ? (
                      <AfghanDatePicker
                        name="tDate"
                        value={form.tDate}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-200 bg-gray-50/50 rounded-xl py-3 px-4 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                      />
                    ) : (
                      <DateInput
                        name="tDate"
                        value={form.tDate}
                        onChange={handleChange}
                        required
                      />
                    )}
                  </div>

                  {/* Transfer Summary */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50/30 rounded-xl p-4 border border-blue-200">
                    <h3 className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <BsInfoCircle className="text-blue-600" />
                      {t('Transfer Summary')}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('Amount')}:</span>
                        <span className="font-semibold text-gray-800">
                          {form.transferAmount || '0.00'}
                          {form.moneyTypeId &&
                          moneyTypeOptions.find(
                            (opt) => opt.value === form.moneyTypeId
                          )?.label
                            ? ` ${
                                moneyTypeOptions.find(
                                  (opt) => opt.value === form.moneyTypeId
                                )?.label
                              }`
                            : ''}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {t('Total Charges')}:
                        </span>
                        <span className="font-semibold text-red-600">
                          {(
                            (parseFloat(form.chargesAmount) || 0) +
                            (parseFloat(form.branchCharges) || 0)
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className="border-t border-blue-200 pt-2 flex justify-between">
                        <span className="text-gray-700 font-medium">
                          {t('Net Amount')}:
                        </span>
                        <span className="font-bold text-green-600">
                          {(
                            (parseFloat(form.transferAmount) || 0) -
                            (parseFloat(form.chargesAmount) || 0) -
                            (parseFloat(form.branchCharges) || 0)
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mt-3 pt-3 border-t border-gray-200">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  type="button"
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <RiSendPlaneFill className="text-md" />
                  )}
                  {t('Send Transfer')}
                </button>

                <Link to="/main/transferList">
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
  );
};

export default Transfer;
