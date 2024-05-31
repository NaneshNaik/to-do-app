addNotification(
    {
        title: "Title", // Default is null
        description: "Description", // Default is null
        text: "Text", // // Default is null
        status: "success" || "failed" || "warning", // Default is null
        background: "purple" || "#800080", // Can use any color name or hex code
        color: "white" || "#FFFFFF", // Can use any color name or hex code
        icon: "✅" || <FaCheckCircle />, // Can be a string representing a unicode character or a React component
        duration : '5s', // Default is 5s
        iconColor: "white" || "#FFFFFF", // Can use any color name or hex code
        textsColor: "white" || "#FFFFFF", // Can use any color name or hex code
        titleColor: "white" || "#FFFFFF", // Can use any color name or hex code
        textColor: "white" || "#FFFFFF", // Can use any color name or hex code
        descriptionColor: "white" || "#FFFFFF", // Can use any color name or hex code
        fixed: true, // If true, the notification remains fixed and does not automatically clear
        progressColor: "gray" || "#808080", // Can use any color name or hex code
        closeButtonRotate: true, // If true, the close button rotates on hover
    }
);