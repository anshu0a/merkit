const colors = [
    ["#1E3A8A", "#BFDBFE"], ["#14532D", "#BBF7D0"], ["#581C87", "#E9D5FF"],
    ["#9F1239", "#FBCFE8"], ["#134E4A", "#99F6E4"], ["#713F12", "#FEF08A"],
    ["#1E293B", "#CBD5E1"], ["#86198F", "#F5D0FE"], ["#075985", "#BAE6FD"],
    ["#4C1D95", "#DDD6FE"], ["#065F46", "#A7F3D0"], ["#991B1B", "#FECACA"],
    ["#164E63", "#A5F3FC"], ["#365314", "#D9F99D"], ["#6B21A8", "#E9D5FF"],
    ["#1D4ED8", "#BFDBFE"], ["#854D0E", "#FEF3C7"], ["#7E22CE", "#F3E8FF"]
];

const border = [
    "#ff6b6b93", "#FFB34793", "#FFD93D93", "#A8E06393", "#6FE7B793",
    "#63E6E293", "#74C0FC93", "#91A7FF93", "#B197FC93", "#DDA0FF93",
    "#FF9EC493", "#FFB5A793", "#F7A8E893", "#C3E88D93", "#FFE29A93"
];


const randomColor = colors[Math.floor(Math.random() * colors.length)];

export const getBorderColor = () => {
    return border[Math.floor(Math.random() * border.length)];
};

export { randomColor };