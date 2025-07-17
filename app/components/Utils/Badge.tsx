const Badge: React.FC<{ children: React.ReactNode; color: "red" | "blue" }> = ({ color = "blue", children }) => {
  const classColor =
    color === "blue"
      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"

  return <span className={`${classColor} mr-2 rounded px-2.5 py-0.5 text-xs font-medium`}>{children}</span>
}

export default Badge
