import { useEffect, useState } from "react";

export const useIsIntersecting = (element?: HTMLElement | null, root?: HTMLElement | null) => {
    const [isIntersecting, setIsIntersecting] = useState<boolean>(true);

    useEffect(() => {

        const showShadowCallback = (entries: Array<IntersectionObserverEntry>, observer: IntersectionObserver) => {
            setIsIntersecting(entries[0].isIntersecting);
        }

        if (element){
            const options = {
                root: root,
                rootMargin: "0px",
                threshold: [0,1]
            }

            const observer = new IntersectionObserver(showShadowCallback, options);
            observer.observe(element);

            return(() => {
                if (element){
                    observer.unobserve(element);
                }
            })
        }
    },[element, root])

    return isIntersecting;
}
