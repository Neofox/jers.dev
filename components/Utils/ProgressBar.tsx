const ProgressBar: React.FC<{ value: number; header: string }> = ({ value, header }) => {
    return (
        <>
            <div className="mb-1 flex justify-between">
                <span className="text-base font-medium text-blue-700 dark:text-white">{header}</span>
                <span className="text-sm font-medium text-blue-700 dark:text-white">{value / 10} / 10</span>
            </div>
            <div className="mb-3 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div className="h-2.5 rounded-full bg-blue-600" style={{ width: `${value}%` }}></div>
            </div>
        </>
    );
};

export default ProgressBar;
