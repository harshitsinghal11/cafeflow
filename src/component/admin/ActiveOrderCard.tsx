import { CheckCircle, User, Smartphone, XCircle } from "lucide-react";

interface Props {
  order: any;
  onUpdateStatus: (id: string, status: string) => void;
}

export default function ActiveOrderCard({ order, onUpdateStatus }: Props) {
  
  const handleCancel = () => {
    if (confirm(`Cancel Order #${order.order_no}?`)) {
      onUpdateStatus(order.id, 'cancelled');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border-l-8 border-yellow-400 overflow-hidden relative animate-in fade-in zoom-in duration-300">
      
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex justify-between items-start">
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Token</span>
          <p className="text-4xl font-black text-gray-800">#{order.order_no}</p>
        </div>
        <div className="text-right">
          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold uppercase">Pending</span>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>

      {/* Items Body */}
      <div className="p-5 bg-gray-50/50 min-h-30">
        <ul className="space-y-2">
          {order.items.map((item: any, i: number) => (
            <li key={i} className="flex items-start justify-between font-medium text-gray-700">
              <span className="flex items-center gap-2">
                <span className="bg-gray-200 text-gray-600 w-6 h-6 flex items-center justify-center rounded text-xs font-bold">
                  {item.quantity}
                </span>
                {item.name}
              </span>
              <span className="text-sm text-gray-400 uppercase">{item.size}</span>
            </li>
          ))}
        </ul>
        
        {/* Customer Info */}
        <div className="mt-4 pt-4 border-t border-dashed border-gray-200 flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1"><User size={14}/> {order.customer_name}</span>
          <span className="flex items-center gap-1"><Smartphone size={14}/> {order.customer_phone}</span>
        </div>
      </div>

      {/* Actions Footer */}
      <div className="p-4 bg-white border-t border-gray-100 flex gap-3">
        <button 
          onClick={handleCancel}
          className="px-4 py-3 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg font-bold border border-red-100 transition-colors"
          title="Cancel Order"
        >
          <XCircle size={20} />
        </button>

        <button 
          onClick={() => onUpdateStatus(order.id, 'completed')}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
        >
          <CheckCircle size={18} /> Order Ready
        </button>
      </div>
    </div>
  );
}