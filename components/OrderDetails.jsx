export default function OrderDetails({ orderData }) {
  return (
    <div className="w-full h-full">{orderData ? orderData.name : "nada"}</div>
  );
}
