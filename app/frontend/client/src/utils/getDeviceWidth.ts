export const getDeviceWidth = () => {
    if (typeof window === "undefined") {
        return 0;
    }
    
    return window.innerWidth;
}