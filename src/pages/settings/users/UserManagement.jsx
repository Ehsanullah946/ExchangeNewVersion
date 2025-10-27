// components/UserManagement.js
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addUserToOrganization, getOrganizationUsers } from '../../../api/auth';
import { useSelector } from 'react-redux';
import {
  FiUserPlus,
  FiUsers,
  FiMail,
  FiPhone,
  FiKey,
  FiUser,
  FiX,
  FiLoader,
  FiEye,
  FiBriefcase,
} from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const UserManagement = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    whatsApp: '',
    usertypeId: 3, // Default to Employee
  });
  const [showForm, setShowForm] = useState(false);
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const { organizationId, user } = useSelector((state) => state.auth);

  // Fetch existing users in the organization
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['organizationUsers', organizationId],
    queryFn: () => getOrganizationUsers(organizationId),
    enabled: !!organizationId,
  });

  // Add user mutation
  const addUserMutation = useMutation({
    mutationFn: addUserToOrganization,
    onSuccess: () => {
      // Refresh the users list
      queryClient.invalidateQueries(['organizationUsers', organizationId]);
      // Reset form
      setFormData({
        username: '',
        email: '',
        password: '',
        whatsApp: '',
        usertypeId: 3,
      });
      setShowForm(false);
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Failed to add user');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate user type (only allow 3 and 4)
    if (![3, 4].includes(parseInt(formData.usertypeId))) {
      alert('Invalid user type selected');
      return;
    }

    addUserMutation.mutate(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const userTypeLabels = {
    3: 'Employee',
    4: 'Viewer',
  };

  const userTypeIcons = {
    3: <FiBriefcase className="text-lg" />,
    4: <FiEye className="text-lg" />,
  };

  const userTypeDescriptions = {
    3: 'Can perform assigned tasks and access limited features',
    4: 'Can only view data, no modification rights',
  };

  const userTypeColors = {
    3: 'from-green-500 to-emerald-600',
    4: 'from-blue-500 to-cyan-600',
  };

  if (!user || user.role !== 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiX className="text-2xl text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Access Denied
                </h3>
                <p className="text-red-600">
                  You don't have permission to manage users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('User Management')}
            </h1>
            <p className="text-gray-600">
              {t('Manage users and permissions in your organization')}
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 font-semibold"
          >
            {showForm ? (
              <>
                <FiX className="text-lg" />
                {t('Cancel')}
              </>
            ) : (
              <>
                <FiUserPlus className="text-lg" />
                {t('Add New User')}
              </>
            )}
          </button>
        </div>

        {/* Add User Form */}
        {showForm && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-100/50 mb-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                <FiUserPlus className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {t('Add New User')}
                </h2>
                <p className="text-gray-600 text-sm">
                  {t('Create a new user account for your organization')}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Username */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FiUser className="inline mr-2 text-gray-500" />
                    {t('Username')} *
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                    placeholder="Enter username"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FiMail className="inline mr-2 text-gray-500" />
                    {t('Email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                    placeholder="Enter email address"
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FiKey className="inline mr-2 text-gray-500" />
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                    placeholder="Enter password"
                    required
                    minLength="6"
                  />
                </div>

                {/* WhatsApp */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FiPhone className="inline mr-2 text-gray-500" />
                    {t('WhatsApp')}
                  </label>
                  <input
                    type="text"
                    name="whatsApp"
                    value={formData.whatsApp}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                    placeholder="+1234567890"
                  />
                </div>

                {/* User Type */}
                <div className="lg:col-span-2 space-y-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('User Type')} *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[3, 4].map((typeId) => (
                      <div
                        key={typeId}
                        className={`relative border-2 rounded-2xl p-4 transition-all duration-300 cursor-pointer ${
                          parseInt(formData.usertypeId) === typeId
                            ? 'border-blue-500 bg-blue-50/50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                        }`}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            usertypeId: typeId,
                          }))
                        }
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-3 rounded-xl bg-gradient-to-r ${userTypeColors[typeId]} text-white`}
                          >
                            {userTypeIcons[typeId]}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <input
                                type="radio"
                                name="usertypeId"
                                value={typeId}
                                checked={
                                  parseInt(formData.usertypeId) === typeId
                                }
                                onChange={handleChange}
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600"
                              />
                              <label className="font-bold text-gray-900">
                                {userTypeLabels[typeId]}
                              </label>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {userTypeDescriptions[typeId]}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {t(
                      'Note: You can only create Employees and Viewers. Admin rolesare restricted.'
                    )}
                  </p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="submit"
                  disabled={addUserMutation.isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2 font-semibold"
                >
                  {addUserMutation.isLoading ? (
                    <>
                      <FiLoader className="animate-spin" />
                      {t('Adding User')}...
                    </>
                  ) : (
                    <>
                      <FiUserPlus />
                      {t('Add User')}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  {t('Cancel')}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Users List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100/50 overflow-hidden">
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <FiUsers className="text-white text-lg" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {t('Organization Users')}
                </h2>
                <p className="text-gray-600 text-sm">
                  {users?.length || 0} user(s) in your organization
                </p>
              </div>
            </div>
          </div>

          {usersLoading ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center gap-3 text-gray-600">
                <FiLoader className="animate-spin text-xl" />
                <span className="font-medium">Loading users...</span>
              </div>
            </div>
          ) : users && users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/80">
                  <tr>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {'User'}
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {t('Contact')}
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {t('Role')}
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {t('WhatsApp')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50/50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg bg-gradient-to-r ${
                              user.usertypeId === 3
                                ? 'from-green-500 to-emerald-500'
                                : 'from-blue-500 to-cyan-500'
                            }`}
                          >
                            {userTypeIcons[user.usertypeId]}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {user.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                            user.usertypeId === 3
                              ? 'bg-green-100 text-green-800 border border-green-200'
                              : 'bg-blue-100 text-blue-800 border border-blue-200'
                          }`}
                        >
                          {userTypeIcons[user.usertypeId]}
                          {userTypeLabels[user.usertypeId] || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 flex items-center gap-2">
                          {user.whatsApp ? (
                            <>
                              <FiPhone className="text-gray-500" />
                              {user.whatsApp}
                            </>
                          ) : (
                            <span className="text-gray-400">
                              {t('Not provided')}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                {'No Users Found'}
              </h3>
              <p className="text-gray-500 mb-6">
                Get started by adding your first user to the organization.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2"
              >
                <FiUserPlus />
                Add First User
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UserManagement;
