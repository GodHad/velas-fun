import React, { useEffect, useRef, memo } from 'react';
import { useTheme } from 'next-themes';

function TradingViewWidget() {
    const container = useRef<HTMLDivElement | null>(null);
    const { theme } = useTheme();

    useEffect(() => {
        if (container.current) {
            container.current.innerHTML = '';
        }

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
        {
          "autosize": true,
          "symbol": "NASDAQ:AAPL",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "${theme === 'dark' ? 'dark' : 'light'}",
          "style": "1",
          "locale": "en",
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;

        if (container.current) {
            container.current.appendChild(script);
        }
    }, [theme]); 

    return (
        <div className='h-[400px]'>
            <div
                className="tradingview-widget-container"
                ref={container}
                style={{ height: "400px", width: "100%" }}
            >
                <div
                    className="tradingview-widget-container__widget"
                    style={{ height: "400px", width: "100%" }}
                ></div>
            </div>
        </div>
    );
}

export default memo(TradingViewWidget);
