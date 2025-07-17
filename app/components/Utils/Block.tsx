const Block: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col rounded-2xl bg-transparent p-5 text-gray-900 shadow-lg backdrop-blur-md transition-all hover:shadow-2xl md:h-full md:p-6 xl:p-8 2xl:p-12 dark:text-white">
      {children}
    </div>
  )
}

export default Block
