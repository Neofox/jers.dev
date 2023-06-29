const Block: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="text-gray-900 dark:text-white flex flex-col rounded-2xl bg-transparent p-5 shadow-lg backdrop-blur-md transition-all hover:shadow-2xl md:h-full md:p-6 xl:p-8 2xl:p-12">
            {children}
        </div>
    );
};

export default Block;
