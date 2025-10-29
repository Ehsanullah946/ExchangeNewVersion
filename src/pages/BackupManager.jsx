import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '../hooks/useToast';
import {
  BsCloudDownload,
  BsCloudUpload,
  BsTrash,
  BsPlus,
  BsClock,
  BsDatabase,
  BsCheckCircle,
  BsExclamationTriangle,
  BsShieldCheck,
  BsInfoCircle,
  BsArrowRepeat,
} from 'react-icons/bs';

import {
  useBackups,
  useCleanupBackups,
  useCreateBackup,
  useDeleteBackup,
  useDownloadBackup,
  useRestoreBackup,
} from '../hooks/useBackup';

const BackupManager = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const [restoreConfirm, setRestoreConfirm] = useState(null);

  // Queries
  const { data: backupsData, isLoading, error, refetch } = useBackups();

  // Mutations
  const createBackupMutation = useCreateBackup();
  const downloadBackupMutation = useDownloadBackup();
  const restoreBackupMutation = useRestoreBackup();
  const deleteBackupMutation = useDeleteBackup();
  const cleanupBackupsMutation = useCleanupBackups();

  const backups = backupsData?.backups || [];

  const handleCreateBackup = () => {
    createBackupMutation.mutate(
      { type: 'mysql' },
      {
        onSuccess: () => {
          toast.success(t('Backup created successfully!'));
          refetch();
        },
        onError: (error) => {
          toast.error(t('Failed to create backup: ') + error.message);
        },
      }
    );
  };

  const handleDownloadBackup = (filename) => {
    downloadBackupMutation.mutate(filename, {
      onSuccess: () => {
        toast.success(t('Backup download started!'));
      },
      onError: (error) => {
        toast.error(t('Failed to download backup: ') + error.message);
      },
    });
  };

  const handleRestoreBackup = (filename) => {
    setRestoreConfirm(filename);
  };

  const confirmRestore = () => {
    if (restoreConfirm) {
      restoreBackupMutation.mutate(
        { filename: restoreConfirm },
        {
          onSuccess: () => {
            toast.success(t('Database restored successfully!'));
            setRestoreConfirm(null);
            refetch();
          },
          onError: (error) => {
            toast.error(t('Failed to restore backup: ') + error.message);
            setRestoreConfirm(null);
          },
        }
      );
    }
  };

  const handleDeleteBackup = (filename) => {
    if (window.confirm(t('Are you sure you want to delete this backup?'))) {
      deleteBackupMutation.mutate(filename, {
        onSuccess: () => {
          toast.success(t('Backup deleted successfully!'));
          refetch();
        },
        onError: (error) => {
          toast.error(t('Failed to delete backup: ') + error.message);
        },
      });
    }
  };

  const handleCleanupBackups = () => {
    if (
      window.confirm(
        t('This will delete backups older than 30 days. Continue?')
      )
    ) {
      cleanupBackupsMutation.mutate(undefined, {
        onSuccess: () => {
          toast.success(t('Old backups cleaned up successfully!'));
          refetch();
        },
        onError: (error) => {
          toast.error(t('Failed to cleanup backups: ') + error.message);
        },
      });
    }
  };

  const handleRefresh = () => {
    refetch();
    toast.info(t('Refreshing backup list...'));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getBackupAgeColor = (dateString) => {
    const backupDate = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - backupDate) / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return 'text-green-600 bg-green-100';
    if (diffDays < 7) return 'text-blue-600 bg-blue-100';
    if (diffDays < 30) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <BsExclamationTriangle className="text-red-500 text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-red-800 text-lg">
                  {t('Error Loading Backups')}
                </h3>
                <p className="text-red-700">
                  {error.message || t('Failed to load backup data')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-lg mb-4">
            <BsDatabase className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
            {t('Backup Management')}
          </h1>
          <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto leading-relaxed">
            {t('Secure your data with automated backups and easy restoration')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleCreateBackup}
              disabled={createBackupMutation.isLoading}
              className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {createBackupMutation.isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <BsPlus className="text-xl group-hover:rotate-90 transition-transform duration-300" />
              )}
              {t('Create Backup')}
            </button>

            <button
              onClick={handleCleanupBackups}
              disabled={
                cleanupBackupsMutation.isLoading || backups.length === 0
              }
              className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {cleanupBackupsMutation.isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <BsTrash className="group-hover:scale-110 transition-transform duration-300" />
              )}
              {t('Cleanup Old')}
            </button>

            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              <BsArrowRepeat
                className={`group-hover:rotate-180 transition-transform duration-300 ${
                  isLoading ? 'animate-spin' : ''
                }`}
              />
              {t('Refresh')}
            </button>
          </div>

          {backups.length > 0 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-white/20">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <BsShieldCheck className="text-green-500" />
                <span>{t('Auto backup daily at 2:00 AM')}</span>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Restore Confirmation Modal */}
        {restoreConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
              <div className="p-6 bg-gradient-to-r from-orange-600 to-red-600 rounded-t-3xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <BsExclamationTriangle className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {t('Confirm Restore')}
                    </h3>
                    <p className="text-orange-100 text-sm mt-1">
                      {t('Critical operation - cannot be undone')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <BsInfoCircle className="text-orange-500 text-lg mt-0.5 flex-shrink-0" />
                    <div className="text-orange-800 text-sm">
                      <strong>{t('Warning:')}</strong>{' '}
                      {t('This will restore the database from backup')}{' '}
                      <code className="bg-orange-100 px-2 py-1 rounded font-mono text-xs">
                        {restoreConfirm}
                      </code>
                      . {t('All current data will be permanently replaced')}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setRestoreConfirm(null)}
                    className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
                  >
                    {t('Cancel')}
                  </button>
                  <button
                    onClick={confirmRestore}
                    disabled={restoreBackupMutation.isLoading}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50"
                  >
                    {restoreBackupMutation.isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                    ) : (
                      t('Confirm Restore')
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Backup List */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden mb-4">
          <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <BsDatabase className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {t('Available Backups')}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {t('Manage your database backup files')}
                  </p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl px-3 py-1 border border-gray-200">
                <span className="text-sm font-semibold text-gray-700">
                  {backups.length} {t('backups')}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600 font-medium">
                  {t('Loading backups...')}
                </p>
              </div>
            ) : backups.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <BsDatabase className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t('No backups available')}
                </h3>
                <p className="text-gray-600 max-w-sm mx-auto mb-6">
                  {t('Create your first backup to secure your database data')}
                </p>
                <button
                  onClick={handleCreateBackup}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  {t('Create First Backup')}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {backups.map((backup, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/20 transition-all duration-300 hover:shadow-lg hover:border-blue-200"
                  >
                    <div className="flex items-center gap-6 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {t('DB')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <p className="font-bold text-gray-900 text-md truncate">
                            {backup.filename}
                          </p>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getBackupAgeColor(
                              backup.created
                            )}`}
                          >
                            {new Date(backup.created).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-2 bg-gray-100 px-2  rounded-lg">
                            <BsClock className="text-gray-400" />
                            {formatDate(backup.created)}
                          </span>
                          <span className="flex items-center gap-2 bg-blue-100 text-blue-700 px-2  rounded-lg font-mono font-semibold">
                            {formatFileSize(backup.size)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDownloadBackup(backup.filename)}
                        disabled={downloadBackupMutation.isLoading}
                        className="p-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-xl transition-all duration-300 group/download disabled:opacity-50"
                        title={t('Download')}
                      >
                        <BsCloudDownload className="group-hover/download:scale-110 transition-transform duration-300" />
                      </button>
                      <button
                        onClick={() => handleRestoreBackup(backup.filename)}
                        disabled={restoreBackupMutation.isLoading}
                        className="p-3 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-xl transition-all duration-300 group/restore disabled:opacity-50"
                        title={t('Restore')}
                      >
                        <BsCloudUpload className="group-hover/restore:scale-110 transition-transform duration-300" />
                      </button>
                      <button
                        onClick={() => handleDeleteBackup(backup.filename)}
                        disabled={deleteBackupMutation.isLoading}
                        className="p-3 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xl transition-all duration-300 group/delete disabled:opacity-50"
                        title={t('Delete')}
                      >
                        <BsTrash className="group-hover/delete:scale-110 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Information Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <BsCheckCircle className="text-blue-600 text-xl" />
              </div>
              <h3 className="font-bold text-blue-900 text-lg">
                {t('Backup Information')}
              </h3>
            </div>
            <ul className="space-y-3">
              {[
                t('Backups are automatically created daily at 2:00 AM'),
                t('Backups are kept for 30 days automatically'),
                t('Files are compressed to save storage space'),
                t('Only administrators can manage backups'),
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-blue-800"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <BsExclamationTriangle className="text-orange-600 text-xl" />
              </div>
              <h3 className="font-bold text-orange-900 text-lg">
                {t('Important Notes')}
              </h3>
            </div>
            <ul className="space-y-3">
              {[
                t('Restoring a backup will replace all current data'),
                t('Always download backups before major updates'),
                t('Test backups regularly to ensure they work properly'),
                t('Store backups in a secure, off-site location'),
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-orange-800"
                >
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Enhanced Status Indicators */}
        <div className="space-y-3">
          {createBackupMutation.isLoading && (
            <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <div>
                  <p className="font-semibold text-blue-800">
                    {t('Creating backup...')}
                  </p>
                  <p className="text-blue-600 text-sm">
                    {t('This may take a few moments')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {restoreBackupMutation.isLoading && (
            <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 border border-orange-200 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <div>
                  <p className="font-semibold text-orange-800">
                    {t('Restoring database...')}
                  </p>
                  <p className="text-orange-600 text-sm">
                    {t('Do not close the browser during this process')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {cleanupBackupsMutation.isLoading && (
            <div className="bg-gradient-to-r from-red-50 to-red-100/50 border border-red-200 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                <div>
                  <p className="font-semibold text-red-800">
                    {t('Cleaning up old backups...')}
                  </p>
                  <p className="text-red-600 text-sm">
                    {t('Removing backups older than 30 days')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BackupManager;
