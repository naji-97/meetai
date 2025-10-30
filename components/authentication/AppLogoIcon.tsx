import Image from "next/image";
import { SVGAttributes } from "react";

export function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <Image
            src="/logo.png"
            alt="logo icon"
            width={40}
            height={40}
            className="h-10 w-auto sm:h-12"
        />

    );
}