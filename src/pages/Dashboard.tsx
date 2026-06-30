import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { fetchOrders } from '../services/mockApi';
import type { Order } from '../services/mockApi';
import { DataTable } from '../components/Table/DataTable';
import { cn } from '../lib/utils';
import { Download } from 'lucide-react';

import { toast } from 'sonner';

export const Dashboard: React.FC = () => {
  // Table State
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');

  // Fetch Data
  const { data, isLoading } = useQuery({
    queryKey: ['orders', pagination, sorting, globalFilter],
    queryFn: () =>
      fetchOrders({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        sorting,
        globalFilter,
      }),
  });

  const handleExport = () => {
    toast.success('Export started', {
      description: 'Your CSV file is being generated and will download shortly.'
    });
  };

  // Define Columns
  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            className="rounded border-white/10 bg-white/5 text-blue-600 focus:ring-blue-500"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            className="rounded border-white/10 bg-white/5 text-blue-600 focus:ring-blue-500"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'id',
        header: 'Order ID',
        cell: (info) => (
          <span className="font-mono text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">
            {info.getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: 'customerName',
        header: 'Customer',
        cell: (info) => <span className="font-medium text-gray-200">{info.getValue<string>()}</span>,
      },
      {
        accessorKey: 'date',
        header: 'Date',
        cell: (info) => {
          const date = new Date(info.getValue<string>());
          return <span className="text-gray-400">{date.toLocaleDateString()}</span>;
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => {
          const status = info.getValue<string>();
          return (
            <span
              className={cn(
                'px-2.5 py-1 rounded-full text-xs font-medium capitalize border',
                status === 'completed' && 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                status === 'processing' && 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                status === 'pending' && 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                status === 'cancelled' && 'bg-red-500/10 text-red-400 border-red-500/20'
              )}
            >
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: 'revenue',
        header: 'Amount',
        cell: (info) => {
          const amount = parseFloat(info.getValue<number>().toString());
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(amount);
        },
      },
      {
        accessorKey: 'paymentMethod',
        header: 'Payment',
        cell: (info) => {
          const method = info.getValue<string>().replace('_', ' ');
          return <span className="capitalize text-gray-400">{method}</span>;
        },
      },
    ],
    []
  );

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Orders</h1>
          <p className="text-sm text-gray-400 mt-1">Manage and track all customer orders.</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search orders..."
            className="block w-full sm:w-64 px-3 py-2 border border-white/10 rounded-xl leading-5 bg-[#1A1A1A] text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
          />
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-transparent"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data?.data ?? []}
        pageCount={data?.pageCount ?? -1}
        sorting={sorting}
        setSorting={setSorting}
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        setPagination={setPagination}
        isLoading={isLoading}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
    </div>
  );
};
