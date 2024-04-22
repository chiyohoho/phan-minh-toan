import { Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FaCloudSun, FaCloudMoon } from "react-icons/fa6";


const ColorModeToggle = () => {
    const [colorMode, setColorMode] = useState('light'); // Initial state

    useEffect(() => {
        // Check for user's preference or stored setting
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setColorMode('dark');
        }
        // Add the 'dark' class to the 'html' element when dark mode is enabled
        document.documentElement.classList.toggle('dark', colorMode === 'dark');
    }, [colorMode]);

    const toggleColorMode = () => {
        setColorMode(colorMode === 'light' ? 'dark' : 'light');
    };

    return (
        <Box fontSize={40} className='text-black dark:text-white' border={'1px solid gray'} rounded={10} p={2} onClick={toggleColorMode}>
            {colorMode === 'light' ? <FaCloudSun /> : <FaCloudMoon />}
        </Box>
    );
};

export default ColorModeToggle;