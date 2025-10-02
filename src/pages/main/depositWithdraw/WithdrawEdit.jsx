import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import {
  useSingleDepositWithdraw,
  useUpdateWithdrawDeposit,
} from '../../../hooks/useDeposit';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../../hooks/useToast';
import { PulseLoader } from 'react-spinners';
import Button from '../../../components/layout/Button';
import { BsListCheck } from 'react-icons/bs';
import { useAccount } from '../../../hooks/useAccount';
import { FaRegArrowAltCircleUp } from 'react-icons/fa';

const WithdrawEdit = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toast = useToast();

  const { data, isLoading: loadingDeposit } = useSingleDepositWithdraw(id);
  const { mutate: updateWithdraw, isLoading: updating } =
    useUpdateWithdrawDeposit();

  console.log('withdraw:', data);

  const { data: accountResponse } = useAccount();

  const accountOptions = (accountResponse?.data || []).map((c) => ({
    value: c.No,
    label: `${c.Customer?.Stakeholder?.Person?.firstName} - ${c.MoneyType.typeName}`,
  }));

  const [form, setForm] = useState({
    withdraw: '',
    description: '',
    accountNo: '',
    employeeId: '',
    DWData: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (data?.data) {
      const depositWithdraw = data.data;
      setForm((prev) => ({
        ...prev,
        ...depositWithdraw,
      }));
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanData = Object.fromEntries(
      Object.entries(form).filter(
        ([k, v]) => v !== '' && v !== null && k !== 'deposit'
      )
    );

    updateWithdraw(
      { id, payload: cleanData },
      {
        onSuccess: () => {
          toast.success(t('Update Successful'));
          navigate('/main/withdrawList');
        },
        onError: (err) => {
          console.error(err);
          toast.error(t('Update failed'));
        },
      }
    );
  };

  if (loadingDeposit)
    return (
      <p className="p-4 flex justify-center">
        <PulseLoader color="green" size={15} />
      </p>
    );
  return (
    <>
      <div className="grid justify-center">
        <div className=" flex mt-1 mb-1">
          <Link to="/main/withdrawList">
            <Button type="primary">
              <span className="flex justify-between">
                <BsListCheck className="mt-1 ml-3" />
                {t('List')}
              </span>
            </Button>
          </Link>
          <div class="h-8 flex items-center justify-center bg-gradient-to-b from-[#e3d5ff] to-[#ffe7e7] rounded-2xl overflow-hidden cursor-pointer shadow-md">
            <input
              type="text"
              name="text"
              id="input"
              placeholder={t('Search')}
              class="h-6 border-none outline-none caret-orange-600 bg-white rounded-[30px] px-3 tracking-[0.8px] text-[#131313] font-serif"
            />
          </div>
        </div>
        <div>
          <form>
            <div className="font-extrabold bg-blue-400 w-full  p-3 ltr:mr-4 rtl:ml-4  rounded-t-2xl text-white  text-center">
              <span className="flex justify-center gap-3 ">
                {t('Withdraw')} <FaRegArrowAltCircleUp className="mt-1" />
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 p-3 rounded-b-2xl ltr:mr-4 rtl:ml-4 px-4 md:px-6 lg:px-10 border-b-2 border-t-2 shadow-2xl w-full max-w-7xl mx-auto">
              <div className=" space-y-1 w-full">
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Account')}:</label>
                  <Select
                    className="w-full shadow-sm"
                    name="accountNo"
                    isSearchable
                    options={accountOptions}
                    value={accountOptions.find(
                      (opt) => opt.value === form.accountNo
                    )}
                    onChange={(selected) =>
                      setForm((prev) => ({
                        ...prev,
                        accountNo: selected?.value || '',
                      }))
                    }
                  />
                </div>
                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32">{t('Amount')}:</label>
                  <input
                    type="number"
                    name="withdraw"
                    onChange={handleChange}
                    value={form.withdraw}
                    className=" w-full border border-gray-300 shadow-sm text-red-600 font-semibold  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    required
                  />
                </div>
                <div className="flex gap-6 justify-between">
                  <label className="sm:w-32 mt-2">{t('Date')}:</label>
                  <input
                    type="date"
                    name="DWData"
                    value={form.DWData}
                    onChange={handleChange}
                    className="border shadow-sm rounded-lg w-full p-1"
                    required
                  />
                </div>

                <div className="flex gap-6 flex-wrap md:flex-nowrap justify-between ">
                  <label className="sm:w-32 mt-1">{t('Description')}:</label>
                  <textarea
                    rows="4"
                    name="description"
                    onChange={handleChange}
                    value={form.description}
                    className="w-full border border-gray-300 shadow-sm text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                    placeholder="بشتر ..........."
                  />
                </div>

                <div className="flex flex-wrap justify-center sm:justify-start gap-2 col-span-full">
                  <button
                    onClick={handleSubmit}
                    disabled={updating}
                    type="button"
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-1 text-center me-2 mb-2 "
                  >
                    {t('Save')}
                  </button>
                  <Link to="/main/withdrawList">
                    <button
                      type="button"
                      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-4 py-1 text-center me-2 mb-2"
                    >
                      {t('Cancel')}
                    </button>
                  </Link>
                </div>
              </div>

              <div className="w-full p-3">
                <p className="text-md mb-1 font-semibold">{t('Account')}</p>
                <hr className="mb-3" />
                <div className="relative overflow-x-auto shadow-2xl sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-blue-100">
                    <thead className="text-xs text-center text-white uppercase bg-blue-600">
                      <tr>
                        <th className="px-3 py-1">{t('Credit')}</th>
                        <th className="px-3 py-1">{t('Owe')}</th>
                        <th className="px-3 py-1">{t('Currency')}</th>
                        <th className="px-3 py-1">{t('Total')}</th>
                        <th className="px-3 py-1">{t('Status')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-blue-500 text-center border-b border-blue-400">
                        <td className="px-3 py-2">50000</td>
                        <td>30000</td>
                        <td>AFG</td>
                        <td>4300</td>
                        <td>بدهکار</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default WithdrawEdit;
