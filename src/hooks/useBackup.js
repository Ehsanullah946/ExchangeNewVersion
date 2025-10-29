// hooks/useBackup.js - UPDATED DOWNLOAD FUNCTION
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createBackup,
  listBackups,
  downloadBackup,
  restoreBackup,
  deleteBackup,
  cleanupBackups,
} from '../api/backupApi';

export const useBackups = () => {
  return useQuery({
    queryKey: ['backups'],
    queryFn: listBackups,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: 'always',
    onError: (error) => {
      console.log('Error fetching backups', error);
    },
  });
};

export const useCreateBackup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBackup,
    onSuccess: () => {
      queryClient.invalidateQueries(['backups']);
    },
    onError: (error) => {
      console.log('Error creating backup', error);
    },
  });
};

export const useDownloadBackup = () => {
  return useMutation({
    mutationFn: async (filename) => {
      const response = await downloadBackup(filename);

      // Check if response is a Blob
      if (response.data instanceof Blob) {
        return response.data;
      } else {
        // If not a Blob, create one from the response
        const blob = new Blob([JSON.stringify(response.data)], {
          type: 'application/octet-stream',
        });
        return blob;
      }
    },
    onSuccess: (blob, filename) => {
      try {
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';

        document.body.appendChild(a);
        a.click();

        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (error) {
        console.error('Error creating download link:', error);
        // Fallback: Open in new window
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
        setTimeout(() => window.URL.revokeObjectURL(url), 1000);
      }
    },
    onError: (error) => {
      console.log('Error downloading backup', error);
    },
  });
};

export const useRestoreBackup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: restoreBackup,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.log('Error restoring backup', error);
    },
  });
};

export const useDeleteBackup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBackup,
    onSuccess: () => {
      queryClient.invalidateQueries(['backups']);
    },
    onError: (error) => {
      console.log('Error deleting backup', error);
    },
  });
};

export const useCleanupBackups = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cleanupBackups,
    onSuccess: () => {
      queryClient.invalidateQueries(['backups']);
    },
    onError: (error) => {
      console.log('Error cleaning up backups', error);
    },
  });
};
