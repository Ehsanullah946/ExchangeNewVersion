import React, { useEffect, useState } from 'react';
import {
  useSingleReceive,
  useUpdateReceive,
  useUpdateReceiveReceiver,
  useUpdateReceiveSender,
} from '../../../hooks/useReceive';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Select from '../../../components/common/LazySelect';
import { useToast } from '../../../hooks/useToast';
import { useMoneyType } from '../../../hooks/useMoneyType';
import { useCustomers } from '../../../hooks/useCustomers';
import { useBranch } from '../../../hooks/useBranch';
import {
  BsListCheck,
  BsSearch,
  BsPerson,
  BsPersonPlus,
  BsCheckCircle,
  BsXCircle,
  BsLightningCharge,
} from 'react-icons/bs';
import { RiDownload2Line } from 'react-icons/ri';
import { PulseLoader } from 'react-spinners';
import { BiChevronDown } from 'react-icons/bi';
import { useDateFormatter } from '../../../hooks/useDateFormatter';
import AfghanDatePicker from '../../../components/common/AfghanDatePicker';
import DateInput from '../../../components/common/DateInput';

// Modal Components
const SenderModal = ({ isOpen, onClose, onSubmit, initialData, isLoading }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    fatherName: '',
    nationalCode: '',
    phone: '',
    photo: '',
  });

  // Reset form when initialData changes or modal opens
  useEffect(() => {
    if (isOpen && initialData) {
      setForm({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        fatherName: initialData.fatherName || '',
        nationalCode: initialData.nationalCode || '',
        phone: initialData.phone || '',
        photo: initialData.photo || '',
      });
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <BsPerson className="text-xl" />
              </div>
              <h2 className="text-xl font-bold">{t('Sender Information')}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <BsXCircle className="text-lg" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('First Name')} *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('Last Name')}
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('Father Name')}
              </label>
              <input
                type="text"
                name="fatherName"
                value={form.fatherName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('National Code')}
              </label>
              <input
                type="text"
                name="nationalCode"
                value={form.nationalCode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('Phone Number')}
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('Photo URL')}
              </label>
              <input
                type="url"
                name="photo"
                value={form.photo}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <BsCheckCircle className="text-md" />
                )}
                {t('Save Sender')}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white font-semibold rounded-lg transition-all duration-200"
              >
                <BsXCircle className="text-md" />
                {t('Cancel')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ReceiverModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}) => {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    fatherName: '',
    nationalCode: '',
    phone: '',
    photo: '',
  });

  // Reset form when initialData changes or modal opens
  useEffect(() => {
    if (isOpen && initialData) {
      setForm({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        fatherName: initialData.fatherName || '',
        nationalCode: initialData.nationalCode || '',
        phone: initialData.phone || '',
        photo: initialData.photo || '',
      });
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-t-2xl p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <BsPersonPlus className="text-xl" />
              </div>
              <h2 className="text-xl font-bold">{t('Receiver Information')}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <BsXCircle className="text-lg" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('First Name')} *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('Last Name')}
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('Father Name')}
              </label>
              <input
                type="text"
                name="fatherName"
                value={form.fatherName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('National Code')}
              </label>
              <input
                type="text"
                name="nationalCode"
                value={form.nationalCode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('Phone Number')}
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('Photo URL')}
              </label>
              <input
                type="url"
                name="photo"
                value={form.photo}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <BsCheckCircle className="text-md" />
                )}
                {t('Save Receiver')}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white font-semibold rounded-lg transition-all duration-200"
              >
                <BsXCircle className="text-md" />
                {t('Cancel')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ReceiveEdit = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toast = useToast();
  const { currentCalendar } = useDateFormatter();
  const { data, isLoading: loadingReceive } = useSingleReceive(id);
  const { mutate: updateReceive, isLoading: updating } = useUpdateReceive();

  console.log('single data', data);

  const { mutate: updateSender, isLoading: isUpdatingSender } =
    useUpdateReceiveSender();
  const { mutate: updateReceiver, isLoading: isUpdatingReceiver } =
    useUpdateReceiveReceiver();

  // Modal states
  const [senderModalOpen, setSenderModalOpen] = useState(false);
  const [receiverModalOpen, setReceiverModalOpen] = useState(false);

  const { data: moneyTypeResponse } = useMoneyType();
  const { data: customerResponse } = useCustomers();
  const { data: branchResponse } = useBranch();

  const moneyTypeOptions = (moneyTypeResponse?.data || []).map((c) => ({
    value: c.id,
    label: `${c.typeName}`,
  }));

  const customerOptions = (customerResponse?.data || []).map((c) => ({
    value: c.id,
    label: `${c.Stakeholder?.Person?.firstName} ${c.Stakeholder?.Person?.lastName}`,
  }));

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

  const handleOpenSenderModal = () => {
    if (!form.senderName) {
      toast.error(t('Please enter sender name first'));
      return;
    }
    setSenderModalOpen(true);
  };

  const handleOpenReceiverModal = () => {
    if (!form.receiverName) {
      toast.error(t('Please enter receiver name first'));
      return;
    }
    setReceiverModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const [senderModalData, setSenderModalData] = useState({
    firstName: '',
    lastName: '',
    fatherName: '',
    nationalCode: '',
    phone: '',
    photo: '',
  });

  const [receiverModalData, setReceiverModalData] = useState({
    firstName: '',
    lastName: '',
    fatherName: '',
    nationalCode: '',
    phone: '',
    photo: '',
  });

  useEffect(() => {
    if (data?.data) {
      const receive = data.data;
      setForm((prev) => ({
        ...prev,
        ...receive,
      }));

      console.log('Receive data for modals:', receive);

      // Prefill modal data with existing sender details
      if (receive.sender) {
        const senderPerson = receive.sender.Stakeholder?.Person;
        setSenderModalData({
          firstName: senderPerson?.firstName || receive.senderName || '',
          lastName: senderPerson?.lastName || '',
          fatherName: senderPerson?.fatherName || '',
          nationalCode: senderPerson?.nationalCode || '',
          phone: senderPerson?.phone || '',
          photo: senderPerson?.photo || '',
        });
      } else {
        // Fallback to just the senderName if no sender object exists
        setSenderModalData((prev) => ({
          ...prev,
          firstName: receive.senderName || '',
        }));
      }

      // Prefill modal data with existing receiver details
      if (receive.receiver) {
        const receiverPerson = receive.receiver.Stakeholder?.Person;
        setReceiverModalData({
          firstName: receiverPerson?.firstName || receive.receiverName || '',
          lastName: receiverPerson?.lastName || '',
          fatherName: receiverPerson?.fatherName || '',
          nationalCode: receiverPerson?.nationalCode || '',
          phone: receiverPerson?.phone || '',
          photo: receiverPerson?.photo || '',
        });
      } else {
        // Fallback to just the receiverName if no receiver object exists
        setReceiverModalData((prev) => ({
          ...prev,
          firstName: receive.receiverName || '',
        }));
      }
    }
  }, [data]);

  const handleUpdateSender = async (senderData) => {
    updateSender(
      { id, ...senderData },
      {
        onSuccess: () => {
          if (
            senderData.firstName &&
            senderData.firstName !== form.senderName
          ) {
            setForm((prev) => ({
              ...prev,
              senderName: senderData.firstName,
            }));
          }
          toast.success(t('Sender information updated successfully'));
          setSenderModalOpen(false);
        },
        onError: (error) => {
          console.error('Failed to update sender:', error);
          toast.error(t('Failed to update sender information'));
        },
      }
    );
  };

  const handleUpdateReceiver = async (receiverData) => {
    updateReceiver(
      { id, ...receiverData },
      {
        onSuccess: () => {
          // Optionally update the receiver name in the form if firstName changed
          if (
            receiverData.firstName &&
            receiverData.firstName !== form.receiverName
          ) {
            setForm((prev) => ({
              ...prev,
              receiverName: receiverData.firstName,
            }));
          }
          toast.success(t('Receiver information updated successfully'));
          setReceiverModalOpen(false);
        },
        onError: (error) => {
          console.error('Failed to update receiver:', error);
          toast.error(t('Failed to update receiver information'));
        },
      }
    );
  };

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Actions */}
          <div className="flex mt-1 justify-between gap-1 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 mb-1">
            <div className="flex flex-wrap justify-center items-center p-2 gap-3">
              <Link to="/main/receiveList">
                <button
                  className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-z-150 active:scale-110"
                  type="primary"
                >
                  <span className="flex justify-between">
                    <BsListCheck className="mt-1 ml-3" />
                    {t('List')}
                  </span>
                </button>
              </Link>
              <button
                className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 active:scale-110"
                type="primary"
              >
                <span className="flex justify-between ">
                  <BsSearch className="mt-1 ml-3" /> {t('Search')}
                </span>
              </button>
              <button
                onClick={() => setSenderModalOpen(true)}
                className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                type="button"
              >
                <BsPerson className="text-sm" />
                {t('Complete Sender Info')}
              </button>

              <button
                onClick={() => setReceiverModalOpen(true)}
                className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                type="button"
              >
                <BsPersonPlus className="text-sm" />
                {t('Complete Receiver Info')}
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

                    {/* Sender Input with Complete Button */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('Sender')}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="senderName"
                          onChange={handleChange}
                          value={form.senderName}
                          className="flex-1 border border-gray-200 bg-gray-50/50 rounded-xl py-2 px-4 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                          required
                        />
                        <button
                          type="button"
                          onClick={handleOpenSenderModal}
                          disabled={!form.senderName}
                          className="flex items-center gap-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-xl transition-all duration-200 shadow-sm disabled:cursor-not-allowed"
                          title={t('Complete sender information')}
                        >
                          <BsPerson className="text-sm" />
                        </button>
                      </div>
                    </div>

                    {/* Receiver Input with Complete Button */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('Receiver')}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="receiverName"
                          onChange={handleChange}
                          value={form.receiverName}
                          className="flex-1 border border-gray-200 bg-gray-50/50 rounded-xl py-2 px-4 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                          required
                        />
                        <button
                          type="button"
                          onClick={handleOpenReceiverModal}
                          disabled={!form.receiverName}
                          className="flex items-center gap-1 px-3 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-xl transition-all duration-200 shadow-sm disabled:cursor-not-allowed"
                          title={t('Complete receiver information')}
                        >
                          <BsPersonPlus className="text-sm" />
                        </button>
                      </div>
                    </div>

                    {/* Rest of your existing form fields... */}
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

                  {/* Right Column - Keep your existing right column code */}
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
                    disabled={updating}
                    type="button"
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {updating ? (
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

      {/* Modals */}
      <SenderModal
        isOpen={senderModalOpen}
        onClose={() => setSenderModalOpen(false)}
        onSubmit={handleUpdateSender}
        initialData={senderModalData}
        isLoading={isUpdatingSender}
      />

      <ReceiverModal
        isOpen={receiverModalOpen}
        onClose={() => setReceiverModalOpen(false)}
        onSubmit={handleUpdateReceiver}
        initialData={receiverModalData}
        isLoading={isUpdatingReceiver}
      />
    </>
  );
};

export default ReceiveEdit;
