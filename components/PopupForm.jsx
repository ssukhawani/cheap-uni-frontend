import { useEffect } from "react";

const PopupForm = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    window.TallyConfig = {
      formId: "n0LE6P",
      popup: {
        width: 460,
        emoji: {
          text: "👋",
          animation: "wave",
        },
        autoClose: 10000,
        doNotShowAfterSubmit: true,
      },
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default PopupForm;
