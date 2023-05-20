interface ButtonProps {
  onClick: () => void;

  size?: "sm" | "md" | "lg";
}

export function Button(props: ButtonProps) {
  const { size = "md" } = props;

  return <button {...props}>{}</button>;
}
