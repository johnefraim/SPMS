import Link from 'next/link';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar: React.FC = () => {
    return (
        <NavigationMenu className="flex justify-between bg-[#EFEFEF]">
            <NavigationMenuList className="flex justify-center items-center">
                <Link href={"/"}>
                    <a className="flex items-center ml-2 mt-4 text-2xl text-orange-500">College of Computer Studies</a>
                </Link>
            </NavigationMenuList>
            <NavigationMenuList className="flex items-center mr-12 space-x-4">
                <NavigationMenuItem>
                    <Link href="/" passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Home
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/portfolios" passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Portfolios
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/about" passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            About
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/register" passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Sign Up
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default Navbar;
