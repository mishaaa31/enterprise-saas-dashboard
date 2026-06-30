import { faker } from '@faker-js/faker';

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';
export type PaymentMethod = 'credit_card' | 'paypal' | 'bank_transfer' | 'crypto';

export interface Order {
  id: string;
  customerName: string;
  date: string;
  status: OrderStatus;
  revenue: number;
  paymentMethod: PaymentMethod;
}

// Generate a large dataset
const generateOrders = (count: number): Order[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid().slice(0, 8),
    customerName: faker.person.fullName(),
    date: faker.date.recent({ days: 90 }).toISOString(),
    status: faker.helpers.arrayElement(['pending', 'processing', 'completed', 'cancelled']),
    revenue: parseFloat(faker.finance.amount({ min: 10, max: 5000, dec: 2 })),
    paymentMethod: faker.helpers.arrayElement(['credit_card', 'paypal', 'bank_transfer', 'crypto']),
  }));
};

const mockOrders = generateOrders(1000);

export interface FetchOrdersParams {
  pageIndex: number;
  pageSize: number;
  sorting: { id: string; desc: boolean }[];
  globalFilter: string;
}

export interface FetchOrdersResponse {
  data: Order[];
  pageCount: number;
  totalCount: number;
}

export const fetchOrders = async (params: FetchOrdersParams): Promise<FetchOrdersResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  let filteredData = [...mockOrders];

  // Apply global filter
  if (params.globalFilter) {
    const lowercasedFilter = params.globalFilter.toLowerCase();
    filteredData = filteredData.filter(
      (order) =>
        order.customerName.toLowerCase().includes(lowercasedFilter) ||
        order.id.toLowerCase().includes(lowercasedFilter) ||
        order.status.toLowerCase().includes(lowercasedFilter)
    );
  }

  // Apply sorting
  if (params.sorting?.length) {
    const { id, desc } = params.sorting[0];
    filteredData.sort((a, b) => {
      let aVal = a[id as keyof Order];
      let bVal = b[id as keyof Order];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return desc ? 1 : -1;
      if (aVal > bVal) return desc ? -1 : 1;
      return 0;
    });
  }

  // Apply pagination
  const startRow = params.pageIndex * params.pageSize;
  const endRow = startRow + params.pageSize;
  const paginatedData = filteredData.slice(startRow, endRow);

  return {
    data: paginatedData,
    pageCount: Math.ceil(filteredData.length / params.pageSize),
    totalCount: filteredData.length,
  };
};
