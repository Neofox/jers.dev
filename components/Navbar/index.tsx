import { LanguageType } from "@/types/Language";
import NavbarBase from "./NavbarBase";

const Navbar: React.FC<{ lng: LanguageType }> = async ({ lng }) => {
    return <NavbarBase lng={lng} />;
};

export default Navbar;
