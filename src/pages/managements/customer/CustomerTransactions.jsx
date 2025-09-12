import { useParams } from 'react-router-dom';

const CustomerTransactions = () => {
  const { id } = useParams();

  // Fake data (instead of backend)
  const fakeTransactions = [
    { id: 1, type: 'deposit', amount: 500, createdAt: '2025-09-10T12:30:00' },
    {
      id: 2,
      type: 'withdrawal',
      amount: 200,
      createdAt: '2025-09-11T09:15:00',
    },
    { id: 3, type: 'transfer', amount: 100, createdAt: '2025-09-12T15:45:00' },
  ];

  return (
    <div>
      <h1>Customer {id} Transactions</h1>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {fakeTransactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.type}</td>
              <td>{tx.amount}</td>
              <td>{new Date(tx.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTransactions;
