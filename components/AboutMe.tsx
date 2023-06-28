import { MdContactMail } from "react-icons/md";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import Block from "./Utils/Block";
import Title from "./Utils/Title";

const AboutMe: React.FC = () => (
    <div id="aboutme" className="h-fit md:col-span-2 md:row-start-2 lg:row-start-1 lg:h-full">
        <Block>
            <Title>About me</Title>
            <p className="lg:h-full">
                After now many years improving my craft by working on many projects as a consultant or not, I have now
                enough experience to lead a little team of developers in my current job. I had the chance to work on
                many different technologies, front or back ones but never stopped getting interest in new emerging
                technologies. I'm still very specialized in web technologies and even have an official certification
                from Zend Technologies in PHP. I'm now mostly doing javascript in my work but I'm always open to learn
                new things.
            </p>
            <div>
                <a
                    href="mailto:jer.schaeffer@gmail.com"
                    className="mt-5 inline-flex items-center font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                    <MdContactMail className="ml-1 h-5 w-5" />
                    &nbsp; jer.schaeffer@gmail.com
                </a>
            </div>

            <hr className="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700" />

            <div className="inline-flex self-center rounded-md shadow-sm" role="group">
                {/* <a
                    href="#"
                    className="inline-flex items-center rounded-l-lg border border-gray-900 bg-transparent px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:bg-gray-900 focus:text-white focus:ring-2 focus:ring-gray-500 dark:border-white dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700"
                >
                    <svg
                        aria-hidden="true"
                        className="mr-2 h-4 w-4 fill-current"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    Email
                </a> */}
                <a
                    href="https://www.linkedin.com/in/j%C3%A9r%C3%B4me-schaeffer-989260119/"
                    className="inline-flex items-center rounded-l-lg border border-gray-900 bg-transparent px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:bg-gray-900 focus:text-white focus:ring-2 focus:ring-gray-500 dark:border-white dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700"
                    // className="inline-flex items-center border-b border-t border-gray-900 bg-transparent px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:bg-gray-900 focus:text-white focus:ring-2 focus:ring-gray-500 dark:border-white dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700"
                >
                    <FaLinkedinIn className="mr-2 h-4 w-4 fill-current" />
                    Linkedin
                </a>
                <a
                    href="https://github.com/Neofox"
                    className="inline-flex items-center rounded-r-md border border-gray-900 bg-transparent px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:bg-gray-900 focus:text-white focus:ring-2 focus:ring-gray-500 dark:border-white dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700"
                >
                    <FaGithub className="mr-2 h-4 w-4 fill-current" />
                    Github
                </a>
            </div>
        </Block>
    </div>
);

export default AboutMe;
