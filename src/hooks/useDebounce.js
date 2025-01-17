import { useEffect, useState } from "react";

const useDebounce = ({
    value,
    delay
}: {
    value: string;
    delay: number;
}) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      },delay)
    
      return () => {
        clearTimeout(timer);
      }
    }, [value])
    
    return debouncedValue;
}

export { useDebounce };