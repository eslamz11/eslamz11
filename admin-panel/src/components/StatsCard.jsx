const StatsCard = ({ icon: Icon, title, value, color, bgColor }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
        </div>
        <div 
          className={`w-14 h-14 ${bgColor} rounded-full flex items-center justify-center`}
        >
          <Icon className={`text-2xl ${color}`} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;

