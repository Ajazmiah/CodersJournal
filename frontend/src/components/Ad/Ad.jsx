import React, { useEffect } from "react";

const AdComponent = () => {
  useEffect(() => {
    try {
      // Push the ad to Google Ads when the component mounts

      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("Error loading Google Ads:", error);
      // You can add any additional error handling logic here if needed
    }
  }, []); // Run once on mount

  return (
    <div style={{ width: "100%" }}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
        }}
        data-ad-client="ca-pub-4339219773762700"
        data-ad-slot="3008558947"
        data-ad-format="auto"
        title="ads"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdComponent;
