import Block from "./Utils/Block";
import { MdDownload } from "react-icons/md";
import Image from "next/image";

const Header: React.FC = () => (
    <div className="col-start-1 row-start-1 h-fit lg:h-full">
        <Block>
            <Image
                className="w-44 self-center rounded-full"
                src={"/pict210113.jpeg"}
                alt="profile picture"
                width={200}
                height={200}
            />
            <div className=" mt-10 self-center text-3xl text-gray-900 dark:text-white">Jerome Schaeffer</div>
            <div className="mt-2 self-center text-xl text-gray-400 drop-shadow-sm">Senior Web Developer</div>

            <div className="mt-8 self-center">
                <a
                    href={"±"}
                    target="_blank"
                    className="mr-2 inline-flex items-center rounded-lg bg-blue-600 px-5 py-1 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    <MdDownload className=" mr-4 h-10 w-10 border-r-2 pr-4" />
                    Download my CV
                </a>
            </div>
        </Block>
    </div>
);

export default Header;
