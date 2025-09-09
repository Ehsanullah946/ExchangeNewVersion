export async function fakeLogin(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'admin' && password === '123') {
        resolve({
          user: { id: 1, name: 'Admin User', role: 'admin' },
          token: 'fake-jwt-token-12345',
        });
      } else if (username === 'staff' && password === '123') {
        resolve({
          user: { id: 2, name: 'Staff User', role: 'staff' },
          token: 'fake-jwt-token-67890',
        });
      } else {
        reject(new Error('Invalid username or password'));
      }
    }, 1000);
  });
}
