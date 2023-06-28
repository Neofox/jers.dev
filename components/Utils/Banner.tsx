import { useState } from "react";

const Banner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(true);

    return (
        open && (
            <div
                id="banner"
                className="fixed z-50 flex w-full items-center justify-between gap-8 border border-b border-gray-200 bg-green-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 lg:py-4"
            >
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">{children}</p>
                <button
                    onClick={() => setOpen(false)}
                    data-collapse-toggle="banner"
                    type="button"
                    className="flex items-center rounded-lg p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
            </div>
        )
    );
};

export default Banner;
