"use client"

interface DisplayCardProps {
  title: string;
  time: string;
  color: string; // New prop for color
}

export default function DisplayCard({ title, time, color }: DisplayCardProps) {
  return (
    <div
      className={`bg-white shadow-lg rounded-lg border border-gray-200 p-6 hover:shadow-2xl transition-shadow duration-300 ${color}`}
      style={{ boxShadow: `0px 4px 12px ${color}` }} // Applying the color for box-shadow
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600 text-sm border-t pt-2">{time}</p>
    </div>
  );
}